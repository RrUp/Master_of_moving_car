"use strict";
cc._RF.push(module, '349ddDm12BHZr/ke3RAJ5Xv', 'RollingImage');
// wechat_game_module-master/exp/exported-rollingImage/RollingImage.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        iconImageArray: {
            default: [],
            type: cc.SpriteFrame
        },

        gameBox: cc.Node
    },

    onLoad: function onLoad() {
        this.initIconArray();
    },


    initIconArray: function initIconArray() {
        var _this = this;

        var miniGameList = [
        // "wxd5a257d6ee2b8f91",//飞机大作战
        // "wx515f44394eab5985",//切水果
        // "wxf49b0a26d9405058",//恋爱球球
        // "wxea245f85c9673414",//俄罗斯方块
        // "wx08beeb18dc512c2f",//消灭星星
        // "wxc4e628aa7caa2c07",//飞刀
        // "wxd9589cd7117d0873",//最囧
        // "wx0af703a36035c60c",//2048六角消除数字方块//"wx40fb3563b8ac79b2",//2048
        // "wx6616ae605010e605",//欢乐球球
        // "wxac5820bc06a3a893",//弹球弹一弹//"wx528f5a9cd16be88a"//贪吃蛇

        "wxd5a257d6ee2b8f91", //飞机大作战
        "wx515f44394eab5985", //切水果
        "wxf49b0a26d9405058", //恋爱球球
        "wxea245f85c9673414", //俄罗斯方块
        "wx08beeb18dc512c2f", //消灭星星
        "wxc4e628aa7caa2c07", //飞刀
        "wxd9589cd7117d0873", //最囧
        "wx0af703a36035c60c", //2048六角消除数字方块//"wx40fb3563b8ac79b2",//2048
        "wx6616ae605010e605"];

        this.iconArray = [];

        miniGameList.forEach(function (appid, k) {
            var data = {
                appid: appid,
                spriteFrame: _this.iconImageArray[k]
            };
            _this.iconArray.push(data);
        });
    },

    start: function start() {
        this.startID = 0;
        this.target = this.node.getComponent("cc.Sprite");
        var s1 = cc.spawn(cc.scaleTo(1.5, 1.1), cc.rotateTo(1.5, -30));
        var s2 = cc.spawn(cc.scaleTo(1.5, 0.9), cc.rotateTo(1.5, 30));
        var sep = cc.sequence(s1, s2, cc.callFunc(function () {
            if (this.iconArray.length > 0) {
                this.startID++;
                this.startID = this.startID % this.iconArray.length;
                this.target.spriteFrame = this.iconArray[this.startID].spriteFrame;
            }
        }, this));

        this.node.runAction(cc.repeatForever(sep));
    },


    btn: function btn() {
        if (this.iconArray.length > 0) {
            var appid = this.iconArray[this.startID].appid;
            console.log("zdk" + appid);

            if (this.gameBox) {

                this.gameBox.getComponent("exported-GameBoxInterface").show(appid);
            } else {
                if (CC_WECHATGAME) {
                    console.log("zdk");
                    wx.navigateToMiniProgram({
                        appId: appid,
                        path: '',
                        success: function success(res) {
                            console.log("打开成功");
                            // 打开成功
                        }
                    });
                }
            }
        }
    }
});

cc._RF.pop();