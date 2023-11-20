import{_ as t}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as e,o as p,c as o,a as n,b as s,d as c,f as i}from"./app-HHaGRXeI.js";const l={},r=n("h1",{id:"如何理解-python-装饰器",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#如何理解-python-装饰器","aria-hidden":"true"},"#"),s(" 如何理解 Python 装饰器")],-1),u={href:"https://www.jianshu.com/p/ee82b941772a",target:"_blank",rel:"noopener noreferrer"},d=i(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> functools

<span class="token keyword">def</span> <span class="token function">log</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token decorator annotation punctuation">@functools<span class="token punctuation">.</span>wraps</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">wrapper</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;call %s():&#39;</span> <span class="token operator">%</span> func<span class="token punctuation">.</span>__name__<span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;args = {}&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>

    <span class="token keyword">return</span> wrapper
<span class="token comment">#  关注 return，python的特点就在于wan</span>

<span class="token decorator annotation punctuation">@log</span>
<span class="token keyword">def</span> <span class="token function">test</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>test<span class="token punctuation">.</span>__name__ <span class="token operator">+</span> <span class="token string">&quot; param: &quot;</span> <span class="token operator">+</span> p<span class="token punctuation">)</span>
    
test<span class="token punctuation">(</span><span class="token string">&quot;I&#39;m a param&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># ========================等价于==================================</span>

<span class="token keyword">def</span> <span class="token function">test</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>test<span class="token punctuation">.</span>__name__ <span class="token operator">+</span> <span class="token string">&quot; param: &quot;</span> <span class="token operator">+</span> p<span class="token punctuation">)</span>

<span class="token comment"># ！！！！func的参数是这么传的</span>
wrapper <span class="token operator">=</span> log<span class="token punctuation">(</span>test<span class="token punctuation">)</span>
wrapper<span class="token punctuation">(</span><span class="token string">&quot;I&#39;m a param&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function k(v,m){const a=e("ExternalLinkIcon");return p(),o("div",null,[r,n("p",null,[n("a",u,[s("理解Python装饰器(Decorator) - 简书 (jianshu.com)"),c(a)])]),d])}const f=t(l,[["render",k],["__file","decorator.html.vue"]]);export{f as default};
