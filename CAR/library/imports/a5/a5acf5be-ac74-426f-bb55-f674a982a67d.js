"use strict";
cc._RF.push(module, 'a5acfW+rHRCb7tV9nSpgqZ9', 'exported-GameBoxInterface');
// wechat_game_module-master/exp/GameBox/exported-GameBoxInterface.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        manage: cc.Node,
        gameName: ""
    },

    onLoad: function onLoad() {
        this.manage.getComponent("exported-GameBox").init(this.gameName);
        cc.director.on('gameBoxShow', function (event) {
            console.log(event);
            this.manage.getComponent("exported-GameBox").show({
                appid: event.appid,
                callback: function callback() {
                    console.log("有 appid 的打开");
                }
            });
        }.bind(this));
    },


    show: function show(appid) {
        this.manage.getComponent("exported-GameBox").show({
            appid: appid,
            callback: function callback() {
                console.log("打开完成");
            }
        });
    },

    hide: function hide() {
        this.manage.getComponent("exported-GameBox").hide({
            callback: function callback() {
                console.log("隐藏完毕");
            }
        });
    }
});

cc._RF.pop();