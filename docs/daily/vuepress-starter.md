---
icon: b fa-simplybuilt
category: 天天笔记
date: 2022-01-20
sidebar: auto
tag:
  - Vue
  - VuePress
  - 使用指南
---

# VuePress

## 简介

VuePress 是一个以 Markdown 为中心的静态网站生成器。你可以使用 [Markdown在新窗口打开](https://zh.wikipedia.org/wiki/Markdown) 来书写内容（如文档、博客等），然后 VuePress 会帮助你生成一个静态网站来展示它们。

VuePress 诞生的初衷是为了支持 Vue.js 及其子项目的文档需求，但是现在它已经在帮助大量用户构建他们的文档、博客和其他静态网站。

## 安装

```bash
# 初始化项目
mkdir target-dir
cd target-dir
npm init -y  # 生成package.json

# 将 VuePress 作为一个本地依赖安装
yarn add -D vuepress # 或者：npm install -D vuepress

# 若警告 建议执行 npm found
# 建议不进行 npm install 操作，会导致部分 node_modules文件丢失

# 新建一个 docs 文件夹
mkdir docs

# 新建一个 markdown 文件
echo '# Hello VuePress!' > docs/README.md
```

在`target-dir/package.json`中加一些脚本：

```json
{
  "scripts": {
    "docs:build": "vuepress build docs",
    "docs:clean-dev": "vuepress dev docs --no-cache",
    "docs:dev": "vuepress dev docs",
    "docs:eject-theme": "vuepress eject-hope docs",
    "deploy-gh": "yarn docs:build && bash scripts/deploy.sh"
  }
}
```

## 使用

```bash
# 运行本地开发环境：
yarn docs:dev # 或者：npm run docs:dev

# 或构建线上静态文件：
yarn docs:build # 或者：npm run docs:build
```

## 部署

### 方法1：Github Action

#### 借助已有的他人 Github Action 模板

[vuepress-deploy/README.zh-CN.md at master · jenkey2011/vuepress-deploy (github.com)](https://github.com/jenkey2011/vuepress-deploy/blob/master/README.zh-CN.md)

在你项目仓库`.github/workflows`目录下创建一个 `.yml`文件，举例：`vuepress-deploy.yml`。

内容：

```yml
name: Build and Deploy
on: [push]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@master

    - name: vuepress-deploy
      uses: jenkey2011/vuepress-deploy@master
      env:
        ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
        TARGET_REPO: username/repo
        TARGET_BRANCH: master
        BUILD_SCRIPT: yarn && yarn docs:build  # 需要与 package.json 中的脚本对应
        BUILD_DIR: blog/.vuepress/dist/
```

上述配置的结果是：每次推送代码，将自动构建、部署到`username/repo`的`master`分支。就是这么简单~

#### 自定义

[部署 | VuePress (vuejs.org)](https://v2.vuepress.vuejs.org/zh/guide/deployment.html#github-pages)

1. 设置正确的 [base](https://v2.vuepress.vuejs.org/zh/reference/config.html#base) 选项。

   如果你准备发布到 `https://<USERNAME>.github.io/` ，你可以省略这一步，因为 `base` 默认就是 `"/"` 。

   如果你准备发布到 `https://<USERNAME>.github.io/<REPO>/` ，也就是说你的仓库地址是 `https://github.com/<USERNAME>/<REPO>` ，则将 `base` 设置为 `"/<REPO>/"`。

2. 选择你想要使用的 CI 工具。这里我们以 [GitHub Actions在新窗口打开](https://github.com/features/actions) 为例。

   创建 `.github/workflows/docs.yml` 文件来配置工作流。

```yml
name: docs

on:
  # 每当 push 到 main 分支时触发部署
  push:
    branches: [main]
  # 手动触发部署
  workflow_dispatch:

jobs:
  docs:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
        with:
          # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          # 选择要使用的 node 版本
          node-version: '14'

      # 缓存 node_modules
      - name: Cache dependencies
        uses: actions/cache@v2
        id: yarn-cache
        with:
          path: |
            **/node_modules
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-

      # 如果缓存没有命中，安装依赖
      - name: Install dependencies
        if: steps.yarn-cache.outputs.cache-hit != 'true'
        run: yarn --frozen-lockfile

      # 运行构建脚本
      - name: Build VuePress site
        run: yarn docs:build

      # 查看 workflow 的文档来获取更多信息
      # @see https://github.com/crazy-max/ghaction-github-pages
      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v2
        with:
          # 部署到 gh-pages 分支
          target_branch: gh-pages
          # 部署目录为 VuePress 的默认输出目录
          build_dir: docs/.vuepress/dist
        env:
          # @see https://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-github_token-secret
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## VuePress Theme

- [vuepress-theme-hope](https://vuepress-theme-hope.github.io/zh/)
- 

