---
icon: b fa-simplybuilt
category: 天天笔记
date: 2021-11-01

tag:
  - Python
---

# `__str__`和`__repr__`的异同

## 字符串的表示形式

我们都知道，Python的内置函数`repr()`能够把对象用字符串的形式表达出来，方便我们辨认。这就是“字符串表示形式”。`repr()`就是通过`__repr__`这个特殊方法来得到一个对象的字符串表示形式的。如果没有实现`__repr__`，当我们在控制台里打印一个向量的实例时，得到的字符串可能会是 <Vector object at 0x10a514f98>。

```python
>>> class Example: pass

>>> print(str(Example()))
<__main__.Example object at 0x10a514f98>
>>> print(repr(Example()))
<__main__.Example object at 0x1088eb438>
>>> 
>>> str(Example)
"<class '__main__.Example'>"
>>> repr(Example())
'<__main__.Example object at 0x1088eb438>'
```

## **`__str__ `vs.` __repr__`**

接下来我们看一看**`__str__ `和` __repr__`**有哪些异同。根据[Python官方文档定义](https://link.segmentfault.com/?enc=pEhyJythcllHjZjcCjBvuQ%3D%3D.BRKrQmzNQqa9y31ggG7rUseAE68AFJ%2FXQJe2i2RVTbzjSQH6X1JKYvw8BfIpO6WYcEzoU5WW0WTg4zpBztGSVqjrlJWuwhC8LHiQZbE0pdzqqi5dj1moalNH%2FfM%2Bh9Ej)：

- `__str__`：通过`str(object)`以及内置函数`format()`和`print()`调用以生成一个对象的“非正式”或格式良好的字符串表示。返回值必须是**字符串对象**。
- `__repr__`：是由`repr()`内置函数调用，用来输出一个对象的“官方”字符串表示。返回值必须是**字符串对象**，此方法通常被用于调试。内置类型 [`object`](https://link.segmentfault.com/?enc=X2cz0PpeTHNUqp84stuyqg%3D%3D.9dl7J2LQKUHQJ1icEPFljJ%2BOXoJYW5HE6InZ4mmN8ljkUUwxjkTuOGySYgIyXl1Y911KmiUysvkmmFeO2y5%2F1A%3D%3D) 所定义的默认实现会调用 `object.__repr__()`。

什么正式与非正式格式，你已经搞懵了是吗？没事，我们接着看：

### 1. 两者都能输出对象

```python
>>> x = 4
>>> repr(x)
'4'
>>> str(x)
'4'
>>> y = 'pythonic'
>>> repr(y)
"'pythonic'"
>>> str(y)
'pythonic'

>>> z = '4'
>>> repr(z)
"'4'"
>>> str(z)    # 注意，此处的输出结果形式跟str(x)一样，但x和z的类型并不一样
'4'
>>> str(x) == str(z)
True
>>> repr(x) == repr(z)
False
>>> str(4) == str("4")
True
>>> repr(4) == repr("4")
False
```

当x=4，当x为整数类型时，调用`str()`和`repr()`的返回结果是一样，

而当y为字符串类型时，`repr(y)`的结果就是“正式”的字符串表示，而`str(y)`的结果则是“非正式”的。`str()`能够让我们最快速了解到对象的内容，可读性较高。

### 2 .`__str__`是可读的，`__repr__`的目标是明确的

```python
>>> import datetime
>>> d = datetime.datetime.now()
>>> str(d)
'2020-04-04 20:47:46.525245'
>>> repr(d)
'datetime.datetime(2020, 4, 4, 20, 47, 46, 525245)'
>>> 
```

可以看出`repr()`更能显示出对象的类型、值等信息，对象描述清晰的。

在 `str()` 函数被使用，或是在用 `print` 函数打印一个对象的时候才被调用的，并且它返回的字符串对终端用户更友好。

### 3. 重写`__repr__`，那也会使用`__str_`

```python
class Student():

    def __init__(self, name):
        self.name = name

    def __str__(self):
        return "Name：" + self.name

    def __repr__(self):
        return "姓名：" + self.name


class_one = Student("Alice")
print(class_one)
print(str(class_one))
print(repr(class_one))
```

输出结果：

```
Name：Alice
Name：Alice
姓名：Alice
```

# 总结

**共同点：** 都是用来输出一个对象

**区别：**

1. `__str__` 的目标是可读的，`__str__()`并不预期返回一个有效的 Python 表达式，但可以使用更方便或更准确的描述信息。
2. `__repr__` 的目标是明确的，所返回的字符串应该准确、无歧义，并且尽可能表达出如何 用代码创建出这个被打印的对象。
3. 容器的 `__str__` 方法的使用包含对象的 `__repr__`

参考资料：

- [“Difference between `__str__` and `__repr__` in Python”](https://segmentfault.com/a/1190000022266368#)
- [Fluent Python](https://link.segmentfault.com/?enc=P12%2FFueOa0lJy6s8WBbR5g%3D%3D.y4Ujz%2BLJq89VZlfYIYQ%2F4m%2FgXtwry88Sh%2BKAzfb5VakEiLjf6MVQB7qXV%2BGQVNsS)