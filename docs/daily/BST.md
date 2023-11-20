---
icon: b fa-simplybuilt
category: 天天笔记
date: 2022-03-13

tag:
  - Algorithm
  - BST
---

# 二叉查找树(BST)

### 定义

BST是满足如下3个条件的二叉树：

1. 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值；
2. 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值；
3. 结点的左子树和右子树都是BST

![](https://raw.githubusercontent.com/ET-yzk/picgo/blog/202203132246153.png)

## 规律

1. 中序遍历将得到递增值

```python
def dfs(root):
    dfs(root.left)
    res = root.val
    dfs(root.)
```

