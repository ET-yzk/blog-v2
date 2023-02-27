---
home: true
icon: home
title: 主页
heroImage: /logo.png
bgImage: https://gitee.com/yzketx/image-markdown/raw/master/img/bg.svg
heroText: ET-yzk
heroFullScreen: true
projects:
  - name: iSTEP Backend 🥤
    icon: project
    desc: Coding platform backend.
    link: https://github.com/Guqj/OJBackend

  - name: iSTEP 🍻
    icon: link.png
    desc: A coding platform.
    link: http://istep.yzketx.online

  - name: The craft of selfteaching
    icon: /book.png
    desc: 🧭 One has no future if one couldn't teach themself.
    link: https://blog.yzketx.online/iSTEP.github.io/The-craft-of-selfteaching/

footer: '<a href="https://beian.miit.gov.cn/" target="_blank">浙ICP备2020044365号-2</a>'
# copyright: MIT LICENSE | zkye
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
