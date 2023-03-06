---
icon: b fa-simplybuilt
category: 天天笔记
date: 2021-11-14

tag:
  - Cpp
  - Lang
---

# 类内部定义自身

## CPP

> 为什么C++类定义中，数据成员不能被指定为自身类型，但可以是指向自身类型的指针或引用？

在介绍这个问题前，我们先简要说一下类定义和声明的区别。

**类声明**

```cpp
class Screen；   //Screen类的声明
```

**类定义**

```cpp
class Screen{    //Screen类的定义
    //etc...
};       
```

当用实例化一个类的对象时，编译器会根据类的定义来分配相应的存储空间。也就是说，在创建对象前，一定要有完整的类定义，这样编译器才能正确的计算所需空间。

那么我们来看如下代码：

```cpp
class Screen{
    Screen sc;    //error, 'sc' uses undefined class 'Screen'
    //etc...
};
```

上述代码中，由于Screen还没有定义结束，在内部定义一个Screen类型的对象时，编译器无法知道应该为sc分配多少空间，因此会报注释中的错误。

我们再看下面一段代码：

```cpp
class Screen{
    Screen *sc1;   //ok
    Screen &sc2;   //ok
};
```

在类定义时，已指向自身类型的指针或引用作为数据成员则没有问题。按照前面的介绍就很好理解了，由于指针和引用所占存储空间大小与类型无关，所以编译器可以计算分配空间，所以正确。

## Java

