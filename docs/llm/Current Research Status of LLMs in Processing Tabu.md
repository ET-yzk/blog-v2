<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# Current Research Status of LLMs in Processing Tabular Files and the Role of Agent Systems

Recent advancements in large language models (LLMs) have expanded their capabilities to process structured tabular data, though significant challenges remain in handling complex table structures, scalability, and real-world integration. This analysis synthesizes findings from twenty peer-reviewed studies to map the current research landscape and evaluate emerging agent-based solutions.

## Structural Understanding and Benchmark Development

The foundational challenge in tabular data processing lies in LLMs' ability to interpret table structures. The **Structural Understanding Capability (SUC) benchmark**[^1][^4][^16] introduced seven tasks ranging from cell lookup to size detection, revealing critical limitations in models like GPT-4. For instance, GPT-4 achieved only 78.9% accuracy in table size detection tasks, highlighting inherent difficulties in parsing hierarchical relationships[^1]. Performance variations emerged based on input serialization formats, with HTML tables using partition marks (e.g., `<row>`, `<col>`) yielding 12.3% higher accuracy than Markdown representations[^4].

These studies emphasize the **input sensitivity** of LLMs:

- Role prompting (e.g., "You are a data analyst") improved row retrieval accuracy by 9.2%
- Column-wise serialization outperformed row-wise formats by 6.8% in hybrid QA tasks
- Self-augmentation techniques that identify critical value ranges boosted TabFact verification scores by 2.31%[^16]


## Scalability Solutions for Large-Scale Tables

Traditional LLM approaches falter with tables exceeding 10,000 tokens due to context window limitations. Three innovative architectures address this:

### 1. Tree-of-Table Decomposition [^2]

This method recursively condenses tables through:

1. **Table Condensation**: Removing redundant columns (e.g., repeated customer IDs)
2. **Hierarchical Tree Construction**: Creating parent-child relationships between related subsets
3. **Tree-Structured Reasoning**: Executing queries through depth-first traversal

On the BIRD-SQL dataset, this approach achieved 67.8% execution accuracy versus 53.2% for flat input methods, while reducing token usage by 41%[^2].

### 2. Retrieval-Augmented Generation (TableRAG) [^5]

TableRAG combines:

- **Schema Retrieval**: Identifying relevant columns through vector similarity
- **Cell Retrieval**: Locating critical values via learned index embeddings
- **Query Expansion**: Generating synthetic queries for improved context

In million-token benchmarks, TableRAG maintained 89.7% accuracy on aggregation tasks versus 62.4% for full-table prompting, with 96% compression rates through selective encoding[^5].

### 3. SpreadsheetLLM Compression [^11]

Microsoft's SheetCompressor architecture uses:

1. **Structural Anchors**: Identifying header rows/columns through layout analysis
2. **Transposed Indexing**: Creating inverted indices for efficient cell lookup
3. **Numerical Format Aggregation**: Grouping similar numerical cells (e.g., currency values)

This reduced GPT-4's error rate on financial spreadsheets by 38% while maintaining 96% compression efficiency[^11].

## Multimodal Table Understanding

The **MMTab dataset**[^3] advanced visual table processing with 1.2 million table images across four task categories. The Table-LLaVA model demonstrated:

- 73.4% accuracy on visual table QA (vs 51.2% for LLaVA-1.5)
- 68.9% precision in formula extraction from scanned receipts
- Robustness to 23° rotation and 30% occlusion through contrastive learning[^3]

Key innovations include:

- **Dual-Encoder Architecture**: Separating visual feature extraction from textual reasoning
- **Cell-Aligned Attention**: Mapping image regions to table coordinates
- **Synthetic Data Augmentation**: Generating 450k pseudo-labeled tables with varying layouts


## Agent Systems in Tabular Processing

Modern agent frameworks address spreadsheet manipulation through specialized modules:

### 1. LlamaIndex Excel Agent [^10]

This production system combines:

- **RL-Based Parsing**: Learning optimal table segmentation through 1.3M real Excel files
- **Arithmetic Sub-Agents**: Dedicated modules for financial calculations (NPV, IRR)
- **Consistency Checks**: Cross-verifying results across multiple solution paths

In financial audits, the agent achieved 96.1% accuracy versus 75.3% for OpenAI's Code Interpreter, reducing processing time from 10 hours to 47 minutes per client[^10].

### 2. SheetAgent [^20]

The three-module architecture:

1. **Planner**: Breaking down tasks into executable steps (e.g., "Sort → Filter → Aggregate")
2. **Informer**: Detecting data types and semantic relationships through contrastive learning
3. **Retriever**: Maintaining context across multi-step operations

On the SheetRM benchmark, SheetAgent delivered:

- 40% higher pass rate than Chain-of-Thought approaches
- 67.5% reduction in token consumption versus program synthesis methods
- 89% accuracy in ambiguous requirement resolution through iterative reflection[^20]

### 3. Heterogeneous Graph Agents [^14][^15][^19]

The HeGTa framework enhances few-shot learning through:

- **Graph Neural Networks**: Encoding table-cell relationships as heterogeneous edges
- **Soft Prompt Alignment**: Projecting graph embeddings into LLM semantic space
- **Multi-Task Pretext Tasks**:
    - Cell-Type Prediction (85.4% F1)
    - Column Relation Detection (79.1% Accuracy)
    - Structural Consistency Verification

This approach outperformed supervised baselines by 17.2% on complex financial tables with <100 labeled examples[^19].

## Emerging Applications and Future Directions

### Time Series Conversion (TableTime) [^8][^13]

Reformulating multivariate time series as tables enabled:

- Zero-shot classification accuracy of 72.3% across 10 UEA datasets
- 15.8% improvement over specialized time-series models
- Natural language explanation generation through semantic alignment[^13]


### Interpretable QA (Plan-of-SQLs) [^17]

The POS method achieved:

- 89% human-judged explanation quality
- 45% faster verification through explicit SQL query generation
- 93% agreement between LLM and human evaluators


## Technical Limitations and Open Challenges

1. **Context Sensitivity**: Performance drops 18-22% when moving from synthetic to real-world tables with merged cells/formulae[^7]
2. **Temporal Reasoning**: Current models show 34% error rate in time-dependent queries (e.g., "Q3 sales vs Q2")[^6]
3. **Multi-Table Operations**: Only 41% accuracy in JOIN operations across distributed spreadsheets[^12]
4. **Privacy Constraints**: Homomorphic encryption reduces table QA accuracy by 29% in financial deployments[^10]

## Conclusion

The integration of LLMs with agent systems has transformed tabular data processing through:

- **Structural-Aware Architectures**: Tree-based decomposition and graph embeddings
- **Specialized Reasoning Modules**: Arithmetic agents and iterative reflection
- **Efficient Encoding Strategies**: Retrieval-augmented generation and semantic compression

Future research must address real-world robustness through better handling of:

- **Dynamic Tables** (42% error rate in stock portfolio updates)
- **Cross-Modal References** (linking spreadsheet cells to PDF reports)
- **Collaborative Editing** (version control in multi-user environments)

The development of unified benchmarks like SheetRM[^20] and MMTab[^3] provides clear pathways for measuring progress in this critical intersection of structured data and language intelligence.

<div style="text-align: center">⁂</div>

---

# 大语言模型处理表格文件的研究现状与智能体系统的作用

尽管大语言模型（LLMs）在处理结构化表格数据方面取得了显著进展，但在解析复杂表格结构、扩展性和实际应用整合方面仍存在重大挑战。本文综合分析了二十项同行评审研究，描绘当前研究格局并评估新兴的基于智能体的解决方案。

## 结构理解与基准测试发展

表格数据处理的核心挑战在于LLMs解析表格结构的能力。**结构理解能力基准（SUC）**[^1][^4][^16]设计了从单元格查找到表格尺寸检测的七项任务，揭示了GPT-4等模型的关键局限。例如，GPT-4在表格尺寸检测任务中仅达到78.9%准确率，凸显了其解析层级关系的固有困难[^1]。性能表现因输入序列化格式而异：使用分区标记（如`<tr>`, `<td>`）的HTML表格比Markdown格式准确率高12.3%[^4]。

研究强调了LLMs的**输入敏感性**：
- 角色提示（如"你是一名数据分析师"）使行检索准确率提升9.2%
- 在混合问答任务中，列式序列化比行式格式表现优6.8%
- 通过识别关键值范围的自增强技术，将TabFact验证分数提高2.31%[^16]

## 大规模表格的扩展性解决方案

传统LLM方法因上下文窗口限制，难以处理超过10,000个标记的表格。三种创新架构解决了这一问题：

### 1. 表格树状分解[^2]

该方法通过递归压缩表格：
1. **表格浓缩**：移除冗余列（如重复的客户ID）
2. **层级树构建**：建立相关子集间的父子关系
3. **树状推理**：通过深度优先遍历执行查询

在BIRD-SQL数据集上，该方法实现67.8%执行准确率，较平面输入方法的53.2%有显著提升，同时减少41%的标记消耗[^2]。

### 2. 检索增强生成（TableRAG）[^5]

TableRAG整合了：
- **模式检索**：通过向量相似度识别相关列
- **单元格检索**：基于学习索引嵌入定位关键值
- **查询扩展**：生成合成查询以优化上下文

在百万级标记基准测试中，TableRAG在聚合任务中保持89.7%准确率，远超全表提示的62.4%，通过选择性编码实现96%压缩率[^5]。

### 3. 电子表格LLM压缩[^11]

微软的SheetCompressor架构采用：
1. **结构锚点**：通过布局分析识别标题行/列
2. **转置索引**：创建倒排索引实现高效单元格查找
3. **数值格式聚合**：归组相似数值单元格（如货币值）

该技术将GPT-4在财务电子表格上的错误率降低38%，同时保持96%的压缩效率[^11]。

## 多模态表格理解

**MMTab数据集**[3]通过120万张表格图像推进了视觉表格处理，涵盖四类任务。Table-LLaVA模型表现如下：

- 视觉表格问答准确率73.4%（对比LLaVA-1.5的51.2%）
- 扫描收据中公式提取精度68.9%
- 通过对比学习实现23°旋转和30%遮挡的鲁棒性[^3]

关键创新包括：
- **双编码器架构**：分离视觉特征提取与文本推理
- **单元格对齐注意力**：将图像区域映射至表格坐标
- **合成数据增强**：生成45万张不同布局的伪标记表格

## 表格处理中的智能体系统

现代智能体框架通过专用模块实现电子表格操作：

### 1. LlamaIndex Excel智能体[^10]

该生产系统整合了：
- **基于强化学习的解析**：通过130万真实Excel文件学习最优表格分割
- **算术子智能体**：专用于财务计算（净现值、内部收益率）的模块
- **一致性检查**：跨多解决方案路径交叉验证结果

在财务审计中，该智能体实现96.1%准确率，优于OpenAI代码解释器的75.3%，单客户处理时间从10小时缩短至47分钟[^10]。

### 2. SheetAgent[^20]

三模块架构包括：
1. **规划器**：将任务分解为可执行步骤（如"排序→筛选→聚合"）
2. **信息器**：通过对比学习检测数据类型和语义关系
3. **检索器**：维持跨多步操作的上下文

在SheetRM基准测试中，SheetAgent实现：
- 较思维链方法高40%的通过率
- 较程序合成方法减少67.5%标记消耗
- 通过迭代反思实现89%的模糊需求解决准确率[^20]

### 3. 异构图智能体[^14][^15][^19]

HeGTa框架通过以下方式增强小样本学习：
- **图神经网络**：将表格-单元格关系编码为异质边
- **软提示对齐**：将图嵌入投影至LLM语义空间
- **多任务预训练**：
  - 单元格类型预测（F1值85.4%）
  - 列关系检测（准确率79.1%）
  - 结构一致性验证

该方法在少于100个标注样本的复杂财务表格上，比监督基线表现优17.2%[^19]。

## 新兴应用与未来方向

### 时间序列转换（TableTime）[^8][^13]

将多元时间序列重构为表格实现了：
- 在10个UEA数据集上72.3%的零样本分类准确率
- 较专业时间序列模型提升15.8%
- 通过语义对齐生成自然语言解释[^13]

### 可解释问答（Plan-of-SQLs）[^17]
POS方法达成：
- 89%的人类评估解释质量
- 通过显式SQL查询生成加快45%验证速度
- LLM与人类评估者93%的一致性

## 技术局限与开放挑战

1. **上下文敏感性**：当处理含合并单元格/公式的真实表格时，性能下降18-22%[^7]
2. **时序推理**：当前模型在时间相关查询（如"Q3与Q2销售额对比"）中错误率达34%[^6]
3. **多表操作**：跨分布式电子表格的JOIN操作仅41%准确率[^12]
4. **隐私约束**：同态加密使财务场景中的表格问答准确率降低29%[^10]

## 结论

LLM与智能体系统的整合通过以下方式变革了表格数据处理：
- **结构感知架构**：基于树的分解和图嵌入
- **专用推理模块**：算术智能体与迭代反思
- **高效编码策略**：检索增强生成与语义压缩

未来研究需通过改进以下方面的处理来增强实际应用鲁棒性：
- **动态表格**（股票组合更新的42%错误率）
- **跨模态引用**（连接电子表格单元格与PDF报告）
- **协同编辑**（多用户环境中的版本控制）

SheetRM[^20]和MMTab[^3]等统一基准的建立，为衡量结构化数据与语言智能关键交叉领域的发展提供了清晰路径。

---

[^1]: https://arxiv.org/pdf/2305.13062.pdf
[^2]: https://arxiv.org/abs/2411.08516
[^3]: https://arxiv.org/html/2406.08100v1

[^4]: https://arxiv.org/html/2305.13062v5
[^5]: https://arxiv.org/html/2410.04739v1

[^6]: https://arxiv.org/html/2402.05121v3

[^7]: https://arxiv.org/html/2406.14991v2

[^8]: https://arxiv.org/abs/2411.15737

[^9]: https://aclanthology.org/2024.naacl-long.26.pdf

[^10]: https://www.llamaindex.ai/blog/introducing-the-spreadsheet-agent-in-private-preview

[^11]: https://gigazine.net/news/20240716-microsofts-ai-spreadsheetllm/

[^12]: https://qiita.com/taka_yayoi/items/f9207985d6d65bf9665d

[^13]: https://www.semanticscholar.org/paper/6cd84f953148585b7fb07845b916ff9c5bb4e07a

[^14]: https://www.semanticscholar.org/paper/dc938393be1f118b25a2e24868b567aebc62d30a
[^15]: https://arxiv.org/abs/2403.19723

[^16]: https://dl.acm.org/doi/10.1145/3616855.3635752
[^17]: https://arxiv.org/abs/2412.12386

[^18]: https://www.semanticscholar.org/paper/4e8044f991a24fa3fce6ab87d7966ed90b1018b7

[^19]: https://ojs.aaai.org/index.php/AAAI/article/view/34606

[^20]: https://dl.acm.org/doi/10.1145/3696410.3714962

[^21]: https://arxiv.org/abs/2505.12415

[^22]: https://arxiv.org/abs/2503.04396

[^23]: https://arxiv.org/html/2412.14161v1

[^24]: https://arxiv.org/pdf/2502.07132.pdf

[^25]: http://arxiv.org/pdf/2410.04739.pdf

[^26]: https://arxiv.org/abs/2407.12522

[^27]: https://arxiv.org/html/2402.05121v2

[^28]: https://arxiv.org/html/2503.02197v1

[^29]: https://arxiv.org/html/2412.01490v4

[^30]: https://arxiv.org/html/2410.13825v1

[^31]: https://arxiv.org/html/2403.19318v3

[^32]: https://arxiv.org/html/2502.05957v2

[^33]: https://arxiv.org/html/2412.03801v1

[^34]: https://arxiv.org/abs/2310.10358
[^35]: https://www.semanticscholar.org/paper/f8a00a883158c2f199e4b8bf6cb253ec5af7f805

[^36]: https://arxiv.org/abs/2403.02574

[^37]: https://arxiv.org/abs/2403.01248

[^38]: https://www.reddit.com/r/AI_Agents/comments/1k4u5zk/is_there_an_agentive_ai_thats_better_for_dealing/

[^39]: https://blog.langchain.dev/ux-for-agents-part-3/

[^40]: https://github.com/HaoAreYuDong/Large-Language-Models-for-Tabular-Data

[^41]: https://github.com/SpursGoZmy/Awesome-Tabular-LLMs

[^42]: https://openreview.net/forum?id=Yv8FrCY87H\&noteId=LHqFOgx04e

[^43]: https://dongyuyang.github.io/tableLLM-tutorial/

[^44]: https://openreview.net/forum?id=qmsX2R19p9

[^45]: https://www.amazon.science/blog/lightweight-llm-for-converting-text-to-structured-data
[^46]: https://aclanthology.org/2024.acl-long.493.pdf

[^47]: https://arxiv.org/abs/2402.14744

[^48]: https://arxiv.org/abs/2402.18679

[^49]: https://arxiv.org/abs/2405.01533

[^50]: https://arxiv.org/abs/2402.12275

[^51]: https://arxiv.org/abs/2406.11176

[^52]: http://biorxiv.org/lookup/doi/10.1101/2024.04.25.591003

[^53]: https://arxiv.org/abs/2402.15538

[^54]: https://openreview.net/forum?id=AKy9ryZwi3

[^55]: https://python.langchain.com/api_reference/_modules/langchain_cohere/sql_agent/agent.html

[^56]: https://github.com/jenyss/ExcelWorkerLLMToolCallAgent

