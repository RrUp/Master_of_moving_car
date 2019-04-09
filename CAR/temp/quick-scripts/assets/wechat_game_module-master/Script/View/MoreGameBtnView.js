(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/wechat_game_module-master/Script/View/MoreGameBtnView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e34d3ql+gdNx6ohZ+1yfRFf', 'MoreGameBtnView', __filename);
// wechat_game_module-master/Script/View/MoreGameBtnView.js

"use strict";

// 跳转至小游戏视图
cc.Class({
    extends: cc.Component,

    properties: {
        moreGameSprite: cc.Sprite
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.timer = 0;
        this.count = 0;
        this.len = G.WECHAT.appIdList.length;
    },
    start: function start() {
        this.node.runAction(cc.repeatForever(cc.sequence(cc.rotateTo(0.9, 15), cc.rotateTo(0.9, -15))));
        this.moreGameSprite.spriteFrame = G.WECHAT.moreGameIconList[this.count % this.len];
    },


    // 实时更新节点的小游戏图标
    update: function update(dt) {
        if (this.len !== 0) {
            this.timer += dt;
            if (this.timer > 3) {
                this.timer = 0;
                this.count++;
                this.moreGameSprite.spriteFrame = G.WECHAT.moreGameIconList[this.count % this.len];
            }
        }
    },


    // 跳转至小游戏
    toMore: function toMore() {
        G.AudioManager.play_btn();
        var appid = G.WECHAT.appIdList[this.count % this.len];
        G.WECHAT.navigateToMiniProgram(appid);
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
        //# sourceMappingURL=MoreGameBtnView.js.map
        