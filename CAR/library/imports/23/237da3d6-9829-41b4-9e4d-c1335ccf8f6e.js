"use strict";
cc._RF.push(module, '237daPWmClBtJ5NwTNcz49u', 'LoadingSceneJS');
// Scripts/LoadingSceneJS.js

"use strict";

var GameDataManager = require("GameDataManagerJS");
var define = require("define");
var point = 0;
var isLoading = false;
var isAuthorization = false;
cc.Class({
    extends: cc.Component,

    properties: {
        wxlog_btn: cc.Node,
        loadingBar: {
            type: cc.ProgressBar,
            default: null
        },
        loadinglab: cc.Sprite,
        loadingpercent: cc.Label,
        titlebg: cc.Sprite,
        audioControl: {
            default: null
        }
    },
    onLoad: function onLoad() {
        var _this = this;

        //   cc.sys.localStorage.clear();
        // GameDataManager.getInstance().adapt(this.node) 
        var can = cc.find("Canvas").getComponent(cc.Canvas);
        cc.winSize.width / cc.winSize.height <= (750 / 1334).designScreen ? (can.fitHeight = false, can.fitWidth = true) : (can.fitHeight = true, can.fitWidth = false);
        can.alignWithScreen();
        if (CC_WECHATGAME) {
            cc.game.on("impower", function (sure) {
                if (sure) {
                    console.log("授权成功！");
                    isAuthorization = true;
                    _this.wxlog_btn.active = false;
                    _this.loadingBar.node.active = true;
                    _this.loadinglab.node.active = true;
                    _this.loadingpercent.node.active = true;

                    GameDataManager.getInstance().preLoadingdata();
                    if (!define.getgold()) {
                        GameDataManager.getInstance().savegold(define.money);
                        cc.log("首次加载游戏获取到当前金币(应为100)", GameDataManager.getInstance().getgold());
                    }
                    if (!define.getcarskin()) {
                        cc.log("第一次保存皮肤");
                        GameDataManager.getInstance().savecarskin(define.carskin);
                    }
                } else {}
            });
            this.getInfo();
            this.loadingBar.progress = 0;
            this.loadingBar.node.active = false;
            this.loadinglab.node.active = false;
            this.loadingpercent.node.active = false;
        } else {
            console.log("授权成功！");

            isAuthorization = true;
            this.wxlog_btn.active = false;
            this.loadingBar.node.active = true;
            this.loadinglab.node.active = true;
            this.loadingpercent.node.active = true;

            GameDataManager.getInstance().preLoadingdata();
            if (!define.getgold()) {
                GameDataManager.getInstance().savegold(define.money);
                cc.log("首次加载游戏获取到当前金币(应为100)", GameDataManager.getInstance().getgold());
            }
            if (!define.getcarskin()) {
                cc.log("第一次保存皮肤");
                GameDataManager.getInstance().savecarskin(define.carskin);
            }
        }
        //iPhoneX适配
        // console.log("-----",cc.sys.platform)
        // console.log("+++++",cc.sys.IPHONE)
        if (cc.sys.isNative && cc.sys.platform == cc.sys.IPHONE) {
            console.log("***iPhoneX**");
            var size = cc.view.getFrameSize();
            var isIphoneX = size.width == 2436 && size.height == 1125 || size.width == 1125 && size.height == 2436;
            if (isIphoneX) {
                var cvs = this.node.getComponent(cc.Canvas);
                cvs.fitHeight = true;
                cvs.fitWidth = true;
            }
        }
    },
    getInfo: function getInfo() {
        return new Promise(function (resolve, reject) {
            if (CC_WECHATGAME) {
                wx.getSetting({
                    success: function success(res) {
                        if (!res.authSetting['scope.userInfo']) {
                            if (wx.createUserInfoButton) {
                                var button = wx.createUserInfoButton({
                                    type: 'text',
                                    text: '',
                                    style: {
                                        left: 0,
                                        top: 0,
                                        width: 5000,
                                        height: 5000,
                                        lineHeight: 40,
                                        backgroundColor: '',
                                        color: '',
                                        textAlign: 'center',
                                        fontSize: 40,
                                        borderRadius: 10
                                    }
                                });

                                button.onTap(function () {
                                    wx.getUserInfo({
                                        success: function success(res) {
                                            button.hide();
                                            define.nickName = res.userInfo.nickName;
                                            define.avatarUrl = res.userInfo.avatarUrl;
                                            cc.game.emit("impower", true);
                                            resolve();
                                        },
                                        fail: function fail(res) {
                                            console.log(res);
                                            cc.game.emit("impower", false);
                                            reject();
                                        }
                                    });
                                });
                            } else {
                                wx.authorize({
                                    scope: 'scope.userInfo',
                                    success: function success() {
                                        wx.getUserInfo({
                                            success: function success(res) {
                                                define.nickName = res.userInfo.nickName;
                                                define.avatarUrl = res.userInfo.avatarUrl;
                                                resolve();
                                            },
                                            fail: function fail(res) {
                                                reject();
                                            }
                                        });
                                    }
                                });
                            }
                        } else {
                            wx.getUserInfo({
                                success: function success(res) {
                                    console.log('res', res);
                                    define.nickName = res.userInfo.nickName;
                                    define.avatarUrl = res.userInfo.avatarUrl;
                                    cc.game.emit("impower", true);
                                    resolve();
                                },
                                fail: function fail(res) {
                                    reject();
                                }
                            });
                        }
                    }
                });
            } else {
                resolve();
            }
        });
    },
    start: function start() {
        cc.director.preloadScene("main", cc.log('预加载main'));
        //适配
        console.log('    cc.winSize =' + cc.winSize); //以磅为单位返回WebGL视图的大小。它考虑了窗口的任何可能的旋转
        console.log('    cc.view.getVisibleSize() =' + cc.view.getVisibleSize()); //返回正在运行的场景的可见大小
        console.log('    cc.view.getFrameSize() =' + cc.view.getFrameSize()); //返回视图的帧大小。在本机平台上，它返回屏幕大小，因为视图是全屏视图。在Web上，它返回画布外部DOM元素的大小
        console.log('    cc.view.getDesignResolutionSize() =' + cc.view.getDesignResolutionSize()); //返回视图的设计大小。默认分辨率大小与'getFrameSize'相同
        var DesignResolutionSize = cc.view.getDesignResolutionSize();
        var WinSize = cc.winSize;
        var nodeX = WinSize.width / DesignResolutionSize.width;
        var nodeY = WinSize.height / DesignResolutionSize.height;
        console.log('    nodeX=   ' + nodeX + '  nodeY=' + nodeY);
    },
    update: function update(dt) {
        this.updateload(dt);
    },
    updateload: function updateload(dt) {
        if (isAuthorization) {
            if (this.loadingBar.progress >= 1 && isLoading == false) {
                isLoading = true;
                this.onLoadComplete();
            }
            point += dt;
            this.loadingBar.progress = point / 3 > 1 ? 1 : point / 3;
            this.loadingpercent.string = Math.floor(this.loadingBar.progress * 100) + "%";
        }
    },
    onLoadComplete: function onLoadComplete() {
        cc.director.loadScene("main");
    }
});

cc._RF.pop();