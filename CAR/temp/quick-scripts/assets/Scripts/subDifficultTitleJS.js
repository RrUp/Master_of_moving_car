(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/subDifficultTitleJS.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1eaee0JrRZLTaGoR8KA0j/c', 'subDifficultTitleJS', __filename);
// Scripts/subDifficultTitleJS.js

"use strict";

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
        title_sp: cc.Sprite
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},


    // update (dt) {},
    init: function init(data) {
        //    this.TitleLabel.string = data.TitleLabelStr;
        this.TitlePos = data.TitlePos;
        var urlPath;
        var self = this;

        var titlePathList = ["title_easy", "title_medium", "title_hard", "title_expert"];

        urlPath = GameDataManager.getInstance().getResName(titlePathList[data.TitleLabelId]);;

        cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, res) {

            if (err) cc.log('Completed with ' + err.length + ' errors');else {
                console.log(' subDifficultTiitleJS加载完成！' + res._name + '  ');
                self.title_sp.spriteFrame = res; //传图
            }
        });

        this.node.setPosition(this.TitlePos);
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
        //# sourceMappingURL=subDifficultTitleJS.js.map
        