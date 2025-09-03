# SQL 查询语句执行顺序

## 简述

SQL查询语句的执行顺序与书写顺序不同，具体步骤如下（基于MySQL）：

1. **FROM & JOIN**  
   首先确定数据来源，包括表连接操作（如`INNER JOIN`、`LEFT JOIN`）。此时会生成一个虚拟表，作为后续步骤的输入 。

2. **ON**  
   应用`JOIN`条件过滤数据，保留满足条件的记录 。

3. **WHERE**  
   对虚拟表中的记录进行条件过滤，排除不符合条件的行 。

4. **GROUP BY**  
   将数据按指定列分组，为聚合函数（如`SUM`、`COUNT`）准备数据 。

5. **HAVING**  
   对分组后的结果进行条件过滤（常用于聚合函数的筛选） 。

6. **SELECT**  
   选择需要返回的列，计算表达式或别名 。

7. **DISTINCT**  
   去除结果集中的重复行（若存在`DISTINCT`关键字） 。

8. **ORDER BY**  
   对最终结果集按指定列排序 。

9. **LIMIT**  
   限制返回的行数（如分页或取前N条） 。

**关键细节**：  
- `ON`先于`WHERE`执行，因此`JOIN`条件过滤早于`WHERE`条件 。  
- `SELECT`中的列别名无法在`GROUP BY`或`HAVING`中直接使用，因为它们在执行顺序中更靠后 。  
- MySQL 8.0已移除查询缓存功能，但执行流程仍遵循上述逻辑 。  

## 示例

```sql
SELECT u.*, t.tag_id as t_tag_id, t.tag_name as t_tag_name
FROM user u
LEFT JOIN user_tag ut ON u.user_id = ut.user_id
LEFT JOIN tag t ON ut.tag_id = t.tag_id
	AND t.is_deleted = 0
WHERE u.user_id = 6
	AND u.is_deleted = 0
```

以下是该SQL语句在数据库中的实际数据流执行过程，结合执行顺序和连接逻辑分析：

1. 确定数据源（FROM & JOIN）

- **主表**：从 `user u` 表开始，作为左表。
- **第一次 LEFT JOIN**：  
  将 `user u` 与 `user_tag ut` 表通过 `u.user_id = ut.user_id` 进行左连接。  
  **结果**：生成一个虚拟表，包含 `user` 表的所有字段，以及 `user_tag` 表中匹配的 `user_id` 的记录（若无匹配，`ut` 相关字段为 `NULL`）。

- **第二次 LEFT JOIN**：  
  将上一步的虚拟表与 `tag t` 表通过 `ut.tag_id = t.tag_id AND t.is_deleted = 0` 进行左连接。  
  **关键点**：  
  - 连接条件中的 `t.is_deleted = 0` 会过滤 `tag` 表中已删除的标签，但保留左表（`user` 和 `user_tag`）的记录。  
  - 若 `user_tag` 中存在 `tag_id`，但对应的 `tag` 表中 `is_deleted = 1`，则 `t.tag_id` 和 `t.tag_name` 为 `NULL`。

2. 应用 WHERE 过滤

- **条件**：`u.user_id = 6 AND u.is_deleted = 0`  
  - 过滤主表 `user` 中 `user_id = 6` 且未被逻辑删除（`is_deleted = 0`）的记录。  
  - **注意**：此时所有 `JOIN` 已完成，因此 `WHERE` 条件仅作用于最终结果集中的 `user` 表字段。

3. 选择输出字段（SELECT）

- **字段**：  
  - `u.*`：返回 `user` 表的所有字段。  
  - `t.tag_id AS t_tag_id` 和 `t.tag_name AS t_tag_name`：返回 `tag` 表中未被删除的标签信息（若无匹配或标签被删除，则为 `NULL`）。

**数据流示例**

假设以下数据：
- **user 表**：  
  | user_id | name  | is_deleted |
  | ------- | ----- | ---------- |
  | 6       | Alice | 0          |

- **user_tag 表**：  
  | user_id | tag_id |
  | ------- | ------ |
  | 6       | 100    |
  | 6       | 101    |

- **tag 表**：  
  | tag_id | tag_name | is_deleted |
  | ------ | -------- | ---------- |
  | 100    | VIP      | 0          |
  | 101    | Admin    | 1          |

**执行结果**：  
| user_id | name  | is_deleted | t_tag_id | t_tag_name |
| ------- | ----- | ---------- | -------- | ---------- |
| 6       | Alice | 0          | 100      | VIP        |
| 6       | Alice | 0          | NULL     | NULL       |

**解释**：  
1. 第一条记录：`tag_id = 100` 的 `is_deleted = 0`，因此 `t_tag_id` 和 `t_tag_name` 正常显示。  
2. 第二条记录：`tag_id = 101` 的 `is_deleted = 1`，被 `LEFT JOIN` 的 `ON` 条件过滤，`t` 字段为 `NULL`。  
3. `WHERE` 条件确保仅返回 `user_id = 6` 且未被删除的用户。

**关键注意事项**

1. **LEFT JOIN 的过滤逻辑**：  
   - `ON` 条件中的 `t.is_deleted = 0` 在连接时生效，直接影响 `tag` 表的匹配结果。  
   - 若需保留所有 `user_tag` 记录（包括已删除的标签），需将 `t.is_deleted = 0` 移至 `WHERE` 子句（但会丢失无匹配标签的用户记录）。

2. **性能优化**：  
   - 在 `JOIN` 前通过 `WHERE u.user_id = 6` 提前过滤主表数据，可减少中间表的数据量。  
   - 确保 `user.user_id` 和 `tag.tag_id` 等字段有索引，加速连接操作。

通过上述步骤，数据库最终返回符合条件的用户及其未被删除的标签信息（若存在）。

> [!NOTE]
>
> 以上只是逻辑执行过程，实际执行时数据库优化器可能进行优化，比如**提前应用 WHERE 条件** 以减少中间数据量。

