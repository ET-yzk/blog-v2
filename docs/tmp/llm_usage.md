---
date: 2020-01-01
---

- 将few-shot放在history，模拟连续对话，glm反卷总局在chatglm2证实了该方法比直接将few-shot全部放在prompt中效果要好
- 准备数据：可能我们需要对大量的数据集进行打标，非常庞大，人工打标已经不现实，我们就可以借助权威大模型如chatgpt4来实现达标，但是数据量太大成本大，那我们就可以只让权威大模型处理一小部分如1万条内容，然后再借助这一万条数据内容让我们本地的大模型进行学习打标，类似于蒸馏，得到一个专门打标的本地大模型，再来为所有数据打标。
- peft微调：只产生较小的peft权重模型（可能mb量级），而不是和原模型一样大小的新模型，在运行时，可以直接融合peft权重和原始模型运行，也就可以更加方便得 训练多个专用的peft权重模型处理不同专门的问题（综述Paper: “scaling down to scale up: a guide to parameter-efficent fine-tuning.”）｜难点是如何尽可能减少对原模型在非领域性能的损害。
  - 选择性方法：研究说性能不一，不推荐
  - 重新参数化方法：代表 LoRA，相当于冻结一部分权重或者模块，利用mask冻结输入和固定结构？[微调LLM中的魔鬼细节｜大型语言模型lora调教指南](https://www.bilibili.com/video/BV1yu411L7JN?vd_source=3df634e699c8240e5fd26ed74b439c15)
  - 加法方法：adapters & soft prompt tuning
- 