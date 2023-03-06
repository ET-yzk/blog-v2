---
icon: b fa-simplybuilt
category: 踩坑指南
date: 2021-10-30

tag:
  - Vim
---

# vim 常见问题

## 问题 1

在 Windows Powershell 中通过 vim 编辑并保存文件，会多出 `.filename.un~` & `.filename~` 文件

> 此分别为 vim 的 undo 备份文件 及 内容备份文件，
>
> 不需要 可删去 并 关闭功能

### 解决 1

1. 找到安装目录下的 _vimrc ( Linux 为 ~/.vimrc )，在文件末尾插入:

    ```bash
    " 关闭保存文件再次打开的undo功能（.filename.un~文件将不会生成）"
    set noundofile
    " 关闭保存文件后的自动备份功能（.filename~文件将不会生成）"
    set nobackup
    ```

---

## 问题 2

在 Windows Powershell 中通过 vim 编辑文件，输入中文后保存，再 cat 输出时乱码，如下：

<img src="https://gitee.com/yzketx/image-markdown/raw/master/img/202110301629336.png" alt="image-20211030162917305" style="zoom: 67%;" />

<img src="https://gitee.com/yzketx/image-markdown/raw/master/img/202110301629779.png" alt="image-20211030162933751" style="zoom:67%;" />

<img src="https://gitee.com/yzketx/image-markdown/raw/master/img/202110301628299.png" alt="image-20211030162837202" style="zoom:67%;" />

### 解决 2

1. 找到安装目录下的 _vimrc ( Linux 为 ~/.vimrc )，在文件末尾插入:

    ```bash
    " 设置默认编码格式，文件编码格式，终端编码格式"
    set encoding=utf-8
    set fileencoding=utf-8
    set termencoding=utf-8
    ```
2. 然后打开文件，将内容拷贝到新文件后重新保存即可。

    > 或者使用 Sublime Text 等工具将旧文件重新编码为 utf-8 格式
    >
    > <img src="https://gitee.com/yzketx/image-markdown/raw/master/img/202110301650337.png" alt="image-20211030165034250" style="zoom: 25%;" />

