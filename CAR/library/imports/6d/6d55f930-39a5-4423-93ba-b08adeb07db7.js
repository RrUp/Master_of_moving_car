"use strict";
cc._RF.push(module, '6d55fkwOaVEI5O6sIresH23', 'exported-GameBox');
// Prefab/GameBox-master/script/exported-GameBox.js

"use strict";

var fileSystemManager = require("WeChatFileSystemManager");
var KEY = "NewGameBox";
var VERSION = "1.0.1";
cc.Class({
    extends: cc.Component,

    properties: {
        itemBox: {
            default: [],
            type: cc.Node
        },

        gamePrefab: cc.Prefab,
        gamePrefabScript: "",

        canvas: cc.Node,
        layout: cc.Node,
        waiting: cc.Node,
        layer: cc.Node,

        version: cc.Label

        // gameBoxJson: cc.JsonAsset,

    },

    init: function init(gameName) {
        var loadString = cc.sys.localStorage.getItem(KEY);
        if (loadString == null || loadString.length == 0) {
            cc.sys.localStorage.setItem(KEY, JSON.stringify({}));
        }

        if (CC_WECHATGAME) {
            fileSystemManager.init("NewGameBox", gameName);
        }

        this.version.string = "V " + VERSION;

        this.initItemBox();
        this.initLayout();
        this.initJson(gameName);
        this.isRunningA = true;
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

        list.forEach(function (element) {
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

            node.parent = self.itemBox[element.type - 1];

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
                var default_icon_url_head = "http://192.168.0.108/transfer.php?url=";
                var urlPath = default_icon_url_head + element.logo;
                var url = { url: urlPath + "?ass", type: "png" };
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
        });
    },

    btnCallback: function btnCallback(res) {
        console.log(res);
        var appid = res.appid;
        var qrcode = res.qrcode;
        var self = this;
        self.waiting.active = true;

        if (CC_WECHATGAME) {
            if (wx.navigateToMiniProgram) {

                wx.navigateToMiniProgram({
                    appId: appid,
                    path: '',
                    success: function success() {
                        console.log("打开成功");

                        self.waiting.active = false;
                    },

                    fail: function fail(err) {
                        console.log(err);

                        if (err.errMsg.indexOf("fail cancel") == -1) {
                            self.showQR({
                                qrcode: qrcode
                            });
                        } else {
                            self.waiting.active = false;
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

            self.waiting.active = false;
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
                        self.waiting.active = false;
                        console.log("wei xin previewImage success....");
                    }
                });
            },
            fail: function fail() {
                console.log("加载图片失败");
                self.waiting.active = false;
            }
        });
    },

    initLayout: function initLayout() {
        var windowSize = cc.winSize;
        if (windowSize.height / windowSize.width >= 2.1) {
            this.layout.getComponent("cc.Widget").top = 40;
        }
    },

    initItemBox: function initItemBox() {

        this.itemBox.forEach(function (element) {
            element.getComponent("cc.Layout").spacingX = cc.winSize.width * 0.04;
            element.getComponent("cc.Layout").spacingY = cc.winSize.width * 0.03;

            element.getComponent("cc.Layout").paddingTop = cc.winSize.width * 0.02;
            element.getComponent("cc.Layout").paddingBottom = cc.winSize.width * 0.04;

            element.getComponent("cc.Layout").paddingLeft = cc.winSize.width * 0.04;
        });
    },

    show: function show(data) {
        cc.log("moregameshow");
        var self = this;
        var first = cc.callFunc(function () {
            this.startPosition = this.canvas.position;

            self.isRunningA = false;
        }, this);
        var move = cc.moveTo(0.3, cc.v2(0, 0));
        var finished = cc.callFunc(function () {
            self.isRunningA = true;

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

        if (this.isRunningA) {
            this.canvas.runAction(seq);
        }
    },

    hide: function hide(data) {
        var self = this;
        var first = cc.callFunc(function () {
            self.isRunningA = false;
        }, this);
        var move = cc.moveTo(0.3, this.startPosition);
        var finished = cc.callFunc(function () {
            self.isRunningA = true;

            data.callback();
        }, this);

        var seq = cc.sequence(first, move, finished);

        if (this.isRunningA) {
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