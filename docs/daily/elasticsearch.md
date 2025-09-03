---
icon: b fa-simplybuilt
category: 天天笔记
date: 2025-04-18
---

# Docker 安装 elasticsearch

## 安装

### 通过压缩包安装（推荐）

> 对于平时跑跑实验推荐用本方法，简单省心

1. 下载安装包

   ```bash
   wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-8.15.2-linux-x86_64.tar.gz
   ```

2. 解压

   ```bash
   tar -zxvf elasticsearch-8.15.2-linux-x86_64.tar.gz -C ./elastic
   ```

3. 修改配置，允许远程访问

   ```bash
   vim config/elasticsearch.yml
   ```

   <img src="https://raw.githubusercontent.com/ET-yzk/picgo/blog/image-20240929185606036.png" alt="image-20240929185606036" style="zoom: 33%;" />

4. 启动 elasticsearch

   ```bash
   ./bin/elasticsearch
   ```

4. 访问 `ip:9200` 检验

### 通过 docker 安装

1. 设置 docker network

   ```bash
   docker network create elastic
   ```

2. 下载 elasticsearch docker 镜像

   ```bash
   docker pull docker.elastic.co/elasticsearch/elasticsearch:8.15.1
   ```

3. 启动 elasticsearch 容器服务

   ```bash
   sudo docker run \
     --name es \
     -e "http.host=0.0.0.0" \  # 允许外网访问
     -e "discovery.type=single-node" \  # 配置为单集群模式
     -e "xpack.security.enabled=false" \  # 关闭 ssl
     --net elastic \
     -p 9210:9200 \  # elasticsearch 默认端口为 9200
     -itd \
     -m 2GB \  # 配置最大内存限制，这样就不用额外设置 jvm 内存大小
     docker.elastic.co/elasticsearch/elasticsearch:8.15.1
   ```

4. 访问 `ip:9210` 检验

## 踩坑

### 启动镜像服务时，出现 `exit(78)` 报错

#### 定位报错信息

```bash
ERROR: max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]
```

#### 报错分析

虚拟空间内存太低，至少需要分配到 262144 kb

#### 解决方案

1. 修改分配给 elasticsearch 的虚拟用户内存

   ```bash
   vim /etc/sysctl.conf
   # 添加 vm.max_map_count=262144
   # 8388608
   ```

2. 确认配置文件设置

   ```bash
   sysctl -p
   ```

3. 重新启动 elsticsearch 容器

   ```bash
   sudo docker start es
   ```

## 成功

```json
{
    "name": "087ad01f3658",
    "cluster_name": "docker-cluster",
    "cluster_uuid": "9iGY0nM9QbiIXQN8vCIQYA",
    "version": {
        "number": "8.15.1",
        "build_flavor": "default",
        "build_type": "docker",
        "build_hash": "253e8544a65ad44581194068936f2a5d57c2c051",
        "build_date": "2024-09-02T22:04:47.310170297Z",
        "build_snapshot": false,
        "lucene_version": "9.11.1",
        "minimum_wire_compatibility_version": "7.17.0",
        "minimum_index_compatibility_version": "7.0.0"
    },
    "tagline": "You Know, for Search"
}
```

