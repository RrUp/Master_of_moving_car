"use strict";
cc._RF.push(module, '9ef08nt9xNPkpRu06lynxwu', 'subDifficultTemplateJS');
// Scripts/subDifficultTemplateJS.js

'use strict';

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        id: 0,
        imageViewBtn: cc.Button,
        CompletionLabel: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},


    init: function init(data) {
        // cc.log("组件",this.imageViewBtn)
        this.id = data.id;
        this.CompletionLabel.string = data.CompletionLabel;

        var urlPath;
        var self = this;

        urlPath = data.imageViewPath;
        cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, res) {
            if (err) cc.log('Completed with ' + err.length + ' errors');else {
                console.log(' 加载完成！' + res._name + '  ');

                self.imageViewBtn.normalSprite = res;
                self.imageViewBtn.pressedSprite = res;
                self.imageViewBtn.hoverSprite = res;
            }
        });
    }
    // update (dt) {},
});

cc._RF.pop();