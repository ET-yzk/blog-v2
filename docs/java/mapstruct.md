# MapStruct

> [MapStruct](https://mapstruct.org) is a code generator that greatly simplifies the implementation of mappings between Java bean types based on a convention over configuration approach.
>
> The generated mapping code uses plain method invocations and thus is fast, type-safe and easy to understand.

## 引入

```xml
<!-- 1. 依赖声明 -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>xxx</version>
    <scope>provided</scope> <!-- 编译阶段处理后不会打包进最终产物 -->
</dependency>

<dependency>
    <groupId>org.mapstruct</groupId>
    <artifactId>mapstruct</artifactId>
    <version>xxx</version> <!-- 当前稳定版本 -->
</dependency>

<!-- 2. 处理器链配置 -->
<annotationProcessorPaths>
    <!-- Lombok处理器 -->
    <path>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>xxx</version>
    </path>

    <!-- MapStruct代码生成器 -->
    <path>
        <groupId>org.mapstruct</groupId>
        <artifactId>mapstruct-processor</artifactId>
        <version>xxx</version>
    </path>

    <!-- 关键桥梁：让两个处理器能协同工作 -->
    <path>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok-mapstruct-binding</artifactId>
        <version>0.2.0</version>
    </path>
</annotationProcessorPaths>
```

> [!NOTE]
>
> 同时使用 `Lombok` 时，记得额外引入 `lombok-mapstruct-binding`

## MapStruct 解决了我们平时需要使用 Java 反射特性才能实现的通用代码工具类的问题

由于在处理 DTO 与 Entity 转换时，需要单独实现基本一致的方法，代码重复度高且非常地麻烦，于是实现一个 CommonConverter 进行统一的转换，但这样存在一个缺点，需要依赖反射来实现，示例如下：

```java
public class CommonConverter<E, D extends BaseDTO> {
    public static D toDTO(E entity) {
      if (entity == null) {
      	return null;
      }
      D entityDTO = new D();
      // 使用 Spring 的 BeanUtils 复制共有属性
      BeanUtils.copyProperties(entity, entityDTO);
      return entityDTO;
    }
}

// 使用
CommonConverter.<User, UserDTO>toDTO()
```

使用 MapStruct:

`````java
public interface BaseConverter<E, D> {
    D toDTO(E entity);
}
`````

```java
@Mapper(uses = {TagConverter.class})
public interface UserConverter extends BaseConverter<User, UserDTO> {

    // 单例，方便全局调用
    UserConverter INSTANCE = Mappers.getMapper(UserConverter.class);

    // 使用 @Mapping 注解，显式地声明映射规则
    @Mapping(source = "tagList", target = "tagList")
    @Override
    UserDTO toDTO(User user);

    // 特定的转换
    @Mapping(source = "tagList", target = "tagList")
    UserAdminDTO toAdminDTO(User user);
}
```

编译后 MapStruct 会自动生成 `UserConverterImpl`, 甚至自动实现转换 `List<D>` 等复数类型的转换 (MapStruct 会根据单数形式方法，自动派生出复数形式的实现)：

```java
public class UserConverterImpl implements UserConverter {
    private final TagConverter tagConverter;

    public UserConverterImpl() {
        this.tagConverter = TagConverter.INSTANCE;
    }

    public List<UserDTO> toDTOList(List<User> entityList) {
        if (entityList == null) {
            return null;
        } else {
            List<UserDTO> list = new ArrayList(entityList.size());
            Iterator var3 = entityList.iterator();

            while(var3.hasNext()) {
                User user = (User)var3.next();
                list.add(this.toDTO(user));
            }

            return list;
        }
    }
    
    public UserDTO toDTO(User user) {
        if (user == null) {
            return null;
        } else {
            UserDTO userDTO = new UserDTO();
            // many setters...
            return userDTO;
        }
}
```

以上代码详见 [ET-yzk/mate-match](https://github.com/ET-yzk/mate-match) 中的实现