"use strict";
cc._RF.push(module, '0d83fDxMppIjJItpjk7cFKa', 'subStarTemplateJS');
// Scripts/subStarTemplateJS.js

"use strict";

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        stageId: 0,
        startNum: 0,
        stageBtn: cc.Button,
        stageIdLab: cc.Label,
        stars: [cc.Sprite]
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    init: function init(data) {
        var stageId = data.stageId + 1;;
        var urlPath;
        var self = this;
        var startNum = data.startNum;
        //解锁了的
        if (data.startNum >= 0) {
            if (stageId < 10) {
                this.stageIdLab.string = "0" + stageId;
            } else {
                this.stageIdLab.string = stageId;
            } //lab传id
            var urlPath = "star";
            cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                if (err) cc.log("注意err:" + err.length + 'errors');else {
                    for (var i = 0; i < startNum; i++) {
                        self.stars[i].spriteFrame = spriteFrame;
                    } //传星星图
                }
            });
            if (data.startNum > 0) {

                urlPath = 'btn_stagePlayed';
            } else {
                urlPath = 'btn_stagePlaying';
            }
            cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, res) {
                if (err) cc.log('Completed with' + err.length + 'errors');else {
                    self.stageBtn.normalSprite = res;
                    self.stageBtn.pressedSprite = res;
                    self.stageBtn.hoverSprite = res;
                }
            }); //传图
        }
        //未解锁的
        else {
                var urlPath = "btn_stageLock"; //锁图片路径
                cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, res) {
                    if (err) cc.log('Completed with' + err.length + 'errors');else {
                        self.stageBtn.normalSprite = res;
                        self.stageBtn.pressedSprite = res;
                        self.stageBtn.hoverSprite = res;
                    }
                });
                //隐藏星星
                for (var i = 0; i < 3; ++i) {
                    this.stars[i].enabled = false;
                }
            }
    }
    // update (dt) {},

});

cc._RF.pop();