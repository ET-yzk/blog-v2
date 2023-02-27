---
icon: b fa-simplybuilt
category: 踩坑指南
date: 2021-10-20
sidebar: auto
tag:
  - WeChat
  - Django
---

# 微信小程序后端开发踩坑之Django

### 1. Virtualenv虚拟环境的创建、激活、及退出

> virtualenv用于创建独立的Python环境，多个Python相互独立，互不影响。

```bash
#  1.安装
pip install virtualenv

# 2.使用方法
virtualenv [虚拟环境名称-也是目录名称]

# 3.启动环境
source [创建的目录]/bin/activate 

# 4.退出
deactivate
```

默认情况下，虚拟环境会依赖系统环境中的site packages，如果不想依赖这些package，那么可以加上参数 --no-site-packages建立虚拟环境：

```bash
virtualenv --no-site-packages [虚拟环境名称]
```

如果本地存在多 Python 版本，可在创建时指定，如：

```bash
virtualenv [虚拟环境名称] --python=/usr/local/python3/bin/python3.7
```



如果没有启动虚拟环境，系统也安装了pip工具，那么套件将被安装在系统环境中，为了避免发生此事，可以在~/.bashrc文件中加上：

```bash
export PIP_REQUIRE_VIRTUALENV=true
```

或者让在执行pip的时候让系统自动开启虚拟环境：

```bash
export PIP_RESPECT_VIRTUALENV=true
```

#### Virtualenvwrapper

Virtaulenvwrapper是virtualenv的扩展包，用于更方便管理虚拟环境，它可以做：

- 将所有虚拟环境整合在一个目录下

- 管理（新增，删除，复制）虚拟环境

- 快速切换虚拟环境

安装方法

1、运行

```bash
pip install virtualenvwrapper  
```

2、创建目录用来存放虚拟环境

```bash
mkdir ~/.virtualenvs
```

3、在.bashrc中添加

```bash
export WORKON_HOME=~/.virtualenvs

source /usr/local/bin/virtualenvwrapper.sh
```

4、运行：

```bash
source ~/.bashrc
```

此时 virtualenvwrapper 就可以使用了。

命令列表

- workon: 列出虚拟环境列表

- lsvirtualenv: 同上

- mkvirtualenv: 新建虚拟环境

- workon [虚拟环境名称]: 切换虚拟环境

- rmvirtualenv: 删除虚拟环境

- deactivate: 离开虚拟环境

```bash
# 修复pip
curl https://bootstrap.pypa.io/get-pip.py | python 
```

