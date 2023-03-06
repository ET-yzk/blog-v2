---
icon: b fa-simplybuilt
category: 天天笔记
date: 2022-02-08

tag:
  - Tools
---

# Docker - Docker Desktop(WSL2) 修改镜像等文件存储位置

## 背景

以WSL2方式使用 Docker Desktop for Windows 确实带来了更好的体验，但同时也带来新的问题。其中最典型的问题就是系统盘空间的占用越来越大，而且还有典型的内存问题。

## 说明
默认情况下，Docker Desktop for Window会创建如下两个发行版（distro）：

- docker-desktop

- docker-desktop-data

如果访问`%LOCALAPPDATA%/Docker/wsl`目录，就可以看到两个文件夹，同时每个文件夹中都会有一个vhdx文件。

`%LOCALAPPDATA%/Docker/wsl` 就是当前登录用户的`AppData\Local` 目录，假设当前登录的用户为Administrator，那么这个目录就是 `C:\User\Administrator\AppData\Local\Docker\wsl`

- data/ext4.vhdx 是被docker-desktop-data 发行版使用
- distro/ext4.vhdx 是被 docker-desktop 发行版使用

docker-desktop-data 是被用来存储 docker images 以及相关的数据。因此，它的大小会随着使用逐步增长，因此导致系统盘空间不足。

vhdx文件最大支持256G，超出这个大小将会出错。参见：[官方说明](https://docs.microsoft.com/en-us/windows/wsl/compare-versions#understanding-wsl-2-uses-a-vhd-and-what-to-do-if-you-reach-its-max-size)。

使用命令`wsl --list --v` 可进行查看:

![image-20220208195248995](https://gitee.com/yzketx/image-markdown/raw/master/img/202202081952108.png)

## 解决步骤
### 1. 删除所有容器

可以使用命令，查看所有容器：

```bash
docker ps -a
```

打开Docker Desktop for Window 的Dashboard界面，将该界面中的所有内容删除。

这一步很重要，如果不这样操作，进行后续操作的时候，要么提示网络相关错误：cannot create a specific network，要么导入完成之后，vhdx文件会消失。

### 2. 退出Docker Desktop

检查是否所有发行版都已经关闭

```bash
wsl --list --v
########得到以下结果###############
# D:\work>wsl --list --v
# NAME                   STATE           VERSION
# Ubuntu                 Stopped         2
# docker-desktop         Stopped         2
# docker-desktop-data    Stopped         2
```

### 3. 导出wsl子系统镜像:

```bash
wsl --export docker-desktop /path/to/docker-desktop.tar
wsl --export docker-desktop-data /path/to/docker-desktop-data.tar
```

### 4. 注销（删除）现有的wsl子系统：

```bash
wsl --unregister docker-desktop
wsl --unregister docker-desktop-data
```

### 5. 重新创建wsl子系统：

```bash
wsl --import docker-desktop d:\your-install-path /path/to/docker-desktop.tar
wsl --import docker-desktop-data d:\your-install-path /path/to/docker-desktop-data.tar
```

