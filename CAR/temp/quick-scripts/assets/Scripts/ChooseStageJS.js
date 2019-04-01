(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/ChooseStageJS.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '096f3G0octBYZyrE6NnAuNL', 'ChooseStageJS', __filename);
// Scripts/ChooseStageJS.js

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
var define = require("define");
cc.Class({
    extends: cc.Component,

    properties: {
        m_MaxUnlockedStageIdx: 0,
        m_StageCount: 0,
        m_PageCount: 0,
        m_Package: 0,
        m_PageStageCount: define.MaxCustomsPass, //100.最大关卡数
        m_pageNum: 0,

        titlePrefab: {
            default: null,
            type: cc.Prefab
        },
        subStagePrefab: {
            default: null,
            type: cc.Prefab
        },
        subPackgePrefab: {
            default: null,
            type: cc.Prefab
        },
        contextScrollView: {
            default: null,
            type: cc.ScrollView
        },

        // contextPageView: {
        //     default: null,
        //     type: cc.PageView
        // },

        audioControl: {
            default: null
        }

    },
    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.audioControl = cc.find('AudioControlNode').getComponent('AudioSourceControl');
        // cc.director.preloadScene("game",cc.log('预加载game'));
        this.m_Package = GameDataManager.getInstance().getLatestPackage();
        this.m_MaxUnlockedStageIdx = GameDataManager.getInstance().getMaxUnlockedStage(this.m_Package);
        this.m_StageCount = GameDataManager.getInstance().getStageCount(this.m_Package);
        //    this.m_StageCount =50;
        cc.log("this.m_Package ", this.m_Package);
        this.m_PageCount = this.m_StageCount / this.m_PageStageCount;

        cc.log(" this.m_PageCount ", this.m_PageCount);

        this.addTitle();
        //   this.addSubPage();

        this.addStageBtn();
    },
    start: function start() {
        // var scrollPos = GameDataManager.getInstance().getStagePageScollPos()
        // var norPos = new cc.Vec2(0, 0)
        // if (scrollPos.equals(norPos)) {
        //     this.contextScrollView.scrollToPercentVertical(1, 0.01);
        // } else {
        //     this.contextScrollView.setContentPosition(scrollPos)
        // }
        // GameDataManager.getInstance().getPassTime();
    },

    //加title图片
    addTitle: function addTitle() {
        // 使用给定的模板在场景中生成一个新节点
        var newTitle = cc.instantiate(this.titlePrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newTitle);

        var data = { TitleLabelStr: "", TitleLabelId: 0, TitlePos: cc.v2 };
        data.TitleLabelStr = GameDataManager.getInstance().getTextById(7 + GameDataManager.getInstance().getLatestPackage());
        data.TitleLabelId = GameDataManager.getInstance().getLatestPackage();
        // 设置位置
        // var width = cc.winSize.width;
        // var height = cc.winSize.height;
        // var visibleRect = cc.view.getVisibleSize();
        // var kWH = visibleRect.width / visibleRect.height;
        // var kMoveHight = (kWH - 750 / 1334)
        // console.log("  k= " + 750 / 1334 + " kWH= " + kWH);
        // if (kMoveHight > 0) {

        //     data.TitlePos = cc.v2(width * 0.5, height * 0.9);
        // } else {
        //     var offset = height * 0.5 * (-kMoveHight)
        //     data.TitlePos = cc.v2(width * 0.5, height * 0.9 - offset);
        // }
        data.TitlePos = cc.v2(0, 500);
        cc.log("title坐标", data.TitlePos);
        cc.log("位置", newTitle.position);
        newTitle.getComponent('subDifficultTitleJS').init(data); //传入title图片
    },
    //加入关卡btn
    addStageBtn: function addStageBtn() {
        var stageData = { stageId: 0, startNum: 0 };

        for (var i = 0; i < this.m_StageCount; ++i) {
            stageData.stageId = i;
            stageData.startNum = GameDataManager.getInstance().getCompleteStars(this.m_Package, i);

            if (this.m_MaxUnlockedStageIdx == i) {
                stageData.startNum = 0;
            }

            var newStageBtnItem = cc.instantiate(this.subStagePrefab);
            this.contextScrollView.content.addChild(newStageBtnItem);

            newStageBtnItem.getComponent('subStarTemplateJS').init(stageData); //传入关卡id、图片
            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
            clickEventHandler.component = "ChooseStageJS"; //这个是代码文件名
            clickEventHandler.handler = "enterGameSceneCallback";
            clickEventHandler.customEventData = stageData.stageId;
            var button = newStageBtnItem.getComponent(cc.Button); //getComponentInChildren
            button.clickEvents.push(clickEventHandler);
        }
        // this.contextScrollView.scrollToTop(0.1);
        this.contextScrollView.scrollToPercentVertical(1, 0.1);
        //视图内容在规定时间内滚动到 ScrollView 垂直方向的百分比位置上
    },
    enterGameSceneCallback: function enterGameSceneCallback(event, customEventData) {
        //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        this.playClick();
        var node = event.target;
        var button = node.getComponent(cc.Button);
        var stageId = customEventData;

        if (stageId <= this.m_MaxUnlockedStageIdx) {
            console.log(' enterGameSceneCallback  unlcok =', stageId);

            this.playClick();
            //        this.saveScrollPos();
            GameDataManager.getInstance().setGameCurLevelNum(stageId);
            cc.director.loadScene("game");
        } else {
            console.log(' enterGameSceneCallback lock =', stageId);
        }
    },
    // addscrollViewEvent: function () {

    //     var scrollViewEventHandler = new cc.Component.EventHandler();
    //     scrollViewEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
    //     scrollViewEventHandler.component = "ChooseStageJS";//这个是代码文件名
    //     scrollViewEventHandler.handler = "scrollViewEventCallback";
    //     //scrollViewEventHandler.customEventData = "foobar";

    //     this.contextScrollView.scrollEvents.push(scrollViewEventHandler);
    // },

    // scrollViewEventCallback: function (scrollview, eventType, customEventData) {
    //     //这里 scrollview 是一个 Scrollview 组件对象实例
    //     //这里的 eventType === cc.ScrollView.EventType enum 里面的值
    //     //这里的 customEventData 参数就等于你之前设置的 "foobar"
    //     if (define.DEBUG_MODE && define.DEBUG_SCROLL_POS) {
    //         // var pos = scrollview.getContentPosition();
    //         // var off = scrollview.getScrollOffset();
    //         // var maxoff = scrollview.getMaxScrollOffset();
    //     }
    // },

    saveScrollPos: function saveScrollPos() {
        var scrollPos = this.contextScrollView.getContentPosition();
        GameDataManager.getInstance().setStagePageScollPos(scrollPos);
    },

    _createPage: function _createPage() {
        // var page = cc.instantiate(this.subPackgePrefab);//layout预制体

        // page.position = new cc.v2(0, 0);
        // let pagePos = this.m_pageNum;//初始0，结束一次++

        // let stageData = { stageId: 0, startNum: 0 };

        // for (var i = this.m_PageStageCount * pagePos; i < this.m_PageStageCount * (pagePos + 1); ++i) {

        //     stageData.stageId = i;

        //     stageData.startNum = GameDataManager.getInstance().getCompleteStars(this.m_Package, i);

        //     if (this.m_MaxUnlockedStageIdx == i) {
        //         stageData.startNum = 0;
        //     }
        //     console.log('  stage id =' + stageData.stageId + ', num=' + stageData.startNum);

        //     var newStageBtnItem = cc.instantiate(this.subStagePrefab);

        //     newStageBtnItem.getComponent('subStarTemplateJS').init(stageData)

        //     var clickEventHandler = new cc.Component.EventHandler();
        //     clickEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        //     clickEventHandler.component = "ChooseStageRJS";//这个是代码文件名
        //     clickEventHandler.handler = "enterGameSceneCallback";
        //     clickEventHandler.customEventData = stageData.stageId;

        //     var button = newStageBtnItem.getComponent(cc.Button);//getComponentInChildren
        //     button.clickEvents.push(clickEventHandler);


        //     page.addChild(newStageBtnItem);
        // }
        // // layout.updateLayout();

        // ++this.m_pageNum;
        // return page;
    },


    addSubPage: function addSubPage() {

        // // for (var i = 0; i < (this.m_PageCount); ++i) {
        // this.contextPageView.addPage(this._createPage());
        // // }
        // console.log(' addSubPage  id =', this.m_pageNum);

        // var allPage = this.contextPageView.getPages()
    },

    onBtnBackClicked: function onBtnBackClicked() {
        console.log('onBtnBackClicked clicked!');
        this.playClick();
        //    this.saveScrollPos();
        cc.director.loadScene("SelectDifficultScene");
    },

    playClick: function playClick() {
        if (this.audioControl) {
            this.audioControl.playClick();
        }
    }
    // update (dt) {},
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
        //# sourceMappingURL=ChooseStageJS.js.map
        