# Pycharm 远程开发

pycharm的远程开发，关键在于配置远程解释器，在配置远程解释器时需要选择远程映射目录，默认为`/tmp/pycharm_project_xxx`，其中保存的便是本地项目的远程同步文件，如果不需要将本地文件在服务区同步保留可以不更改，如果需要在远程服务器也保存文件则需要将其修改到指定远程文件夹，及下图的同步文件夹后半部。

![image-20230926115713721](https://raw.githubusercontent.com/ET-yzk/picgo/blog/image-20230926115713721.png)

在“配置远程解释器”完成后，便会在“工具-->部署”中添加远程主机配置，此时选中的远程主机才是适配**当前远程解释器**的。

![image-20230926120236824](https://raw.githubusercontent.com/ET-yzk/picgo/blog/image-20230926120236824.png)

也即远程开发的关键在于 **远程主机部署路径与远程解释器同步文件夹**的对应（上图的远程主机是在添加远程解释器指定来如上同步文件夹后默认创建的，且当前选中配置的远程主机为左上角的✅），否则会报错如下。

```shell
Cannot find remote credentials for target config com.jetbrains.plugins.remotesdk.target.webDeployment.WebDeploymentTargetEnvironmentConfiguration
```

![image-20230926115318549](https://raw.githubusercontent.com/ET-yzk/picgo/blog/image-20230926115318549.png)

如上图，正确配置后的情况，部署上部分选项都会点亮。