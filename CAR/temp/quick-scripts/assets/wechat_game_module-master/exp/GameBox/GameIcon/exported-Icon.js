(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/wechat_game_module-master/exp/GameBox/GameIcon/exported-Icon.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '819fbr06gVKhLHHm4zuCnkw', 'exported-Icon', __filename);
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
        //# sourceMappingURL=exported-Icon.js.map
        