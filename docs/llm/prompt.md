---
date: 2025-02-01
---

# Prompt

| method | prompt | reference |
| ------- | ------------------------------------------------------------ | ------- |
| Q2D     | Write a passage that answers the given query:<br>- Query: {query 1}<br>Passage: {doc 1}<br>- Query: {query 2}<br>Passage: {doc 2}<br>- Query: {query 3}<br>Passage: {doc 3}<br>- Query: {query 4}<br>Passage: {doc 4}<br>- Query: {query}<br>Passage: {empty} |  |
| Q2D/ZS  | Write a passage that answers the following query: {query}    |  |
| Q2D/PRF | Write a passage that answers the given query based on the context:<br>- Context: {PRF doc 1}<br>{PRF doc 2}<br>{PRF doc 3}<br>- Query: {query}<br>Passage: {empty} |  |
| Q2E     | Write a list of keywords for the given query:<br>- Query: {query 1}<br>Keywords: {expansion 1}<br>- Query: {query 2}<br>Keywords: {expansion 2}<br>- Query: {query 3}<br>Keywords: {expansion 3}<br>- Query: {query 4}<br>Keywords: {expansion 4}<br>- Query: {query}<br>Keywords: {empty} |  |
| Q2E/ZS  | Write a list of keywords for the following query: {query}    |  |
| Q2E/PRF | Write a list of keywords for the given query based on the context:<br>- Context: {PRF doc 1}<br>{PRF doc 2}<br>{PRF doc 3}<br>- Query: {query}<br>Keywords: {empty} |  |
| CoT     | Answer the following query: {query}<br>Give the rationale before answering |  |
| CoT/PRF | Answer the following query based on the context:<br>- Context: {PRF doc 1}<br>{PRF doc 2}<br>{PRF doc 3}<br>- Query: {query}<br>Give the rationale before answering |  |

---

## System prompt ( Reflection )

### 方式 1

```
You are a world-class AI system, capable of complex reasoning and reflection. Reason through the query inside the [thinking] and [/thinking] tags, and then provide your final response inside the [output] and [/output] tags. If you detect that you made a mistake in your reasoning at any point, correct yourself inside the [reflection] and [/reflection] tags anytime.

你是一个世界级人工智能系统，能够进行复杂的推理和反思。在[thinking]标签内对查询进行推理，然后在[output]标签内提供你的最终回应。如果你发现自己在任何时候推理出错，请在[reflection]标签内纠正自己。
```
### 方式 2

```
You are a world-class artificial intelligence system capable of complex and accurate reasoning and reflection. First, engage in reasoning under the [thinking] and [/thinking] tags, and then reflect on your response under the [reflection] and [/reflection] tags, analyzing potential errors and areas for improvement, and repeat this process, iteratively going through [thinking] and [reflection], and then provide your final response inside the [output] and [/output] tags.

你是一个世界级的人工智能系统，能够进行复杂且准确的推理和反思。先在[thinking]标签下进行推理，然后在[reflection]标签反思你的回答，分析可能出现的错误和能够改进的地方，并重复这个过程，反复进行[thinking]和[reflection]。
```
### 官方

```
You are a world-class AI system, capable of complex reasoning and reflection. Reason through the query inside <thinking> tags, and then provide your final response inside <output> tags. If you detect that you made a mistake in your reasoning at any point, correct yourself inside <reflection> tags.
```

### 测试

```python
# test on llama3.1-8b temperature=0.2 top-p=0.7

question = "6.99和6.100 哪个大"

# 原始 ❌
"""
prompt:
{question}
----
response:
6.99 和 6.100 中，6.100 大。
"""

# 方式1 ⭕️
"""
prompt:
{method_1}\n\n{question}
----
response:
[thinking]
首先，我们需要比较两个数字的大小。6.99和6.100都是小数。
接下来，我们可以比较两个数字的整数部分。6.99的整数部分是6，6.100的整数部分也是6。
由于整数部分相同，我们需要比较小数部分的大小。6.99的小数部分是0.99，6.100的小数部分是0.100。
由于0.99大于0.100，我们可以得出结论，6.99大于6.100。
[/thinking]

[output]
6.99大于6.100。
[/output]
"""

# 方式2 ❌
"""
prompt:
{method_2}\n\n{question}
----
response:
[thinking]
比较两个数字的大小可以通过比较它们的整数部分和小数部分来实现。6.99和6.100的整数部分都是6，比较小数部分可以看出6.99小于6.100。
[/thinking]

[reflection]
我注意到我的思考过程主要是比较整数部分和小数部分，这是一个合理的方法。但是，我也应该考虑到小数部分的精度和舍入问题。例如，如果小数部分是0.00001，那么6.99和6.100可能会因为舍入问题而有所不同。因此，为了更准确地比较两个数字，我应该考虑到小数部分的精度和舍入问题。
[/reflection]

[thinking]
考虑到小数部分的精度和舍入问题，我应该使用更精确的比较方法。例如，我可以将两个数字转换为科学计数法，然后比较它们的指数和小数部分。
[/thinking]

[reflection]
我注意到我的思考过程现在更加精确了，但是我也应该考虑到科学计数法的舍入问题。例如，如果两个数字的指数相同，但小数部分不同，那么舍入问题可能会导致错误的比较结果。因此，为了进一步提高准确性，我应该考虑到科学计数法的舍入问题。
[/reflection]

[thinking]
经过反复思考和考虑舍入问题，我认为比较两个数字的大小最好的方法是使用比较函数（例如，比较函数中的比较运算符），而不是简单地比较整数部分和小数部分。
[/thinking]

[reflection]
我认为我的思考过程已经足够精确了。使用比较函数可以避免舍入问题和精度问题，确保比较结果的准确性。
[/reflection]

[output]
6.99小于6.100。
[/output]
"""
```

### 结论

确实是有效果的，根据公开的论文研究，COT的效果在模型规模逐渐增大的过程中变得更加有效。上述反思的方式和COT应当有异曲同工之妙。