---
icon: simplybuilt
category: 天天笔记
date: 2022-02-08

tag:
  - Tools
---

# Docker - Docker Desktop(WSL2)

## 修改 docker-data 存储位置

### 背景

以WSL2方式使用 Docker Desktop for Windows 确实带来了更好的体验，但同时也带来新的问题。其中最典型的问题就是系统盘空间的占用越来越大，而且还有典型的内存问题。

### 说明

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

![image-20220208195248995](https://raw.githubusercontent.com/ET-yzk/picgo/blog/202202081952108.png)

### 解决步骤

#### 1. 删除所有容器

可以使用命令，查看所有容器：

```bash
docker ps -a
```

打开Docker Desktop for Window 的Dashboard界面，将该界面中的所有内容删除。

这一步很重要，如果不这样操作，进行后续操作的时候，要么提示网络相关错误：cannot create a specific network，要么导入完成之后，vhdx文件会消失。

#### 2. 退出Docker Desktop

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

#### 3. 导出wsl子系统镜像:

```bash
wsl --export docker-desktop /path/to/docker-desktop.tar
wsl --export docker-desktop-data /path/to/docker-desktop-data.tar
```

#### 4. 注销（删除）现有的wsl子系统：

```bash
wsl --unregister docker-desktop
wsl --unregister docker-desktop-data
```

#### 5. 重新创建wsl子系统：

```bash
wsl --import docker-desktop d:\your-install-path /path/to/docker-desktop.tar
wsl --import docker-desktop-data d:\your-install-path /path/to/docker-desktop-data.tar
```

---

## wsl2 docker 数据占用过多的问题

> 参阅 [WSL2 Docker释放磁盘空间](https://gist.github.com/banyudu/af131c7bb681e8a80b5cbe2047e62d4c)

Docker 使用久了，会残留很多中间生成的镜像，占用磁盘空间。

要清理 Docker 镜像，本来是挺简单的，两条命令就搞定了：

```shell
docker builder prune  # 删除悬空的构建缓存
docker system prune  # 删除所有悬空未在使用的数据
```

但是当在 Windows 中使用 WSL2 作为 Docker 后端引擎的时候，情况就会稍微复杂一些了，因为 windows 的虚拟存储格式 .vhdx 文件会自动扩容，但不会在动态缩小虚拟存储内不再占用的空间。

### 解决方案

镜像文件虽然一般不会自动压缩，但是支持手动压缩。

首先寻找到对应的镜像文件，在系统中搜索 `ext4.vhdx` 文件，可以搜索到多条记录，Docker对应的镜像文件一般是在 `C:\Users\<你的用户名>\AppData\Local\Docker\wsl\data\ext4.vhdx` 这个位置，如果移动过可能会有不同，[移动方案](##修改 docker-data 存储位置)见上。

找到这个文件之后，进行压缩即可。

首先，删除Docker中的无用镜像：

```
docker system prune
```

然后退出Docker Desktop并关停WSL2实例。

```
wsl --shutdown
```

最后打开 Windows 中提供的`diskpart`工具进行压缩

```powershell
# 代码来自 https://github.com/microsoft/WSL/issues/4699#issuecomment-627133168

diskpart
# open window Diskpart
select vdisk file="C:\Users\<你的用户名>\AppData\Local\Docker\wsl\data\ext4.vhdx"
attach vdisk readonly
compact vdisk
detach vdisk
exit
```

上述`diskpart`系列命令也可简化为：

```
Optimize-VHD -Path "path_to_disk.vhdx" -Mode Full
```
