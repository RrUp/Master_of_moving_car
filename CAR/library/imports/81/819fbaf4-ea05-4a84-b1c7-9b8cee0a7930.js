"use strict";
cc._RF.push(module, '819fbr06gVKhLHHm4zuCnkw', 'exported-Icon');
// wechat_game_module-master/exp/GameBox/GameIcon/exported-Icon.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        gameName: cc.Label,
        gameSprite: cc.Sprite
    },

    init: function init(data) {

        this.appid = data.appid;

        this.gameName.string = data.name;
        this.gameSprite.spriteFrame = data.spriteFrame;
        this.qrcode = data.qrcode;
        this.btnCallback = data.btnCallback;
    },

    setSpriteFrame: function setSpriteFrame(spriteFrame) {
        this.gameSprite.spriteFrame = spriteFrame;
    },

    btn: function btn() {
        if (this.btnCallback) this.btnCallback({
            name: this.gameName.string,
            appid: this.appid,
            qrcode: this.qrcode
        });
    }

});

cc._RF.pop();