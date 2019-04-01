cc.Class({
    extends: cc.Component,

    properties: {
        gameName: cc.Label,
        gameSprite: cc.Sprite,
        gameStyle: cc.Label,
        
        ui: cc.Node,
    },

    init: function (data) {
        //以宽为基础
        var scale = data.width / this.node.width;

        this.ui.scale = scale;
        this.node.width = this.node.width * scale;
        this.node.height = this.node.height * scale;

        // this.name = data.name;
        this.appid = data.appid;

        this.gameName.string = data.name;
        this.gameSprite.spriteFrame = data.spriteFrame;
        this.gameStyle.string = data.style;
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
