<template>
  <div>
    <p style="text-align:center">
      <a :href="hitokotoLink" id="hitokoto_text" target="_blank">{{ hitokotoText }}</a>
    </p>
    <p style="text-align:right; font-size: 0.8em;">
      <span id="hitokoto_author">{{ authorText }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "Hitokoto",
  data() {
    return {
      hitokotoText: "🍥🍃 「 Loading... 」",
      hitokotoLink: "#",
      authorText: ""
    };
  },
  mounted() {
    // 发起请求获取 Hitokoto API 数据
    fetch('https://v1.hitokoto.cn')
      .then(response => response.json()) // 将响应转换为 JSON 格式
      .then(data => {
        // 检查 from 和 from_who 是否存在，并拼接成完整的字符串
        let from_text = '';
        if (data.from) {
          from_text += `「${data.from}」`;
        }
        if (data.from_who) {
          from_text += ` ©${data.from_who}`;
        }

        // 更新数据
        this.hitokotoLink = `https://hitokoto.cn/?uuid=${data.uuid}`;
        this.hitokotoText = `🍃『 ${data.hitokoto} 』`;
        this.authorText = from_text ? `——${from_text}` : '';
      })
      .catch(console.error);
  }
};
</script>
