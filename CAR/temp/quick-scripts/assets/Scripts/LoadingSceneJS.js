(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/LoadingSceneJS.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '237daPWmClBtJ5NwTNcz49u', 'LoadingSceneJS', __filename);
// Scripts/LoadingSceneJS.js

"use strict";

var GameDataManager = require("GameDataManagerJS");
var define = require("define");
cc.Class({
    extends: cc.Component,

    properties: {
        wxlog_btn: cc.Button,
        // bg_sprite: cc.Sprite,
        loadingBar: {
            type: cc.ProgressBar,
            default: null
        },
        loadinglab: cc.Label,
        titlebg: cc.Sprite,
        audioControl: {
            default: null
        }
    },

    onLoad: function onLoad() {
        // cc.sys.localStorage.clear();
        this.loadingBar.progress = 0; //进度条
        this.loadingTime = 1;
        GameDataManager.getInstance().preLoadingdata(); //加载关卡数据(获取maxPackageCount、passCount、unlockCount)
        this.loadres();
        //首次加载游戏
        cc.log("############", GameDataManager.getInstance().getgold());
        if (!define.getgold()) {
            GameDataManager.getInstance().savegold(define.money);
            cc.log("@@@", GameDataManager.getInstance().getgold());
        }
        //    }
        cc.log("load123");
        // if(cc.sys.localStorage.getItem("first_in") == NaN){
        //     cc.sys.localStorage.setItem("first_in", 100);
        // 游戏首次加载需要初始化的操作
        //   }
        //   this.audioControl = cc.find('AudioControlNode').getComponent('AudioSourceControl');
        // (" 常驻节点 赋值 ")
    },

    loadres: function loadres() {
        var self = this;
        var loadingBar = this.loadingBar;
        // var loadtext = this.loadtext;
        // var login_button = this.login_button;
        var jindu = 0;
        self.is_loading = true;
        cc.loader.onProgress = function (completedCount, totalCount, item) {
            if (totalCount !== 0 && self.is_loading === true) {
                jindu = completedCount / totalCount;
            }
            loadingBar.progress = jindu;
            // var number_jindu = parseInt(jindu * 100);
            // loadtext.string = number_jindu + '%';
        };
        self.onLoadComplete();
    },
    onLoadComplete: function onLoadComplete() {
        cc.director.loadScene("main");
        // this.is_loading = false;
        // // this.login_button.node.active = true;
        // this.loadingBar.node.active = false;
        // this.loadtext.node.active = false;
        // cc.loader.onComplete = null;
        //cc.vv.AudioAction.PlayBGM('bg_one.mp3');
    },


    //预加载、适配
    start: function start() {
        cc.log("loading start");
        cc.director.preloadScene("main", cc.log('预加载main'));
        //适配
        // console.log('    cc.winSize =' + cc.winSize);//以磅为单位返回WebGL视图的大小。它考虑了窗口的任何可能的旋转
        // console.log('    cc.view.getVisibleSize() =' + cc.view.getVisibleSize());//返回正在运行的场景的可见大小
        // console.log('    cc.view.getFrameSize() =' + cc.view.getFrameSize());//返回视图的帧大小。在本机平台上，它返回屏幕大小，因为视图是全屏视图。在Web上，它返回画布外部DOM元素的大小
        // console.log('    cc.view.getDesignResolutionSize() =' + cc.view.getDesignResolutionSize());//返回视图的设计大小。默认分辨率大小与'getFrameSize'相同
        // var DesignResolutionSize = cc.view.getDesignResolutionSize();
        // var WinSize = cc.winSize;
        // var nodeX = WinSize.width / DesignResolutionSize.width;
        // var nodeY = WinSize.height / DesignResolutionSize.height;
        // console.log('    nodeX=   ' + nodeX + '  nodeY=' + nodeY);
    }
}

//进入main
// onEnterGame() {
//     console.log('loading onEnterGame!');
//     cc.director.loadScene("main");
// },

// //加载完成回调main界面 
// _completeCallback: function (err, texture) {
//     console.log('第 ' + this.completeCount + '_completeCallback ');
//     this.onEnterGame();     //加载main界面 
// },
// update (dt) {
//     var progress = this.loadingBar.progress;
//     if(progress<1){
//         progress+=dt/this.loadingTime;
//     this.loadingBar.progress =  progress ;  }
//     else cc.director.loadScene("main");
//     // this.scheduleOnce(function () {
//     //     this.onEnterGame();
//     // }, 0.1);

// },
);

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
        //# sourceMappingURL=LoadingSceneJS.js.map
        