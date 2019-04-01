
# wechat_game_packing_tool

creator 微信小游戏 辅助工具  
* 扫描大图片  
* 自动上传远程资源  


下载此项目

将 .gitlab-ci.yml 、searchGamePicFile.py 和 MiniGameProjectSet.json 文件复制到自己项目根目录下  
自己项目中 .gitignore 文件 找到  /build  选项 取消注释  将 build文件夹内容添加到项目中  


## 配置文件设置
设置MiniGameProjectSet.json中的project_name  developer

```json
    // 项目名称    eg  kill_star
    "project_name": "kill_star",
    // 开发者  eg  zhanghanDev
    "developer": "zhanghanDev",
 
```


## 扫描图片 按照大小排序
设置MiniGameProjectSet.json中的
```json
 
    //creator assets文件夹在gitlab中相对路径
    "assets_path": "assets/",
    //开启image扫描 功能
    "scanning_assets_image": true,
 
```
排序结果见ci cd  输出  
本地安装python3以后，
切换到脚本所在路径 cmd 运行 也可以获取结果   
` python3 searchGamePicFile.py  `

## 自动上传资源到服务器上  

设置MiniGameProjectSet.json中的

```json
    // 项目名称    eg  kill_star
    "project_name": "kill_star",
    // 开发者  eg  zhanghanDev
    "developer": "zhanghanDev",
    // res资源文件夹在项目中的相对路径
    "res_path": "/build/res/",
    // 是否上传res文件
    "upload_res": true,
```

提交自己的项目  
然后打开gitlab项目页面 流水线 选项 查看运行结果  
测试服务器时 远程地址 见运行结果  
正式服务器 远程地址  见运行结果  


## 计划功能


*  对assets中的图片进行自动压缩   
*  子域编译好以后，自动拷贝一份到对应位置  