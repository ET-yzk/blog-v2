---
date: 2025-02-01
---

# 读取大量数据库数据的优化策略

1. 先尽可能筛选掉无关的数据（只取需要的行和列） ✅ 推荐
2. 使用线程池 ✅ 推荐
3. 手动分页查询 ⚠️ 每次的 offset 依旧需要消耗一定数据库计算
4. Mybatis 流式查询 ⚠️ 注意数据库连接池资源

其中方法3/4：**避免一次性将数百万用户数据加载到应用内存中，从而解决内存溢出（OOM）问题**。

下面以 mate-match 项目中实现匹配用户功能为例：

---

### 方法二：使用线程池

首先，可以先注册一个专门处理对应问题的线程池 `Bean`

```java
@Configuration
public class ThreadPoolConfig {

    /**
     * 创建一个专用于匹配计算的线程池
     *
     * @return ThreadPoolExecutor
     */
    @Bean("matchExecutor")
    public ThreadPoolExecutor matchExecutor() {
        // CPU 密集型任务，使用CPU核数作为核心线程数
        // 获取CPU核心数
        int corePoolSize = Runtime.getRuntime().availableProcessors();
        return new ThreadPoolExecutor(
                corePoolSize, // 核心线程数
                corePoolSize * 2, // 最大线程数
                60, // 空闲线程存活时间
                TimeUnit.SECONDS, // 时间单位
                new LinkedBlockingQueue<>(10000), // 任务队列
                Executors.defaultThreadFactory(), // 线程工厂
                new ThreadPoolExecutor.CallerRunsPolicy() // 拒绝策略，当线程池和队列都满了之后，由提交任务的线程自己来执行该任务，防止任务丢失
        );
    }
}
```

然后，在需要时注入对上述 `Bean`

```java
@Resource(name = "matchExecutor")
private ThreadPoolExecutor matchExecutor;
```

最后，开启线程池

```java
public List<MatchResult> findTopMatchesByTagThread(Long targetUserId, int topN) {
    // 基础校验
    
    // 1. 尝试从缓存获取匹配结果
    // ... 缓存逻辑

    // 2. 获取目标用户的标签向量
    // ...

    // 3. 获取与目标用户标签相关的其他用户
    // ...

    // 4. 【优化点】并行计算相似度并生成匹配结果
    List<CompletableFuture<MatchResult>> futures = relatedUsers.stream()
            .map(otherUser -> CompletableFuture.supplyAsync(() -> {
                //log.info("matching user: {}, Thread: {}", otherUser.getUserId(), Thread.currentThread().getName());
                List<Double> otherVector = getWeightedVectorForUser(otherUser);
                MatchResult result = new MatchResult();
                result.setUserId(otherUser.getUserId());
                if (!otherVector.isEmpty()) {
                    double similarity = cosineSimilarity(targetVector, otherVector);
                    result.setScore(similarity);
                } else {
                    result.setScore(0d);
                }
                return result;
            }, matchExecutor))
            .toList();

    // 等待所有异步任务完成，并收集结果
    List<MatchResult> matchResults = CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
            .thenApply(v -> futures.stream()
                    .map(CompletableFuture::join) // 获取每个任务的结果
                    .filter(result -> result.getScore() > 0) // 过滤掉完全不匹配的用户
                    .sorted((r1, r2) -> Double.compare(r2.getScore(), r1.getScore())) // 按分数降序
                    .limit(topN) // 取前 N 个
                    .collect(Collectors.toCollection(ArrayList::new))
            ).join(); // join() 会阻塞，直到所有任务完成并返回最终结果

    // 5. 缓存匹配结果
    // ...

    return matchResults;
}
```

---

### 方法三：手动分页查询 (`LIMIT` / `OFFSET`)

这是最直观、最常用的处理大数据量的方式。我们通过循环，一页一页地从数据库获取数据，处理完一页再获取下一页，直到所有数据处理完毕。

#### 代码实现

我们将结合 MyBatis-Plus 提供的分页插件和上一节的线程池来进行实现。

```java
// ... UserMatchingService 类中 ...

public List<MatchResult> findTopMatchesByTagWithPaging(Long targetUserId, int topN) {
    // 1. & 2. 获取目标用户向量等准备工作 (同前)
    String redisKey = "...";
    // 缓存逻辑...
    List<Double> targetVector = getWeightedVectorForUser(targetUserId);
    if (targetVector.isEmpty()) {
        return Collections.emptyList();
    }

    int currentPage = 1;
    final int pageSize = 1000; // 每次从数据库读取1000条，可根据内存和DB性能调整
    List<CompletableFuture<MatchResult>> allFutures = new ArrayList<>();

    // 3. 【优化点】循环分页查询所有其他用户
    while (true) {
        Page<User> page = new Page<>(currentPage, pageSize);
        // 使用 Mybatis-Plus 的分页查询
        IPage<User> userPage = userMapper.selectPage(page,
                Wrappers.<User>lambdaQuery().ne(User::getUserId, targetUserId).select(User::getUserId)
        );

        List<User> userBatch = userPage.getRecords();
        if (userBatch.isEmpty()) {
            // 如果当前页没有数据，说明所有用户都已处理完，退出循环
            break;
        }

        // 4. 对当前批次的用户并行计算相似度
        List<CompletableFuture<MatchResult>> batchFutures = userBatch.stream()
                .map(otherUser -> CompletableFuture.supplyAsync(() -> {
                    // ... 具体的计算逻辑 ...
                    List<Double> otherVector = getWeightedVectorForUser(otherUser.getUserId());
                    MatchResult result = new MatchResult();
                    result.setUserId(otherUser.getUserId());
                    if (otherVector.isEmpty()) {
                        result.setScore(0d);
                    } else {
                        double similarity = cosineSimilarity(targetVector, otherVector);
                        result.setScore(similarity);
                    }
                    return result;
                }, matchExecutor))
                .collect(Collectors.toList());

        allFutures.addAll(batchFutures);

        // 处理下一页
        currentPage++;
    }

    // 5. 等待所有分页批次的任务完成，并聚合结果
    List<MatchResult> matchResults = CompletableFuture.allOf(allFutures.toArray(new CompletableFuture[0]))
            .thenApply(v -> allFutures.stream()
                    .map(CompletableFuture::join)
                    .filter(result -> result.getScore() > 0)
                    .sorted((r1, r2) -> Double.compare(r2.getScore(), r1.getScore()))
                    .limit(topN)
                    .collect(Collectors.toCollection(ArrayList::new))
            ).join();

    // 6. 缓存结果...
    
    return matchResults;
}
```

#### 优缺点分析

- **优点**:
  - **有效解决内存溢出**：这是最大的优点。应用内存消耗由`pageSize`控制，非常稳定，不会随着用户总量的增加而崩溃。
  - **实现简单直观**：分页逻辑清晰，易于理解和实现，特别是配合 MyBatis-Plus 等框架。
  - **对数据库连接友好**：每次查询都是一个短连接，执行完后连接会很快释放回连接池，不会长时间占用。
- **缺点**:
  - **数据库压力较大**：需要对数据库进行多次查询。如果用户总量是500万，`pageSize`为1000，就需要执行5000次SQL查询。
  - **深度分页性能问题**：当查询的页码（`OFFSET`）非常大时，数据库性能会急剧下降。例如 `LIMIT 1000 OFFSET 4000000`，数据库需要先扫描并丢弃前面的400万条记录，开销巨大。
  - **并未减少总计算量**：应用层仍然需要处理数据库中的**所有**其他用户，总的CPU计算耗时依然很长（尽管线程池可以缩短墙上时间）。

---

### 方法四：MyBatis 流式读取 (`ResultHandler`)

流式读取允许 MyBatis 从数据库一次获取一部分数据（由JDBC驱动的`fetchSize`控制），然后逐条地交给一个处理器（`ResultHandler`）来消费，而不是一次性将所有查询结果加载到一个 `List` 中。

#### 代码实现

**1. 修改 Mapper 接口**

在 `UserMapper` 接口中定义一个新方法，返回值为 `void`，并接受一个 `ResultHandler` 参数。

```java
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.ResultHandler;

public interface UserMapper extends BaseMapper<User> {
    // ... 其他方法 ...

    /**
     * 流式读取所有其他用户
     * @param targetUserId 要排除的目标用户ID
     * @param handler      结果处理器
     */
    @Options(fetchSize = "1000") // fetchSize 是一个关键提示，建议设为-2147483648 (Integer.MIN_VALUE) 来开启MySQL的流式读取
    void streamAllOtherUsers(@Param("targetUserId") Long targetUserId, ResultHandler<User> handler);
}
```

**2. 编写对应的 Mapper XML 文件**

```xml
<select id="streamAllOtherUsers" resultType="com.example.yourproject.model.User">
    SELECT user_id FROM user WHERE user_id != #{targetUserId}
</select>
```

**3. 在 Service 中调用**

```java
// ... UserMatchingService 类中 ...
public List<MatchResult> findTopMatchesByTagWithStreaming(Long targetUserId, int topN) {
    // 1. & 2. 准备工作 (同前)
    List<Double> targetVector = getWeightedVectorForUser(targetUserId);
    if (targetVector.isEmpty()) {
        return Collections.emptyList();
    }
    
    final List<CompletableFuture<MatchResult>> allFutures = new ArrayList<>();

    // 3. 【优化点】调用流式查询方法
    userMapper.streamAllOtherUsers(targetUserId, resultContext -> {
        // 每从数据库流式获取一条 User 记录，这个方法就会被调用一次
        User otherUser = resultContext.getResultObject();

        // 4. 立刻为这条记录创建异步计算任务
        CompletableFuture<MatchResult> future = CompletableFuture.supplyAsync(() -> {
            // ... 具体的计算逻辑 (同上) ...
            List<Double> otherVector = getWeightedVectorForUser(otherUser.getUserId());
            MatchResult result = new MatchResult();
            result.setUserId(otherUser.getUserId());
            if (otherVector.isEmpty()) {
                result.setScore(0d);
            } else {
                double similarity = cosineSimilarity(targetVector, otherVector);
                result.setScore(similarity);
            }
            return result;
        }, matchExecutor);
        
        allFutures.add(future);
    });

    // 5. 等待所有任务完成并聚合结果 (同上)
    List<MatchResult> matchResults = CompletableFuture.allOf(allFutures.toArray(new CompletableFuture[0]))
            .thenApply(v -> allFutures.stream()
                    .map(CompletableFuture::join)
                    .filter(result -> result.getScore() > 0)
                    .sorted((r1, r2) -> Double.compare(r2.getScore(), r1.getScore()))
                    .limit(topN)
                    .collect(Collectors.toCollection(ArrayList::new))
            ).join();

    // 6. 缓存...
    
    return matchResults;
}
```

#### 优缺点分析

- **优点**:
  - **极致的内存效率**：这是最节省内存的方式。数据从数据库流向应用，几乎没有在应用内存中产生堆积，内存占用是常数级别。
  - **单个数据库请求**：对应用来说，只发起了一次数据库查询，代码结构上比循环分页更“干净”。
- **缺点**:
  - **长时间占用数据库连接**：**这是最致命的缺点**。在整个流式处理期间（从第一条记录到最后一条记录处理完），数据库连接会一直被占用，无法释放回连接池。如果处理每条记录的计算逻辑耗时较长，会导致连接被占用数分钟甚至更久，极易耗尽数据库连接池资源，导致整个应用无法访问数据库。
  - **并未减少总计算量**：和分页一样，依然需要处理所有用户，没有捷径。
  - **使用限制**：流式查询通常要求在独立的、非事务性的 session 中执行，以避免潜在问题。实现上也比分页查询要复杂一些。

### 结论与建议

| 特性           | 手动分页查询             | MyBatis 流式读取   |
| -------------- | ------------------------ | ------------------ |
| **内存占用**   | 低 (由pageSize控制)      | 极低 (常数级)      |
| **数据库连接** | 短连接，多次             | 长连接，一次       |
| **数据库负载** | 多次查询，深度分页慢     | 一次查询，持续传输 |
| **实现复杂度** | 简单                     | 相对复杂           |
| **核心问题**   | **长时间占用数据库连接** |                    |

**最终建议：**

虽然这两种方法都能解决内存问题，但它们都没有解决**“对海量无关用户做无用功”**的核心性能瓶颈。

- **手动分页查询** 是一个相对安全的、用于防止OOM的“保底”方案。
- **流式读取** 由于其长时间占用连接的特性，在Web应用这种需要快速响应和释放资源的场景下，**风险很高，通常不推荐使用**。它更适合离线的、数据批处理的后台任务。

因此，最优的实践路径仍然是：

**强烈推荐采用 `策略1：预筛选` + `线程池` 的组合方案。**

它能从根本上减少需要处理的数据量，这比优化一个低效流程的执行方式（无论是分页还是流式）要有效得多。只有在预筛选后数据量依然巨大的情况下，才需要考虑再结合分页策略。