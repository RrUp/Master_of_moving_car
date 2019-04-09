"use strict";
cc._RF.push(module, '096f3G0octBYZyrE6NnAuNL', 'ChooseStageJS');
// Scripts/ChooseStageJS.js

"use strict";

var GameDataManager = require("GameDataManagerJS");
var define = require("define");
cc.Class({
    extends: cc.Component,

    properties: {
        m_MaxUnlockedStageIdx: 0,
        m_StageCount: 0,
        m_PageCount: 0,
        m_Package: 0,
        m_PageStageCount: define.MaxCustomsPass,

        // titlePrefab: {
        //     default: null,
        //     type: cc.Prefab
        // },
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
        audioControl: {
            default: null
        }

    },

    onLoad: function onLoad() {
        var can = cc.find("Canvas").getComponent(cc.Canvas);
        cc.winSize.width / cc.winSize.height <= (750 / 1334).designScreen ? (can.fitHeight = false, can.fitWidth = true) : (can.fitHeight = true, can.fitWidth = false);
        can.alignWithScreen();
        this.init();
        this.audioControl = cc.find('AudioControlNode').getComponent('AudioSourceControl');

        // this.m_Package = GameDataManager.getInstance().getLatestPackage();
        // this.m_MaxUnlockedStageIdx = GameDataManager.getInstance().getMaxUnlockedStage(this.m_Package);
        // this.m_StageCount = GameDataManager.getInstance().getStageCount(this.m_Package);
        // this.m_PageCount = (this.m_StageCount / this.m_PageStageCount);
        // // this.addTitle();
        // this.addStageBtn();
    },
    init: function init() {
        this.m_Package = GameDataManager.getInstance().getLatestPackage();
        this.m_MaxUnlockedStageIdx = GameDataManager.getInstance().getMaxUnlockedStage(this.m_Package);
        this.m_StageCount = GameDataManager.getInstance().getStageCount(this.m_Package);
        this.m_PageCount = this.m_StageCount / this.m_PageStageCount;
        // this.addTitle();
        this.addStageBtn();
    },
    start: function start() {},

    // addTitle: function () {
    //     var newTitle = cc.instantiate(this.titlePrefab);
    //     this.node.addChild(newTitle);
    //     let data = { TitleLabelStr: "", TitleLabelId: 0, TitlePos: cc.v2 };
    //     data.TitleLabelStr = GameDataManager.getInstance().getTextById(7 + GameDataManager.getInstance().getLatestPackage());
    //     data.TitleLabelId = GameDataManager.getInstance().getLatestPackage();
    //     data.TitlePos = cc.v2(0, 500)
    //     newTitle.getComponent('subDifficultTitleJS').init(data)
    // },
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

    // onBtnBackClicked: function () {
    //     console.log('onBtnBackClicked clicked!');
    //     this.playClick();
    //     //    this.saveScrollPos();
    //     cc.director.loadScene("SelectDifficultScene");
    // },

    playClick: function playClick() {
        if (this.audioControl) {
            this.audioControl.playClick();
        }
    }
    // update (dt) {},
});

cc._RF.pop();