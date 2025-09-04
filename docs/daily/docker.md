---
icon: simplybuilt
category: 天天笔记
date: 2025-01-18
---

# Docker 实践

1. 若遇到 docker 容器服务长时间启动不起来，即长时间处于 `starting` 状态，很可能是对外端口与主机使用端口出现冲突，排查方法如下：

   ```bash
   # 首先，查看 docker 服务的日志文件，若端口冲突会在其中显示
   sudo journalctl -u docker.service
   
   # 若锁定是端口冲突问题后，可以选择找到占用端口的服务停止，或者修改 docker-compose.yml 文件中的对外端口
   sudo lsof -i :[端口号]  # 查看占用端口的进程信息
   ```

   若选择修改 `docker-compose.yml` 文件，修改对外的端口即可，容器之间的调用仍按照内部端口地址，不用修改！==还需要进一步学习docker网络方面的知识==

   注：`${}` 是环境变量替换的语法，用于在 Docker Compose 文件中引用环境变量的值。具体来说：

   - `${VARIABLE_NAME}`：表示从环境变量中获取 `VARIABLE_NAME` 的值。
   - `${VARIABLE_NAME:-default_value}`：如果环境变量 `VARIABLE_NAME` 未设置或为空，则使用 `default_value` 作为默认值。