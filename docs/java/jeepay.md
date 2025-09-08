---
icon: simplybuilt
category: 天天笔记
date: 2025-04-18
---

# Jeepay 聚合支付项目二次开发

> 记一次耗时 7 天的独立完成的聚合支付项目需求分析、调研、全栈开发、调试及部署过程，原项目详见[Jeepay](https://github.com/jeequan/jeepay)
> 
> 二次开发项目见：[ET-yzk / jeepay](https://github.com/ET-yzk/jeepay)
> 
> 部署项目见：[https://merchant.yzketx.online](https://merchant.yzketx.online)
> 
> 主要修改点：[https://merchant.yzketx.online/prefilledOrder/publicPay](https://merchant.yzketx.online/prefilledOrder/publicPay)

## 需求背景

曹老板需要筹办一场面向多方的产学会议，会议要求参与方缴费。此前使用的个人基础收款方式（如支付宝收款码）仅支持非信用类收款（如花呗、信用卡支付不可用），无法满足当前需求，因此需要一个更加完善的支付解决方案。

## 核心需求分析

1. 多种支付方式支持
   支付宝支付：需要支持支付宝的各种支付方式，包括花呗等信用支付
   微信支付：支持微信扫码支付、公众号支付等多种微信支付方式
   银行卡支付：支持各类银行卡的直接支付
   信用卡支付：需要明确支持各类信用卡支付

   需要统一的入口，支持静态二维码

2. 发票信息收集
   需要为需要开具发票的用户提供信息收集功能
   这可能包括：发票抬头、税号、邮箱等信息
   可能需要区分个人发票和企业发票

3. 支付情况管理
   需要管理用户的支付情况，包括订单状态、支付金额、支付时间、支付渠道等信息
   方便统计用户信息，便于了解到场人员信息等
   需要方便退回金额

## 项目调研

由于该需求实现只有短短 3 天时间，完全自己从头开发是不现实的，因此我的目标很明确：借助现成的开源项目，进行二次开发。
在综合了项目的需求适配程度、社区活跃度、文档、开发难度等多维度，认为 [Jeepay](https://github.com/jeequan/jeepay) 是目前的最佳选择。

## 项目部署

项目最终使用 docker 部署在了阿里云上的ECS服务器上，我在改造了官方 dockerfile 后，使用 docker-compose 进行部署。
遇到的一个头疼的问题是，老板给的服务器配置只有 2 核心，2G 内存，远低于官方推荐的 4 核心，16G 内存，因此我只能尝试降低软件的运行占用：

1. JeePay 项目使用 SpringBoot 框架，包含多个服务：
   - manager 运营平台服务端
   - merchant 商户系统服务端
   - payment 支付网关

   包含多个服务支持：
    - mysql
    - redis
    - mq
    - nginx

2. 首先将宝塔面板关闭

3. 通过观察 docker 容器占用，发现大头主要是 3 个 Java Server 和 mysql，其次是 mq，最后是 redis 和 nginx

4. 其中，manager 服务主要用于运营端，管理商户，对我们用处不大，因此可以直接停掉

5. 结合实际需求，考虑到我们的并发要求不是那么高，对 JVM 和 docker 等进行内存占用优化

6. 在多次调整配置后，终于可以在较低内存占用的情况下保障服务正常运行，配置调整如下：

    ```yml
    # 示例，主要设置了 mem_limit、env_file
    jeepay-merchant:
        mem_limit: 512m
        env_file:
    		- dev.jvm.conf
    ```

    ```ini
    # dev.jvm.conf
    # 覆盖应用程序的属性
    SERVER_TOMCAT_ACCEPT_COUNT=20
    SERVER_TOMCAT_MAX_CONNECTIONS=20
    SERVER_TOMCAT_THREADS_MAX=50
    SERVER_TOMCAT_THREADS_MIN_SPARE=5
    #SPRING_MAIN_LAZY_INITIALIZATION=true
    
    # 设置JVM参数
    #JAVA_TOOL_OPTIONS=-XX:+UseSerialGC -Xss512k -XX:MaxRAM=200m
    JAVA_TOOL_OPTIONS=-Xss768k -XX:MaxRAM=256m
    ```

7. 最终效果：

    <img src="https://raw.githubusercontent.com/ET-yzk/picgo/blog/image-20250905011936340.png" alt="jeepay 服务占用" style="zoom: 33%;"/>

    ~~可以说在爆炸边缘疯狂试探~~

## 项目呈现

1. 预填订单列表页（管理员）

   ![预填订单列表页](https://raw.githubusercontent.com/ET-yzk/picgo/blog/image-20250905013645256.png)

2. 预填订单详情页（管理员）

   ![预填订单详情页](https://raw.githubusercontent.com/ET-yzk/picgo/blog/image-20250905013701251.png)

3. 预填订单新建页（管理员）

   ![预填订单新建页](https://raw.githubusercontent.com/ET-yzk/picgo/blog/image-20250905013743470.png)

4. 预填订单功能项（管理员）

   ![预填订单功能项](https://raw.githubusercontent.com/ET-yzk/picgo/blog/image-20250905013848679.png)

   生成交易二维码

   ![生成交易二维码](https://raw.githubusercontent.com/ET-yzk/picgo/blog/image-20250905013908029.png)

   根据预填订单直接跳转对应的订单管理

   ![跳转订单管理](https://raw.githubusercontent.com/ET-yzk/picgo/blog/image-20250905013924235.png)

5. 预填订单公开页（公开）

   ![预填订单公开页](https://raw.githubusercontent.com/ET-yzk/picgo/blog/image-20250905014115970.png)

6. 预填订单下单页（公开）

   ![订单详情](https://raw.githubusercontent.com/ET-yzk/picgo/blog/image-20250905014145515.png)

   ![订单备注](https://raw.githubusercontent.com/ET-yzk/picgo/blog/image-20250905014156053.png)

   ![选择支付方式](https://raw.githubusercontent.com/ET-yzk/picgo/blog/image-20250905014228787.png)

   ![进行支付](https://raw.githubusercontent.com/ET-yzk/picgo/blog/image-20250905014239157.png)

## 有意思的点

### Sign加密及校验

xxx

### WebSocket

xxx

## 未来改进

此次的开发部署可以说是应急产物，xxx

## TODO

