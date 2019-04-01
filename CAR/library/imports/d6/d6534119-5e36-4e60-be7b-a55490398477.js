"use strict";
cc._RF.push(module, 'd6534EZXjZOYL57pVSQOYR3', 'exported-ItemTitleUI');
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