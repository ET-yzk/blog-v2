---
icon: b fa-simplybuilt
category: 天天笔记
time: 2021-10-14
sidebar: auto
tag:
  - Python
---

# Python中循环代码优化

编写循环时，遵循下面三个原则可以大大提高运行效率，避免不需要的低效计算：

1、尽量减少循环内部不必要的计算

2、嵌套循环中，尽量减少内层循环的计算，尽可能的将计算往外层提

3、局部变量查询较快，尽量使用局部变量。

其他优化手段：

1、连接多个字符串时，使用join()而不使用+（因为+会产生新的字符串对象）

2、列表进行元素插入和删除，尽量在列表尾部操作

3、充分运用 pandas、numpy、scipy 等库及其数据结构

4、对于计算问题，*动态编译*

```python
from numba import jit

@jit()
def function():
    pass
```

