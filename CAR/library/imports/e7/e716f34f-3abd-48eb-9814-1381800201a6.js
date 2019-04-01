"use strict";
cc._RF.push(module, 'e716fNPOr1I65gUE4GAAgGm', 'exported-Layer');
// Prefab/GameBox-master/script/exported-Layer.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        gameLogo: cc.Sprite,
        gameTitle: cc.Label,
        gameDesc: cc.Label
    },

    init: function init(data) {
        this.node.scale = cc.winSize.width / 750;
        this.gameTitle.string = data.title;
        this.gameDesc.string = data.desc;
        this.appid = data.appid;
        this.qrcode = data.qrcode;
        this.callback = data.callback;
    },

    setGameLogo: function setGameLogo(logo) {
        this.gameLogo.spriteFrame = logo;
    },

    btnCallBack: function btnCallBack() {
        var self = this;
        this.callback({
            appid: self.appid,
            qrcode: self.qrcode
        });
    },

    close: function close() {
        this.node.active = false;
    }
});

cc._RF.pop();