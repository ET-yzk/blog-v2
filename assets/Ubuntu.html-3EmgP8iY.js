import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as a,c as s,f as t}from"./app-HHaGRXeI.js";const e={},o=t(`<h1 id="ubuntu" tabindex="-1"><a class="header-anchor" href="#ubuntu" aria-hidden="true">#</a> Ubuntu</h1><h2 id="ubuntu-crontab-自动任务配置" tabindex="-1"><a class="header-anchor" href="#ubuntu-crontab-自动任务配置" aria-hidden="true">#</a> Ubuntu crontab 自动任务配置</h2><blockquote><p>对于可能涉及的脚本文件、代码源文件，其中所有需要用到的文件路径请使用 <strong>绝对路径</strong> ！！！</p></blockquote><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 对当前用户设定crontab执行文件，格式: [* * * * * command]</span>
<span class="token function">crontab</span> <span class="token parameter variable">-e</span>
<span class="token comment"># 查看当前用户设定的任务</span>
<span class="token function">crontab</span> <span class="token parameter variable">-l</span>
<span class="token comment"># 以root权限在 /etc/crontab 下修改，格式: * * * * * 用户名 command</span>
<span class="token function">vim</span> /etc/crontab
</code></pre></div><h2 id="默认开启或关闭图形化桌面" tabindex="-1"><a class="header-anchor" href="#默认开启或关闭图形化桌面" aria-hidden="true">#</a> 默认开启或关闭图形化桌面</h2><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 关闭用户图形界面，使用tty登录。</span>

<span class="token function">sudo</span> systemctl set-default multi-user.target
<span class="token function">sudo</span> <span class="token function">reboot</span>

<span class="token comment"># 开启用户图形界面。</span>

<span class="token function">sudo</span> systemctl set-default graphical.target
<span class="token function">sudo</span> <span class="token function">reboot</span>
</code></pre></div>`,6),c=[o];function r(u,l){return a(),s("div",null,c)}const i=n(e,[["render",r],["__file","Ubuntu.html.vue"]]);export{i as default};
