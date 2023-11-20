import{_ as p}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as c,c as l,a as n,b as s,d as e,f as t}from"./app-HHaGRXeI.js";const i={},u=n("h1",{id:"vuepress",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#vuepress","aria-hidden":"true"},"#"),s(" VuePress")],-1),r=n("h2",{id:"简介",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#简介","aria-hidden":"true"},"#"),s(" 简介")],-1),d={href:"https://zh.wikipedia.org/wiki/Markdown",target:"_blank",rel:"noopener noreferrer"},k=t(`<p>VuePress 诞生的初衷是为了支持 Vue.js 及其子项目的文档需求，但是现在它已经在帮助大量用户构建他们的文档、博客和其他静态网站。</p><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 初始化项目</span>
<span class="token function">mkdir</span> target-dir
<span class="token builtin class-name">cd</span> target-dir
<span class="token function">npm</span> init <span class="token parameter variable">-y</span>  <span class="token comment"># 生成package.json</span>

<span class="token comment"># 将 VuePress 作为一个本地依赖安装</span>
<span class="token function">yarn</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> vuepress <span class="token comment"># 或者：npm install -D vuepress</span>

<span class="token comment"># 若警告 建议执行 npm found</span>
<span class="token comment"># 建议不进行 npm install 操作，会导致部分 node_modules文件丢失</span>

<span class="token comment"># 新建一个 docs 文件夹</span>
<span class="token function">mkdir</span> docs

<span class="token comment"># 新建一个 markdown 文件</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;# Hello VuePress!&#39;</span> <span class="token operator">&gt;</span> docs/README.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>target-dir/package.json</code>中加一些脚本：</p><div class="language-json" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;docs:build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress build docs&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;docs:clean-dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress dev docs --no-cache&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;docs:dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress dev docs&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;docs:eject-theme&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress eject-hope docs&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;deploy-gh&quot;</span><span class="token operator">:</span> <span class="token string">&quot;yarn docs:build &amp;&amp; bash scripts/deploy.sh&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 运行本地开发环境：</span>
<span class="token function">yarn</span> docs:dev <span class="token comment"># 或者：npm run docs:dev</span>

<span class="token comment"># 或构建线上静态文件：</span>
<span class="token function">yarn</span> docs:build <span class="token comment"># 或者：npm run docs:build</span>
</code></pre></div><h2 id="部署" tabindex="-1"><a class="header-anchor" href="#部署" aria-hidden="true">#</a> 部署</h2><h3 id="方法1-github-action" tabindex="-1"><a class="header-anchor" href="#方法1-github-action" aria-hidden="true">#</a> 方法1：Github Action</h3><h4 id="借助已有的他人-github-action-模板" tabindex="-1"><a class="header-anchor" href="#借助已有的他人-github-action-模板" aria-hidden="true">#</a> 借助已有的他人 Github Action 模板</h4>`,10),v={href:"https://github.com/jenkey2011/vuepress-deploy/blob/master/README.zh-CN.md",target:"_blank",rel:"noopener noreferrer"},m=t(`<p>在你项目仓库<code>.github/workflows</code>目录下创建一个 <code>.yml</code>文件，举例：<code>vuepress-deploy.yml</code>。</p><p>内容：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> Build and Deploy
<span class="token key atrule">on</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>push<span class="token punctuation">]</span>
<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">build-and-deploy</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout
      <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@master

    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> vuepress<span class="token punctuation">-</span>deploy
      <span class="token key atrule">uses</span><span class="token punctuation">:</span> jenkey2011/vuepress<span class="token punctuation">-</span>deploy@master
      <span class="token key atrule">env</span><span class="token punctuation">:</span>
        <span class="token key atrule">ACCESS_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.ACCESS_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token key atrule">TARGET_REPO</span><span class="token punctuation">:</span> username/repo
        <span class="token key atrule">TARGET_BRANCH</span><span class="token punctuation">:</span> master
        <span class="token key atrule">BUILD_SCRIPT</span><span class="token punctuation">:</span> yarn <span class="token important">&amp;&amp;</span> yarn docs<span class="token punctuation">:</span>build  <span class="token comment"># 需要与 package.json 中的脚本对应</span>
        <span class="token key atrule">BUILD_DIR</span><span class="token punctuation">:</span> blog/.vuepress/dist/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述配置的结果是：每次推送代码，将自动构建、部署到<code>username/repo</code>的<code>master</code>分支。就是这么简单~</p><h4 id="自定义" tabindex="-1"><a class="header-anchor" href="#自定义" aria-hidden="true">#</a> 自定义</h4>`,5),b={href:"https://v2.vuepress.vuejs.org/zh/guide/deployment.html#github-pages",target:"_blank",rel:"noopener noreferrer"},h={href:"https://v2.vuepress.vuejs.org/zh/reference/config.html#base",target:"_blank",rel:"noopener noreferrer"},y=t("<p>如果你准备发布到 <code>https://&lt;USERNAME&gt;.github.io/</code> ，你可以省略这一步，因为 <code>base</code> 默认就是 <code>&quot;/&quot;</code> 。</p><p>如果你准备发布到 <code>https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt;/</code> ，也就是说你的仓库地址是 <code>https://github.com/&lt;USERNAME&gt;/&lt;REPO&gt;</code> ，则将 <code>base</code> 设置为 <code>&quot;/&lt;REPO&gt;/&quot;</code>。</p>",2),g={href:"https://github.com/features/actions",target:"_blank",rel:"noopener noreferrer"},_=n("p",null,[s("创建 "),n("code",null,".github/workflows/docs.yml"),s(" 文件来配置工作流。")],-1),f=t(`<div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> docs

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token comment"># 每当 push 到 main 分支时触发部署</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>main<span class="token punctuation">]</span>
  <span class="token comment"># 手动触发部署</span>
  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">docs</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest

    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录</span>
          <span class="token key atrule">fetch-depth</span><span class="token punctuation">:</span> <span class="token number">0</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup Node.js
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v1
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># 选择要使用的 node 版本</span>
          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token string">&#39;14&#39;</span>

      <span class="token comment"># 缓存 node_modules</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Cache dependencies
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/cache@v2
        <span class="token key atrule">id</span><span class="token punctuation">:</span> yarn<span class="token punctuation">-</span>cache
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
            **/node_modules</span>
          <span class="token key atrule">key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> runner.os <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>yarn<span class="token punctuation">-</span>$<span class="token punctuation">{</span><span class="token punctuation">{</span> hashFiles(&#39;<span class="token important">**/yarn.lock&#39;)</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">restore-keys</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
            \${{ runner.os }}-yarn-</span>

      <span class="token comment"># 如果缓存没有命中，安装依赖</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install dependencies
        <span class="token key atrule">if</span><span class="token punctuation">:</span> steps.yarn<span class="token punctuation">-</span>cache.outputs.cache<span class="token punctuation">-</span>hit <span class="token tag">!=</span> &#39;true&#39;
        <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn <span class="token punctuation">-</span><span class="token punctuation">-</span>frozen<span class="token punctuation">-</span>lockfile

      <span class="token comment"># 运行构建脚本</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build VuePress site
        <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn docs<span class="token punctuation">:</span>build

      <span class="token comment"># 查看 workflow 的文档来获取更多信息</span>
      <span class="token comment"># @see https://github.com/crazy-max/ghaction-github-pages</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy to GitHub Pages
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> crazy<span class="token punctuation">-</span>max/ghaction<span class="token punctuation">-</span>github<span class="token punctuation">-</span>pages@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># 部署到 gh-pages 分支</span>
          <span class="token key atrule">target_branch</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>pages
          <span class="token comment"># 部署目录为 VuePress 的默认输出目录</span>
          <span class="token key atrule">build_dir</span><span class="token punctuation">:</span> docs/.vuepress/dist
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token comment"># @see https://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-github_token-secret</span>
          <span class="token key atrule">GITHUB_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITHUB_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vuepress-theme" tabindex="-1"><a class="header-anchor" href="#vuepress-theme" aria-hidden="true">#</a> VuePress Theme</h2>`,2),E={href:"https://vuepress-theme-hope.github.io/zh/",target:"_blank",rel:"noopener noreferrer"},q=n("li",null,null,-1);function x(w,j){const a=o("ExternalLinkIcon");return c(),l("div",null,[u,r,n("p",null,[s("VuePress 是一个以 Markdown 为中心的静态网站生成器。你可以使用 "),n("a",d,[s("Markdown在新窗口打开"),e(a)]),s(" 来书写内容（如文档、博客等），然后 VuePress 会帮助你生成一个静态网站来展示它们。")]),k,n("p",null,[n("a",v,[s("vuepress-deploy/README.zh-CN.md at master · jenkey2011/vuepress-deploy (github.com)"),e(a)])]),m,n("p",null,[n("a",b,[s("部署 | VuePress (vuejs.org)"),e(a)])]),n("ol",null,[n("li",null,[n("p",null,[s("设置正确的 "),n("a",h,[s("base"),e(a)]),s(" 选项。")]),y]),n("li",null,[n("p",null,[s("选择你想要使用的 CI 工具。这里我们以 "),n("a",g,[s("GitHub Actions在新窗口打开"),e(a)]),s(" 为例。")]),_])]),f,n("ul",null,[n("li",null,[n("a",E,[s("vuepress-theme-hope"),e(a)])]),q])])}const R=p(i,[["render",x],["__file","vuepress-starter.html.vue"]]);export{R as default};
