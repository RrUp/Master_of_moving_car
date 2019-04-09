(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/DialogGamePassJS.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '63446rBEehM2Lvvji3ngkvb', 'DialogGamePassJS', __filename);
// Scripts/DialogGamePassJS.js

"use strict";

var GameDataManager = require("GameDataManagerJS");
var define = require("define");
var ShareManager = require("ShareManagerJS");
var AdsManager = require("AdsManagerJS");

cc.Class({
    extends: cc.Component,

    properties: {
        m_dialog: cc.Node,
        m_dialog_bg: cc.Sprite,
        m_light_star: [cc.Sprite],
        m_next_btn: cc.Button,
        m_retry_btn: cc.Button,
        audioControl: {
            default: null
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var can = cc.find("Canvas").getComponent(cc.Canvas);
        cc.winSize.width / cc.winSize.height <= (750 / 1334).designScreen ? (can.fitHeight = false, can.fitWidth = true) : (can.fitHeight = true, can.fitWidth = false);
        can.alignWithScreen();
        this.audioControl = cc.find('AudioControlNode').getComponent('AudioSourceControl');
    },
    start: function start() {},


    // update (dt) {},
    submitScoreButtonFunc: function submitScoreButtonFunc(score) {
        if (CC_WECHATGAME) {
            window.wx.postMessage({
                messageType: 3,
                MAIN_MENU_NUM: define.RankKey,
                score: score
            });
        } else {
            cc.log("fail 提交得分 : " + score);
        }
    },

    showDialog: function showDialog(winStarts) {
        this.m_dialog.active = true;
        // AdsManager.getInstance().showBannerAD();
        for (var i = 0; i < winStarts; i++) {
            this.m_light_star[i].node.opacity = 255;
        }
    },
    clickNextBtn: function clickNextBtn() {
        var stageId = GameDataManager.getInstance().getGameCurLevelNum() + 1;
        var packages = GameDataManager.getInstance().getLatestPackage();
        this.playClick();
        if (stageId < GameDataManager.getInstance().getStageCount(packages)) {
            GameDataManager.getInstance().setGameCurLevelNum(stageId);
            cc.director.loadScene("game");
        } else {
            cc.director.loadScene("ChooseStageScene");
        }
    },
    //重玩
    clickRetryBtn: function clickRetryBtn() {
        this.playClick();
        cc.director.loadScene("game");
    },
    //炫耀一下
    clickShareBtn: function clickShareBtn() {
        this.playClick();
        ShareManager.getInstance().onShareGame("sharePic");
    },
    playClick: function playClick() {
        if (this.audioControl) {
            this.audioControl.playClick();
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
        //# sourceMappingURL=DialogGamePassJS.js.map
        