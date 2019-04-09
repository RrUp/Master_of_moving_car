(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/wechat_game_module-master/Script/wechatgame.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd452fpujWFM7qldugP7LcGy', 'wechatgame', __filename);
// wechat_game_module-master/Script/wechatgame.js

"use strict";

var miniProgramAppid = "wx361c9e49bd9033ca";
var moreGameQRCodeUrl = "https://www.7cgames.cn/GameRes/fangyipengDir/7CGamesBoxWX/QRCode/WXGamesCode.json";

// const url = "http://192.168.0.108:18070/"
var url = "https://www.7cgames.cn:8070/";
var server = url;

var gameName = "ball2";
var appid = "wx0a909849d3a53f25";
var secret = "1ad92b8df595f9ecd405ee122f7afe07";
var MAIN_MENU_NUM = "qr2";

var bannerAdUnitId = "adunit-a605a4125f3075f5";
var videoAdUnitId = "adunit-46ffe4d65d261222";

var config = {
    shareTitleList: ['两只猪的爱情故事，看完后泪流满面', '快滚，快滚！', '爱不爱我我都只是个球球', '这也太甜了吧！', '其实我想让你学习一下通关恋爱球球的秘诀'], //分享标题数组
    shareImgDir: 'resources/share/', //分享图片目录
    shareImgType: '.jpg', //分享图片类型
    moreGameIconDir: 'more', //更多游戏icon目录
    appIdList: ["wxd5a257d6ee2b8f91", "wx515f44394eab5985", "wx08beeb18dc512c2f", "wxea245f85c9673414", "wxc4e628aa7caa2c07", "wx0af703a36035c60c", "wxf49b0a26d9405058", "wxac5820bc06a3a893", "wxd9589cd7117d0873"]
};

function random(len) {
    return len === 0 ? -1 : Math.floor(Math.random() * len);
}

function wechatgame() {
    var self = this;
    self.isAndroid = cc.sys.os === cc.sys.OS_ANDROID ? true : false;

    if (CC_WECHATGAME) {
        wx.updateShareMenu({ withShareTicket: true });
        wx.showShareMenu();
        wx.onShareAppMessage(function () {
            var r = random(config.shareTitleList.length);
            var str = config.shareTitleList[r];
            var url = wxDownloader.REMOTE_SERVER_ROOT + '/' + cc.url.raw(config.shareImgDir + str + config.shareImgType);
            return {
                title: str,
                imageUrl: url
            };
        });
        self.onShow();
        self.onHide();
        self.getUserInfo().then(function () {
            return self.getOpenId();
        }).catch(function (e) {
            return console.log(e);
        });
        self.launchOptions = wx.getLaunchOptionsSync();
        console.log(self.launchOptions);
    }

    self.bannerAdisLoad = false;
    self.videoAdisLoad = false;
    self.videoAdCallback = null;
    self.createBannerAd();
    self.createVideoAd();

    self.appIdList = config.appIdList;
    self.moreGameQRCodeIdx = 0;
    self.moreGameIconList = [];
    self.moreGameQRCodeList = [];
    self.initMoreGame();
}

var proto = wechatgame.prototype;

proto.onShow = function () {
    if (!CC_WECHATGAME) return;
    var self = this;
    wx.onShow(function (res) {
        console.log(res);
        self.shareTicket = res.shareTicket;
        self.query = res.query;
    });
};

proto.onHide = function () {
    if (!CC_WECHATGAME) return;
    var self = this;
    wx.onHide(function () {
        self.lastOffLineTime = new Date().getTime();
        self.onHideCallback instanceof Function ? self.onHideCallback() : console.warn("onHideCallback not a function");
    });
};

proto.login = function () {
    return new Promise(function (resolve, reject) {
        if (!CC_WECHATGAME) reject({ errcode: "PLATFORM_ERROR", message: "wx为undefined" });
        wx.login({
            success: function success(res) {
                resolve(res);
            },
            fail: function fail() {
                reject({ errcode: "LOGIN_FAIL", message: "login失败" });
            }
        });
    });
};

proto.getOpenId = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
        if (!CC_WECHATGAME) reject({ errcode: "PLATFORM_ERROR", message: "wx为undefined" });
        if (self.openId) resolve();
        //发起网络请求
        self.login().then(function (res) {
            if (!res.code) reject({ errcode: "CODE_PARAM_ERROR", message: "code为null或undefined" });
            wx.request({
                url: server + "getOpenId",
                data: {
                    gameName: gameName,
                    appid: appid,
                    secret: secret,
                    js_code: res.code,
                    grant_type: 'authorization_code'
                },
                header: {
                    "Content-Type": "application/json"
                },
                method: 'POST',
                success: function success(res2) {
                    if (res2.data.openid) {
                        self.openId = res2.data.openid;
                        resolve();
                    } else {
                        reject({ errcode: "OPENID_PARAM_ERROR", message: "openId为null或undefined" });
                    }
                },
                fail: function fail() {
                    reject({ errcode: "GET_OPENID_FAIL", message: "请求getOpenId失败" });
                }
            });
        });
    });
};

proto.getShareInfo = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
        if (!self.shareTicket) reject({ errcode: "SHARETICKET_PARAM_ERROR", message: "shareTicket为null或undefined" });
        if (!self.openId) reject({ errcode: "OPENID_PARAM_ERROR", message: "openId为null或undefined" });
        wx.getShareInfo({
            shareTicket: self.shareTicket,
            success: function success(res) {
                resolve(res);
            },
            fail: function fail() {
                reject({ errcode: "GET_SHARE_INFO_FAIL", message: "getShareInfo失败" });
            }
        });
    });
};

proto.getDecryptedData = function (param) {
    var self = this;
    param = param ? param : {};
    return new Promise(function (resolve, reject) {
        if (!self.openId) reject({ errcode: "OPENID_PARAM_ERROR", message: "openId为null或undefined" });
        if (!param.encryptedData) reject({ errcode: "SHARE_INFO_PARAM_ERROR", message: "encryptedData为null或undefined" });
        if (!param.iv) reject({ errcode: "SHARE_INFO_PARAM_ERROR", message: "iv为null或undefined" });
        wx.request({
            url: server + "getDecryptedData",
            data: {
                openId: self.openId,
                encryptedData: param.encryptedData,
                iv: param.iv
            },
            header: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            success: function success(res) {
                resolve(res);
            },
            fail: function fail() {
                reject({ errcode: "GET_DECRYPTED_DATA_FAIL", message: "请求getDecryptedData失败" });
            }
        });
    });
};

proto.getOpenGid = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
        self.getOpenId().then(function () {
            return self.getShareInfo();
        }).then(function (res) {
            return self.getDecryptedData({ openId: self.openId, encryptedData: res.encryptedData, iv: res.iv });
        }).then(function (res) {
            return resolve(res);
        });
    });
};

proto.getUserInfo = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
        if (!CC_WECHATGAME) reject({ errcode: "PLATFORM_ERROR", message: "wx为undefined" });
        if (self.userInfo) resolve();
        wx.getSetting({
            success: function success(res) {
                if (!res.authSetting['scope.userInfo'] && wx.createUserInfoButton) {
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
                            fontSize: 16,
                            borderRadius: 4
                        }
                    });

                    button.onTap(function (res2) {
                        button.hide();
                        self.userInfo = res2.userInfo;
                        resolve();
                    });
                } else {
                    wx.getUserInfo({
                        success: function success(res2) {
                            self.userInfo = res2.userInfo;
                            resolve();
                        },
                        fail: function fail() {
                            reject({ errcode: "GET_USER_INFO_FAIL", message: "获取userInfo失败" });
                        }
                    });
                }
            },
            fail: function fail() {
                reject({ errcode: "GET_SETTING_FAIL", message: "获取Setting失败" });
            }
        });
    });
};

proto.getServerUtc = function () {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: server + "getServerUtc",
            method: 'POST',
            success: function success(res) {
                resolve(res);
            },
            fail: function fail() {
                reject({ errcode: "GET_OPENID_FAIL", message: "请求getServerUtc失败" });
            }
        });
    });
};

proto.shareAppMessage = function (param) {
    param = param ? param : {};
    return new Promise(function (resolve, reject) {
        var flag = false;
        var r = random(config.shareTitleList.length);
        var str = param.str ? param.str : config.shareTitleList[r];
        var url = param.url ? param.url : wxDownloader.REMOTE_SERVER_ROOT + '/' + cc.url.raw(config.shareImgDir + str + config.shareImgType);
        var query = param.query ? param.query : '';
        wx.shareAppMessage({
            title: str,
            imageUrl: url,
            query: query,
            success: function success(res) {
                console.log("success", res);
                resolve();
            },
            fail: function fail(e) {
                console.log("fail", e);
                reject();
            },
            complete: function complete() {
                console.log("complete", e);
                flag = true;
            }
        });
        setTimeout(function () {
            if (!flag) resolve();
        }, 2000);
    });
};

proto.createBannerAd = function () {
    if (CC_WECHATGAME && wx.createRewardedVideoAd) {
        var self = this;
        if (!self.bannerAd) {
            var width = wx.getSystemInfoSync().windowWidth;
            var height = wx.getSystemInfoSync().windowHeight;

            self.bannerAd = wx.createBannerAd({
                adUnitId: bannerAdUnitId,
                style: {
                    left: 0,
                    top: height - 130,
                    height: 130
                }
            });

            self.bannerAd.onLoad(function () {
                self.bannerAdisLoad = true;
            });

            self.bannerAd.onResize(function (res) {
                self.bannerAd.style.left = (width - self.bannerAd.style.realWidth) / 2;
                self.bannerAd.style.top = height - self.bannerAd.style.realHeight;
            });

            self.bannerAd.onError(function (err) {
                console.log(err);
            });
        }
    }
};

proto.showBannerAd = function () {
    var self = this;
    if (CC_WECHATGAME && wx.createRewardedVideoAd) {
        if (!self.bannerAd) {
            self.createBannerAd();
        }
        self.bannerAd.show();
    }
};

proto.hideBannerAd = function () {
    var self = this;
    if (CC_WECHATGAME && wx.createRewardedVideoAd) {
        if (!self.bannerAd) {
            self.createBannerAd();
        }
        self.bannerAd.hide();
    }
};

proto.createVideoAd = function () {
    if (CC_WECHATGAME && wx.createRewardedVideoAd) {
        var self = this;
        if (!self.videoAd) {
            self.videoAd = wx.createRewardedVideoAd({
                adUnitId: videoAdUnitId
            });

            self.videoAd.onLoad(function () {
                self.videoAdisLoad = true;
                console.log('激励视频 广告加载成功');
            });

            self.videoAd.onError(function (err) {
                console.log(err.errMsg);
            });

            self.videoAd.onClose(function (res) {
                self.videoAdisLoad = false;
                if (res && res.isEnded || res === undefined) {
                    self.videoAdCallback instanceof Function ? self.videoAdCallback() : console.err("videoAdCallback is not a function");
                }
            });
        }
    }
};

proto.showVideoAd = function () {
    var self = this;
    if (CC_WECHATGAME && wx.createRewardedVideoAd) {
        if (!self.videoAd) {
            self.createVideoAd();
        }
        self.videoAd.show().catch(function (e) {
            console.log(e);
            self.videoAd.load().then(function () {
                return self.videoAd.show();
            });
        });
    }
};

proto.submitScore = function (score) {
    if (!isNaN(score)) {
        wx.postMessage({
            messageType: 3,
            MAIN_MENU_NUM: MAIN_MENU_NUM,
            score: score
        });
    }
};

proto.updateFriendRank = function () {
    wx.postMessage({
        messageType: 1,
        MAIN_MENU_NUM: "qr2"
    });
};

proto.initMoreGame = function () {
    var self = this;
    if (CC_WECHATGAME && self.moreGameQRCodeList.length === 0) self.getMoreGameQRCodeData().then(function (res) {
        return self.moreGameQRCodeList = res.data.data;
    });
    if (self.moreGameIconList.length === 0) cc.loader.loadResDir(config.moreGameIconDir, cc.SpriteFrame, function (e, res, urls) {
        if (e) return console.log(e);
        self.moreGameIconList = res.sort(function (a, b) {
            return parseInt(a.name) - parseInt(b.name);
        });
    });
};

proto.getMoreGameQRCodeData = function () {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: moreGameQRCodeUrl,
            headers: {
                'Content-Type': 'application/json'
            },
            success: function success(res) {
                resolve(res);
            },
            fail: function fail(e) {
                reject(e);
            }
        });
    });
};

proto.navigateToMiniProgram = function (appId) {
    if (!CC_WECHATGAME) return;
    var isMiniProgram = appId ? false : true;
    appId = isMiniProgram ? miniProgramAppid : appId;
    if (wx.navigateToMiniProgram && (this.isAndroid || !isMiniProgram)) wx.navigateToMiniProgram({
        appId: appId,
        path: '',
        success: function success(res) {
            console.log("打开成功");
            // 打开成功
        }
    });else if (wx.previewImage) this.previewImage();
};

proto.previewImage = function () {
    if (!CC_WECHATGAME) return;
    var self = this;
    if (self.moreGameQRCodeList.length === 0) self.getMoreGameQRCodeData().then(function (res) {
        self.moreGameQRCodeList = res.data.data;self.previewImage();
    });else {
        self.moreGameQRCodeIdx++;
        var idx = self.moreGameQRCodeIdx % self.moreGameQRCodeList.length;
        wx.previewImage({
            urls: [self.moreGameQRCodeList[idx].QRCode]
        });
    }
};

module.exports = wechatgame;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=wechatgame.js.map
        