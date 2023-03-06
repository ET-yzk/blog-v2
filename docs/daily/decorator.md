---
icon: b fa-simplybuilt
category: 天天笔记

---

# 如何理解 Python 装饰器

[理解Python装饰器(Decorator) - 简书 (jianshu.com)](https://www.jianshu.com/p/ee82b941772a)

```python
import functools

def log(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print('call %s():' % func.__name__)
        print('args = {}'.format(*args))
        return func(*args, **kwargs)

    return wrapper
#  关注 return，python的特点就在于wan

@log
def test(p):
    print(test.__name__ + " param: " + p)
    
test("I'm a param")

# ========================等价于==================================

def test(p):
    print(test.__name__ + " param: " + p)

# ！！！！func的参数是这么传的
wrapper = log(test)
wrapper("I'm a param")
```