(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Prefab/GameBox-master/gameIcon/exported-GameIcon.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '01336qoUOVMGZUDdxEaRrrO', 'exported-GameIcon', __filename);
// Prefab/GameBox-master/gameIcon/exported-GameIcon.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        gameName: cc.Label,
        gameSprite: cc.Sprite,
        gameStyle: cc.Label,

        ui: cc.Node
    },

    init: function init(data) {
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
        //# sourceMappingURL=exported-GameIcon.js.map
        