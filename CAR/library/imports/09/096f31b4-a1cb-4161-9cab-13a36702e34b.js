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
        audioControl: {
            default: null
        }

    },

    onLoad: function onLoad() {
        this.audioControl = cc.find('AudioControlNode').getComponent('AudioSourceControl');
        this.m_Package = GameDataManager.getInstance().getLatestPackage();
        this.m_MaxUnlockedStageIdx = GameDataManager.getInstance().getMaxUnlockedStage(this.m_Package);
        this.m_StageCount = GameDataManager.getInstance().getStageCount(this.m_Package);
        this.m_PageCount = this.m_StageCount / this.m_PageStageCount;
        this.addTitle();
        this.addStageBtn();
    },
    start: function start() {},

    addTitle: function addTitle() {
        var newTitle = cc.instantiate(this.titlePrefab);
        this.node.addChild(newTitle);
        var data = { TitleLabelStr: "", TitleLabelId: 0, TitlePos: cc.v2 };
        data.TitleLabelStr = GameDataManager.getInstance().getTextById(7 + GameDataManager.getInstance().getLatestPackage());
        data.TitleLabelId = GameDataManager.getInstance().getLatestPackage();
        data.TitlePos = cc.v2(0, 500);
        newTitle.getComponent('subDifficultTitleJS').init(data);
    },
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

            newStageBtnItem.getComponent('subStarTemplateJS').init(stageData);
            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.component = "ChooseStageJS";
            clickEventHandler.handler = "enterGameSceneCallback";
            clickEventHandler.customEventData = stageData.stageId;
            var button = newStageBtnItem.getComponent(cc.Button);
            button.clickEvents.push(clickEventHandler);
        }
        this.contextScrollView.scrollToPercentVertical(1, 0.1);
    },
    enterGameSceneCallback: function enterGameSceneCallback(event, customEventData) {
        this.playClick();
        var node = event.target;
        var button = node.getComponent(cc.Button);
        var stageId = customEventData;
        if (stageId <= this.m_MaxUnlockedStageIdx) {
            this.playClick();
            GameDataManager.getInstance().setGameCurLevelNum(stageId);
            cc.director.loadScene("game");
        } else {}
    },

    saveScrollPos: function saveScrollPos() {
        var scrollPos = this.contextScrollView.getContentPosition();
        GameDataManager.getInstance().setStagePageScollPos(scrollPos);
    },

    onBtnBackClicked: function onBtnBackClicked() {
        this.playClick();
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