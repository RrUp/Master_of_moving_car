
module.exports = {
    //初始化文件系统
    init: function (urlRoot,gameName) {
        this.fileSystemManager = wx.getFileSystemManager();
        //微信本地用户文件目录
        this.rootPath = `${wx.env.USER_DATA_PATH}`;
        //相对的URL的目录，为之后通过 URL 找到文件做准备
        this.urlRoot = urlRoot;
        this.gameName = gameName;
        console.log(this.gameName);
    },

    //通过 URL 转换到文件名 支持多级目录
    // 例如：   URL    = https://www.7cgames.cn/GameRes/7CGamesBoxWX/NewGameBox/QR/dtds-wx87fb6c7ae9ec4923-1.jpg
    // 转换成： 文件名  = NewGameBox-QR-dtds-wx87fb6c7ae9ec4923-1.jpg 
    getFileName: function (url) {
        // console.log(url);

        //找到符合的位置
        var relativePath = url.substring(url.indexOf(this.urlRoot), url.length);

        //把 ‘/’ 替换成 ‘-’
        while (relativePath.indexOf("/") != -1) {
            var k = relativePath.indexOf("/");
            var directory = relativePath.substring(0, k);
            var file = relativePath.substring(k + 1, relativePath.length);
            relativePath = directory + '-' + file;
        }

        // console.log(relativePath);

        return relativePath;
    },

    //得到文件
    getFile: function (data) {
        //拿到本地用户目录下的文件
        var fileName = this.getFileName(data.url);
        var path = this.rootPath + "/" + fileName;
        var self = this;

        //是否存在   存在是文件还是目录(目录是多于的判断，但是可以避免错误的url)
        this.fileSystemManager.stat({
            path: path,
            success: function (res) {
                if (res.stats.isDirectory()) {
                    // console.log("这是目录");
                }
                if (res.stats.isFile()) {
                    console.log("这是文件： " +fileName);
                    data.success(path);
                }
            },
            fail: function (err) {
                //文件不存在 我们就下载
                // console.log(err);
                console.log(fileName + "文件不存在，下载");
                console.log(data.url + "?" + self.gameName);
                wx.downloadFile({
                    url: data.url + "?" + self.gameName,
                    success: function (res) {
                        //下载成功
                        // console.log(res);
                        console.log("下载成功");

                        wx.saveFile({
                            tempFilePath: res.tempFilePath,
                            filePath: path,
                            success: function (res1) {
                                // console.log(res1);
                                console.log("保存到本地");

                                data.success(path);
                            },
                            fail: function (err) {
                                console.log(err);
                                data.fail();
                            }
                        })
                    },
                    fail: function (err) {
                        console.log(err);
                        data.fail();
                    }
                });
            },
        });
    },

    //删除文件
    removeFile: function (data) {
        var fileName = this.getFileName(data.url);
        var path = this.rootPath + "/" + fileName;
        var self = this;
        this.fileSystemManager.stat({
            path: path,
            success: function (res) {
                self.fileSystemManager.unlink({
                    filePath: path,
                    success: function () {
                        data.success();
                    },
                    fail: function (err) {
                        console.log(err);
                    },
                });
            },
            fail: function (err) {
                // console.log(err);
                console.log("本地不存在");
                data.success();
            },
        });
    },

    showFile: function () {
        this.fileSystemManager.readdir({
            dirPath: `${wx.env.USER_DATA_PATH}`,
            success: function (res) {
                console.log(res);
            },
            fail: function () {

            },
        });
    }

}