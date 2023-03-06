---
icon: b fa-simplybuilt
category: 算法

tag:
  - Algorithm
---
# 总结

## 思路

1. 对于 `int` 数据处理可考虑：
   - 排序
   - 位运算，如异或
   - 数学规律

2. 递归【以中间情况来思考】

3. 从后往前！！比如在特定空间排序

4. 左右匹配：可用栈，左值直接入栈，右值与栈尾匹配

5. `连续长度的最值问题`优先考虑`滑动窗口`

6. 对于多种走法的最值问题大多数情况下优先考虑BFS，如果用BFS解决不了再考虑DFS。
   对于多种走法的概率或种数问题则考虑用动态规划。

7. 利用位运算：

   - 奇偶判断：&1 -> 与运算

   - 2倍运算：利用 >>n -> /2^n，n<< ->*2^n

8. 由于python的特性，或许在一开始就申请完空间会比采用append更高效

9. 首尾指针：left, right = 0, length - 1; left < right

10. 快慢指针：slow, fast = 0, 0; fast走的快

11. 快排的base可以取nums[low]/nums[high]

    对应：需要注意取nums[low]则需先从从高位开始向前，取nums[high]则需先从低位向后。

    ```python
    def quick_sort(nums: list, low: int, high:int):
        if low >= high:
            return
        i, j = low, high  # 对应
        base = nums[low]
        while i < j:
            while i < j and nums[j] >= base:  # 对应
                j -= 1
            nums[i] = nums[j]
            while i < j and nums[i] <= base:  # 对应
                i += 1
            nums[j] = nums[i]
        nums[i] = base
        quick_sort(low, i - 1)
        quick_sort(i + 1, high)
    ```

12. 巧妙利用 短路特性

13. 搜索二叉树与中序遍历，左小右大

14. 完全二叉树叶子节点为所有节点的一半

15. 建立【大顶堆/小顶堆】只能保证堆顶的【最大/最小值】

16. 线段树？[最大子序和 - 最大子数组和 - 力扣（LeetCode） (leetcode-cn.com)](https://leetcode-cn.com/problems/maximum-subarray/solution/zui-da-zi-xu-he-by-leetcode-solution/)

17. HashMap用于解决匹配问题，如两数之和等

18. 

## 常用函数

### C

`调研快排`

```c
#include <stdlib.h>
void qsort(void*base,size_t num,size_t width,int(__cdecl*compare)(const void*,const void*));

// 一般写法：qsort(nums, numsSize, sizeof(int), comp)
// 其中的对比函数一般如下
int comp(const void*a,const void*b) {
return *(int*)a-*(int*)b;
}
```

### Python

`字符串反转`

```python
# 1.使用字符串切片
str='Runoob'
print(str[::-1])

# 2.使用 reversed()，fan'h
str='Runoob'
print(''.join(reversed(str)))

# 3.reduce + lambda 反转法
from functools import reduce

str='Runoob'
print(reduce(lambda x, y: y + x, str))
```

`字符串大小写转换`

```python
str = "aa.bb.CC"
print(str.upper())          # 把所有字符中的小写字母转换成大写字母
print(str.lower())          # 把所有字符中的大写字母转换成小写字母
print(str.capitalize())     # 把第一个字母转化为大写字母，其余小写
print(str.title())          # 把每个单词的第一个字母转化为大写，其余小写

'''
AA.BB.CC
aa.bb.cc
Aa.bb.cc
Aa.Bb.Cc
'''

chr(97)   # 将ASCLL码转为字符
ord('a')  # 将字符转为ASCLL码，'0'->48，'A'->65
```

