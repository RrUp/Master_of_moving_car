(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/RankJS.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '28568izkI1BUKVTJHdhwRxx', 'RankJS', __filename);
// Scripts/RankJS.js

"use strict";

var define = require("define");
var AdsManager = require("AdsManagerJS");
var GameDataManager = require("GameDataManagerJS");
cc.Class({
    extends: cc.Component,
    name: "RankJS",
    properties: {
        rankingScrollView: cc.Sprite, //显示排行榜
        mainNode: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var can = cc.find("Canvas").getComponent(cc.Canvas);
        cc.winSize.width / cc.winSize.height <= (750 / 1334).designScreen ? (can.fitHeight = false, can.fitWidth = true) : (can.fitHeight = true, can.fitWidth = false);
        can.alignWithScreen();
        //iPhoneX适配
        if (cc.sys.isNative && cc.sys.platform == cc.sys.IPHONE) {
            var size = cc.view.getFrameSize();
            var isIphoneX = size.width == 2436 && size.height == 1125 || size.width == 1125 && size.height == 2436;
            if (isIphoneX) {
                var cvs = this.node.getComponent(cc.Canvas);
                cvs.fitHeight = true;
                cvs.fitWidth = true;
            }
        }
    },
    start: function start() {},
    friendButtonFunc: function friendButtonFunc(event) {
        if (CC_WECHATGAME) {
            window.wx.postMessage({
                messageType: 1,
                MAIN_MENU_NUM: define.RankKey
            });
        } else {}
    },

    // submitScoreButtonFunc() {
    //    let goals = GameDataManager.getInstance().getGoals();
    //     console.log("得分 : " + goals)
    //     if (CC_WECHATGAME) {
    //         window.wx.postMessage({
    //             messageType: 3,
    //             MAIN_MENU_NUM: define.RankKey,
    //             score: goals,
    //         });
    //     } else {
    //         console.log("fail 提交得分 : " + goals)
    //     }
    // },
    update: function update(dt) {
        this._updateSubDomainCanvas();
    },

    // 刷新子域的纹理
    _updateSubDomainCanvas: function _updateSubDomainCanvas() {
        if (!this.tex) {
            return;
        }
        if (window.sharedCanvas != undefined) {
            if (wx.getOpenDataContext) {
                var openDataContext = wx.getOpenDataContext();
                var sharedCanvas = openDataContext.canvas;
                this.tex.initWithElement(sharedCanvas);
                this.tex.handleLoadedTexture();
                this.rankingScrollView.spriteFrame = new cc.SpriteFrame(this.tex);
            }
        }
    }
});

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
        //# sourceMappingURL=RankJS.js.map
        