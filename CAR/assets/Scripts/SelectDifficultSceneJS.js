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
        pageNum: 0,
        stageDataArr: [],

        curPos: cc.Vec2,
        difficultTitle: cc.Sprite,
        // pageTeample: cc.Prefab,//difficultsubpagelayout prefab
        pageTeample: {
            default: null,
            type: cc.Prefab,
        },
        contextPageView: cc.PageView,
        //content:cc.Node,
        audioControl:
        {
            default: null,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.audioControl = cc.find('AudioControlNode').getComponent('AudioSourceControl');
        this.content = cc.find('Canvas/DifficultPageView/view/content')
        console.log("找到了", this.content);
        this.initStageData();

    },
    //初始化stagedata~~数组（难度，关卡）
    initStageData: function () {
        let maxPackageCount = GameDataManager.getInstance().getPackageCount();//传入4
        for (let i = 0; i < maxPackageCount; i++) {
            let passCount = GameDataManager.getInstance().getMaxUnlockedStage(i);
            let stageCount = GameDataManager.getInstance().getStageCount(i);
            console.log('stage ' + i + " , " + passCount + "/ " + stageCount);

            let stageData = { passCount: 0, stageCount: 0 };
            stageData.passCount = passCount;
            stageData.stageCount = stageCount;
            this.stageDataArr[i] = stageData;//数组（难度，关卡）
        }
        //循环添加四个难度页面
        for (let i = 0; i < maxPackageCount; i++) {
            this.addSubPage();
        }
    },
    //创建、添加页面
    addSubPage: function () {
        // this._createPage();
        this.contextPageView.addPage(this._createPage());//在当前页面视图的尾部插入一个新视图
    },

    // addPageView: function () {
    //     this.contextPageView = new cc.PageView;
    // },

    //传入数据
    _createPage() {
        // this.content =cc.find('Canvas/DifficultPageView/view/content')
        //cc.log(content);
        console.log("-------------->>>test");
        var page = cc.instantiate(this.pageTeample);//实例化prefab
        cc.log("预制体", page)
        // this.content.addChild(page);
        page.position = new cc.v2(0, 0);//page位置 
        // page.setPosition(0,0);
        cc.log("一", page.position)
        let PACKAGE_IMAGE = ["package_easy", "package_medium", "package_hard", "package_expert"];
        let i = this.pageNum;
        let data = { imageViewPath: "", CompletionLabel: "", id: 0 };//CompletionLabel是prefeb里的label

        data.imageViewPath = GameDataManager.getInstance().getResName(PACKAGE_IMAGE[i]);
        cc.log("图片路径", data.imageViewPath)
        data.CompletionLabel = this.stageDataArr[i].passCount + "/" + this.stageDataArr[i].stageCount;
        //label显示内容:通关数/总关卡数
        var clickEventHandler = new cc.Component.EventHandler();
        //target Node 目标节点  component String 目标组件名  handler String 响应事件函数名  customEventData String 自定义事件数据
        clickEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点

        clickEventHandler.component = "SelectDifficultSceneJS";//这个是代码文件名
        clickEventHandler.handler = "enterGameStageCallback";//btn跳转事件
        clickEventHandler.customEventData = this.pageNum;//自定义事件数据

        var button = page.getComponentInChildren(cc.Button);//prefab中的button
        button.clickEvents.push(clickEventHandler);

        page.getComponent('subDifficultTemplateJS').init(data);//根据data传图

        ++this.pageNum;
        return page;
    },

    //设置位置
    start() {
        // let maxPackageCount = GameDataManager.getInstance().getPackageCount();

        this.curPos = new cc.Vec2(0, 0);
        this.curPos.x = GameDataManager.getInstance().getSelectLevelPos();
        if (this.curPos.x >= 0) {
            this.curPos.x = -375.0;
        }
        this.contextPageView.setContentPosition(this.curPos);//设置当前视图内容的坐标点

        this.scheduleOnce(function () {

            var pagePos = GameDataManager.getInstance().getLatestPackage();
            this.contextPageView.scrollToPage(pagePos);

        }, 0.01);
    },



    //btn跳转事件。_createPage中调用
    enterGameStageCallback: function (event, customEventData) {
        this.playClick();
        //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        var node = event.target;//目标节点
        cc.log("目标节点", node)
        var button = node.getComponent(cc.Button);
        cc.log("获取btn", button)
        let packages = customEventData;
        cc.log("获取packages", packages)
        // GameDataManager.getInstance().getPassTime();
        this.playClick();
        this.savePageviewPos();
        cc.director.loadScene("ChooseStageScene");
    },
    //记录package，LevelPos
    savePageviewPos: function () {
        let curPage = this.contextPageView.getCurrentPageIndex();//number
        GameDataManager.getInstance().saveLatestPackage(curPage);//记录当前页面package

        this.curPos = this.contextPageView.getContentPosition();//获取位置
        GameDataManager.getInstance().saveSelectLevelPos(this.curPos.x);//记录难度选择界面LevelPos
    },
    // update (dt) {},
    back_btnClick() {
        this.playClick();
        this.savePageviewPos();
        cc.director.loadScene("main");
    },
    playClick: function () {
        if (this.audioControl) {
            this.audioControl.playClick();
        }
    },
});
