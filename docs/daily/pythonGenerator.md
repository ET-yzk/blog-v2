---
icon: b fa-simplybuilt
category: 天天笔记
date: 2021-11-19
sidebar: auto
tag:
  - Python
---

# Python 生成器

> 这一记录源于Leetcode排列的数组，在解题时使用了（x xxx）的生成器，反复思考确认在逻辑上无误，调试时才发现，用到的生成器在一次调用循环后便无法再次执行。

```python
# 示例
def func():
    for i in range(4):
        yield i
g = func()
# arr1、arr2 只有在用到的时候才会取值，默认是没有值
arr1 = (i for i in g)
arr2 = (i for i in arr1)
print(arr1)
# <generator object <genexpr> at 0x000002254DE5A2A0>
print(arr2)
# <generator object <genexpr> at 0x000002254DE5A318>
# 如果不执行list(arr1)则list(arr2) = [0, 1, 2, 3]
print(list(arr2))
# [0, 1, 2, 3]
```

### 1. 生成器定义

在Python中，一边循环一边计算的机制，称为生成器：generator。

### 2. 为什么要有生成器

列表所有数据都在内存中，如果有海量数据的话将会非常耗内存。

如：仅仅需要访问前面几个元素，那后面绝大多数元素占用的空间都白白浪费了。

如果列表元素按照某种算法推算出来，那我们就可以在循环的过程中不断推算出后续的元素，这样就不必创建完整的list，从而节省大量的空间。

简单一句话：我又想要得到庞大的数据，又想让它占用空间少，那就用生成器！

### 3.如何创建生成器

第一种方法很简单，只要把一个列表生成式的`[]`改成`()`，就创建了一个generator：

```python
>>> L = [x * x for x in range(10)]
>>> L
[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
>>> g = (x * x for x in range(10))
>>> g
<generator object <genexpr> at 0x1022ef630>
```

 创建`L`和`g`的区别仅在于最外层的`[]`和`()`，`L`是一个list，而`g`是一个generator。

方法二， 如果一个函数中包含`yield`关键字，那么这个函数就不再是一个普通函数，而是一个generator。调用函数就是创建了一个生成器（generator）对象。

### 4. 生成器的工作原理

（1）生成器(generator)能够迭代的关键是它有一个next()方法，

　　工作原理就是通过重复调用next()方法，直到捕获一个异常。

（2）带有 yield 的函数不再是一个普通函数，而是一个生成器generator。

　　可用next()调用生成器对象来取值。next 两种方式 t.__next__() | next(t)。

　　可用for 循环获取返回值（每执行一次，取生成器里面一个值）

　　（基本上不会用`next()`来获取下一个返回值，而是直接使用`for`循环来迭代）。

（3）yield相当于 return 返回一个值，并且记住这个返回的位置，下次迭代时，代码从yield的下一条语句开始执行。

（4）.send() 和next()一样，都能让生成器继续往下走一步（下次遇到yield停），但send()能传一个值，这个值作为yield表达式整体的结果

　　——换句话说，就是send可以强行修改上一个yield表达式值。比如函数中有一个yield赋值，a = yield 5，第一次迭代到这里会返回5，a还没有赋值。第二次迭代时，使用.send(10)，那么，就是强行修改yield 5表达式的值为10，本来是5的，那么a=10

感受下yield返回值的过程（*关注点：每次停在哪，下次又开始在哪*）及send()传参的通讯过程，

思考None是如何产生的（第一次取值：yield 返回了 i 值 0，停在yield i，temp没赋到值。第二次取值，开始在print，temp没被赋值，故打印None，i加1，继续while判断，yield 返回了 i 值 1，停在yield i）：

```python
>>> def test():
...   i = 0
...   while i < 5:
...     temp = yield i
...     print(temp)
...     i += 1
...
>>> a = test()
```

![image-20211120195923071](https://gitee.com/yzketx/image-markdown/raw/master/img/202111201959152.png)

示例：

```python
def yield_test(n):
    for i in range(n):
        yield call(i)
        print("i=",i)
    print("Done.")

def call(i):
    return i*2

for i in yield_test(5):
    print(i,",")
```

结果：

```python
>>>   
0 ,
i= 0
2 ,
i= 1
4 ,
i= 2
6 ,
i= 3
8 ,
i= 4
Done.>>>
```

 理解的关键在于：下次迭代时，代码从yield的下一条语句开始执行。

###  总结：

什么是生成器？

生成器仅仅保存了一套生成数值的算法，并且没有让这个算法现在就开始执行，而是我什么时候调它，它什么时候开始计算一个新的值，并给你返回。

**练习题**：

```python
def count_down(n):
    while n >= 0:
        newn = yield n
        print('newn', newn)
        if newn:
            print('if')
            n = newn
            print('n =', n)
        else:
            n -= 1


cd = count_down(5)
for i in cd:
    print(i, ',')
    if i == 5:
        cd.send(3)
```

![image-20211120202013539](https://gitee.com/yzketx/image-markdown/raw/master/img/202111202020607.png)
