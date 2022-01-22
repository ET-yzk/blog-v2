---
icon: b fa-simplybuilt
category: 天天笔记
time: 2022-01-20
sidebar: auto
tag:
  - Vue
---

# Vue3 Lifecycle

## 生命周期图示

下图展示了实例的生命周期。我们不需要立马弄明白所有的东西，不过随着不断学习和使用，它的参考价值会越来越高。

![lifecycle](https://gitee.com/yzketx/image-markdown/raw/master/img/202201221208294.svg)

## lifecycle-hooks

| 选项式 API        | Hook inside `setup` |
| ----------------- | ------------------- |
| `beforeCreate`    | Not needed\*        |
| `created`         | Not needed\*        |
| `beforeMount`     | `onBeforeMount`     |
| `mounted`         | `onMounted`         |
| `beforeUpdate`    | `onBeforeUpdate`    |
| `updated`         | `onUpdated`         |
| `beforeUnmount`   | `onBeforeUnmount`   |
| `unmounted`       | `onUnmounted`       |
| `errorCaptured`   | `onErrorCaptured`   |
| `renderTracked`   | `onRenderTracked`   |
| `renderTriggered` | `onRenderTriggered` |
| `activated`       | `onActivated`       |
| `deactivated`     | `onDeactivated`     |