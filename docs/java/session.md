---
date: 2025-03-01
---

# 单机多服务部署下 JSESSIONID 冲突解决方案

## 一、问题现象

本地部署多个服务时出现以下现象：

- 不同服务间共享同一 JSESSIONID
- 登录状态异常（如A服务登录后，B服务也显示已登录，假如 A 和 B 服务不共享登录权限的话，显然不合理）
- Cookie 作用域冲突导致会话混乱

## 二、根本原因

1. **域名共享机制**

```yaml
# 默认配置示例
server:
  address: localhost  # 所有服务使用相同域名，默认 localhost
```

浏览器对`localhost`域名下的所有服务共享Cookie

2. **路径覆盖问题**

```yaml
# 典型配置
server:
  servlet:
    context-path: /api  # 多个服务使用相同路径
```

相同路径会导致 Cookie 路径匹配规则触发共享机制

## 三、解决方案

### 方案一：差异化服务端路径配置（推荐开发环境使用）

```yaml
# 服务A配置示例
server:
  servlet:
    context-path: /api/serviceA  # 独特路径

# 服务B配置示例
server:
  servlet:
    context-path: /api/serviceB  # 独特路径
```

**效果验证（可通过浏览器开发工具查看）：**

```bash
# 服务A响应头
Set-Cookie: JSESSIONID=xxx; Path=/api/serviceA

# 服务B响应头
Set-Cookie: JSESSIONID=yyy; Path=/api/serviceB
```

### 方案二：子域名隔离（推荐测试/生产环境）

```yaml
# 服务A配置
spring:
  session:
    cookie:
      domain: servicea.localhost  # 子域名

# 服务B配置
spring:
  session:
    cookie:
      domain: serviceb.localhost  # 子域名
```

**Hosts 文件配置：**

```
127.0.0.1 servicea.localhost
127.0.0.1 serviceb.localhost
```

### 方案三：自定义Cookie序列化器（高级用法）

```java
@Configuration
public class SessionConfig {
    @Bean
    public DefaultCookieSerializer cookieSerializer() {
        DefaultCookieSerializer serializer = new DefaultCookieSerializer();
        // 动态设置域名
        serializer.setDomainName("${spring.application.name}.localhost");
        // 或动态设置路径
        serializer.setCookiePath("/api/" + "${spring.application.name}");
        return serializer;
    }
}
```

### 方案四：差异化浏览器端路径配置（推荐混合环境使用）

```yml
# 服务A配置
server:
  servlet:
    context-path: /api  # 共享相同上下文路径
spring:
  session:
    cookie:
      path: /api/serviceA  # 独特的Cookie路径

# 服务B配置
server:
  servlet:
    context-path: /api
spring:
  session:
    cookie:
      path: /api/serviceB

```

> [!TIP]
>
> 其实 方案四 和 方案一 本质上相同，个人感觉方案一更推荐，因为 spring.session.cookie.path 默认等于
> server.servlet.context-path，而如果使用方案四，在实际后端接口实现时，每个接口必须单独添加上 /servicex 的路径前缀，不如直接在
> server.servlet.context-path 统一配置，也就是方案一了

## 四、验证方法

### 1. 使用 curl 验证

```bash
# 请求服务A
curl -v http://localhost:8080/api/serviceA/test
# 验证返回头：
# Set-Cookie: JSESSIONID=...; Path=/api/serviceA

# 请求服务B
curl -v http://localhost:8081/api/serviceB/test
# 验证返回头：
# Set-Cookie: JSESSIONID=...; Path=/api/serviceB
```

### 2. 浏览器开发者工具验证

1. 打开开发者工具（F12）
2. 转到 Application 标签
3. 在 Storage -> Cookies 中检查：
    - Cookie路径是否唯一
    - 域名是否符合预期

## 五、最佳实践

### 1. 微服务架构方案

```yaml
# 网关统一配置
spring:
  cloud:
    gateway:
      globalcors:
        cors-configurations:
          '[/api/**]':
            allowed-origins: "http://servicea.localhost", "http://serviceb.localhost"
```

### 2. 本地开发优化配置

```yaml
# application.yml
spring:
  session:
    cookie:
      domain: dev.localhost  # 统一开发域名
      path: /${spring.application.name}  # 应用路径，浏览器仅在访问该路径时发送 Cookie
```

### 3. 生产环境建议

```yaml
# 生产配置示例
spring:
  session:
    cookie:
      domain: yourdomain.com  # 主域名
      path: /${spring.application.name}  # 应用路径，浏览器仅在访问该路径时发送 Cookie
      secure: true  # 仅HTTPS传输
      http-only: true  # 防止XSS攻击
```

## 六、注意事项

1. 跨域请求需要配置CORS策略
2. 使用Redis集群时需配置不同namespace：

```yaml
spring:
  session:
    redis:
      namespace: "mm:session:${spring.application.name}"
```

3. 服务注册时建议使用元数据区分：

```yaml
spring:
  cloud:
    kubernetes:
      discovery:
        metadata:
          session-path: /api/${spring.application.name}
```

通过以上配置方案，可有效解决多服务部署下的会话隔离问题，建议开发环境优先采用方案一，测试/生产环境采用方案二或三。