"use strict";
cc._RF.push(module, '58470Q+/xhLFZTZh2B22tRW', 'MyLayoutManagerJS');
// Scripts/MyLayoutManagerJS.js

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

var define = require("define");
var MyLayoutManager = cc.Class({
    extends: cc.Component,

    properties: {
        m_VisibleRect: cc.Rect, //可视矩形
        m_GridironSize: cc.Size,
        m_GridSize: cc.Size,
        m_AdMobHeight: 0,
        m_GridironHPadding: 0

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},


    // update (dt) {},
    statics: {
        _instance: null,
        getInstance: function getInstance() {
            if (MyLayoutManager._instance === null) {
                this._instance = new MyLayoutManager();
                //    console.log('_instance  null , _instance=this  !');
            }
            return MyLayoutManager._instance;
        }
    },
    //设置屏幕大小
    ctor: function ctor() {
        var visibleSize = cc.view.getVisibleSize(); //获得视口（可视区域）的大小  
        var origin = cc.view.getVisibleOrigin(); //获得可视区域的出发点坐标
        cc.log("--------width------->", visibleSize.width);
        this.m_AdMobHeight = 0;
        this.m_GridironHPadding = 8;
        cc.log("---------m_GridironHPadding------>", this.m_GridironHPadding);
        this.m_VisibleRect = new cc.Rect(origin.x, origin.y, visibleSize.width, visibleSize.height);
        this.m_GridironSize = new cc.Size(define.GRIDIRON_WIDTH, define.GRIDIRON_WIDTH);
    },
    getVisibleRect: function getVisibleRect() {
        return this.m_VisibleRect;
    },

    getGridironSize: function getGridironSize() {
        return this.m_GridironSize;
    },

    getGridSize: function getGridSize() {
        return this.m_GridSize;
    },
    setGridSize: function setGridSize(size) {
        this.m_GridSize = size;
    },

    getAdMobHeight: function getAdMobHeight() {
        return this.m_AdMobHeight;
    },

    getHorizontalGridironPadding: function getHorizontalGridironPadding() {
        return this.m_GridironHPadding;
    }

});
module.exports = MyLayoutManager;

cc._RF.pop();