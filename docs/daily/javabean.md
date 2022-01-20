---
icon: b fa-simplybuilt
category: 天天笔记
time: 2021-11-14
sidebar: auto
tag:
  - Java
---

# Java Bean

## Java bean 是个什么概念

> 符合一定规范编写的Java类，不是一种技术，而是一种规范。大家针对这种规范，总结了很多开发技巧、工具函数。符合这种规范的类，可以被其它的程序员或者框架使用。

**规范**

JavaBean是一个遵循特定写法的Java类，是一种Java语言编写的可重用组件，它的方法命名，构造及行为必须符合特定的约定：

1、这个类必须具有一个公共的(public)无参构造函数；

2、所有属性私有化（private）；

3、私有化的属性必须通过public类型的方法（getter和setter）暴露给其他程序，并且方法的命名也必须遵循一定的命名规范。

4、这个类应是可序列化的。（比如可以实现Serializable 接口，用于实现bean的持久性）

**向后兼容性**

Java语言欠缺属性、事件、多重继承功能。所以，如果要在Java程序中实现一些面向对象编程的常见需求，只能手写大量胶水代码。Java Bean正是编写这套胶水代码的惯用模式或约定。这些约定包括getXxx、setXxx、isXxx、addXxxListener、XxxEvent等。遵守上述约定的类可以用于若干工具或库。

举个例子，假如有人要用Java实现一个单向链表类，可能会这样写：

```java
// 编译成 java-int-list_1.0.jar
public final class JavaIntList {
  static class Node {
    public Node next;
    public int value;
  }
  public Node head;
  public int size;
}
```

上述实现为了能够快速获取链表的大小，把链表大小缓存在size变量中。用法如下：

```java
JavaIntList myList = new JavaIntList();
System.out.println(myList.size);
```

JavaIntList的作者很满意，于是开源了java-int-list库的1.0版。文件名是java-int-list_1.0.jar。发布后，吸引了许多用户来使用java-int-list_1.0.jar。
有一天，作者决定要节省内存，不要缓存size变量了，把代码改成这样：

```java
// 编译成 java-int-list_2.0.jar
public final class JavaIntList {
  static final class Node {
    public Node next;
    public int value;
  }
  public Node head;
  public int getSize() {
    Node n = head;
    int i = 0;
    while (n != null) {
      n = n.next;
      i++;
    }
    return i;
  }
}
```

然后发布了2.0版：java-int-list_2.0.jar。发布后，原有java-int-list_1.0.jar的用户纷纷升级版本到2.0。这些用户一升级，就发现自己的程序全部坏掉了，说是找不到什么size变量。于是这些用户就把作者暴打一顿，再也不敢用java-int-list库了。

这个故事告诉我们，如果不想被暴打致死，你就必须保持向后兼容性。太阳公司在设计Java语言时，也懂得这个道理。所以Java标准库中，绝对不会出现public int size这样的代码，而一定会一开始就写成：

```java
private int size;
public int getSize() { return size; }
```

让用户一开始就使用getSize，以便有朝一日修改getSize实现时，不破坏向后兼容性。这种public int getSize() { return size; }的惯用手法，就是Java Bean。

现在是2014年，C#、Scala等比Java新的面向对象语言自身就提供了语言特性来实现这些常用需求，所以根本不需要Java Bean这样繁琐的约定。

比如，假如有个Scala版的ScalaIntList：

```scala
// 编译成 scala-int-list_1.0.jar
object ScalaIntList {
  final case class Node(next: Node, value: Int)
}
final class ScalaIntList {
  var head: ScalaIntList.Node = null
  var size: Int = 0
}
```

用户这样用：

```scala
val myList = new ScalaIntList
println(myList.size)
```

有一天你心血来潮改成这样：

```scala
// 编译成 scala-int-list_2.0.jar
object ScalaIntList {
  final case class Node(next: Node, value: Int)
}
final class ScalaIntList {
  var head: ScalaIntList.Node = null
  final def size: Int = {
    var n = head
    var i = 0
    while (n != null) {
      n = n.next
      i++
    }
    i
  }
}
```

用户还是照样能用，根本不破坏向后兼容性。所以Scala程序只要不考虑和Java交互，一般就不需要类似Java Bean这样的约定。

顺便说一句，向后兼容性分为源代码级和二进制级，Scala的var或val改为final def的话，无论源代码级的向后兼容性，还是二进制级的向后兼容性，都不遭受破坏。但C#的字段改为属性的话，虽然不破坏源代码级的向后兼容性，但是会破坏二进制级的向后兼容性。这是C#的设计缺陷，导致微软的编码规范不得不禁止使用公有字段。