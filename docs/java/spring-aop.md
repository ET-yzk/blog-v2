# Spring AOP

## 遇到问题

### Call transactional methods via an injected dependency instead of directly via 'this’

> 在 IDEA 编写 Service 实现时，遇到如上提示。
>
> 这是一个非常好的问题，也是很多开发者在使用 Spring 事务时会遇到的经典场景，它指出了 Spring AOP 事务的一个核心工作机制。

#### 示例代码

```java
@Service
public class TagServiceImpl extends ServiceImpl<TagMapper, Tag>
        implements TagService {

    @Override
    @Transactional
    public List<TagAdminDTO> findOrCreateTagsByNames(List<String> tagNameList) {
        // ...

        // 通过 this 来调用 saveBatch
        this.saveBatch(newTags);

        // ...
    }
```

其中，方法 `saveBatch` 是事务操作：
```java
@Transactional(rollbackFor = {java.lang.Exception.class}) 
public boolean saveBatch(java.util.Collection<T> entityList)
```

#### 为什么 IDEA 会发出这个警告？

简单来说：**通过 `this` 调用方法，会绕过 Spring 的 AOP 代理，导致 `@Transactional` 注解失效。**

1. **Spring 事务的核心是 AOP 代理**：当你的 `TagServiceImpl` 被 Spring 容器管理时，Spring 实际上并不会直接将 `TagServiceImpl` 的原始对象注入到其他地方。相反，它会为你的对象创建一个**代理（Proxy）**对象。这个代理对象包裹了你的原始对象。
2. **代理的作用**：当你从外部（比如从 `UserServiceImpl`）调用一个被 `@Transactional` 注解的 `TagService` 方法时（例如 `findOrCreateTagsByNames`），你实际上调用的是那个**代理对象**的方法。
   - 代理对象在执行你真正的业务逻辑**之前**，会先开启一个数据库事务。
   - 代理对象在执行完你的业务逻辑**之后**，会根据执行结果提交或回滚事务。
3. **问题的根源 (`this` 调用)**：在 `findOrCreateTagsByNames` 方法内部，当你使用 `this.saveBatch(newTags);` 来调用同一个类中的另一个方法时，你绕过了代理。这里的 `this` 指向的是**原始的 `TagServiceImpl` 对象**，而不是那个具有事务管理能力的代理对象。因此，`saveBatch` 方法上的 `@Transactional` 注解（`ServiceImpl`中的 `saveBatch` 默认是事务性的）所定义的事务传播行为（如 `REQUIRED`, `REQUIRES_NEW`）不会被AOP代理拦截，也就不会独立生效。

#### 在示例场景中会发生什么？

- 外部方法 `findOrCreateTagsByNames` 已经被 `@Transactional` 注解。当 `UserServiceImpl` 调用它时，一个事务已经被**开启**。
- 内部的 `this.saveBatch(newTags)` 调用因为绕过了代理，所以它**不会**开启一个新的、独立的事务。
- 幸运的是，由于 `saveBatch` 方法是在一个已经存在的事务（由 `findOrCreateTagsByNames` 开启）中被调用的，所以它的数据库操作**会被包含**在这个外部事务里。

**结论**：在这个特定场景下，代码的**最终结果是正确的**，`saveBatch` 的操作是事务安全的。但是，这种写法依赖于外部方法必须有事务，它隐藏了真实的调用关系，是一种不良实践，所以 IDEA 才会警告你。如果有一天你从一个没有事务的方法中调用了 `findOrCreateTagsByNames`，那么 `saveBatch` 的事务就真的会失效。

#### 如何修复这个问题？(推荐的两种方案)

为了让代码的行为明确且符合最佳实践，你需要通过代理对象来调用 `saveBatch`。

**方案一：【最佳实践】自我注入 (Self-Injection)**

这是解决此类问题的标准做法。让 `TagServiceImpl` 自己注入自己，然后通过注入的代理对象来调用方法。

```java
package your.package.name.service.impl;

// ... 其他 imports
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy; // 可能需要 @Lazy 来解决循环依赖
import org.springframework.stereotype.Service;

@Service
public class TagServiceImpl extends ServiceImpl<TagMapper, Tag> implements TagService {

    // 自我注入一个 TagService 的代理对象
    // 使用 @Lazy 可以避免在某些情况下启动时出现循环依赖问题
    private final TagService self;

    @Autowired
    public TagServiceImpl(@Lazy TagService self) {
        this.self = self;
    }

    @Override
    @Transactional
    public List<Tag> findOrCreateTagsByNames(List<String> tagNameList) {
        // ...

        // 【关键改动】通过注入的 self (代理对象) 来调用 saveBatch
        self.saveBatch(newTags); 

        // ...
    }
}
```

**说明**:

- 我们注入了 `TagService` 自身，并将其命名为 `self`。
- Spring 注入的 `self` 是那个**代理对象**。
- 调用 `self.saveBatch(newTags)` 时，就会经过 AOP 代理，`@Transactional` 注解的全部功能（包括事务传播设置）都会正确生效。
- `@Lazy` 注解可以解决因构造函数注入自身而可能导致的循环依赖问题。

#### 方案二：使用 `ApplicationContext` 获取代理对象 (功能等价，但不如方案一优雅)

我们可以注入 `ApplicationContext`，然后用它来获取当前的代理 Bean。

```java
@Service
public class TagServiceImpl extends ServiceImpl<TagMapper, Tag> implements TagService {

    @Autowired
    private ApplicationContext applicationContext;

    @Override
    @Transactional
    public List<Tag> findOrCreateTagsByNames(List<String> tagNameList) {
        // ...

        // 从上下文中获取自身的代理对象
        TagService self = applicationContext.getBean(TagService.class);
        self.saveBatch(newTags);

        // ...
    }
}
```

> [!TIP]
>
> 综上，虽然在当前的特定代码下，功能没有出错，但它揭示了一个潜在的、与 Spring 事务模型相悖的设计。
>
> **建议采用方案一（自我注入）**进行修复，这是最清晰、最符合 Spring 设计哲学的解决方案。它能让代码在任何情况下都保持事务行为的明确和可预测性。

---

