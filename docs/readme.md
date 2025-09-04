---
date: 2022-01-20
home: true
layout: Blog
icon: home
title: 主页
tagline: 凌晨四点，见海棠花未眠 🌸
heroImage: /logo.png
bgImage: /assets/images/bg2.jpg
heroText: Kfkfka
heroFullScreen: true
projects:
  - name: iSTEP BE 🥤
    icon: project
    desc: Coding platform backend.
    link: https://github.com/Guqj/OJBackend

  - name: iSTEP 🍻
    icon: friend
    desc: A coding platform.
    link: http://istep.yzketx.online

  - name: The craft of selfteaching 🧭
    icon: book
    desc: Selfteaching...
    link: https://blog.yzketx.online/iSTEP.github.io/The-craft-of-selfteaching/

  - name: My Roast 🫥
    icon: user-astronaut
    desc: Something about daily life...
    link: ./roast/

  - name: PaprikaYi 🌶️
    icon: user-astronaut
    desc: gagagaga...
    link: ./paprikayi

  - name: Coming soon 🌞
    icon: user-astronaut
    desc: kafkafka...
    link: ./coming-soon

index: false
footer: '<a href="https://beian.miit.gov.cn/" target="_blank">浙ICP备2020044365号-2</a>'
# copyright: MIT LICENSE | zkye
---

<Hitokoto />

[//]: # (<!-- 这里直接用 Vue Ajax 存在跨域问题；而 fetch 为浏览器方法，使用在 build 时 node.js 会警告 -->)

[//]: # (<p  style="text-align:center">)

[//]: # (  <a href="#" id="hitokoto_text">🍥🍃 「 Loading... 」</a>)

[//]: # (</p>)

[//]: # ()
[//]: # (<p style="text-align:right; font-size: 0.8em;">)

[//]: # (  <a id="hitokoto_author" />)

[//]: # (</p>)

[//]: # ()
[//]: # (<script>)

[//]: # (  // 发起请求获取 Hitokoto API 数据)

[//]: # (    fetch&#40;'https://v1.hitokoto.cn'&#41;)

[//]: # (        .then&#40;response => response.json&#40;&#41;&#41; // 将响应转换为 JSON 格式)

[//]: # (        .then&#40;data => {)

[//]: # ()
[//]: # (        // 获取页面中的 hitokoto 元素)

[//]: # (        const hitokoto_text = document.querySelector&#40;'#hitokoto_text'&#41;;)

[//]: # (        const hitokoto_author = document.querySelector&#40;'#hitokoto_author'&#41;;)

[//]: # (    )
[//]: # (        // 更新 hitokoto 元素的内容)

[//]: # (        hitokoto_text.href = `https://hitokoto.cn/?uuid=${data.uuid}`;)

[//]: # (    )
[//]: # (        // 检查 from 和 from_who 是否存在，并拼接成完整的字符串)

[//]: # (        let from_text = '';)

[//]: # (        if &#40;data.from&#41; {)

[//]: # (            from_text += `「${data.from}」`;)

[//]: # (        })

[//]: # (        if &#40;data.from_who&#41; {)

[//]: # (            from_text += ` ©${data.from_who}`;)

[//]: # (        })

[//]: # (    )
[//]: # (        // 拼接完整的文本)

[//]: # (        hitokoto_text.innerText = `🍃『 ${data.hitokoto} 』`;)

[//]: # (        hitokoto_author.innerText = from_text ? `——${from_text}` : '';)

[//]: # (    }&#41;)

[//]: # (    .catch&#40;console.error&#41;)

[//]: # (</script>)