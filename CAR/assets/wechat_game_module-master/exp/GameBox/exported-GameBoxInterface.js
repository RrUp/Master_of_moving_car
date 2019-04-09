cc.Class({
    extends: cc.Component,

    properties: {
        manage: cc.Node,
        gameName: "",
    },
    
    onLoad () {
        this.manage.getComponent("exported-GameBox").init(this.gameName);
        cc.director.on('gameBoxShow', function (event) {
            console.log(event);
            this.manage.getComponent("exported-GameBox").show({
                appid: event.appid,
                callback: function() {
                    console.log("有 appid 的打开");
                },
            });
        }.bind(this));
    },

    show: function (appid) {
        this.manage.getComponent("exported-GameBox").show({
            appid: appid,
            callback: function() {
                console.log("打开完成");
            
            }
        });
        
    },

    hide: function () {
        this.manage.getComponent("exported-GameBox").hide({
            callback: function() {
                console.log("隐藏完毕");
            
            }
        });
    },
});
