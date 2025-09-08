---
icon: icon-park-outline:bydesign
author:
  name: yupi
  url: https://github.com/yupi
---

# 多种设计模式的组合应用

> 本文主要介绍如何使用多种设计模式组合，实现更灵活、更易扩展的系统结构。
> 
> 更多详见：[保姆级 23 种设计模式教程 - 编程导航](https://www.codefather.cn/course/1930517607799193602/section/1930522090147020802?contentType=text&tabKey=info)

## 为什么要组合使用设计模式

很多人学设计模式的时候，最开始是一个个单独学的。比如：学了策略模式、学了单例模式、又学了观察者模式。但你会发现，实际写业务代码的时候，光靠一个模式，很多时候根本解决不了问题。虽然每个设计模式都有明确的使用场景和目的，但在真实项目中，业务逻辑往往是多方面交织的，职责也不是单一维度的。比如，我们需要做一个电商系统，搞一个"限时满减 + 会员折扣 + 积分抵扣"的促销逻辑。这能靠一个策略模式就搞定吗？不行，你可能需要下面几种设计模式：

- 策略模式，动态切换不同的优惠算法
- 责任链模式，叠加多个促销规则
- 模板模式，定义订单流程处理的框架
- 状态模式，处理订单状态流转
- 工厂模式，根据配置动态创建促销组合

这时候就要多个模式配合起来，一起组合处理，才能应对复杂场景。

## 组合使用设计模式的优势

### 1）职责更清晰，系统更容易扩展

每个设计模式关注的点不一样，有的处理创建逻辑，有的处理行为封装。我们把它们组合起来用，可以让每个模块专注一件事。比如策略模式处理算法变化，工厂方法负责对象创建，两者结合后既灵活又解耦，后续要新增功能或者修改行为就比较容易。

### 2）结构更灵活，适应复杂业务

业务需求经常变，一开始可能只需要一个简单策略，后面要支持组合逻辑、配置切换、动态控制，这时候就不能只靠一个模式了。像策略模式配合装饰器模式、责任链模式一起用，就能让结构更有弹性，适应多种场景。

### 3）代码更清晰，便于团队协作

多个模式合理组合，会让系统结构更有规律。我们看代码时一眼就能判断出设计意图，维护起来也更轻松。而且团队内部使用统一的设计套路，有助于沟通协作，大家对整体架构的理解也会更一致。

### 4）符合面向对象设计原则

组合使用模式其实也是在落实面向对象的基本原则，比如开闭原则、单一职责、依赖倒置等等。它能帮我们构建出更健壮、更容易演进的系统结构。

## 常见设计模式组合类型

这里我们整理一下项目中比较常见的几种设计模式组合方式，这些组合在不少开源框架里也经常能见到，实用性比较强。

### 1）工厂模式 + 策略模式：灵活创建可切换的行为逻辑

这个组合场景非常常见，适合那种"有多个实现类，需要根据某种条件动态选择执行逻辑"的业务需求。

- 工厂模式负责根据入参选择并创建具体的策略实现
- 策略模式负责封装一类可以相互替换的行为逻辑

比如在一个支付系统中，我们可能需要根据不同的支付方式（微信、支付宝、银行卡）来调用不同的处理逻辑：

- 每个支付方式封装成一个策略实现类
- 工厂根据传入的支付类型（payType）返回对应的策略实例
- 客户端只负责调用策略暴露的统一接口，不需要关心内部实现

这个组合最大的好处是扩展性好，新增一个支付方式，只需要实现一个新的策略类，工厂只需增加相应注册逻辑即可，老代码基本无需修改。

### 2）模板方法模式 + 策略模式：固定流程 + 灵活步骤

这种组合适合我们要定义一个"标准化流程"，但流程中的某些步骤需要根据实际情况做不同处理的时候。

- 模板方法模式提供一个完整流程的框架，定义了多个步骤
- 策略模式则注入到其中某一个可变步骤中，用来支持灵活的处理逻辑

举个例子，电商系统中下单流程可以用模板方法定义大致步骤：

1. 参数校验
2. 运费计算
3. 优惠处理
4. 库存扣减
5. 订单入库

其中"优惠处理"这一步不同商品类型会有不同的策略，比如满减、折扣、积分兑换。我们就可以把这一步拆出去，使用策略模式实现不同的优惠计算方式。

这种组合结构清晰：流程固定但可扩展；具体业务逻辑灵活但受控。

### 3）责任链模式 + 策略模式：流程控制 + 规则灵活组合

这个组合常见于校验逻辑、审批流程、规则判断等场景。

- 责任链模式负责组织一组处理器，以链式结构串联处理流程
- 每个节点内部的处理逻辑可以由策略模式封装，实现对不同规则或业务判断的灵活切换

比如在订单系统中进行下单前的校验，责任链可以包含如下节点：

1. 地址校验
2. 商品状态校验
3. 优惠券合法性校验
4. 风控校验

这些节点之间顺序固定，但每个节点内部的逻辑，比如"风控校验"就可能因为渠道、商品类型不同而采用不同的策略。用策略模式封装判断逻辑，会让每个处理器更易扩展、更可配置。

### 4）装饰器模式 + 策略模式：动态扩展行为逻辑

这组模式适用于功能增强型的需求场景，尤其是在"基础功能不变"的前提下，按需组合扩展功能。

- 策略模式定义基本行为逻辑，比如某种处理算法
- 装饰器模式可以在策略的基础上，动态地添加附加功能，比如加日志、加权限校验、加缓存

举个例子，我们在做缓存层的设计时，策略模式用于定义不同的缓存更新策略（例如 LRU、FIFO、惰性更新等），然后用装饰器加上一层"缓存预热""缓存穿透保护"等功能模块。

这种结构可以让扩展功能和核心逻辑解耦，同时组合使用也更灵活。

### 5）外观模式 + 多种内部模式组合：封装复杂子系统

外观模式的核心作用是对外提供一个简化的接口，隐藏内部子系统的复杂性。它经常和多个设计模式组合使用，把内部模块各自封装起来，再统一由外观暴露统一入口。

比如我们要提供一个"快速下单"接口，底层其实要：

- 检查用户状态（责任链 + 策略）
- 创建订单（模板方法 + 工厂）
- 发送通知（观察者）

外观类把这些子系统串起来，客户端调用时只需要关心一个入口方法，内部的处理细节都被隔离掉了。

这种模式组合在微服务架构中也很常见，我们可以通过外观类统一封装多个微服务的调用逻辑，减少上层系统的复杂度。

### 6）观察者模式 + 状态模式：基于状态变化的事件通知

这种组合适合事件驱动类系统，或者有状态流转的流程。

- 状态模式负责封装状态转换逻辑，每种状态有不同的行为
- 观察者模式则在状态变化时发出通知，让相关模块做出响应

例如在审批流系统中，订单可能从"待审核"进入"审核中"，再到"审核通过"或"审核驳回"。我们可以用状态模式定义每个状态对应的处理逻辑，同时在状态变更时，通过观察者模式通知其他模块，比如：

- 通知用户
- 更新看板
- 异步写入日志

这种组合结构清晰、扩展性强，适合用在有状态流转和通知机制的场景中。

## 代码案例分析

我们以个订单下单系统为例，来实现组合使用设计模式。不同的订单可能有不同的折扣策略（比如满减、打折、积分抵扣），并且还希望根据用户类型灵活地选择折扣方式。为了让系统更具扩展性，我们使用策略模式来封装各种折扣逻辑，使用工厂方法来创建对应的折扣策略实例，再通过装饰器模式，对策略进行功能增强，比如增加日志、权限控制等附加功能，最后我们使用责任链模式来顺序叠加处理多个优惠。我们就用这四种设计模式来实现一个简单的订单系统。

### 1）定义折扣策略接口：用于统一各种折扣实现方式的抽象

```java
public interface DiscountStrategy {
    double applyDiscount(double originalPrice);
}
```

这段代码在设计模式中属于策略模式的核心接口，定义了策略的通用行为，便于后续动态替换不同的折扣实现。

### 2）实现具体策略类：满减策略、打折策略和积分抵扣策略

```java
// 满减策略
public class FullReductionStrategy implements DiscountStrategy {
    @Override
    public double applyDiscount(double originalPrice) {
        if (originalPrice >= 100) {
            System.out.println("【满减】满100减20，已减20");
            return originalPrice - 20;
        }
        return originalPrice;
    }
}

// 打折策略
public class PercentageOffStrategy implements DiscountStrategy {
    @Override
    public double applyDiscount(double originalPrice) {
        double discount = originalPrice * 0.1;
        System.out.println("【打折】打九折，已减：" + discount);
        return originalPrice - discount;
    }
}

// 积分抵扣策略
public class PointsDeductionStrategy implements DiscountStrategy {
    @Override
    public double applyDiscount(double originalPrice) {
        System.out.println("【积分抵扣】已减10");
        return originalPrice - 10;
    }
}
```

这些实现类在策略模式中作为具体策略类存在，每个类封装了一种折扣算法，后续可以灵活切换或组合使用。

### 3）定义一个日志装饰器，输入策略前后价格

```java
public class LoggingDiscountDecorator implements DiscountStrategy {
    private final DiscountStrategy delegate;

    public LoggingDiscountDecorator(DiscountStrategy delegate) {
        this.delegate = delegate;
    }

    @Override
    public double applyDiscount(double originalPrice) {
        System.out.println("【日志】执行策略前价格：" + originalPrice);
        double result = delegate.applyDiscount(originalPrice);
        System.out.println("【日志】执行策略后价格：" + result);
        return result;
    }
}
```

这段代码使用了工厂方法模式，用于封装策略对象的创建逻辑，屏蔽客户端对具体类的依赖，降低耦合。

### 4）定义责任链处理器接口：把每个策略作为一个责任节点封装

```java
public abstract class DiscountHandler {
    protected DiscountHandler next;

    public void setNext(DiscountHandler next) {
        this.next = next;
    }

    public double apply(double price) {
        double discounted = handle(price);
        if (next != null) {
            return next.apply(discounted);
        }
        return discounted;
    }

    protected abstract double handle(double price);
}
```

这是责任链模式的抽象处理器，封装责任链结构，支持将策略按顺序串联处理。

### 5）实现具体责任链节点：包装每个策略

```java
public class StrategyHandler extends DiscountHandler {
    private final DiscountStrategy strategy;

    public StrategyHandler(DiscountStrategy strategy) {
        this.strategy = strategy;
    }

    @Override
    protected double handle(double price) {
        return strategy.applyDiscount(price);
    }
}
```

每个 StrategyHandler 就是一个链条节点，内部封装一个策略对象，作为责任链模式的具体节点类。

### 6）策略工厂类：用于集中创建策略实例

```java
public class DiscountStrategyFactory {
    public static DiscountStrategy getStrategy(String type) {
        switch (type) {
            case "full":
                return new FullReductionStrategy();
            case "percent":
                return new PercentageOffStrategy();
            case "points":
                return new PointsDeductionStrategy();
            default:
                throw new IllegalArgumentException("未知的折扣类型: " + type);
        }
    }
}
```

这是工厂方法模式的实现，用来解耦客户端和策略对象的创建。

### 7）下单服务类：整合责任链 + 策略 + 装饰器 + 工厂

```java
import java.util.Arrays;
import java.util.List;

public class OrderService {
    public void placeOrder(double originalPrice, List<String> discountTypes) {
        // 构建责任链
        DiscountHandler head = null;
        DiscountHandler current = null;

        for (String type : discountTypes) {
            // 创建策略实例
            DiscountStrategy strategy = DiscountStrategyFactory.getStrategy(type);
            // 使用装饰器增强策略
            DiscountStrategy enhanced = new LoggingDiscountDecorator(strategy);
            // 封装成责任链节点
            StrategyHandler handler = new StrategyHandler(enhanced);

            if (head == null) {
                head = handler;
                current = handler;
            } else {
                current.setNext(handler);
                current = handler;
            }
        }

        System.out.println("原始价格：" + originalPrice);
        double finalPrice = head != null ? head.apply(originalPrice) : originalPrice;
        System.out.println("最终支付金额：" + finalPrice);
    }

    public static void main(String[] args) {
        OrderService service = new OrderService();
        service.placeOrder(150.0, Arrays.asList("full", "percent", "points"));
    }
}
```

在上面的代码中，我们整合了：

- 工厂创建策略
- 装饰器增强策略（日志）
- 策略封装进责任链节点
- 多个节点组成完整的责任链流程

输出：

```
原始价格：150.0
【日志】执行策略前价格：150.0
【满减】满100减20，已减20
【日志】执行策略后价格：130.0
【日志】执行策略前价格：130.0
【打折】打九折，已减：13.0
【日志】执行策略后价格：117.0
【日志】执行策略前价格：117.0
【积分抵扣】已减10
【日志】执行策略后价格：107.0
最终支付金额：107.0
```

## 开源框架内的组合使用

Spring 是经典的"设计模式集大成者"，内部大量组合使用了各种设计模式。我们在实际开发中接触到的很多 Spring 核心模块，比如 IOC 容器、AOP、事务管理、事件机制等等，背后往往不仅仅用到了某一个设计模式，而是多个模式协同配合，形成了高度灵活且可扩展的架构。

下面我们就来看看，Spring 中有哪些典型的组件，组合使用了多个设计模式：

### 1）IOC 容器初始化流程：模板方法 + 工厂方法 + 策略 + 责任链 + 观察者

Spring 的 IOC 容器在启动时，会经历一系列非常清晰但灵活的初始化步骤。这个流程由 AbstractApplicationContext 统一定义，核心的 refresh() 方法就采用了模板方法模式，将初始化的步骤固定下来，细节则交由子类去扩展。

在 Bean 的创建过程中，用到了工厂方法模式（比如通过 BeanFactory 和 FactoryBean 创建 Bean），还通过策略模式封装了多种实例化方式（默认反射、CGLIB 代理等），允许动态替换策略。

而在 Bean 初始化前后，Spring 会依次执行所有注册的 BeanPostProcessor，这本质上就是一个责任链模式，每个处理器都可以对 Bean 做增强或替换。

等容器初始化完成后，Spring 会发布 ContextRefreshedEvent 事件，通知所有监听器，这就是典型的观察者模式。

### 2）AOP 机制：代理模式 + 策略 + 责任链 + 装饰器

Spring AOP 的实现非常经典，核心依赖的是代理模式。默认使用 JDK 动态代理（接口）或 CGLIB 子类代理（类），这两种选择通过策略接口注入，属于策略模式的范畴。

在执行增强逻辑（advice）时，AOP 使用了一条责任链来串联多个增强方法（比如前置、后置、环绕等）。每个 advice 都实现了 MethodInterceptor 接口，组成一个 invocation chain。

此外，每个增强都是独立的逻辑，组合后一起包裹目标对象，整体表现类似装饰器模式，将横切逻辑动态叠加在核心功能之外。

### 3）事务管理：代理模式 + 策略模式 + 模板方法 + 观察者

Spring 的事务控制底层也是基于代理完成的。事务切面会被织入到代理链中，由事务拦截器进行增强，这里同样用到了代理模式。

不同事务管理器（如 JDBC、JPA、Hibernate）之间的调用逻辑是统一的，底层通过 PlatformTransactionManager 接口暴露了一致的操作接口，再由具体实现类完成事务处理，符合策略模式的设计。

而事务模板 TransactionTemplate 则是典型的模板方法模式，将 begin -> execute -> commit/rollback 的流程封装成模板，开发者只需要填充业务逻辑代码即可。

某些场景下，我们还可以通过事务同步管理器发布事件（比如事务完成后执行回调），这部分使用了观察者模式。

### 4）事件机制：观察者模式 + 策略模式 + 模板方法

Spring 的事件机制本身就是经典的观察者模式实现。ApplicationEventPublisher 是事件发布器，监听器实现 ApplicationListener 接口，容器启动时自动注册，事件一旦触发，所有监听器都会收到通知。

为了支持异步事件，Spring 提供了不同的事件广播策略，比如同步广播器、异步广播器等，这些由 ApplicationEventMulticaster 决定，使用了策略模式。

而事件广播流程是在容器刷新过程中完成注册的，放在 refresh() 模板方法中的一个步骤中，也体现了模板方法模式的特点。

### 5）资源加载机制：工厂方法 + 策略模式 + 模板方法

Spring 中的 ResourceLoader 接口允许我们以统一的方式加载各种类型的资源（classpath、文件系统、URL 等）。具体由不同的 Resource 实现类来完成资源解析逻辑，这里属于工厂方法模式的应用。

对于不同协议的资源解析器（如 ClasspathResource, FileSystemResource, UrlResource），Spring 提供了可插拔的解析策略，也是一种策略模式的体现。

整个加载流程由 AbstractApplicationContext 控制，也融入了模板方法模式。

### 6）MVC 请求处理流程：策略 + 模板方法 + 责任链 + 命令模式

Spring MVC 的核心 DispatcherServlet 就是一个前端控制器，它内部通过模板方法模式定义了请求处理的标准流程。

在处理请求时，会根据不同的 Handler 类型，使用不同的 HandlerAdapter 来适配，这部分是策略模式。而在请求进入之后，会依次经过多个拦截器（HandlerInterceptor），这是典型的责任链模式。

请求最终会交给一个 Handler 来处理，这个 Handler 通常是一个 Controller，执行某个具体的命令动作，本质上也体现了命令模式的结构。

## IOC 容器初始化多设计模式分析

### 源码分析

Spring IOC 容器的启动一共有四个阶段，分别是启动、Bean 定义注册、实例化和依赖注入、初始化。

### 1）启动阶段：

- 配置加载：加载配置文件或配置类，IoC 容器首先需要加载应用程序的配置信息，这些配置信息可以是 XML 配置文件、Java 配置类或注解配置等方式
- 创建容器：Spring 创建 IOC 容器（BeanFactory 、 ApplicationContext），准备加载和管理 Bean

### 2）Bean 定义注册阶段：

- 解析和注册：BeanDefinitionReader 读取解析配置中的 Bean 定义，并将其注册到容器中，形成 BeanDefinition 对象

### 3）实例化和依赖注入：

- 实例化：根据 BeanDefinition 创建 Bean 的实例
- 依赖注入：根据 BeanDefinition 中的依赖关系，可以通过构造函数注入、Setter 注入或字段注入，将依赖注入到 Bean 中

### 4）初始化：

- BeanPostProcessor 处理：这些处理器会在 Bean 初始化生命周期中加入定义的处理逻辑，postProcessBeforeInitialization 和 postProcessAfterInitialization 分别在 Bean 初始化前后被调用
- Aware 接口调用：如果 Bean 实现了 Aware 接口（如 BeanNameAware、BeanFactoryAware），Spring 会回调这些接口，传递容器相关信息
- 初始化方法调用：调用 Bean 的初始化方法（如通过 @PostConstruct 注解标注的方法，或实现 InitializingBean 接口的 bean 会被调用 afterPropertiesSet 方法）

上面这四步是详细的启动流程，我们一步步来看，在不同阶段，Spring 是怎么组合这些模式的。

### 1）工厂模式 + 模板方法模式：创建 IOC 容器

在这个阶段，我们可以重点看一下 AbstractApplicationContext#refresh() 方法。它是整个容器生命周期的启动入口，同时也是典型的模板方法模式实现。

```java
@Override
public void refresh() throws BeansException, IllegalStateException {
    synchronized (this.startupShutdownMonitor) {
        StartupStep contextRefresh = this.applicationStartup.start("spring.context.refresh");

        // 1. 准备刷新上下文（设置启动时间、状态标志、初始化环境属性等）
        prepareRefresh();

        // 2. 创建并刷新 BeanFactory（核心容器对象）
        ConfigurableListableBeanFactory beanFactory = obtainFreshBeanFactory();

        // 3. 设置 BeanFactory 的各种标准配置（ClassLoader、后处理器等）
        prepareBeanFactory(beanFactory);

        try {
            // 4. 子类扩展钩子：允许对 BeanFactory 做进一步处理
            postProcessBeanFactory(beanFactory);

            StartupStep beanPostProcess = this.applicationStartup.start("spring.context.beans.post-process");

            // 5. 调用 BeanFactoryPostProcessor（如 @Configuration 配置类处理等）
            invokeBeanFactoryPostProcessors(beanFactory);

            // 6. 注册 BeanPostProcessor（用于拦截 bean 的创建过程，如 @Autowired 注入等）
            registerBeanPostProcessors(beanFactory);
            beanPostProcess.end();

            // 7. 初始化国际化消息源（MessageSource）
            initMessageSource();

            // 8. 初始化事件广播器（ApplicationEventMulticaster）
            initApplicationEventMulticaster();

            // 9. 提供给子类自定义初始化（如 Web 环境中创建 DispatcherServlet）
            onRefresh();

            // 10. 注册事件监听器（ApplicationListener）
            registerListeners();

            // 11. 初始化剩余的非懒加载单例 Bean
            finishBeanFactoryInitialization(beanFactory);

            // 12. 广播 ContextRefreshedEvent 事件，标志刷新完成
            finishRefresh();
        }
        catch (BeansException ex) {
            if (logger.isWarnEnabled()) {
                logger.warn("Exception encountered during context initialization - " +
                        "cancelling refresh attempt: " + ex);
            }

            // 13. 出现异常时销毁已创建的单例 Bean，防止资源泄露
            destroyBeans();

            // 14. 重置上下文状态标志为未激活
            cancelRefresh(ex);

            // 15. 异常向上传递
            throw ex;
        }
        finally {
            // 16. 清理缓存，加快 GC，释放反射元数据
            resetCommonCaches();
            contextRefresh.end();
        }
    }
}
```

我们可以看到，整个容器的生命周期被 refresh() 方法划分成了多个标准化的步骤，这种固定流程 + 局部扩展点的设计，就是模板方法的典型用法。

而 obtainFreshBeanFactory() 方法中，实际创建 DefaultListableBeanFactory 实例，这里用到了工厂方法模式。Spring 将创建具体容器实现的细节交由子类决定，提升了灵活性。

### 2）策略模式：Bean 定义注册

这个阶段主要发生在 AbstractApplicationContext#refresh() 中的 obtainFreshBeanFactory()。这个方法里会去调用 loadBeanDefinitions()。这一步的目的是：读取我们写在 XML 文件里的 Bean 配置或者解析带注解的类，把这些配置解析成 BeanDefinition 对象，注册到 BeanFactory 中。不过，Spring 自己不直接去解析 XML或读取注解，而是把这个工作交给了一个专门的类，也就是BeanDefinitionReader 的不同实现（如 XmlBeanDefinitionReader、AnnotatedBeanDefinitionReader）对不同格式的配置进行解析，使用了典型的策略模式，统一接口 BeanDefinitionReader，提供了多种解析实现。

我们看下源码：

容器启动时调用 refresh() 方法：

```java
public void refresh() throws BeansException, IllegalStateException {
    // 忽略前面的准备工作...

    // 创建 BeanFactory 并加载 BeanDefinition
    obtainFreshBeanFactory(); // --> 这里会间接触发 BeanDefinitionReader 的使用
}
```

```java
protected ConfigurableListableBeanFactory obtainFreshBeanFactory() {
    // 创建（或刷新）内部 BeanFactory
    refreshBeanFactory();  
    // 返回 BeanFactory 给调用者使用
    return getBeanFactory();  
}
```

创建 BeanFactory 的时候会调用 loadBeanDefinitions() 方法：

```java
// 这个方法在 AbstractRefreshableApplicationContext 中定义：
protected final void refreshBeanFactory() throws BeansException {
    // 省略其他的...

    try {
        // 创建一个新的 DefaultListableBeanFactory 实例（Spring 的核心 Bean 容器）
        DefaultListableBeanFactory beanFactory = createBeanFactory();

       // 省略其他的...

        // 加载 Bean 定义（从 XML、注解、Groovy 等配置源中解析并注册 BeanDefinition）
        loadBeanDefinitions(beanFactory);

        // 将新创建的 BeanFactory 保存到当前上下文中
        this.beanFactory = beanFactory;
    }
    catch (IOException ex) {
        // 省略其他的...
    }
}
```

具体的 Bean 定义加载逻辑在子类中实现，然后在子类中调用对应的loadBeanDefinitions方法等。

常见的策略实现类有：

- XmlBeanDefinitionReader：用于读取 XML 文件中的 Bean 定义
- PropertiesBeanDefinitionReader：用于读取 .properties 文件格式的 Bean 配置
- GroovyBeanDefinitionReader：读取 Groovy 脚本中的 Bean 定义
- AnnotatedBeanDefinitionReader：用于基于注解的配置（比如 @Component、@Configuration），也就是 Java Config

### 3）策略模式 + 单例模式：实例化和注入

实例化和依赖注入阶段是 IOC 的核心，涉及的设计模式也非常丰富。

首先，Spring 创建 Bean 实例时，如果是 FactoryBean，会通过 getObject() 方法返回实例，这是典型的工厂方法模式。

```java
// 从bean工厂里获取对象实例
private Object doGetObjectFromFactoryBean(FactoryBean<?> factory, String beanName) throws BeanCreationException {
    Object object;
    try {
        // 如果启用了安全管理器，用特权动作执行 FactoryBean 的 getObject 方法
        if (System.getSecurityManager() != null) {
            // 省略部分代码...
        }
        else {
            // 工厂方法模式，直接调用 FactoryBean 的 getObject 方法创建对象
            object = factory.getObject();
        }
    }
    catch (FactoryBeanNotInitializedException ex) {
        // 省略部分代码...
    }
    catch (Throwable ex) {
        // 省略部分代码...
    }

    return object;
}
```

然后，在实例化过程中，Spring 支持构造器注入、Setter 注入、字段注入。这些注入策略由 InstantiationStrategy 接口封装，在不同场景下使用不同策略，比如 CglibSubclassingInstantiationStrategy或 SimpleInstantiationStrategy，这体现了策略模式的使用。

```java
// 初始化bean
protected BeanWrapper instantiateBean(String beanName, RootBeanDefinition mbd) {
    try {
        Object beanInstance;

        // 如果启用了 SecurityManager，用特权动作创建 Bean 实例
        if (System.getSecurityManager() != null) {
            // 省略部分代码...
        }
        else {
            // 策略模式，根据不同配置选择不同实例化策略
            beanInstance = getInstantiationStrategy().instantiate(mbd, beanName, this);
        }

        BeanWrapper bw = new BeanWrapperImpl(beanInstance);

        // 初始化 BeanWrapper，例如注册类型转换器
        initBeanWrapper(bw);

        return bw;
    }
    catch (Throwable ex) {
        // 省略部分代码...
    }
}
```

在创建 bean 的过程中，如果没有另外指定 scope，默认都是单例的：

```java
// org.springframework.beans.factory.support.DefaultSingletonBeanRegistry
public class DefaultSingletonBeanRegistry {
    private final Map<String, Object> singletonObjects = new ConcurrentHashMap<>(256);

    // 从单例对象集合里获取bean
    protected Object getSingleton(String beanName) {
        Object singletonObject = this.singletonObjects.get(beanName);
        // 其他逻辑
        return singletonObject;
    }

    protected void addSingleton(String beanName, Object singletonObject) {
       synchronized (this.singletonObjects) {
            this.singletonObjects.put(beanName, singletonObject);
            // 其他逻辑 
        }
    }
}
```

其中 singletonObjects 是一个 ConcurrentHashMap，维护着所有单例 Bean。

### 4）责任链 + 观察者 + 模板方法

Spring 在 Bean 初始化时，会触发一系列生命周期扩展点，比如执行 Aware 接口、初始化方法、自定义前置、后置处理器等。

这里的 BeanPostProcessor 就是典型的责任链模式，每个处理器都可以对 Bean 进行增强或替换，而且是依次调用、互不干扰。我们以后置处理器为例，在初始化 bean 之后，Spring 会遍历多个后置处理器和注入器，比如 AutowiredAnnotationBeanPostProcessor、CommonAnnotationBeanPostProcessor 等，它们共同参与注入逻辑。这种处理器链式调用的方式，本质上是一个责任链模式的结构。

```java
// 这是 Spring Bean 生命周期中的"初始化后处理"阶段。
public Object applyBeanPostProcessorsAfterInitialization(Object existingBean, String beanName)
        throws BeansException {

    // 初始化结果为原始 Bean
    Object result = existingBean;

    // 责任链模式，遍历所有已注册的 BeanPostProcessor
    for (BeanPostProcessor processor : getBeanPostProcessors()) {

        // 每个 processor 都可以对 bean 进行修改或增强
        Object current = processor.postProcessAfterInitialization(result, beanName);

        // 如果返回 null，跳出责任链，返回当前结果
        if (current == null) {
            return result;
        }

        // 继续传递处理结果到下一个 processor
        result = current;
    }

    // 返回处理链执行完后的最终 Bean
    return result;
}
```

而像 ApplicationListener 接口监听容器事件（如 ContextRefreshedEvent），就是标准的观察者模式。Spring 使用 ApplicationEventMulticaster 广播事件，所有注册监听器都会响应。

```java
protected void finishRefresh() {
    // 省略部分代码

    // 发布一个 ContextRefreshedEvent，通知所有 ApplicationListener 容器已刷新完毕
    // 使用观察者模式：监听器异步/同步响应这个事件
    publishEvent(new ContextRefreshedEvent(this));

    // 省略部分代码
}
```

Spring 在内部也使用了模板方法模式来定义初始化的流程，比如 AbstractAutowireCapableBeanFactory#initializeBean() 中包含了多步操作，每步又可以被子类或扩展点覆盖。

```java
/**
 * 初始化指定的 Bean，包括执行 Aware 接口回调、自定义初始化方法、以及 BeanPostProcessor 扩展点。
 */
protected Object initializeBean(String beanName, Object bean, @Nullable RootBeanDefinition mbd) {
    // 如果启用了安全管理器，则以特权方式执行 Aware 回调（避免安全限制）
    if (System.getSecurityManager() != null) {
        AccessController.doPrivileged((PrivilegedAction<Object>) () -> {
            // 回调实现了 xxxAware 接口的 bean，如 BeanNameAware、BeanFactoryAware 等
            invokeAwareMethods(beanName, bean);
            return null;
        }, getAccessControlContext());
    } else {
        // 正常执行 Aware 接口回调
        invokeAwareMethods(beanName, bean);
    }

    Object wrappedBean = bean;

    if (mbd == null || !mbd.isSynthetic()) {
        // 执行初始化前置处理器
        wrappedBean = applyBeanPostProcessorsBeforeInitialization(wrappedBean, beanName);
    }

    try {
        // 调用初始化方法
        invokeInitMethods(beanName, wrappedBean, mbd);
    } catch (Throwable ex) {
        throw new BeanCreationException(
                (mbd != null ? mbd.getResourceDescription() : null),
                beanName, "Invocation of init method failed", ex);
    }

    // 初始化完成后，再次执行后置处理器
    if (mbd == null || !mbd.isSynthetic()) {
        wrappedBean = applyBeanPostProcessorsAfterInitialization(wrappedBean, beanName);
    }

    // 返回最终初始化完成并可能被增强的 bean 实例
    return wrappedBean;
}
```

## 优势和作用

### 1）职责清晰，解耦合理

每种设计模式都被用在最合适的地方，比如模板方法负责控制流程、策略模式提供灵活扩展点，责任链让扩展逻辑解耦。这种组合设计，让 Spring 可以灵活支持各种配置方式和生命周期扩展。

### 2）增强可维护性与扩展性

多个设计模式协作，既统一了核心框架的规范性，又允许我们在不修改源码的前提下灵活扩展，比如添加自定义 BeanPostProcessor 或自定义事件监听器。

### 3）支持多种应用场景

通过组合使用设计模式，Spring 既能满足简单 Web 应用的需求，也能支撑复杂的企业级系统，体现出高度的通用性与灵活性。