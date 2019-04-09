cc.Class({
    extends: cc.Component,

    properties: {
        gameName: cc.Label,
        gameSprite: cc.Sprite,
    },

    init: function (data) {

        this.appid = data.appid;

        this.gameName.string = data.name;
        this.gameSprite.spriteFrame = data.spriteFrame;
        this.qrcode = data.qrcode;
        this.btnCallback = data.btnCallback;
    },

    setSpriteFrame: function (spriteFrame) {
        this.gameSprite.spriteFrame = spriteFrame;
    },

    btn: function () {
        if (this.btnCallback)
            this.btnCallback({
                name: this.gameName.string,
                appid: this.appid,
                qrcode: this.qrcode,
            });
    },

});
