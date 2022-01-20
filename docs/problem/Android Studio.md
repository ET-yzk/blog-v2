---
icon: b fa-simplybuilt
category: 踩坑指南
time: 2021-11-12
sidebar: auto
tag:
  - Android
  - Tools
---

# Android Studio :)

## Could not install Gradle distribution

> Could not install Gradle distribution from 'https://services.gradle.org/distributions/gradle-x.x.x-all.zip'.

![image-20211112094956838](https://gitee.com/yzketx/image-markdown/raw/master/img/202111121001862.png)

### 解决

通过链接下载文件，直接将压缩包移至本地 `.gradle\wrapper\dists\gradle-x.x-bin/all\随机码` 目录。

示例目录: `C:\Users\15817\.gradle\wrapper\dists\gradle-5.6.4-all\ankdp27end7byghfw1q2sw75f`

