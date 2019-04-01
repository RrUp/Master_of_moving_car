(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Prefab/GameBox-master/script/ui/exported-ItemTitleUI.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd6534EZXjZOYL57pVSQOYR3', 'exported-ItemTitleUI', __filename);
// Prefab/GameBox-master/script/ui/exported-ItemTitleUI.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        ui: cc.Node
    },

    onLoad: function onLoad() {
        var scale = cc.winSize.width / 750;
        this.node.height = this.node.height * scale;

        this.ui.scale = scale;
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
        //# sourceMappingURL=exported-ItemTitleUI.js.map
        