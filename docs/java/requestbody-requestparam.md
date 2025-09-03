# SpringMVC

## @RequestBody 和 @RequestParam 原理

### 为什么非 body 获取的数据需要 setter 方法，而 @RequestBody 注解的数据不需要

<details>
<summary> 深度思考 </summary>
    好的，用户问：“为什么@RequestParam需要set方法”。我需要先理解这个问题的具体背景。用户可能是在使用Spring MVC时，发现当使用@RequestParam注解来接收请求参数时，对应的POJO类需要有setter方法才能正常注入数据，而如果使用@RequestBody则不需要。这背后的原因是什么？
    首先，回顾一下@RequestParam和@RequestBody的区别。@RequestParam用于绑定查询参数或表单数据，通常数据格式是application/x-www-form-urlencoded，而@RequestBody用于绑定HTTP请求体中的数据，通常是JSON或XML格式，这时候会用到HttpMessageConverter如Jackson来反序列化数据。
    接下来，用户的问题核心在于为什么@RequestParam需要setter方法，而@RequestBody不需要。需要从Spring处理这两种参数的不同机制来分析。
    对于@RequestParam，当参数是一个POJO时，Spring会使用DataBinder来绑定参数。DataBinder默认通过反射调用setter方法来设置属性值。如果POJO没有setter方法，就会导致绑定失败，抛出异常。
    而@RequestBody则是通过HttpMessageConverter（如Jackson）将JSON反序列化为对象，这时候Jackson使用的是构造方法或者字段的可见性，可以通过字段直接赋值，或者调用构造器注入，不需要setter方法。例如，Jackson默认可以访问字段，或者通过注解@JsonCreator指定构造方法。
    接下来需要验证这个结论是否正确。查看Spring源码中的相关部分，DataBinder的实现，以及Jackson的反序列化机制。同时，可以参考Spring官方文档或相关技术博客，确认不同参数解析器的行为差异。
    还需要考虑用户的项目结构，查看mate-match项目中是否有相关的代码示例。例如，UserController中的方法是否使用了@RequestParam绑定POJO，以及对应的POJO是否有setter方法。如果用户项目中的UserProfileRequest类在使用@RequestParam时需要setter，而在@RequestBody情况下不需要，就能验证这一点。
    此外，用户可能对Spring内部机制不太熟悉，需要解释清楚两种注解的工作流程差异，以及背后的设计原理。比如，为什么DataBinder依赖setter，而Jackson不依赖。这可能涉及到不同模块的设计初衷，以及不同场景下的适用性。
    最后，总结回答时要分点明确，对比两种机制的不同之处，并给出实际例子和验证步骤，确保用户能够理解为什么会有这样的设计差异，以及在实际开发中如何应对。
</details>
在Spring MVC中，`@RequestParam`和`@RequestBody`对数据映射的需求差异，本质上源于它们**底层实现机制的不同**。以下是详细分析：

#### 1. **`@RequestParam`依赖`set`方法的原因**

##### 核心机制：基于`DataBinder`的表单数据绑定

- **数据来源**：HTTP请求的查询参数（Query String）或表单数据（`application/x-www-form-urlencoded`）。
- **绑定方式**：Spring使用`ServletRequestDataBinder`通过反射调用`set`方法注入数据。
- **为何需要`set`方法**：
  1. **字段不可见**：默认情况下，Spring无法直接访问私有字段（除非配置`binder.setFieldAccess(true)`）。
  2. **依赖JavaBeans规范**：遵循JavaBean的约定（通过`set`方法设置属性），确保兼容性。
  3. **可变性要求**：`@RequestParam`绑定的对象通常是可变的，通过`set`方法更新状态。

##### 示例验证

在[UserProfileRequest](file:///Users/zkye/kfkfka/project/yupi/kfkfka/mate-match/src/main/java/online/yzketx/matematch/model/domain/dto/request/UserProfileRequest.java)中：

```java
public class UserProfileRequest {
    private String username; // 私有字段
    public void setUsername(String username) { // set方法
        this.username = username;
    }
}
```

若删除`setUsername`方法，调用以下接口会抛出异常：

```java
@GetMapping("/update")
public BaseResponse<Void> update(@RequestParam UserProfileRequest request) {
    // 报错：InvalidFormatException（无法注入username字段）
}
```

#### 2. **`@RequestBody`不需要`set`方法的原因**

##### 核心机制：基于`HttpMessageConverter`的JSON反序列化

- **数据来源**：HTTP请求体（`application/json`）。
- **绑定方式**：通过`Jackson2HttpMessageConverter`将JSON反序列化为对象。
- **为何不需要`set`方法**：
  1. **字段直接访问**：Jackson默认通过反射直接访问私有字段（无需`set`）。
  2. **不可变对象支持**：可通过构造函数注入数据（需`@JsonCreator`注解）。
  3. **不可变性设计**：适合不可变对象（Immutable Object）的场景。

##### 示例验证

修改[UserProfileRequest](file:///Users/zkye/kfkfka/project/yupi/kfkfka/mate-match/src/main/java/online/yzketx/matematch/model/domain/request/UserProfileRequest.java#L18-L67)为不可变对象：

```java
public class UserProfileRequest {
    private final String username;

    @JsonCreator
    public UserProfileRequest(@JsonProperty("username") String username) {
        this.username = username;
    }
}
```

此时以下接口仍能正常工作：

```java
@PostMapping("/update")
public BaseResponse<Void> update(@RequestBody UserProfileRequest request) {
    // 成功：Jackson通过构造函数注入username字段
}
```

#### 3. **两种机制的对比**

| 特性             | `@RequestParam`               | `@RequestBody`                 |
| ---------------- | ----------------------------- | ------------------------------ |
| **数据格式**     | Query String / Form Data      | JSON / XML                     |
| **绑定器**       | `DataBinder`                  | `Jackson2HttpMessageConverter` |
| **字段访问方式** | 依赖`set`方法（JavaBean规范） | 直接访问字段或构造函数注入     |
| **可变性要求**   | 需要可变对象（支持多次`set`） | 支持不可变对象                 |
| **性能差异**     | 更低（仅需字符串解析）        | 更高（需完整反序列化）         |
| **典型场景**     | 简单查询、表单提交            | RESTful API、复杂数据结构      |

#### 4. **底层源码验证**

##### `@RequestParam`绑定流程

1. **参数解析器**：`ServletModelAttributeMethodProcessor`
2. **绑定逻辑**：`WebDataBinder`通过反射调用`set`方法：
   ```java
   // Spring源码片段（伪代码）
   public void bind(Object target, Map<String, String> values) {
       for (Map.Entry<String, String> entry : values.entrySet()) {
           Method setter = getSetter(target.getClass(), entry.getKey());
           setter.invoke(target, entry.getValue()); // 调用set方法
       }
   }
   ```

##### `@RequestBody`绑定流程

1. **参数解析器**：`RequestResponseBodyMethodProcessor`
2. **绑定逻辑**：`Jackson`通过字段或构造函数注入：
   ```java
   // Jackson源码片段（伪代码）
   public <T> T deserialize(JsonParser parser, DeserializationContext ctxt) {
       if (hasConstructorAnnotation) {
           return (T) invokeCreator(parser); // 调用带@JsonCreator的构造函数
       } else {
           return (T) createUsingDefaultConstructor(); // 直接字段赋值
       }
   }
   ```

#### 5. **实践建议**

1. **`@RequestParam`场景**：
   - 为POJO添加`set`方法（遵循JavaBean规范）。
   - 或启用字段访问权限：
     ```java
     @InitBinder
     public void initBinder(WebDataBinder binder) {
         binder.setFieldAccess(true); // 允许直接访问私有字段
     }
     ```

2. **`@RequestBody`场景**：
   - 优先使用不可变对象（通过构造函数注入）。
   - 若需兼容旧代码，保持`set`方法即可。

3. **性能优化**：
   - 对高频接口，优先使用`@RequestBody`（减少反射调用）。
   - 对低频接口，两者性能差异可忽略。

#### 6. **总结**

`@RequestParam`依赖`set`方法是**JavaBean规范与表单数据绑定机制**的产物，而`@RequestBody`不依赖它是因为**JSON反序列化器（如Jackson）支持字段直接访问和构造函数注入**。这种设计差异体现了Spring对不同数据格式的灵活适配能力，开发者应根据场景选择合适的数据绑定方式。

---