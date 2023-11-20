import{_ as o}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as p,o as t,c,a as s,b as n,d as l,f as a}from"./app-HHaGRXeI.js";const r={},i=a('<h1 id="sql-必知必会" tabindex="-1"><a class="header-anchor" href="#sql-必知必会" aria-hidden="true">#</a> SQL 必知必会</h1><h2 id="count" tabindex="-1"><a class="header-anchor" href="#count" aria-hidden="true">#</a> count</h2><ul><li>count(*) ：它会获取所有行的数据，不做任何处理，行数加1。</li><li>count(1)：它会获取所有行的数据，每行固定值1，也是行数加1。</li><li>count(id)：id代表主键，它需要从所有行的数据中解析出id字段，其中id肯定都不为NULL，行数加1。</li><li>count(普通索引列)：它需要从所有行的数据中解析出普通索引列，然后判断是否为NULL，如果不是NULL，则行数+1。</li><li>count(未加索引列)：它会全表扫描获取所有数据，解析中未加索引列，然后判断是否为NULL，如果不是NULL，则行数+1。</li></ul><p>由此，最后count的性能从高到低是：</p><blockquote><p>count(*) ≈ count(1) &gt; count(id) &gt; count(普通索引列) &gt; count(未加索引列)</p></blockquote><p>所以，其实<code>count(*)</code>是最快的。</p><p>参考自：https://mp.weixin.qq.com/s/g2NsLkclSTeUQoeDRER3Qg</p><h2 id="group-by" tabindex="-1"><a class="header-anchor" href="#group-by" aria-hidden="true">#</a> group by</h2><p>有一个原则，就是 select 后面的所有列中，没有使用聚合函数的列，必须出现在 group by 后面，否则会报错。可用 group_concat() 包裹输出。</p>',9),d={href:"https://mp.weixin.qq.com/s?__biz=MzU3Mjk2NDc3Ng==&mid=2247483790&idx=1&sn=a3e69709dd27eff171d8754babe88026&chksm=fcc9ab49cbbe225f55492bcbbc6ac12fe2734c4a3ac06801e1e72d536b481a6ac90d10155e6f&scene=27",target:"_blank",rel:"noopener noreferrer"},k=a(`<h2 id="关键字的执行顺序" tabindex="-1"><a class="header-anchor" href="#关键字的执行顺序" aria-hidden="true">#</a> 关键字的执行顺序</h2><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token comment"># 关键字的书写顺序如下：</span>
		<span class="token number">1.</span><span class="token keyword">select</span> 
		<span class="token number">2.</span><span class="token keyword">from</span>
		<span class="token number">3.</span><span class="token keyword">where</span>
		<span class="token number">4.</span><span class="token keyword">group</span> <span class="token keyword">by</span>
		<span class="token number">5.</span><span class="token keyword">having</span>
		<span class="token number">6.</span><span class="token keyword">order</span> <span class="token keyword">by</span>
		<span class="token number">7.</span> <span class="token keyword">limit</span>
</code></pre></div><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token comment"># 关键字的执行顺序如下：</span>
    	<span class="token number">1.</span><span class="token keyword">from</span>	    <span class="token comment">//行过滤</span>
		<span class="token number">2.</span><span class="token keyword">where</span>
		<span class="token number">3.</span><span class="token keyword">group</span> <span class="token keyword">by</span>
		<span class="token number">4.</span><span class="token keyword">having</span>
		<span class="token number">5.</span><span class="token keyword">select</span>	<span class="token comment">//列过滤</span>
		<span class="token number">6.</span><span class="token keyword">order</span> <span class="token keyword">by</span>  <span class="token comment">//排序</span>
		<span class="token number">7.</span><span class="token keyword">limit</span>     <span class="token comment">//附加</span>
</code></pre></div><p><mark>重要</mark> 进一步的，由于SQL语句执行顺序如下：</p><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">FROM</span> <span class="token operator">-</span> <span class="token keyword">ON</span> <span class="token operator">-</span> <span class="token keyword">JOIN</span> <span class="token operator">-</span> <span class="token keyword">WHERE</span> <span class="token operator">-</span> <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> <span class="token operator">-</span> <span class="token identifier"><span class="token punctuation">\`</span>WITH<span class="token punctuation">\`</span></span> <span class="token operator">-</span> <span class="token keyword">HAVING</span> <span class="token operator">-</span> <span class="token keyword">SELECT</span> <span class="token operator">-</span> <span class="token keyword">DISTINCT</span> <span class="token operator">-</span> <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> <span class="token operator">-</span> <span class="token keyword">LIMIT</span>
</code></pre></div><p>仅三类可以跟聚合函数：select、having、order by</p><p>where 先于 having 执行，having 属于二次过滤，故能先 where 过滤的条件先过滤，性能会高很多。</p><blockquote><p>问：join on 和 where 的区别？</p><p>答：一般两者的比较可以限定在联表查询的前提下</p><pre><code>  1. join 先于 where 执行
  1. join 可认为是生成临时的表用于查询，而 where 更类似于在紧邻的 from 后的表上做过滤
  1. …
</code></pre></blockquote><h2 id="子查询与连接查询" tabindex="-1"><a class="header-anchor" href="#子查询与连接查询" aria-hidden="true">#</a> 子查询与连接查询</h2><p>子查询方法在子查询内可排除大量数据的时候性能将优于连接查询</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment"># 查看所有来自浙江大学的用户题目回答明细情况，表 question_practice_detail 和 user_profile</span>

<span class="token comment"># 子查询</span>
<span class="token keyword">select</span> device_id<span class="token punctuation">,</span> question_id<span class="token punctuation">,</span> result
<span class="token keyword">from</span> question_practice_detail
<span class="token keyword">where</span> device_id <span class="token operator">in</span> <span class="token punctuation">(</span>
    <span class="token keyword">select</span> device_id
    <span class="token keyword">from</span> user_profile
    <span class="token keyword">where</span> university <span class="token operator">=</span> <span class="token string">&quot;浙江大学&quot;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment"># 连接查询</span>
<span class="token keyword">select</span> question_practice_detail<span class="token punctuation">.</span>device_id<span class="token punctuation">,</span>question_id<span class="token punctuation">,</span>result
<span class="token keyword">from</span> question_practice_detail<span class="token punctuation">,</span> user_profile
<span class="token keyword">where</span> question_practice_detail<span class="token punctuation">.</span>device_id <span class="token operator">=</span> user_profile<span class="token punctuation">.</span>device_id
<span class="token operator">and</span> user_profile<span class="token punctuation">.</span>university <span class="token operator">=</span> <span class="token string">&quot;浙江大学&quot;</span><span class="token punctuation">;</span>

<span class="token comment"># 内查询</span>
<span class="token keyword">select</span> question_practice_detail<span class="token punctuation">.</span>device_id<span class="token punctuation">,</span>question_id<span class="token punctuation">,</span>result
<span class="token keyword">from</span> question_practice_detail <span class="token keyword">inner</span> <span class="token keyword">join</span> user_profile
<span class="token keyword">on</span> question_practice_detail<span class="token punctuation">.</span>device_id <span class="token operator">=</span> user_profile<span class="token punctuation">.</span>device_id
<span class="token operator">and</span> user_profile<span class="token punctuation">.</span>university <span class="token operator">=</span> <span class="token string">&quot;浙江大学&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="合并操作" tabindex="-1"><a class="header-anchor" href="#合并操作" aria-hidden="true">#</a> 合并操作</h2><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment"># or，筛选出的结果为去重过的结果，即满足多条件的值为一条，应该是由于短路</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> user_profile <span class="token keyword">where</span> a <span class="token operator">=</span> <span class="token string">&quot;a&quot;</span> <span class="token operator">or</span> b <span class="token operator">=</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">;</span>

<span class="token comment"># union，结果同 or，即去并集，集合默认去重</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> user_profile <span class="token keyword">where</span> a <span class="token operator">=</span> <span class="token string">&quot;a&quot;</span>
<span class="token keyword">union</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> user_profile <span class="token keyword">where</span> b <span class="token operator">=</span> <span class="token string">&quot;b&quot;</span>

<span class="token comment"># union all，结果直接合并，不做去重操作</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> user_profile <span class="token keyword">where</span> a <span class="token operator">=</span> <span class="token string">&quot;a&quot;</span>
<span class="token keyword">union</span> <span class="token keyword">all</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> user_profile <span class="token keyword">where</span> b <span class="token operator">=</span> <span class="token string">&quot;b&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13);function u(m,v){const e=p("ExternalLinkIcon");return t(),c("div",null,[i,s("p",null,[n("基础用法参考："),s("a",d,[n("想要弄懂GROUP BY看这一篇就够了"),l(e)])]),k])}const y=o(r,[["render",u],["__file","sql.html.vue"]]);export{y as default};
