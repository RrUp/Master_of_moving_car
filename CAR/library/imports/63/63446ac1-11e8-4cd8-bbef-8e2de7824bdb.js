"use strict";
cc._RF.push(module, '63446rBEehM2Lvvji3ngkvb', 'DialogGamePassJS');
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
        // choosestage: {
        //     type: cc.Node,
        //     default: null
        // },
        audioControl: {
            default: null
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.audioControl = cc.find('AudioControlNode').getComponent('AudioSourceControl');
        // var canvas = this.m_dialog;
        // var self = this;
        // var playerStart = GameDataManager.getInstance().getGameCompleteStars()
        // this.submitScoreButtonFunc(playerStart)
        //停止触摸动作
        // canvas.on(cc.Node.EventType.TOUCH_START, function (event) {
        //     event.stopPropagation();
        // }, self.node);
        // canvas.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
        //     event.stopPropagation();
        // }, self.node);
        // canvas.on(cc.Node.EventType.TOUCH_END, function (event) {
        //     event.stopPropagation();
        // }, self.node);
    },
    start: function start() {},


    // update (dt) {},
    //提交分数
    submitScoreButtonFunc: function submitScoreButtonFunc(score) {
        cc.log("gamepass 提交" + score + "key=" + define.RankKey);
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
        //星星个数展示
        for (var i = 0; i < winStarts; i++) {
            this.m_light_star[i].node.opacity = 255;
        }
        // var titleList = ["label_good.png", "label_great.png", "label_excellent.png"];
        // var urlPath = cc.url.raw("resources/" + GameDataManager.getInstance().getResName(titleList[winStarts - 1]));
        // this.m_dialog_title.spriteFrame = new cc.SpriteFrame(urlPath);

        {
            // var self = this;
            // //btn more game
            // if (CC_WECHATGAME) {
            //     //loading 中未加载
            //     urlPath = GameDataManager.getInstance().getResName('btn_show_more_game')
            //     cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, res) {
            //         if (err)
            //             console.log('Completed with ' + err.length + ' errors');
            //         else {
            //             //console.log(' btn more game 加载完成！' + res._name + '  ');
            //             self.m_MoreGame_btn.normalSprite = res;
            //             self.m_MoreGame_btn.pressedSprite = res;
            //             self.m_MoreGame_btn.hoverSprite = res;

            //             var act1 = cc.scaleTo(1.0, 0.8);
            //             var act2 = cc.scaleTo(1.0, 1.2);
            //             var seq = cc.sequence(act1, act2);
            //             self.m_MoreGame_btn.node.runAction(cc.repeatForever(seq));
            //         }
            //     });

            //     urlPath = GameDataManager.getInstance().getResName('adornment_addToMiniProgram')
            //     cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, res) {
            //         if (err)
            //             console.log('Completed with ' + err.length + ' errors');
            //         else {
            //             self.m_addToMiniProgram.spriteFrame = res;
            //         }
            //     });
            //     var rotateTo1 = cc.rotateTo(0.5, 15.0);
            //     var rotateTo2 = cc.rotateTo(0.5, 0.0);
            //     var rotateTo3 = cc.rotateTo(0.5, -15.0);
            //     var rotateTo4 = cc.rotateTo(0.5, 0.0);
            //     var seq = cc.sequence(rotateTo1, rotateTo2, rotateTo3, rotateTo4);
            //     self.m_addToMiniProgram.node.runAction(cc.repeatForever(seq));

            //     this.setBtnOtherSubGame()
            // } else {
            //     self.m_MoreGame_btn.active = false;
            //     self.m_addToMiniProgram.node.active = false;
            // }
        }
    },
    //下一关卡
    clickNextBtn: function clickNextBtn() {
        var stageId = GameDataManager.getInstance().getGameCurLevelNum() + 1;
        var packages = GameDataManager.getInstance().getLatestPackage();
        this.playClick();
        if (stageId < GameDataManager.getInstance().getStageCount(packages)) {
            GameDataManager.getInstance().setGameCurLevelNum(stageId);

            console.log(' enterGameSceneCallback  unlcok =', stageId);
            cc.director.loadScene("game");
        } else {
            cc.director.loadScene("ChooseStageScene");
            console.log(' was   Latest  stageId ！！！');
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
        // // cc.director.loadScene("GamePlayScene");
    },
    playClick: function playClick() {
        if (this.audioControl) {
            this.audioControl.playClick();
        }
    }
});

cc._RF.pop();