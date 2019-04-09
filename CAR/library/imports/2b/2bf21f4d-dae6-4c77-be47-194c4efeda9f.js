"use strict";
cc._RF.push(module, '2bf219N2uZMd75HGUxO/tqf', 'exported-GameBox');
// wechat_game_module-master/exp/GameBox/Script/exported-GameBox.js

"use strict";

var fileSystemManager = require("WeChatFileSystemManager");
var KEY = "NewGameBox";
var VERSION = "1.0.1";
cc.Class({
    extends: cc.Component,

    properties: {
        itemBox: cc.Node,

        gamePrefab: cc.Prefab,
        gamePrefabScript: "",

        canvas: cc.Node,
        waiting: cc.Node,
        layer: cc.Node,

        version: cc.Label,

        btn: cc.Node

        // gameBoxJson: cc.JsonAsset,

    },

    init: function init(gameName) {

        // this.miniGameList = [
        //     "wxd5a257d6ee2b8f91",//飞机大作战
        //     "wx515f44394eab5985",//切水果
        //     "wxf49b0a26d9405058",//恋爱球球
        //     "wxea245f85c9673414",//俄罗斯方块
        //     "wx08beeb18dc512c2f",//消灭星星
        //     "wxc4e628aa7caa2c07",//飞刀
        //     "wxd9589cd7117d0873",//最囧
        //     "wx0af703a36035c60c",//2048六角消除数字方块//"wx40fb3563b8ac79b2",//2048
        //     "wx6616ae605010e605",//欢乐球球
        //     "wxac5820bc06a3a893",//弹球弹一弹//"wx528f5a9cd16be88a"//贪吃蛇
        // ];
        this.miniGameList = {};

        this.miniGameList["wxd5a257d6ee2b8f91"] = true; //飞机大作战
        this.miniGameList["wx515f44394eab5985"] = true; //切水果
        this.miniGameList["wxf49b0a26d9405058"] = true; //恋爱球球
        this.miniGameList["wxea245f85c9673414"] = true; //俄罗斯方块
        this.miniGameList["wx08beeb18dc512c2f"] = true; //消灭星星
        this.miniGameList["wxc4e628aa7caa2c07"] = true; //飞刀
        this.miniGameList["wxd9589cd7117d0873"] = true; //最囧
        this.miniGameList["wx0af703a36035c60c"] = true; //2048六角消除数字方块//"wx40fb3563b8ac79b2",//2048
        this.miniGameList["wx6616ae605010e605"] = true; //欢乐球球
        this.miniGameList["wxac5820bc06a3a893"] = true; //弹球弹一弹//"wx528f5a9cd16be88a"//贪吃蛇

        var loadString = cc.sys.localStorage.getItem(KEY);
        if (loadString == null || loadString.length == 0) {
            cc.sys.localStorage.setItem(KEY, JSON.stringify({}));
        }

        if (CC_WECHATGAME) {
            fileSystemManager.init("NewGameBox", gameName);
        }

        this.startP = cc.v2(-cc.winSize.width * 0.5 - 220, 50);
        this.endP = cc.v2(this.canvas.width * 0.5 - cc.winSize.width * 0.5, 50);
        this.canvas.position = this.startP;

        this.version.string = "V " + VERSION;
        this.state = "close";

        this.btn = this.btn.getComponent("exported-Button");
        this.btn.init(this);

        this.initItemBox();

        this.initJson(gameName);
    },

    initItemBox: function initItemBox() {
        var windowSize = cc.winSize;
        if (windowSize.width / windowSize.height >= 2.1) {
            console.log("x");
            this.itemBox.getComponent("cc.Widget").left = 120;
        }
    },

    initJson: function initJson(gameName) {
        var self = this;
        var urlPath = "https://www.7cgames.cn/transfer.php?url=https://www.7cgames.cn/GameRes/7CGamesBoxWX/NewGameBox/7cgamesBoxData.json?" + gameName;
        // var urlPath = "http://192.168.0.108/transfer.php?url=http://192.168.0.108/GameRes/7CGamesBoxWX/NewGameBox/7cgamesBoxData.json";
        cc.loader.load(urlPath, function (err, res) {
            if (err) console.log(err);else {
                // console.log(res);
                self.addList(res);
            }
        });

        // var json = this.gameBoxJson.json;
        // // console.log(json);
        // self.addList(JSON.stringify(json));
    },

    addList: function addList(res) {
        var self = this;
        self.serverString = res;
        self.loadString = cc.sys.localStorage.getItem(KEY);
        self.newlist = {};

        self.initList();
        self.UpdateLocal();
    },

    UpdateLocal: function UpdateLocal() {
        var _this = this;

        console.log("整体更新本地");

        var serverData = JSON.parse(this.serverString);
        var localData = JSON.parse(cc.sys.localStorage.getItem(KEY));

        var array = Object.keys(localData);

        console.log("本地个数：", array.length);
        console.log("服务器个数：", serverData.data.length);

        array.forEach(function (element) {
            if (_this.newlist[element]) {

                if (_this.newlist[element].logo != localData[element].logo) {
                    if (CC_WECHATGAME) {
                        fileSystemManager.removeFile({
                            url: localData[element].logo,
                            success: function success() {
                                console.log("删除成功");
                            }
                        });
                    } else {
                        console.log("删除成功: " + localData[element].title + ",logo");
                        console.log("删除成功: " + localData[element].logo);
                    }
                }

                if (_this.newlist[element].qrcode != localData[element].qrcode) {
                    if (CC_WECHATGAME) {
                        fileSystemManager.removeFile({
                            url: localData[element].qrcode,
                            success: function success() {
                                console.log("删除成功");
                            }
                        });
                    } else {
                        console.log("删除成功: " + localData[element].title + ",qrcode");
                        console.log("删除成功: " + localData[element].qrcode);
                    }
                }
            } else {
                console.log("不存在");
                console.log("删除旧的" + localData[element].title + "本地文件");

                if (CC_WECHATGAME) {
                    fileSystemManager.removeFile({
                        url: localData[element].logo,
                        success: function success() {
                            console.log("删除成功");
                        }
                    });
                    fileSystemManager.removeFile({
                        url: localData[element].qrcode,
                        success: function success() {
                            console.log("删除成功");
                        }
                    });
                } else {
                    console.log("删除成功: " + localData[element].title + "全部文件");
                }
            }
        });

        console.log("整体更新完成");
        cc.sys.localStorage.setItem(KEY, JSON.stringify(this.newlist));
    },

    initList: function initList() {
        var _this2 = this;

        var self = this;
        var list = JSON.parse(this.serverString).data;

        var length = list.length;
        var k = false;
        if (CC_WECHATGAME) {
            wx.getSystemInfo({
                success: function success(res) {
                    var platform = res.platform;
                    if (platform == "ios") {
                        console.log("ios");
                        k = true;
                    } else if (platform == "android") {
                        console.log("android");
                    } else if (platform == "devtools") {
                        console.log("devtools");
                    } else if (platform == "web") {
                        console.log("web");
                    }
                }
            });
        }

        // length =10;
        // k = true;


        // list.forEach(element => {

        // });

        var _loop = function _loop(index) {
            var element = list[index];

            // if("wx752f89793f11fd94" == element.appid)
            // console.log("ok???");
            if (k) {
                if (_this2.miniGameList[element.appid]) {} else {
                    return "continue";
                }
            }

            var node = cc.instantiate(self.gamePrefab);

            node.getComponent(self.gamePrefabScript).init({
                width: cc.winSize.width * 0.2,
                name: element.title,
                appid: element.appid,
                spriteFrame: null,
                style: element.style,
                qrcode: element.qrcode,
                btnCallback: self.btnCallback.bind(self)
            });

            node.parent = self.itemBox;

            if (CC_WECHATGAME) {
                fileSystemManager.getFile({
                    url: element.logo,
                    success: function success(remoteUrl) {
                        cc.loader.load(remoteUrl, function (err, texture) {

                            var spriteFrame = new cc.SpriteFrame(texture);
                            node.getComponent(self.gamePrefabScript).setSpriteFrame(spriteFrame);
                        });
                    },
                    fail: function fail() {
                        console.log("加载图片失败");
                    }
                });
            } else {
                default_icon_url_head = "http://192.168.0.108/transfer.php?url=";
                urlPath = default_icon_url_head + element.logo;
                url = { url: urlPath + "?ass", type: "png" };
                // url = url.url+ "?"

                console.log(url);
                cc.loader.load(url, function (err, texture) {
                    var spriteFrame = new cc.SpriteFrame(texture);
                    node.getComponent(self.gamePrefabScript).setSpriteFrame(spriteFrame);
                });
            }

            _this2.newlist[element.appid] = {
                desc: element.desc,
                title: element.title,
                logo: element.logo,
                qrcode: element.qrcode
            };
        };

        for (var index = 0; index < length; index++) {
            var default_icon_url_head;
            var urlPath;
            var url;

            var _ret = _loop(index);

            if (_ret === "continue") continue;
        }
    },

    btnCallback: function btnCallback(res) {
        console.log(res);
        var appid = res.appid;
        var qrcode = res.qrcode;
        var self = this;
        // self.waiting.active = true;

        if (CC_WECHATGAME) {
            if (wx.navigateToMiniProgram) {

                wx.navigateToMiniProgram({
                    appId: appid,
                    path: '',
                    success: function success() {
                        console.log("打开成功");

                        // self.waiting.active = false;
                    },

                    fail: function fail(err) {
                        console.log(err);

                        if (err.errMsg.indexOf("fail cancel") == -1) {
                            self.showQR({
                                qrcode: qrcode
                            });
                        } else {
                            // self.waiting.active = false;
                        }
                    }
                });
            } else {

                console.log("navigateToMiniProgram 低版本适配");

                self.showQR({
                    qrcode: qrcode
                });
            }
        } else {

            // self.waiting.active = false;

        }
    },

    showQR: function showQR(res) {
        var self = this;
        fileSystemManager.getFile({
            url: res.qrcode,
            success: function success(remoteUrl) {
                wx.previewImage({
                    urls: [remoteUrl],
                    success: function success() {
                        // self.waiting.active = false;
                        console.log("wei xin previewImage success....");
                    }
                });
            },
            fail: function fail() {
                console.log("加载图片失败");
                // self.waiting.active = false;
            }
        });
    },

    show: function show(data) {

        var self = this;
        var first = cc.callFunc(function () {
            // this.startPosition = this.canvas.position;

            self.state = "move";
        }, this);
        var move = cc.moveTo(0.3, self.endP);
        var finished = cc.callFunc(function () {
            self.state = "open";

            data.callback && data.callback();

            if (data.appid) {
                if (self.newlist[data.appid]) {
                    this.layer.getComponent("exported-Layer").init({
                        appid: data.appid,
                        title: self.newlist[data.appid].title,
                        desc: self.newlist[data.appid].desc,
                        qrcode: self.newlist[data.appid].qrcode,
                        callback: self.btnCallback.bind(self)
                    });

                    if (CC_WECHATGAME) {
                        fileSystemManager.getFile({
                            url: self.newlist[data.appid].logo,
                            success: function success(remoteUrl) {
                                cc.loader.load(remoteUrl, function (err, texture) {

                                    var spriteFrame = new cc.SpriteFrame(texture);
                                    self.layer.getComponent("exported-Layer").setGameLogo(spriteFrame);
                                });
                            },
                            fail: function fail() {
                                console.log("加载图片失败");
                            }
                        });
                    }
                    this.layer.active = true;
                } else {
                    console.log("不存在");
                }
            }
        }, this);

        var seq = cc.sequence(first, move, finished);

        if (this.state == "close") {
            this.canvas.runAction(seq);
        }
    },

    hide: function hide(data) {
        var self = this;
        var first = cc.callFunc(function () {
            this.state = "move";
        }, this);
        var move = cc.moveTo(0.3, self.startP);
        var finished = cc.callFunc(function () {
            this.state = "close";

            data.callback && data.callback();
        }, this);

        var seq = cc.sequence(first, move, finished);

        if (this.state == "open") {
            this.canvas.runAction(seq);
        }
    },

    //test
    readBtn: function readBtn() {
        if (CC_WECHATGAME) {
            fileSystemManager.showFile();
        } else {
            var localData = JSON.parse(cc.sys.localStorage.getItem(KEY));
            // console.log(localData);
            if (localData != "null") {
                var array = Object.keys(localData);
                console.log(array);
            } else {
                console.log("空");
            }
        }
    },

    clearLocsl: function clearLocsl() {
        cc.sys.localStorage.setItem(KEY, JSON.stringify({}));
    },

    removeAllFile: function removeAllFile() {

        if (CC_WECHATGAME) {
            var loadString = cc.sys.localStorage.getItem(KEY);
            var localData = JSON.parse(loadString);
            var array = Object.keys(localData);
            console.log(array);

            array.forEach(function (element) {

                fileSystemManager.removeFile({
                    url: localData[element].logo,
                    success: function success() {
                        console.log("删除成功");
                    }
                });

                fileSystemManager.removeFile({
                    url: localData[element].qrcode,
                    success: function success() {
                        console.log("删除成功");
                    }
                });
            });
            cc.sys.localStorage.setItem(KEY, JSON.stringify({}));
        } else {
            cc.sys.localStorage.setItem(KEY, JSON.stringify({}));
        }
    }

});

cc._RF.pop();