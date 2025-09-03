# SpringBoot 中关于 /error 到处理

在 Spring Boot 应用中，当某些错误或特定情况发生时，请求会被转发或重定向到 `/error` 路径，然后由注册到该路径的 `ErrorController` (例如Spring Boot默认的 `BasicErrorController` 或自定义的 `MateMatchErrorController`) 来处理。

以下是几种常见的会导致请求到达 `/error` 路径的情况：

1. **未被捕获的异常 (Unhandled Exceptions)**：
   - 如果在请求处理过程中（例如在Controller方法、Service方法、Filter、Interceptor中）抛出了一个异常，并且这个异常**没有被任何 `@ExceptionHandler` (在 `@ControllerAdvice` 中或Controller内部) 捕获和处理**，那么Servlet容器的默认错误处理机制会介入。
   - Spring Boot 的 `ErrorMvcAutoConfiguration` 会配置错误页面功能，默认情况下，这些未处理的异常会导致请求被**转发**到 `/error` 路径。此时，`jakarta.servlet.error.exception`、`jakarta.servlet.error.status_code` (通常为500) 等属性会被设置在请求中。
2. **显式调用 `HttpServletResponse.sendError()`**：
   - 如果代码中（例如在一个Servlet Filter或Controller中，尽管Controller中不推荐直接用这个来处理业务错误）显式调用了 `response.sendError(int statusCode, String message)` 或 `response.sendError(int statusCode)`，容器会生成一个对应状态码的错误响应。
   - Spring Boot 会拦截这个过程，并将请求**转发**到 `/error` 路径，同时设置 `jakarta.servlet.error.status_code` 和 `jakarta.servlet.error.message` 等属性。
3. **404 路径未找到 (当 `NoHandlerFoundException` 未被 `@ControllerAdvice` 处理时)**：
   - **情况一**：如果您在 `application.properties` 中设置了 `spring.mvc.throw-exception-if-no-handler-found=true`，当DispatcherServlet找不到请求的处理器时，会抛出 `NoHandlerFoundException`。如果这个异常**没有被您的 `@ControllerAdvice` 中的 `@ExceptionHandler(NoHandlerFoundException.class)` 捕获处理**，那么它会作为未处理异常，最终导致请求被转发到 `/error` (通常此时状态码是404，由Spring Boot的默认异常处理机制或 `BasicErrorController` 处理)。
   - **情况二**：如果您**没有**设置 `spring.mvc.throw-exception-if-no-handler-found=true` (即其值为 `false`，这是Spring Boot 2.x之前的默认值，或您显式设置了)，当DispatcherServlet找不到处理器时，它**不会**抛出 `NoHandlerFoundException`。相反，它会设置HTTP响应状态为404，然后请求会被Servlet容器的错误分发机制**转发**到为404状态码配置的错误页面，在Spring Boot中这通常就是 `/error` 路径。
4. **其他HTTP错误状态码**：
   - 当应用内部逻辑判定需要返回一个特定的HTTP错误状态码（例如400 Bad Request, 401 Unauthorized, 403 Forbidden 等），并且这些状态码是通过 `response.setStatus()` 后没有正确处理响应体，或者通过 `response.sendError()` 发送时，最终也可能导致请求被转发到 `/error` 路径进行统一处理。
5. **容器层面或非常早期的错误**：
   - 如果错误发生在请求处理的非常早期阶段（例如，在某些Servlet Filter中，甚至在 `DispatcherServlet`完全接管之前），或者因为某些原因 `DispatcherServlet` 无法通过其自身的异常解析器优雅处理，Servlet容器可能会直接将请求转发到在 `web.xml` (传统方式) 或通过Java配置 (Spring Boot方式) 中定义的全局错误处理路径，这个路径在Spring Boot中默认就是 `/error`。
6. **直接访问 `/error` 路径 (用户或客户端直接请求)**：
   - 正如您之前的问题所讨论的，客户端也可以直接向 `/error` URL发送请求。这种情况下，`HttpServletRequest` 的 `DispatcherType` 通常是 `REQUEST`，并且不会包含 `jakarta.servlet.error.*` 系列的属性（或者这些属性为null）。您的自定义 `ErrorController` 需要能够区分这种情况和真正的错误转发。

**总结一下，`ErrorController` (如您自定义的 `MateMatchErrorController`) 在 `/error` 路径上主要处理的是：**

- 由应用内部未捕获的异常导致的错误转发。
- 通过 `response.sendError()` 触发的错误转发。
- 在特定配置下，由路径未找到 (404) 导致的错误转发。
- 其他需要由容器进行标准错误页面处理的HTTP错误状态。

您的 `ErrorController` 通过检查请求中的 `jakarta.servlet.error.status_code`, `jakarta.servlet.error.message`, `jakarta.servlet.error.exception` 等属性来获取原始错误的信息，并据此生成统一的错误响应。