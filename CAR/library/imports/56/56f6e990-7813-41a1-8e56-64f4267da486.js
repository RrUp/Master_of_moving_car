"use strict";
cc._RF.push(module, '56f6emQeBNBoY5WZPQmfaSG', 'exported-TopUI');
// Prefab/GameBox-master/script/ui/exported-TopUI.js

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