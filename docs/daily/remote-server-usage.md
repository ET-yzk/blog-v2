---
icon: simplybuilt
category: 天天笔记
date: 2024-05-17

tag:
  - Ubuntu
---

# 远程服务器使用

## 1. 远程服务连接外网

背景：实验室的服务器只能通过内网访问，且无法直接连接到互联网

目标：服务器终端可正常联网，执行 pip/conda/git/wget/apt 等联网操作

前提：服务器与实验室主机同处于一个局域网，可以相互通讯；主机可联外网

方案：将实验室主机设置为跳板机，服务器通过跳板实现联网

拓展：若跳板机可以获取公网ip，则可实现任意联网设备远程连接内网服务器

 ```bash
 # 实现拓展的一种ssh远程登录方案
 ssh -L 127.0.0.1:8080:10.12.42.14:8080 zkye@zkye.local
 ssh -L 本地端口:跳板ip:跳板端口 内网服务器用户名@内网服务器地址
 ```

具体步骤：

1. mac 使用 SquidMan 实现代理 | windows 使用 CCProxy 实现代理

   ![image-20240517162525957](https://raw.githubusercontent.com/ET-yzk/picgo/blog/image-20240517162525957.png)

   ![image-20240517162621948](https://raw.githubusercontent.com/ET-yzk/picgo/blog/image-20240517162621948.png)

   ![image-20240517162657941](https://raw.githubusercontent.com/ET-yzk/picgo/blog/image-20240517162657941.png)

   ![image-20240517162828146](https://raw.githubusercontent.com/ET-yzk/picgo/blog/image-20240517162828146.png)

2. 在终端实现代理，配置你的终端配置文件，以 .zshrc 为例

   ```bash
   # 服务器通过跳板机（本地电脑）连接外网
   remote_ip="10.12.42.14"
   remote_port="10999"
   
   # https 也要用 http://xxxx 代理才行，不知道为啥子，可能 squidman 设置的 http
   alias start-local-proxy="export http_proxy=http://${remote_ip}:${remote_port} https_proxy=http://${remote_ip}:${remote_port}"
   alias start-git-proxy="git config --global http.proxy http://${remote_ip}:${remote_port};git config --global https.proxy http://${remote_ip}:${remote_port}"
   alias start-pip-proxy="pip config set global.proxy http://${remote_ip}:${remote_port}"
   alias start-conda-proxy="conda config --set proxy_servers.http http://${remote_ip}:${remote_port};conda config --set proxy_servers.https http://${remote_ip}:${remote_port}"
   
   alias stop-local-proxy="unset http_proxy https_proxy"
   alias stop-git-proxy="git config --global --unset http.proxy;git config --global --unset https.proxy"
   alias stop-pip-proxy="pip config unset global.proxy"
   alias stop-conda-proxy="conda config --remove-key proxy_servers.http"  # ;conda config --remove-key proxy_servers.https" # 这里设置一次即可删除 http & https，不知道为啥
   
   alias start-proxy="start-local-proxy;start-pip-proxy;start-git-proxy;start-conda-proxy"
   alias stop-proxy="stop-local-proxy;stop-pip-proxy;stop-git-proxy;stop-conda-proxy"
   ```

3. 在ssh终端输入

   ```bash
   # 开启代理
   start-proxy
   # 检验代理连接
   wget baidu.com
   # 关闭代理
   stop-proxy
   
   # apt 命令行设置代理示例
   sudo apt-get install -y nvidia-container-toolkit -o Acquire::http::Proxy="http://10.12.42.14:10999"
   ```

Tips: 

1. conda 要换国内源，设置~/.condarc： [anaconda | 镜像站使用帮助 | 清华大学开源软件镜像站 | Tsinghua Open Source Mirror](https://mirror.tuna.tsinghua.edu.cn/help/anaconda/)

2. 对本地服务的环回地址请求应当不走代理，如 web 等服务

   ```bash
   export no_proxy="localhost,127.0.0.1”
   ```

参考：[Conda、Git、pip、npm设置代理教程](https://blog.csdn.net/m0_61634551/article/details/130867867)

## 2. Docker 

> sudo systemctl status docker
>
> sudo systemctl restart docker
>
> sudo systemctl stop docker

### 代理相关

> 一个方法不行就下一个

`sudo vim ~/.docker/config.json`（作用在 docker 本身）

```json
{
 "proxies":
 {
   "default":
   {
     "httpProxy": "http://10.12.42.14:10999",
     "httpsProxy": "http://10.12.42.14:10999",
     "noProxy": "localhost,127.0.0.1"
   }
 }
}
```

`sudo vim /etc/systemd/system/docker.service.d/proxy.conf`（作用在 docker 本身）

```ini
[Service]
Environment="HTTP_PROXY=http://10.12.42.14:10999"
Environment="HTTPS_PROXY=http://10.12.42.14:10999"
Environment="NO_PROXY=localhost,127.0.0.1"
```

`/lib/systemd/system/docker.service`（作用在 docker 本身）

```ini
[Service]
# add proxy setting
Environment="HTTP_PROXY=http://10.12.42.14:10999"
Environment="HTTPS_PROXY=http://10.12.42.14:10999"
Environment="NO_PROXY=localhost,127.0.0.1"
```

Dockerfile 示例（作用在容器内部）

```dockerfile
FROM nvcr.io/nvidia/pytorch:24.01-py3

WORKDIR /app

# 设置代理环境变量
ENV HTTP_PROXY http://10.12.42.14:10999
ENV HTTPS_PROXY http://10.12.42.14:10999
ENV PIP_INDEX_URL https://pypi.tuna.tsinghua.edu.cn/simple/

COPY requirements.txt /app/
RUN pip install -r requirements.txt

COPY . /app/
RUN pip install -e .

VOLUME [ "/root/.cache/huggingface/", "/app/data", "/app/output", "/app/saves", "/app/config"]
EXPOSE 7860

CMD [ "llamafactory-cli", "webui" ]
```

Docker compose 示例（作用在容器内部）

```yml
version: '3.8'

services:
  llama-factory:
    build:
      dockerfile: Dockerfile
      context: .
    container_name: llama_factory
    volumes:
      - ./hf_cache:/root/.cache/huggingface/
      - ./data:/app/data
      - ./output:/app/output
      - ./saves:/app/saves
      - ./config:/app/config
      - /HDD/zkye/models:/app/models
    environment:
      - CUDA_VISIBLE_DEVICES=6
      - http_proxy=http://10.12.42.14:10999
      - https_proxy=http://10.12.42.14:10999
      - no_proxy=localhost,127.0.0.1
    ports:
      - "8090:7860"
    ipc: host
    deploy:
      resources:
        reservations:
          devices:
          - driver: nvidia
            count: "all"
            capabilities: [gpu]
    restart: unless-stopped
```

### Nvidia 驱动相关

```bash
# 若要升级 CUDA：
# 1. 若原 nvidia 驱动版本过低，需更换驱动

# 1.1 卸载原驱动
sudo apt-get remove --purge nvidia*

# 1.2 安装指定版本驱动（与目标 CUDA 匹配）
# 参考：https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html
sudo apt install nvidia-driver-530
sudo rebbot

# 1.3 安装指定版本 CUDA Toolkit
# 历史版本：https://developer.nvidia.com/cuda-toolkit-archive
# 参考：https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&Distribution=Ubuntu&target_version=22.04&target_type=runfile_local
# 建议选择 runfile_local 形式安装
# 在进入安装的命令行界面后，Driver 处点击 “空格” 取消勾选即可

# 2. 安装 Nvidia 显卡 容器配置
# 参考：https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html
```

