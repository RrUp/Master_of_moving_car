// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var GameDataManager = require("GameDataManagerJS");
cc.Class({
    extends: cc.Component,

    properties: {
        TitleLabel: cc.Label,
        TitlePos: cc.p,
        title_sp: cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
    init: function (data) {
        //    this.TitleLabel.string = data.TitleLabelStr;
        this.TitlePos = data.TitlePos
        var urlPath;
        var self = this;

        var titlePathList = ["title_easy", "title_medium", "title_hard", "title_expert",];

        urlPath = GameDataManager.getInstance().getResName(titlePathList[data.TitleLabelId]);;

        cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, res) {
      
            if (err)
                cc.log('Completed with ' + err.length + ' errors');      
            else {
                console.log(' subDifficultTiitleJS加载完成！' + res._name + '  ');
                self.title_sp.spriteFrame = res;//传图
               
            }
        });

        this.node.setPosition(this.TitlePos);
    }
});
