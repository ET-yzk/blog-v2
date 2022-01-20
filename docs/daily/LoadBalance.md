---
icon: b fa-simplybuilt
category: 天天笔记
time: 2021-12-19
sidebar: auto
tag:
  - LoadBalance
---

# 负载均衡分类

>  Nginx 与 SpringCloud 的 Ribbon 对比：
> - Nginx 做的是客户端范围访问请求的负载均衡，负责将客户端请求代理转发给服务器。
> - Ribbon 做的是 SpringCloud 内部微服务之间访问的负载均衡，该请求源自 完成某用户请求而需要调用的内部微服务。

## 客户端负载均衡器

 在SpringCloud中Ribbon负载均衡客户端，会从eureka注册中心服务器端上获取服务注册信息列表，缓存到本地。

让后在本地实现轮训负载均衡策略。

### Ribbon与Nginx区别

#### 1.服务器端负载均衡Nginx

 nginx是客户端所有请求统一交给nginx，由nginx进行实现负载均衡请求转发，属于服务器端负载均衡。

 既请求有nginx服务器端进行转发。

#### 2.客户端负载均衡Ribbon

 Ribbon是从eureka注册中心服务器端上获取服务注册信息列表，缓存到本地，让后在本地实现轮训负载均衡策略。

 既在客户端实现负载均衡。

####  应用场景的区别：

Nginx适合于服务器端实现负载均衡 比如Tomcat ，Ribbon适合与在微服务中RPC远程调用实现本地服务负载均衡，比如Dubbo、SpringCloud中都是采用本地负载均衡。

Ribbon是Spring Cloud （本地）客户端负载均衡器