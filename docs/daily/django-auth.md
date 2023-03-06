---
icon: b fa-simplybuilt
category: 天天笔记

tag:
  - Django
---

# Django自定义认证

[django中request.user的由来 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/415424659)

重点是通过重写 `from django.contrib.auth.backends import BaseBackend` 的 `authenticate` 和 `get_user` 方法实现

可以参考 `ModelBackend` 写法，Django  `AbstractUser(AbstractBaseUser, PermissionsMixin)` 中的 `PermissionsMixin` 便是调用了其中的 验权方法，2者有着较高的耦合。

request.user 由 auth.get_user() 维护最上层 session 验证，auth.login 通过调用该函数实现 request.user，可通过重写 auth.get_user auth.login auth.logout 等函数实现