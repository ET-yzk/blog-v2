---
icon: simplybuilt
category: 未知分类
date: 2022-01-13

tag:
  - API
---

# Other API

## 一言

<a helf="https://v1.hitokoto.cn/?encode=text">一言</a>

```html
<!-- 请注意，以下的示例包含超链接，您可能需要手动配置样式使其不变色。如果您嫌麻烦，可以移除。 -->
<p id="hitokoto"><a href="#" id="hitokoto_text">:D 获取中...</a></p>
<!-- 以下写法，选取一种即可 -->

<!-- 现代写法，推荐(不支持 IE) -->
<!-- 由于直接调用的fetch属于浏览器方法而不是node.js已知方法，最新的node.js编译无法通过:
ReferenceError: fetch is not defined
解决：
1. npm install node-fetch
2. const fetch = require('node-fetch') -->
<script>
  fetch("https://v1.hitokoto.cn")
    .then((response) => response.json())
    .then((data) => {
      const hitokoto = document.getElementById("hitokoto_text");
      hitokoto.href = "https://hitokoto.cn/?uuid=" + data.uuid;
      hitokoto.innerText = data.hitokoto;
    })
    .catch(console.error);
</script>
```

```vue
<!-- Vue3 -->
<!-- Vuepress 可用axios方法-->
<script>
export default {
  mounted() {
    axios
      .get("https://v1.hitokoto.cn/?c=d&c=e&c=i&c=j&c=k")
      .then(({ data }) => {
        const hitokoto = document.getElementById("hitokoto_text");
        hitokoto.href = "https://hitokoto.cn/?uuid=" + data.uuid;
        hitokoto.innerText = "🍃「 " + data.hitokoto + "」";
      })
      .catch(console.error);
  },
};
</script>
```

```html
<!-- or -->
<script
  src="https://v1.hitokoto.cn/?encode=js&select=%23hitokoto"
  defer
></script>
```

<p class="heti" id="hitokoto"><a href="#" id="hitokoto_text">: )  Loading...</a></p>

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

## IP

![IP签名](https://tool.lu/netcard/)
