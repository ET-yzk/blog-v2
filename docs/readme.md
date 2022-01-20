---
blog: true
home: true
icon: s fa-blogger
title: 博客主页
heroImage: /logo.png
bgImage: /bg2.png
heroText: ET-yzk
heroFullScreen: true
project:
  - type: project
    name: iSTEP Backend 🥤
    desc: Coding platform backend.
    link: https://github.com/Guqj/OJBackend

  - type: link
    name: iSTEP 🍻
    desc: A coding platform.
    link: http://istep.yzketx.online

  - type: book
    name: The craft of selfteaching
    desc: 🧭 One has no future if one couldn't teach themself.
    link: https://blog.yzketx.online/iSTEP.github.io/The-craft-of-selfteaching/
    cover: https://gitee.com/yzketx/image-markdown/raw/master/img/bg.svg

footer: At four o'clock isn the morning, I saw Begonia flowers awake.
# copyrightText: MIT LICENSE | 
---

<!-- 这里直接用 Vue Ajax 存在跨域问题；而 fetch 为浏览器方法，使用在build时node.js会警告 -->

<p class="heti" id="hitokoto" style="text-align:center"><a href="#" id="hitokoto_text">🍥🍃 「 Loading... 」</a></p>

<script>
export default {
  mounted() {
    axios.get('https://v1.hitokoto.cn/?c=d&c=e&c=i&c=j&c=k')
      .then(({ data }) => {
        const hitokoto = document.getElementById('hitokoto_text')
        hitokoto.href = 'https://hitokoto.cn/?uuid=' + data.uuid
        hitokoto.innerText = '🍃「 ' + data.hitokoto + '」'
    })
    .catch(console.error)
  },
}
</script>
