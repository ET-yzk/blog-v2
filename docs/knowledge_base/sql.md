# SQL 必知必会

## count

- count(*) ：它会获取所有行的数据，不做任何处理，行数加1。
- count(1)：它会获取所有行的数据，每行固定值1，也是行数加1。
- count(id)：id代表主键，它需要从所有行的数据中解析出id字段，其中id肯定都不为NULL，行数加1。
- count(普通索引列)：它需要从所有行的数据中解析出普通索引列，然后判断是否为NULL，如果不是NULL，则行数+1。
- count(未加索引列)：它会全表扫描获取所有数据，解析中未加索引列，然后判断是否为NULL，如果不是NULL，则行数+1。

由此，最后count的性能从高到低是：

> count(*) ≈ count(1) > count(id) > count(普通索引列) > count(未加索引列)

所以，其实`count(*)`是最快的。

参考自：https://mp.weixin.qq.com/s/g2NsLkclSTeUQoeDRER3Qg

## group by

有一个原则，就是 select 后面的所有列中，没有使用聚合函数的列，必须出现在 group by 后面，否则会报错。可用 group_concat() 包裹输出。

基础用法参考：[想要弄懂GROUP BY看这一篇就够了](https://mp.weixin.qq.com/s?__biz=MzU3Mjk2NDc3Ng==&mid=2247483790&idx=1&sn=a3e69709dd27eff171d8754babe88026&chksm=fcc9ab49cbbe225f55492bcbbc6ac12fe2734c4a3ac06801e1e72d536b481a6ac90d10155e6f&scene=27)

## 关键字的执行顺序

```sql
# 关键字的书写顺序如下：
		1.select 
		2.from
		3.where
		4.group by
		5.having
		6.order by
		7. limit
```

```sql
# 关键字的执行顺序如下：
    	1.from	    //行过滤
		2.where
		3.group by
		4.having
		5.select	//列过滤
		6.order by  //排序
		7.limit     //附加
```

==重要== 进一步的，由于SQL语句执行顺序如下：

```sql
FROM - ON - JOIN - WHERE - GROUP BY - `WITH` - HAVING - SELECT - DISTINCT - ORDER BY - LIMIT
```

仅三类可以跟聚合函数：select、having、order by

where 先于 having 执行，having 属于二次过滤，故能先 where 过滤的条件先过滤，性能会高很多。

> 问：join on 和 where 的区别？
>
> 答：一般两者的比较可以限定在联表查询的前提下
>
> 		1. join 先于 where 执行
> 		1. join 可认为是生成临时的表用于查询，而 where 更类似于在紧邻的 from 后的表上做过滤
> 		1. …

## 子查询与连接查询

子查询方法在子查询内可排除大量数据的时候性能将优于连接查询

```sql
# 查看所有来自浙江大学的用户题目回答明细情况，表 question_practice_detail 和 user_profile

# 子查询
select device_id, question_id, result
from question_practice_detail
where device_id in (
    select device_id
    from user_profile
    where university = "浙江大学"
);

# 连接查询
select question_practice_detail.device_id,question_id,result
from question_practice_detail, user_profile
where question_practice_detail.device_id = user_profile.device_id
and user_profile.university = "浙江大学";

# 内查询
select question_practice_detail.device_id,question_id,result
from question_practice_detail inner join user_profile
on question_practice_detail.device_id = user_profile.device_id
and user_profile.university = "浙江大学";
```

## 合并操作

```sql
# or，筛选出的结果为去重过的结果，即满足多条件的值为一条，应该是由于短路
select * from user_profile where a = "a" or b = "b";

# union，结果同 or，即去并集，集合默认去重
select * from user_profile where a = "a"
union
select * from user_profile where b = "b"

# union all，结果直接合并，不做去重操作
select * from user_profile where a = "a"
union all
select * from user_profile where b = "b"
```

