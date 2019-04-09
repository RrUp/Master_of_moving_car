(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/SelectDifficultSceneJS.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f56477rpwxOVo+9OeOgtTSL', 'SelectDifficultSceneJS', __filename);
// Scripts/SelectDifficultSceneJS.js

"use strict";

var GameDataManager = require("GameDataManagerJS");
cc.Class({
    extends: cc.Component,

    properties: {
        pageNum: 0,
        stageDataArr: [],

        curPos: cc.Vec2,
        // difficultTitle: cc.Sprite,
        // pageTeample: {
        //     default: null,
        //     type: cc.Prefab,
        // },
        // contextPageView: cc.PageView,
        // audioControl:
        // {
        //     default: null,
        // },
        choosestage: cc.Node,
        count: {
            default: [],
            type: [cc.Node]
        },
        select: {
            default: [],
            type: [cc.Node]
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var can = cc.find("Canvas").getComponent(cc.Canvas);
        cc.winSize.width / cc.winSize.height <= (750 / 1334).designScreen ? (can.fitHeight = false, can.fitWidth = true) : (can.fitHeight = true, can.fitWidth = false);
        can.alignWithScreen();
        this.audioControl = cc.find('AudioControlNode').getComponent('AudioSourceControl');
        this.content = cc.find('Canvas/DifficultPageView/view/content');
        console.log("找到了", this.content);
        this.initStageData();
        for (var i = 0; i < 4; i++) {
            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.component = "SelectDifficultSceneJS";
            clickEventHandler.handler = "enterGameStageCallback";
            clickEventHandler.customEventData = i;
            var button = this.select[i].getComponent(cc.Button);
            button.clickEvents.push(clickEventHandler);
            //iPhoneX适配
            if (cc.sys.isNative && cc.sys.platform == cc.sys.IPHONE) {
                var size = cc.view.getFrameSize();
                var isIphoneX = size.width == 2436 && size.height == 1125 || size.width == 1125 && size.height == 2436;
                if (isIphoneX) {
                    var cvs = this.node.getComponent(cc.Canvas);
                    cvs.fitHeight = true;
                    cvs.fitWidth = true;
                }
            }
        }
    },

    initStageData: function initStageData() {
        var self = this;
        var maxPackageCount = GameDataManager.getInstance().getPackageCount(); //传入4
        for (var i = 0; i < maxPackageCount; i++) {
            var passCount = GameDataManager.getInstance().getMaxUnlockedStage(i);
            var stageCount = GameDataManager.getInstance().getStageCount(i);

            var stageData = { passCount: 0, stageCount: 0 };
            stageData.passCount = passCount;
            stageData.stageCount = stageCount;
            this.stageDataArr[i] = stageData;
            self.count[i].getComponent(cc.Label).string = stageData.passCount + "/" + stageData.stageCount;
        }

        // for (let i = 0; i < maxPackageCount; i++) {
        //     this.addSubPage();
        // }
    },
    addSubPage: function addSubPage() {
        this.contextPageView.addPage(this._createPage());
    },
    _createPage: function _createPage() {

        var page = cc.instantiate(this.pageTeample);
        page.position = new cc.v2(0, 0);
        var PACKAGE_IMAGE = ["package_easy", "package_medium", "package_hard", "package_expert"];
        var i = this.pageNum;
        var data = { imageViewPath: "", CompletionLabel: "", id: 0 };
        data.imageViewPath = GameDataManager.getInstance().getResName(PACKAGE_IMAGE[i]);
        data.CompletionLabel = this.stageDataArr[i].passCount + "/" + this.stageDataArr[i].stageCount;
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "SelectDifficultSceneJS";
        clickEventHandler.handler = "enterGameStageCallback";
        clickEventHandler.customEventData = this.pageNum;
        var button = page.getComponentInChildren(cc.Button);
        button.clickEvents.push(clickEventHandler);
        page.getComponent('subDifficultTemplateJS').init(data);
        ++this.pageNum;
        return page;
    },
    start: function start() {
        // this.curPos = new cc.Vec2(0, 0);
        //     this.curPos.x = GameDataManager.getInstance().getSelectLevelPos();
        //     if (this.curPos.x >= 0) {
        //         this.curPos.x = -375.0;
        //     }
        //     this.contextPageView.setContentPosition(this.curPos);//设置当前视图内容的坐标点

        //     this.scheduleOnce(function () {

        //         var pagePos = GameDataManager.getInstance().getLatestPackage();
        //         this.contextPageView.scrollToPage(pagePos);

        //     }, 0.01);
    },


    enterGameStageCallback: function enterGameStageCallback(event, customEventData) {
        GameDataManager.getInstance().saveLatestPackage(customEventData);
        var choosestage = cc.find("Canvas/choosestage/stageScrollView/view/content");
        choosestage.removeAllChildren();
        this.playClick();
        // this.choosestage.active=false;
        var node = event.target;
        var button = node.getComponent(cc.Button);
        var packages = customEventData;
        this.playClick();
        // this.savePageviewPos();
        // cc.director.loadScene("ChooseStageScene");
        this.choosestage.active = true;
        var ChooseStageJS = cc.find("Canvas/choosestage").getComponent("ChooseStageJS");
        ChooseStageJS.init();
    },
    //记录package，LevelPos
    savePageviewPos: function savePageviewPos() {
        // let curPage = this.contextPageView.getCurrentPageIndex();
        // this.curPos = this.contextPageView.getContentPosition();
        GameDataManager.getInstance().saveSelectLevelPos(this.curPos.x);
    },
    // update (dt) {},
    back_btnClick: function back_btnClick() {
        this.playClick();
        this.savePageviewPos();
        cc.director.loadScene("main");
    },

    playClick: function playClick() {
        if (this.audioControl) {
            this.audioControl.playClick();
        }
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
        //# sourceMappingURL=SelectDifficultSceneJS.js.map
        