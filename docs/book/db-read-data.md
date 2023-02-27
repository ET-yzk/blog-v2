---
icon: b fa-simplybuilt
category: 课程复习
date: 2022-02-22
sidebar: auto
tag:
  - 数据库
---
# 数据库复习

## 事务特性（ACID）

> 事务是并发控制的单位，是用户定义的一个操作序列。

**原子性**：是指事务一个不可分割的工作单位，事务中的操作要么都发生，要么都不发生。 不能够单独运行。 把一组操作放入事务中。

**一致性**：事务的执行的前后，数据的完整性要得到保证。

**隔离性**：强调的是多个用户并发访问数据库的时候，一个用户事务不能被其他用户的事务所干扰到，多个并发事务之间的数据要相互隔离。 解决多个用户对同一个数据进行操作， 数据库会有 事务的 隔离级别来进行解决。

**持久性**:一个事务一旦被提交，它对数据库中数据的改变就是永久性，即使数据库发生故障也不应该对其有任何影响。

## 数据库中读数据的一些概念

（1）脏读：脏读就是指当一个事务正在访问数据，并且对数据进行了修改，而这种修改还没有提交到数据库中，这时，另外一个事务也访问这个数据，然后使用了这个数据。因为这个数据是还没有提交的数据，那么另外一个事务读到的这个数据是脏数据，依据脏数据所做的操作可能是不正确的。

（2）不可重复读：这是由于查询时系统中其他事务修改的提交而引起的。比如事务T1读取某一数据，事务T2读取并修改了该数据，T1为了对读取值进行检验而再次读取该数据，便得到了不同的结果。
一种更易理解的说法是：在一个事务内，多次读同一个数据。在这个事务还没有结束时，另一个事务也访问该同一数据。那么，在第一个事务的两次读数据之间。由于第二个事务的修改，那么第一个事务读到的数据可能不一样，这样就发生了在一个事务内两次读到的数据是不一样的，因此称为不可重复读，即原始读取不可重复。

（3）幻读：幻读是指当事务不是独立执行时发生的一种现象，例如第一个事务对一个表中的数据进行了修改，比如这种修改涉及到表中的“全部数据行”。同时，第二个事务也修改这个表中的数据，这种修改是向表中插入“一行新数据”。那么，以后就会发生操作第一个事务的用户发现表中还存在没有修改的数据行，就好象发生了幻觉一样。一般解决幻读的方法是增加范围锁 RangeS，锁定检索范围为只读，这样就避免了幻读。