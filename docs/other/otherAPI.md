---
icon: b fa-simplybuilt
category: 未知分类
time: 2022-01-13
sidebar: auto
tag:
  - API
---

# Other API

<a helf="https://v1.hitokoto.cn/?encode=text">一言</a>

```html
<!-- 请注意，以下的示例包含超链接，您可能需要手动配置样式使其不变色。如果您嫌麻烦，可以移除。 -->
<p id="hitokoto"><a href="#" id="hitokoto_text">:D 获取中...</a></p>
<!-- 以下写法，选取一种即可 -->

<!-- 现代写法，推荐(不支持 IE) -->
<script>
  fetch('https://v1.hitokoto.cn')
    .then(response => response.json())
    .then(data => {
      const hitokoto = document.getElementById('hitokoto_text')
      hitokoto.href = 'https://hitokoto.cn/?uuid=' + data.uuid
      hitokoto.innerText = data.hitokoto
    })
    .catch(console.error)
</script>
```

```html
<!-- or -->
<script src="https://v1.hitokoto.cn/?encode=js&select=%23hitokoto" defer></script>
```

<p class="heti" id="hitokoto"><a href="#" id="hitokoto_text">: )  Loading...</a></p>

<script>
  fetch('https://v1.hitokoto.cn')
    .then(response => response.json())
    .then(data => {
      const hitokoto = document.getElementById('hitokoto_text')
      hitokoto.href = 'https://hitokoto.cn/?uuid=' + data.uuid
      hitokoto.innerText = data.hitokoto
    })
    .catch(console.error)
</script>
