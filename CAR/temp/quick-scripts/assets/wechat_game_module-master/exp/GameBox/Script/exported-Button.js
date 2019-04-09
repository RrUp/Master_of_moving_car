(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/wechat_game_module-master/exp/GameBox/Script/exported-Button.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '446c5DPpLdLbJ0wUMc4V1MY', 'exported-Button', __filename);
// wechat_game_module-master/exp/GameBox/Script/exported-Button.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        image: cc.Node,
        all: cc.Node
    },

    init: function init(manager) {
        this.manager = manager;
        this.all.active = false;
    },

    change: function change() {
        var self = this;
        self.callback = null;
        switch (this.manager.state) {
            case "open":
                self.image.scaleX = -1;
                self.all.active = true;

                break;
            case "close":
                self.image.scaleX = 1;
                self.all.active = false;

                break;

            default:
                break;
        }
    },

    event: function event() {
        var self = this;
        switch (this.manager.state) {
            case "open":
                this.manager.hide({
                    callback: function callback() {
                        self.change();
                    }
                });
                break;
            case "close":
                this.manager.show({
                    callback: function callback() {
                        self.change();
                    }
                });
                break;

            default:
                break;
        }
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
        //# sourceMappingURL=exported-Button.js.map
        