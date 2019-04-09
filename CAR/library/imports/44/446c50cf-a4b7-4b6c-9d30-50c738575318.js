"use strict";
cc._RF.push(module, '446c5DPpLdLbJ0wUMc4V1MY', 'exported-Button');
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