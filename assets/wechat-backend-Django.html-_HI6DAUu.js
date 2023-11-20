import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as n,f as e}from"./app-HHaGRXeI.js";const p={},l=e(`<h1 id="微信小程序后端开发踩坑之django" tabindex="-1"><a class="header-anchor" href="#微信小程序后端开发踩坑之django" aria-hidden="true">#</a> 微信小程序后端开发踩坑之Django</h1><h3 id="_1-virtualenv虚拟环境的创建、激活、及退出" tabindex="-1"><a class="header-anchor" href="#_1-virtualenv虚拟环境的创建、激活、及退出" aria-hidden="true">#</a> 1. Virtualenv虚拟环境的创建、激活、及退出</h3><blockquote><p>virtualenv用于创建独立的Python环境，多个Python相互独立，互不影响。</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#  1.安装</span>
pip <span class="token function">install</span> virtualenv

<span class="token comment"># 2.使用方法</span>
virtualenv <span class="token punctuation">[</span>虚拟环境名称-也是目录名称<span class="token punctuation">]</span>

<span class="token comment"># 3.启动环境</span>
<span class="token builtin class-name">source</span> <span class="token punctuation">[</span>创建的目录<span class="token punctuation">]</span>/bin/activate 

<span class="token comment"># 4.退出</span>
deactivate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下，虚拟环境会依赖系统环境中的site packages，如果不想依赖这些package，那么可以加上参数 --no-site-packages建立虚拟环境：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>virtualenv --no-site-packages <span class="token punctuation">[</span>虚拟环境名称<span class="token punctuation">]</span>
</code></pre></div><p>如果本地存在多 Python 版本，可在创建时指定，如：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>virtualenv <span class="token punctuation">[</span>虚拟环境名称<span class="token punctuation">]</span> <span class="token parameter variable">--python</span><span class="token operator">=</span>/usr/local/python3/bin/python3.7
</code></pre></div><p>如果没有启动虚拟环境，系统也安装了pip工具，那么套件将被安装在系统环境中，为了避免发生此事，可以在~/.bashrc文件中加上：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">PIP_REQUIRE_VIRTUALENV</span><span class="token operator">=</span>true
</code></pre></div><p>或者让在执行pip的时候让系统自动开启虚拟环境：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">PIP_RESPECT_VIRTUALENV</span><span class="token operator">=</span>true
</code></pre></div><h4 id="virtualenvwrapper" tabindex="-1"><a class="header-anchor" href="#virtualenvwrapper" aria-hidden="true">#</a> Virtualenvwrapper</h4><p>Virtaulenvwrapper是virtualenv的扩展包，用于更方便管理虚拟环境，它可以做：</p><ul><li><p>将所有虚拟环境整合在一个目录下</p></li><li><p>管理（新增，删除，复制）虚拟环境</p></li><li><p>快速切换虚拟环境</p></li></ul><p>安装方法</p><p>1、运行</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>pip <span class="token function">install</span> virtualenvwrapper  
</code></pre></div><p>2、创建目录用来存放虚拟环境</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> ~/.virtualenvs
</code></pre></div><p>3、在.bashrc中添加</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">WORKON_HOME</span><span class="token operator">=~</span>/.virtualenvs

<span class="token builtin class-name">source</span> /usr/local/bin/virtualenvwrapper.sh
</code></pre></div><p>4、运行：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">source</span> ~/.bashrc
</code></pre></div><p>此时 virtualenvwrapper 就可以使用了。</p><p>命令列表</p><ul><li><p>workon: 列出虚拟环境列表</p></li><li><p>lsvirtualenv: 同上</p></li><li><p>mkvirtualenv: 新建虚拟环境</p></li><li><p>workon [虚拟环境名称]: 切换虚拟环境</p></li><li><p>rmvirtualenv: 删除虚拟环境</p></li><li><p>deactivate: 离开虚拟环境</p></li></ul><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 修复pip</span>
<span class="token function">curl</span> https://bootstrap.pypa.io/get-pip.py <span class="token operator">|</span> python 
</code></pre></div>`,28),t=[l];function i(c,o){return s(),n("div",null,t)}const u=a(p,[["render",i],["__file","wechat-backend-Django.html.vue"]]);export{u as default};
