---
icon: b fa-simplybuilt
category: 天天笔记
time: 2021-12-09
sidebar: auto
tag:
  - TCP
  - 计网
---

# TCP 握手

> 链接：[https://www.nowcoder.com/questionTerminal/ec843c8a27c84a7693865f55a71a7e8c](https://www.nowcoder.com/questionTerminal/ec843c8a27c84a7693865f55a71a7e8c)
>
> 来源：牛客网


**三次握手的最主要目的是保证连接是双工的，可靠更多的是通过重传机制来保证的。**  

​      但是为什么一定要进行三次握手来保证连接是双工的呢，一次不行么？两次不行么？我们举一个现实生活中两个人进行语言沟通的例子来模拟三次握手。 

​      **第一次对话：**  

​    老婆让甲出去打酱油，半路碰到一个朋友乙，甲问了一句：哥们你吃饭了么？ 

  结果乙带着耳机听歌呢，根本没听到，没反应。甲心里想：跟你说话也没个音，不跟你说了，沟通失败。说明乙接受不到甲传过来的信息的情况下沟通肯定是失败的。 

  如果乙听到了甲说的话，那么第一次对话成功，接下来进行第二次对话。 

​      **第二次对话：**  

​     乙听到了甲说的话，但是他是老外，中文不好，不知道甲说的啥意思也不知道怎样回答，于是随便回答了一句学过的中文  ：我去厕所了。甲一听立刻笑喷了，“去厕所吃饭”?道不同不相为谋，离你远点吧，沟通失败。说明乙无法做出正确应答的情况下沟通失败。 

  如果乙听到了甲的话，做出了正确的应答，并且还进行了反问：我吃饭了，你呢？那么第二次握手成功。 

  **通过前两次对话证明了乙能够听懂甲说的话，并且能做出正确的应答。**接下来进行第三次对话。 

​      **第三次对话：**  

  甲刚和乙打了个招呼，突然老婆喊他，“你个死鬼，打个酱油咋这么半天，看我回家咋收拾你”，甲是个妻管严，听完吓得二话不说就跑回家了，把乙自己晾那了。乙心想：这什么人啊，得，我也回家吧，沟通失败。说明甲无法做出应答的情况下沟通失败。 

  如果甲也做出了正确的应答：我也吃了。那么第三次对话成功，两人已经建立起了顺畅的沟通渠道，接下来开始持续的聊天。 

  **通过第二次和第三次的对话证明了甲能够听懂乙说的话，并且能做出正确的应答。**

  可见，两个人进行有效的语言沟通，这三次对话的过程是必须的。 

  同理对于TCP为什么需要进行三次握手我们可以一样的理解： 

​            **为了保证服务端能收接受到客户端的信息并能做出正确的应答而进行前两次(第一次和第二次)握手，为了保证客户端能够接收到服务端的信息并能做出正确的应答而进行后两次(第二次和第三次)握手。**



## 为什么四报文挥手客户端发完ACK后需要有2MSL的TIME-WAIT

`MSL` 是 Maximum Segment Lifetime，**报文最大生存时间**，它是任何报文在网络上存在的最长时间，超过这个时间报文将被丢弃。因为 TCP 报文基于是 IP 协议的，而 IP 头中有一个 `TTL` 字段，是 IP 数据报可以经过的最大路由数，每经过一个处理他的[路由器](https://www.zhihu.com/search?q=路由器&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2005038284})此值就减 1，当此值为 0 则数据报将被丢弃，同时发送 ICMP 报文通知源主机。

MSL 与 TTL 的区别： MSL 的单位是时间，而 TTL 是经过路由跳数。所以 **MSL 应该要大于等于 TTL 消耗为 0 的时间**，以确保报文已被自然消亡。

2MSL 的时间是从**[客户端](https://www.zhihu.com/search?q=客户端&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2005038284})接收到 FIN 后发送 ACK 开始计时的**。如果在 TIME-WAIT 时间内，因为客户端的 ACK 没有传输到服务端，客户端又接收到了服务端重发的 FIN 报文，那么 **2MSL 时间将重新计时**。

下面我们开始分析为什么在发送了最后一个ACK报文之后需要等待2MSL时长来确保没有任何属于当前连接的报文还存活于网络之中（前提是在这2MSL时间内不再收到对方的FIN报文，但即使收到了对端的FIN报文也并不影响我们的讨论，因为如果收到FIN则会回复ACK并重新计时）。

为了便于描述，我们设想有一个处于断开过程中的TCP连接，这个连接的两端分别是A和B，其中A是主动关闭连接的一端，因为刚刚向对端发送了针对对端发送过来的FIN报文的ACK，此时正处于TIME_WAIT状态；而B是被动关闭的一端，此时正处于LAST_ACK状态，在收到最后一个ACK之前它会一直重传FIN报文直至超时。随着时间的流逝，A发送给B的ACK报文将会有两种结局：

1. ACK报文在网络中丢失；如前所述，这种情况我们不需要考虑，因为除非多次重传失败，否则AB两端的状态不会发生变化直至某一个ACK不再丢失。
2. ACK报文被B接收到。我们假设A发送了ACK报文后过了一段时间t之后B才收到该ACK，则有 0 < t <= MSL。因为A并不知道它发送出去的ACK要多久对方才能收到，所以A至少要维持MSL时长的TIME_WAIT状态才能保证它的ACK从网络中消失。同时处于LAST_ACK状态的B因为收到了ACK，所以它直接就进入了CLOSED状态，而不会向网络发送任何报文。所以晃眼一看，A只需要等待1个MSL就够了，但仔细想一下其实1个MSL是不行的，因为在B收到ACK前的一刹那，B可能因为没收到ACK而重传了一个FIN报文，这个FIN报文要从网络中消失最多还需要一个MSL时长，所以A还需要多等一个MSL。

综上所述，**TIME_WAIT至少需要持续2MSL时长，这2个MSL中的第一个MSL是为了等自己发出去的最后一个ACK从网络中消失，而第二MSL是为了等在对端收到ACK之前的一刹那可能重传的FIN报文从网络中消失。**

可以看到 **2MSL时长** 这其实是相当于**至少允许报文丢失一次**。比如，若 ACK 在一个 MSL 内丢失，这样被动方重发的 FIN 会在第 2 个 MSL 内到达，TIME_WAIT 状态的连接可以应对。

为什么不是 4 或者 8 MSL 的时长呢？你可以想象一个丢包率达到百分之一的糟糕网络，连续两次丢包的概率只有万分之一，这个概率实在是太小了，忽略它比解决它更具性价比。

在 Linux 系统里 `2MSL` 默认是 `60` 秒，那么一个 `MSL` 也就是 `30` 秒。**Linux 系统停留在 TIME_WAIT 的时间为固定的 60 秒**。

其定义在 Linux 内核代码里的名称为 TCP_TIMEWAIT_LEN：

```text
#define TCP_TIMEWAIT_LEN (60*HZ) /* how long to wait to destroy TIME-WAIT 
                                    state, about 60 seconds  */
```

如果要修改 TIME_WAIT 的时间长度，只能修改 Linux [内核](https://www.zhihu.com/search?q=内核&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2005038284})代码里 TCP_TIMEWAIT_LEN 的值，并重新编译 Linux 内核。

> “ 为什么需要 TIME_WAIT 状态？”

主动发起关闭连接的一方，才会有 `TIME-WAIT` 状态。

需要 TIME-WAIT 状态，主要是两个原因：

- 防止具有相同「四元组」的「旧」数据包被收到；
- 保证「[被动关闭连接](https://www.zhihu.com/search?q=被动关闭连接&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2005038284})」的一方能被正确的关闭，即保证最后的 ACK 能让被动关闭方接收，从而帮助其正常关闭；

*原因一：防止旧连接的数据包*

假设 TIME-WAIT 没有等待时间或时间过短，被延迟的数据包抵达后会发生什么呢？

![img](https://gitee.com/yzketx/image-markdown/raw/master/img/202112091645763.jpeg)

> yzk：这里第4次  FIN 应当是 0

- 如上图黄色框框[服务端](https://www.zhihu.com/search?q=服务端&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2005038284})在关闭连接之前发送的 `SEQ = 301` 报文，被网络延迟了。
- 这时有相同[端口](https://www.zhihu.com/search?q=端口&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2005038284})的 TCP 连接被复用后，被延迟的 `SEQ = 301` 抵达了客户端，那么客户端是有可能正常接收这个过期的报文，这就会产生[数据错乱](https://www.zhihu.com/search?q=数据错乱&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2005038284})等严重的问题。

所以，TCP 就设计出了这么一个机制，经过 `2MSL` 这个时间，**足以让两个方向上的数据包都被丢弃，使得原来连接的数据包在网络中都自然消失，再出现的数据包一定都是新建立连接所产生的。**

*原因二：保证连接正确关闭*

在 RFC 793 指出 [TIME-WAIT](https://www.zhihu.com/search?q=TIME-WAIT&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2005038284}) 另一个重要的作用是：

*TIME-WAIT - represents waiting for enough time to pass to be sure the remote TCP received the acknowledgment of its connection termination request.*

也就是说，TIME-WAIT 作用是**等待足够的时间以确保最后的 ACK 能让被动关闭方接收，从而帮助其正常关闭。**

假设 TIME-WAIT 没有等待时间或时间过短，[断开连接](https://www.zhihu.com/search?q=断开连接&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2005038284})会造成什么问题呢？

![img](https://pic1.zhimg.com/80/v2-6a44dd001ef2ece18297121c90305861_720w.jpg?source=1940ef5c)

- 如上图红色框框客户端四次挥手的最后一个 `ACK` 报文如果在网络中被丢失了，此时如果客户端 `TIME-WAIT` 过短或没有，则就直接进入了 `CLOSED` 状态了，那么服务端则会一直处在 `LASE_ACK` 状态。
- 当客户端发起建立连接的 `SYN` 请求报文后，服务端会发送 `RST` 报文给客户端，连接建立的过程就会被终止。

如果 TIME-WAIT 等待足够长的情况就会遇到两种情况：

- 服务端正常收到四次挥手的最后一个 `ACK` 报文，则服务端正常关闭连接。
- 服务端没有收到四次挥手的最后一个 `ACK` 报文时，则会重发 `FIN` 关闭连接报文并等待新的 `ACK` 报文。

所以客户端在 `TIME-WAIT` 状态等待 `2MSL` 时间后，就可以**保证双方的连接都可以正常的关闭。**