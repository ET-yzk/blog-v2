---
icon: b fa-simplybuilt
category: 踩坑指南
time: 2021-10-11
sidebar: auto
tag:
  - Microsoft
  - Tools
---

# Microsoft拼音卡顿问题

**PS：**`在Microsoft拼音卡到无法使用后，使用了一段时间的搜狗输入法，还是怀念Microsoft拼音的设计，于是决定解决其卡顿问题。以下解决方案来自 知乎用户`

------

### 会导致个人输入习惯丢失，不介意推荐使用该方法

> by [Liekong](https://www.zhihu.com/people/wang-wen-long-18-61) 浑浑噩噩、东跑西奔

找到自己的输入法的本地词库及配置文件目录，

```bash
C:\Users\用户名\AppData\Roaming\Microsoft\InputMethod\Chs;
```


将整个Chs文件夹删除重启即可。如果遇到文件占用等问题可以使用专门的工具或者用U盘启动到WinPE下删除。

个人估计是用户的输入法配置文件由于各种原因出现了错误或损坏导致的，只好直接删除让输入法重新建一个了。另外删除后应该会删掉用户个人的词频调整配置。

---

> by [RickyWong](https://www.zhihu.com/people/ricky_wong) 鹅厂码农，搬砖大师，不务正业程序员

微软拼音卡顿的原因主要有以下四个

1. **后台云计算**；云计算需要联微软的服务器，会有几十上百ping的延迟，快速输入时感觉很明显。

2. **自定义词库**；微软的优化不太好，字库越多查询速度越慢

3. **多核调度**；输入法进程频繁在不同CPU之间切换，导致进程响应慢

4. **进程优先级低**；这一点其实也可以归纳在3中。

   

下面介绍解决方案，按照下图设置后就基本不会出现卡顿的情况了

1、**关闭后台云计算**

<img src="https://gitee.com/yzketx/image-markdown/raw/master/img/202110131646805.png" alt="image-20211013164604373" style="zoom:80%;" />

2、**减少专业词典个数**

<img src="https://gitee.com/yzketx/image-markdown/raw/master/img/202110131650557.png" alt="image-20211013165009324" style="zoom:80%;" />

3、**设置进程亲和性**，绑定ChsIME.exe 至固定cpu，避免在内核之间频繁切换

<img src="https://gitee.com/yzketx/image-markdown/raw/master/img/202110112036087.jpeg" alt="img" style="zoom: 67%;" />

4、**设置进程优先级**

<img src="https://gitee.com/yzketx/image-markdown/raw/master/img/202110112035720.jpeg" alt="img" style="zoom:67%;" />
