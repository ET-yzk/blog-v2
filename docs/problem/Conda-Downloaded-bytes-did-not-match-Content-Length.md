---
icon: b fa-simplybuilt
category: 踩坑指南
time: 2021-10-13
sidebar: auto
tag:
  - Conda
---

# Conda - Downloaded bytes did not match Content-Length

## 问题描述

```bash
CondaError: Downloaded bytes did not match Content-Length
  url: https://repo.anaconda.com/pkgs/main/linux-64/cudnn-7.0.5-cuda8.0_0.tar.bz2
  target_path: /home/yyf/miniconda3/pkgs/cudnn-7.0.5-cuda8.0_0.tar.bz2
  Content-Length: 261398285
  downloaded bytes: 47463195
```

如上所示，在用conda安装包的时候下载包的长度不够导致安装包不成功。原因一般是在下载的时候速度较慢，导致下载timeout而终止。解决办法如下。

---

## 解决方案一 【推荐】

设置额外的源，直接从速度快的源进行下载。详见[conda源的使用](https://blog.csdn.net/feifei3211/article/details/90045560)和[清华源的添加方式](https://mirror.tuna.tsinghua.edu.cn/help/anaconda/)。

```bash
# 先添加清华源
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/pro/
# [!] 下列源可能存在问题
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/

# 然后运行安装命令
conda install [package]
```

[ ! ] 注意，若报 “conda.core.subdir_data.Response304ContentUnchanged”

```bash
# 移除conda-forge
conda config --remove channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge
```

详见 https://github.com/conda/conda/issues/8051

---

## 解决方案二

设置conda下载的 timeout，然后再进行尝试，如果时长不够可以再设置大一点。

```bash
# 设置timeout
conda config --set remote_read_timeout_secs 600.0

# 然后运行安装命令
conda install [package]
```

---

## 解决方案三

从conda的源下载好要安装的包，直接采用本地安装的方式。下载的url再出错的地方有提示：

```bash
url: https://repo.anaconda.com/pkgs/main/[system-version]/[package]
conda install --offline [download_postion]/[package]
```

---

## 参考

[stackoverflow 1](https://stackoverflow.com/questions/42797957/changing-timeout-limit-when-using-conda-install)

[stackoverflow 2](https://stackoverflow.com/questions/34316951/install-anaconda-library-from-a-local-source)