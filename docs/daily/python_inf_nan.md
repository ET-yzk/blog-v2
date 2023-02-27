---
icon: b fa-simplybuilt
category: 天天笔记
date: 2022-03-02
sidebar: auto
tag:
  - Python
---

# 认识python中的inf和nan

> from [认识python中的inf和nan - 简书 (jianshu.com)](https://www.jianshu.com/p/d9caa4ab46e1)

python中的正无穷或负无穷，使用float("inf")或float("-inf")来表示。

这里有点特殊，写成：float("inf")，float("INF")或者float('Inf')都是可以的。

当涉及 > 和 < 比较时，所有数都比无穷小float("-inf")大，所有数都比无穷大float("inf")小。

相等比较时，float("+inf")与float("+inf")、float("inf")三者相等。即：

```python
float("+inf") == float("+inf")  # True
float("+inf") == float("inf")  # True
```

同样地，float("-inf") == float("-inf") 返回也是True。

简单的加，减，乘操作，还是会返回无穷。

```python
float('inf') + 666  # inf
float('inf') - 888  # inf
float('inf') * 999  # inf
float('inf') / 99999  # inf
float('inf') + float('inf')  # inf
```

特别地，

- 0 * float('inf') 结果为：nan

- float('inf') / float('inf') 结果为：nan

- float('inf') - float('inf') 结果为：nan

- float('-inf') - float('-inf') 结果也为：nan



nan代表Not A Number（不是一个数），它并不等于0，

因为nan不是一个数，所以相关计算都无法得到数字。

所有涉及nan的操作，返回的都是nan。

```python
float('nan') + 9999999
float('nan') - 9999999
float('nan') * 9999999
float('nan') * float('inf')
float('nan') / float('inf')
float('nan') / float('nan')
```

结果都是：nan

比较操作时，返回的都是 False

```python
float('nan') > float('nan')
float('nan') > float('inf')
float('nan') > float('-inf')
float('nan') < float('nan')
float('nan') < float('inf')
float('nan') == float('nan')  # False
```

特别注意两个float('nan')并不相等

python中可以用math.isinf()与math.isnan()来判断数据是否为inf或nan。

```python
import math
n = float('inf')
print(math.isinf(n))  # True
m = float('nan')
print(math.isnan(m))  # True
```

numpy中也有相类似的方法可用来判断数据。

```python
0 / float('inf') == 0 / float('-inf')

# True
```

------

参考资料：

[Python 关于正负无穷float(‘inf’)的一些用法](https://blog.csdn.net/shennongzhaizhu/article/details/51997887)

[Stackoverflow.com上的问答：What is inf and nan?](https://stackoverflow.com/questions/17628613/what-is-inf-and-nan)