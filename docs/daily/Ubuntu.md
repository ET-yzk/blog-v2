---
icon: b fa-simplybuilt
category: 天天笔记
date: 2020-01-15

tag:
  - Ubuntu
---

# Ubuntu

## Ubuntu crontab 自动任务配置

> 对于可能涉及的脚本文件、代码源文件，其中所有需要用到的文件路径请使用 **绝对路径** ！！！

```bash
# 对当前用户设定crontab执行文件，格式: [* * * * * command]
crontab -e
# 查看当前用户设定的任务
crontab -l
# 以root权限在 /etc/crontab 下修改，格式: * * * * * 用户名 command
vim /etc/crontab
```

## 默认开启或关闭图形化桌面

```bash
# 关闭用户图形界面，使用tty登录。

sudo systemctl set-default multi-user.target
sudo reboot

# 开启用户图形界面。

sudo systemctl set-default graphical.target
sudo reboot
```

