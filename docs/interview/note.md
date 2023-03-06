---

---

# 知识点整理

## SQL

### sql执行顺序

1. FROM：笛卡积
2. ON：主表保留
3. JOIN：
4. WHERE：无法聚合、无法使用别名
5. GROUP BY：改变表的引用（开始使用select中的别名，后面的语句中都可以使用）
6. AGG_FUNC：聚合计算
7. WITH ROOLUP/CUBE
8. HAVING：仅用于分组后
9. SELECT：选择列，表达式计算
10. DISTINCT：行去重
11. ORDER BY：无法运用表达式
12. LIMIT：选择指定数量行

## Java

### CopyOnWriteArrayList

```java
import java.util.Iterator;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * 描述： 演示CopyOnWriteArrayList迭代期间可以修改集合的内容
 */
public class CopyOnWriteArrayListDemo {
    public static void main(String[] args) {
        CopyOnWriteArrayList<Integer> list = new CopyOnWriteArrayList<>(new Integer[]{1, 2, 3});
        System.out.println(list); //[1, 2, 3]

        //Get iterator 1
        Iterator<Integer> itr1 = list.iterator();

        //Add one element and verify list is updated
        list.add(4);
        System.out.println(list); //[1, 2, 3, 4]

        //Get iterator 2
        Iterator<Integer> itr2 = list.iterator();

        System.out.println("====Verify Iterator 1 content====");
        itr1.forEachRemaining(System.out::println); //1,2,3
        System.out.println("====Verify Iterator 2 content====");
        itr2.forEachRemaining(System.out::println); //1,2,3,4
    }
}
```