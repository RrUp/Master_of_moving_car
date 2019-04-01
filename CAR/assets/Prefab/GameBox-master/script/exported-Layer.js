cc.Class({
    extends: cc.Component,

    properties: {
        gameLogo: cc.Sprite,
        gameTitle: cc.Label,
        gameDesc: cc.Label,
    },

    init: function (data) {
        this.node.scale = cc.winSize.width/750;
        this.gameTitle.string = data.title;
        this.gameDesc.string = data.desc;
        this.appid = data.appid;
        this.qrcode = data.qrcode;
        this.callback = data.callback
    },

    setGameLogo: function (logo) {
        this.gameLogo.spriteFrame = logo;
    },

    btnCallBack: function () {
        var self = this;
        this.callback({
            appid: self.appid,
            qrcode: self.qrcode,
        });
    },

    close: function () {
        this.node.active = false;
    },
});
