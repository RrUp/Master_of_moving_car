(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/ShareManagerJS.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3f924EIaoBK8rzYEMo+JCpt', 'ShareManagerJS', __filename);
// Scripts/ShareManagerJS.js

'use strict';

var ShareManager = cc.Class({

    extends: cc.Component,
    properties: {
        // avatar: cc.Sprite,      // 头像
        // nick_name: cc.Label,    // 昵称
        // id: cc.Label,           // ID
        // info: cc.Label          // 其他信息
        head_url: '', // 头像
        nick_name: '', // 昵称
        id: 0, // ID
        info: '' // 其他信息
    },
    statics: {
        _instance: null,
        show_count: 0,
        getInstance: function getInstance() {
            if (ShareManager._instance === null) {
                this._instance = new ShareManager();
            }
            return ShareManager._instance;
        }
    },
    ctor: function ctor() {
        this.init();
    },
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},

    start: function start() {

        {
            // if (typeof FBInstant === 'undefined') return;
            //     // 显示玩家信息
            //     // 设置昵称
            //     this.nick_name.string = 'Name:' + FBInstant.player.getName();
            //     // 设置 ID
            //     this.id.string = 'ID:' + FBInstant.player.getID();
            //     // 设置头像
            //     var photoUrl = FBInstant.player.getPhoto();
            //     cc.loader.load(photoUrl, (err, texture) => {
            //         this.avatar.spriteFrame = new cc.SpriteFrame(texture);
            //     });
            //     // 设置其他信息
            //     var info = {
            //         contextID: FBInstant.context.getID(), // 游戏 ID
            //         contextType: FBInstant.context.getType(), // 游戏类型
            //         locale: FBInstant.getLocale(),  // 地区
            //         platform: FBInstant.getPlatform(),// 平台
            //         sdkVersion: FBInstant.getSDKVersion(),// SDK 版本号
            //     }
            //     this.info.string = 'Context ID: ' + info.contextID + '\n' +
            //         'Context Type: ' + info.contextType + '\n' +
            //         'Locale: ' + info.locale + '\n' +
            //         'Platform: ' + info.platform + '\n' +
            //         'SDKVersion: ' + info.sdkVersion;
            // }
        }
    },


    init: function init() {
        if (typeof FBInstant != 'undefined') {
            this.nick_name = FBInstant.player.getName();
            this.id = FBInstant.player.getID();
            this.head_url = FBInstant.player.getPhoto();

            var info = {
                contextID: FBInstant.context.getID(), // 游戏 ID
                contextType: FBInstant.context.getType(), // 游戏类型
                locale: FBInstant.getLocale(), // 地区
                platform: FBInstant.getPlatform(), // 平台
                sdkVersion: FBInstant.getSDKVersion() // SDK 版本号
            };
            this.info = 'Context ID: ' + info.contextID + '\n' + 'Context Type: ' + info.contextType + '\n' + 'Locale: ' + info.locale + '\n' + 'Platform: ' + info.platform + '\n' + 'SDKVersion: ' + info.sdkVersion;
        } else if (CC_WECHATGAME) {

            // wx.getUserInfo({
            //     withCredentials:false,

            //     success: function (res) {
            //         var userInfo = res.userInfo
            //         this.nick_name = userInfo.nickName
            //         this.head_url = userInfo.avatarUrl

            //         // var userInfo = res.userInfo
            //         // var nickName = userInfo.nickName
            //         // var avatarUrl = userInfo.avatarUrl
            //         // var gender = userInfo.gender //性别 0：未知、1：男、2：女
            //         // var province = userInfo.province
            //         // var city = userInfo.city
            //         // var country = userInfo.country
            //     },
            //     fail: function (res) {
            //         console.log("getUserInfo失败");
            //     }
            // })

        } else {}
    },
    // 分享功能
    onShareGame: function onShareGame() {
        var textstring = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        var titleText;
        var pic_url = "resources/share/sharePic4.png";
        if (typeof FBInstant != 'undefined') {
            if (textstring.length > 1) {
                titleText = textstring;
            } else {
                titleText = this.nick_name + ' is asking for your help!';
            }

            FBInstant.shareAsync({
                intent: 'SHARE',
                image: this.getImgBase64(),
                text: titleText,
                data: { myReplayData: '...' }
            }).then(function () {
                // continue with the game.
                console.log("continue with the game.");
            });
        } else if (CC_WECHATGAME) {
            var pic_list = [];
            for (var i = 0; i < 4; ++i) {
                pic_list.push("sharePic" + (i + 1) + ".png");
            }
            var text_list = [];

            text_list.push("来不及解释了，不想赶紧上车吗？");
            text_list.push("比比看谁才是真正的老司机");
            text_list.push("老司机带你在车辆中穿梭");
            text_list.push("再不来你的汽车要长草了");

            text_list.push("速度与激情9即将来袭");
            text_list.push("要比比看谁比较快吗？");
            text_list.push("看到他们驾车技术那么熟练，我也忍不住想试一把");

            text_list.push("司机开不好车竟然是在玩这个");
            text_list.push("果然没有人能拦住我的车！");
            text_list.push("居然有这样一款能够让你真正体验驾驶乐趣的游戏");

            ++ShareManager.show_count;
            if (textstring.length > 1) {
                if (textstring.indexOf("sharePic") >= 0) {
                    titleText = text_list[ShareManager.show_count % text_list.length];
                    pic_url = "resources/share/" + pic_list[ShareManager.show_count % pic_list.length];
                    console.log(" ShareManager.show_count " + ShareManager.show_count);
                    console.log(" ShareManager.  " + titleText + " ," + pic_url);
                } else {
                    titleText = textstring;
                    pic_url = "resources/share/sharePic4.png";
                }
            } else {
                titleText = '求助 遇到困难了 快来帮帮我';
            }
            wx.shareAppMessage({ //主动拉起转发，进入选择通讯录界面
                title: titleText,
                imageUrl: wxDownloader.REMOTE_SERVER_ROOT + cc.url.raw(pic_url),
                success: function success(res) {
                    console.log("shareAppMessage成功");
                },
                fail: function fail(res) {
                    console.log("shareAppMessage失败");
                }
            });
        } else {
            console.log("不支持平台");
            return;
        }
    },


    // 截屏返回 iamge base6，用于 Share
    getImgBase64: function getImgBase64() {

        if (typeof FBInstant != 'undefined') {
            // let sp = cc.find('Canvas/New Sprite(Splash)').getComponent(cc.Sprite);
            var target = cc.find('Canvas/sharePicSprite');
            var width = 800,
                height = 400;
            var renderTexture = new cc.RenderTexture(width, height);
            renderTexture.begin();
            target._sgNode.visit();
            renderTexture.end();
            //
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;
            if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
                var texture = renderTexture.getSprite().getTexture();
                var image = texture.getHtmlElementObj();
                ctx.drawImage(image, 0, 0);
            } else if (cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
                var buffer = gl.createFramebuffer();
                gl.bindFramebuffer(gl.FRAMEBUFFER, buffer);
                var _texture = renderTexture.getSprite().getTexture()._glID;
                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, _texture, 0);
                var data = new Uint8Array(width * height * 4);
                gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, data);
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                var rowBytes = width * 4;
                for (var row = 0; row < height; row++) {
                    var srow = height - 1 - row;
                    var data2 = new Uint8ClampedArray(data.buffer, srow * width * 4, rowBytes);
                    var imageData = new ImageData(data2, width, 1);
                    ctx.putImageData(imageData, 0, row);
                }
            }
            return canvas.toDataURL('image/png');
        }
    },
    NavigateTo7cGameBox: function NavigateTo7cGameBox() {
        if (CC_WECHATGAME) {
            console.log("onBtnMoreGameClicked");
            if (wx.navigateToMiniProgram) {
                wx.navigateToMiniProgram({
                    appId: 'wxf9cf79aee55f7650',
                    path: '',
                    success: function success(res) {
                        console.log("MoreGame 打开成功");
                        // 打开成功
                    }
                });
            } else {
                wx.showModal({
                    title: '提示',
                    content: '当前微信版本过低，跳转小程序，无法使用该功能，请升级到最新微信版本后重试。'
                });
            }
        }
    }

    // update (dt) {},

});
module.exports = ShareManager;

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
        //# sourceMappingURL=ShareManagerJS.js.map
        