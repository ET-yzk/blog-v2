---
icon: b fa-simplybuilt
category: 未知分类
date: 2021-10-04
sidebar: auto
tag:
  - Aliyun
---

# 阿里云轻量服务器自定义服务

## 关闭原有服务

应用程序安装信息：

![image-20211014212132625](https://gitee.com/yzketx/image-markdown/raw/master/img/202110142121753.png)

```bash
# 停止 Apache Web Service
/usr/local/apache/bin/apachectl stop
# 停止 Mysql DB Service
sudo service mysql stop
```

关闭以上服务后，服务器80端口将被空出，可用于个人服务。

