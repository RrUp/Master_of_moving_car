
cc.Class({
    extends: cc.Component,

    properties: {
        ui: cc.Node,
    },



    onLoad() {
        var scale = cc.winSize.width / 750;
        this.node.height = this.node.height * scale;
        
        this.ui.scale = scale;
    },


});
