"use strict";
cc._RF.push(module, 'cc009A7UO1I/KIPK7iuUZ1i', 'GameDataManagerJS');
// Scripts/GameDataManagerJS.js

"use strict";

var RAW_RES = ["p0", "p1", "p2", "p3", "p4", "p5", "p6", "p7"]; //??????

var RAW_RES_PATH = ["dataA0", "dataB0", "dataC0", "dataD0"];
var PACKGE_STRING = ["简单", "中等", "困难", "专家"];

var languageTextList = [{ ch: '中文', en: 'English' }, { ch: '载入进度', en: 'Loading' }, { ch: '过关', en: 'GOAL' }, { ch: '控制', en: 'CONTROL' }, { ch: '纵向的汽车', en: 'VERTICAL CARS' }, { ch: '横向的汽车', en: 'HORIZONTAL CARS' }, { ch: '关卡', en: 'PUZZLE' }, { ch: '简单', en: 'EASY' }, { ch: '中等', en: 'MEDIUM' }, { ch: '困难', en: 'HARD' }, { ch: '专家', en: 'EXPERT' }, { ch: '求助 遇到困难了 快来帮帮我', en: 'asking for help' }, { ch: ' 关卡 ', en: ' LEVEL ' }, { ch: '提示  x', en: 'HINT  x' }, { ch: '撤回', en: 'UNDO' }, { ch: '重试', en: 'RETRY' }, { ch: '暂停', en: 'PAUSE' }, { ch: '和好友一起闯关吧', en: 'play with friends ' }, { ch: '提示', en: 'HINT' }];
var LevelData = require("LevelDataJS"); //一个关卡下的地图数据
var subBlockStatusData = require("subBlockStatusDataJS"); //一块方块的信息
var define = require("define");

var PackageDatas = cc.Class({
    properties: {
        m_subPackageDatas: [LevelData]
    }
});

var GameInfo = cc.Class({
    properties: {
        icon_url: "",
        appid: ""
    }
});

var GameDataManager = cc.Class({
    extends: cc.Component,

    properties: {
        gameName: "unBlock_",
        PACAKGE_COUNT: 4, //4个难度
        MaxCustomsPass: define.MaxCustomsPass, //100最大关卡
        m_curLevelNum: 0,
        curDate: 0,
        gamePlayScene_isReload: false,

        gameBox_pos: 0,
        debugInfo: 'debuginfo',

        m_PackageStageCount: [cc.Integer], //PACAKGE_COUNT
        m_PackageDatas: [PackageDatas], //PACAKGE_COUNT

        //存储游戏盒子中 的其他游戏信息
        m_gameBoxInfoList: [GameInfo]
    },
    ctor: function ctor() {
        for (var i = 0; i < this.getPackageCount(); ++i) {
            this.m_PackageStageCount[i] = 0;

            this.m_PackageDatas[i] = new PackageDatas();
        }
        this.curDate = new Date();
    },

    statics: {
        _instance: null,
        getInstance: function getInstance() {
            if (GameDataManager._instance === null) {
                this._instance = new GameDataManager();
            }
            return GameDataManager._instance;
        }
    },
    // onLoad () {},

    start: function start() {},

    getPackageCount: function getPackageCount() {
        return this.PACAKGE_COUNT;
    },

    getStageCount: function getStageCount(packages) {
        if (packages >= 0 && packages < this.getPackageCount()) {
            var StageCount = this.m_PackageDatas[packages].m_subPackageDatas.length;
            if (StageCount <= 0) {
                this.initPackageData(packages);
            }
            if (StageCount > this.MaxCustomsPass) {
                return this.MaxCustomsPass;
            } else {
                return StageCount;
            }
        }
        return 0;
    },
    //锁的最大关卡数
    getMaxUnlockedStage: function getMaxUnlockedStage(packages) {
        var count = 0;
        var stageCount = this.getStageCount(packages);
        for (var i = 0; i < stageCount; i++) {
            if (!this.isCompleted(packages, i)) {
                count++;
                if (count == define.Default_Open) // 默认开启
                    {
                        return i;
                    }
            }
        }
        return stageCount - 0;
    },
    //存入新完成的关卡
    addCompletedStageCount: function addCompletedStageCount(packages) {
        var count = this.getCompletedStageCount(packages);
        if (count < this.getStageCount(packages)) {
            count++;
            var key = this.gameName + "package_" + packages.toString();
            cc.sys.localStorage.setItem(key, count);
        }
        return count;
    },
    // update (dt) {},
    //获取packages
    getCompletedStageCount: function getCompletedStageCount(packages) {
        var key = this.gameName + "package_" + packages.toString();
        var val = cc.sys.localStorage.getItem(key);
        if (val == null || val.length == 0) {
            val = 0;
        }
        return parseInt(val);
    },
    //获取关卡数据？？？？
    getStageData: function getStageData(packages, stage) {
        cc.log("this.m_PackageStageCount[packages]:", this.m_PackageStageCount[packages]);
        cc.log("this.m_PackageDatas[packages].m_subPackageDatas.length;", this.m_PackageDatas[packages].m_subPackageDatas.length);

        cc.log("this.m_PackageDatas[packages].m_subPackageDatas[stage]", this.m_PackageDatas[packages].m_subPackageDatas[stage]);

        if (packages > 10) {
            //为什么减一次10？？？？？？？？？？
            packages -= 10;
        }
        if (packages >= 0 && packages < this.getPackageCount()) {
            var StageCount = this.m_PackageDatas[packages].m_subPackageDatas.length;
            if (StageCount == 0) {
                this.initPackageData(packages);
            }

            if (stage >= 0 && stage < this.m_PackageStageCount[packages]) {
                var curLevelData = this.m_PackageDatas[packages].m_subPackageDatas[stage];
                // return this.m_PackageDatas[packages].m_subPackageDatas[stage];
                return curLevelData; //这样可？？？？？？？？？？？？？？
            }
        }
        return null;
    },
    //记录游戏关卡数据
    saveGameState: function saveGameState(packages, stage, val) {
        if (!this.isCompleted(packages, stage)) {
            this.addCompletedStageCount(packages);
        }
        var key = this.gameName + "package" + packages + "stage" + stage;
        cc.sys.localStorage.setItem(key, val);
    },
    //获取游戏关卡数据
    getGameState: function getGameState(packages, stage) {
        var key = this.gameName + "package" + packages + "stage" + stage;
        var val = cc.sys.localStorage.getItem(key);
        if (val == null || val.length == 0) {
            val = -1;
        }
        return parseInt(val);
    },
    //金币
    savegold: function savegold(money) {
        var key = "gold";

        cc.sys.localStorage.setItem(key, money);
        cc.log("money", money);
    },
    getgold: function getgold() {
        var key = "gold";
        var money = cc.sys.localStorage.getItem(key);
        return parseInt(money);
    },
    saveskinlock: function saveskinlock(i, flag) {
        var key = "skin" + i;
        cc.sys.localStorage.setItem(key, flag);
    },
    getskinlock: function getskinlock(i) {
        var key = "skin" + i;
        var flag = cc.sys.localStorage.getItem(key);
        return parseInt(flag);
    },
    savecarskin: function savecarskin(carskin) {
        var key = "carskin";
        cc.sys.localStorage.setItem(key, carskin);
    },
    getcarskin: function getcarskin() {
        var key = "carskin";
        var carskin = cc.sys.localStorage.getItem(key);
        return parseInt(carskin);
    },
    //bool关卡completed 
    isCompleted: function isCompleted(packages, stage) {
        if (packages >= 0 && packages < this.getPackageCount() && stage >= 0 && stage < this.m_PackageStageCount[packages]) {
            var state = this.getGameState(packages, stage);
            if (state > 0) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    },
    //获取state？和getGameState有什么区别？？
    getCompleteStars: function getCompleteStars(packages, stage) {

        if (packages >= 0 && packages < this.getPackageCount() && stage >= 0 && stage < this.m_PackageStageCount[packages]) {
            var state = this.getGameState(packages, stage);
            return state;
        }
        return 0;
    },
    //返回startnum
    getPackagesCompleteStars: function getPackagesCompleteStars(packages) {
        var startNum = 0;
        var tempNum = 0;
        for (var i = 0; i < this.m_PackageStageCount[packages]; ++i) {
            tempNum = this.getCompleteStars(packages, i);
            if (tempNum > 0) {
                startNum += tempNum;
            }
        }
        return startNum;
    },

    getGameCompleteStars: function getGameCompleteStars() {
        var maxPackages = this.getPackageCount();
        var startNum = 0;
        var tempNum = 0;
        for (var i = 0; i < maxPackages; ++i) {
            tempNum = this.getPackagesCompleteStars(i);
            if (tempNum > 0) {
                startNum += tempNum;
            }
        }
        return startNum;
    },
    //增加goals
    addGoals: function addGoals() {
        var key = this.gameName + "goals2";
        if (CC_WECHATGAME) {
            window.wx.postMessage({
                messageType: 3,
                MAIN_MENU_NUM: define.RankKey,
                score: 0
                // score: this.getGoals() + 1,
            });
        } else {
            console.log("fail 提交得分 : " + goals);
        }

        cc.sys.localStorage.setItem(key, this.getGoals() + 1);
    },
    //获取goals
    getGoals: function getGoals() {
        var key = this.gameName + "goals2";
        var val = cc.sys.localStorage.getItem(key);
        if (val == null || val.length == 0) {
            val = 0;
        }
        return parseInt(val);
    },
    //记录当前页面（难度latestpackage）
    saveLatestPackage: function saveLatestPackage(packages) {
        var key = this.gameName + "latestPackage";
        cc.sys.localStorage.setItem(key, packages.toString());
    },
    getLatestPackage: function getLatestPackage() {
        var key = this.gameName + "latestPackage"; // packages.toString()
        var val = cc.sys.localStorage.getItem(key);
        if (val == null || val.length == 0) {
            val = 0;
        }
        return parseInt(val);
    },

    initPackageData: function initPackageData(packages) {
        var pszFileName = "resources/stageData/" + RAW_RES_PATH[packages];
        pszFileName = "stageData/" + RAW_RES_PATH[packages];
        //读取game data .json文件
        var url = pszFileName,
            _type = cc.RawAsset;
        //得到json文件内容
        cc.loader.loadRes(url, _type, function (err, res) {
            if (err) {
                //这里获取res内容就是json里的内容
                console.log(" err=" + err);
            } else {
                //这里获取res内容就是json里的内容
                console.log("init " + pszFileName + "  res.StageCount=" + res.json.StageCount);

                GameDataManager.getInstance().parePackageData(res.json);
            }
        });
        this.m_PackageStageCount[packages] = this.MaxCustomsPass;
    },
    //解析json数据文件
    parePackageData: function parePackageData(res) {

        var i = res.StageId;

        for (var j = 0; j < res.StageData.length; ++j) {
            var level = res.StageData[j].level;
            //    console.log(i+"， level=" + level);
            this.m_PackageDatas[i].m_subPackageDatas[j] = new LevelData();
            this.m_PackageDatas[i].m_subPackageDatas[j].minmove = res.StageData[j].minmove;
            this.m_PackageDatas[i].m_subPackageDatas[j].count = res.StageData[j].count;

            for (var k = 0; k < res.StageData[j].count; ++k) {
                this.m_PackageDatas[i].m_subPackageDatas[j].m_BlockData[k] = new subBlockStatusData();
                this.m_PackageDatas[i].m_subPackageDatas[j].m_BlockData[k].coordinate = res.StageData[j].subBlockStatusData[k].coordinate;
                this.m_PackageDatas[i].m_subPackageDatas[j].m_BlockData[k].state = res.StageData[j].subBlockStatusData[k].state;
            }
            //   console.log(i+"， res.StageData[j].count=" + res.StageData[j].count);
        }
        console.log(i + ", level.count=" + res.StageData.length);
    },

    getPackgeStr: function getPackgeStr(i) {
        if (i >= 0 && i < PACKGE_STRING.length) {
            return PACKGE_STRING[i];
        }
        return 0;
    },
    // //设置游戏主题
    // setGameTheme: function (val) {
    //     // 0-3 
    //     var i = parseInt(val);
    //     let key = this.gameName + "GameTheme"
    //     cc.sys.localStorage.setItem(key, i.toString());
    // },
    // //获取当前主题，没有为0.返回主题id
    // getGameTheme: function () {
    //     let key = this.gameName + "GameTheme"
    //     var val = cc.sys.localStorage.getItem(key);
    //     if ((val == null) || (val.length == 0)) {
    //         val = 0;
    //     }
    //     return parseInt(val);
    // },

    //记录关卡id
    setGameCurLevelNum: function setGameCurLevelNum(levelNum) {
        this.m_curLevelNum = levelNum;
    },
    //返回关卡id
    getGameCurLevelNum: function getGameCurLevelNum() {
        return this.m_curLevelNum;
    },

    //记录难度选择界面LevelPos  
    saveSelectLevelPos: function saveSelectLevelPos(pos) {
        var key = this.gameName + "SelectLevelPos";
        cc.sys.localStorage.setItem(key, pos.toString());
    },
    getSelectLevelPos: function getSelectLevelPos() {
        var key = this.gameName + "SelectLevelPos";
        var val = cc.sys.localStorage.getItem(key);
        if (val == null || val.length == 0) {
            val = 0;
        }
        return parseInt(val);
    },

    //记录不同难度 关卡选择界面 滑动页面的 下标位置 (A123 B123 C123)
    setStagePageScollPos: function setStagePageScollPos(pos) {
        var curPackage = this.getLatestPackage();

        var key = this.gameName + "stagePageScollPosX" + curPackage.toString();
        cc.sys.localStorage.setItem(key, pos.x.toString());

        key = this.gameName + "stagePageScollPosY" + curPackage.toString();
        cc.sys.localStorage.setItem(key, pos.y.toString());
    },
    getStagePageScollPos: function getStagePageScollPos() {
        var curPackage = this.getLatestPackage();
        var key = this.gameName + "stagePageScollPosX" + curPackage.toString();

        var xVal = cc.sys.localStorage.getItem(key);
        if (xVal == null || xVal.length == 0) {
            xVal = 0;
        }
        key = this.gameName + "stagePageScollPosY" + curPackage.toString();
        var yVal = cc.sys.localStorage.getItem(key);
        if (yVal == null || yVal.length == 0) {
            yVal = 0;
        }
        return new cc.Vec2(parseInt(xVal), parseInt(yVal));
    },

    preLoadingdata: function preLoadingdata() {

        var maxPackageCount = this.getPackageCount(); //4个难度
        for (var i = 0; i < maxPackageCount; i++) {
            var passCount = this.getCompletedStageCount(i);
            var unlockCount = this.getMaxUnlockedStage(i); //有什么区别？后边用过吗？
        }
    },
    //bool第一次玩
    getIsFistPlay: function getIsFistPlay() {

        if (GameDataManager.getInstance().getGoals() > 0) {
            return false;
        } else {
            return true;
        }
    },
    //返回路径和（中英）name
    getResName: function getResName(name) {

        var filePath = '';
        if (define.CUR_LANGUAGE_TYPE == define.LANGUAGE_CH) {
            filePath = 'ch/';
        } else if (define.CUR_LANGUAGE_TYPE == define.LANGUAGE_EN) {
            filePath = 'en/';
        }
        return filePath + name;
    },
    //中英id找text
    getTextById: function getTextById(id) {
        if (id >= 0 && id < languageTextList.length) {
            var text = '';
            if (define.CUR_LANGUAGE_TYPE == define.LANGUAGE_CH) {
                text = languageTextList[id].ch;
            } else if (define.CUR_LANGUAGE_TYPE == define.LANGUAGE_EN) {
                text = languageTextList[id].en;
            }
            return text;
        }
    },
    //设置游戏场景加载的标记
    setGamePlaySceneReload: function setGamePlaySceneReload(flag) {
        this.gamePlayScene_isReload = flag;
    },
    //初始为false
    getGamePlaySceneReload: function getGamePlaySceneReload() {
        return this.gamePlayScene_isReload;
    },

    loadGameBoxWXInfo: function loadGameBoxWXInfo() {

        // var CC_WECHATGAME = true;
        if (CC_WECHATGAME) {
            //show other game
            //下载 含有游戏信息列表的 json文件
            // head="https://www.7cgames.cn/transfer.php?url="
            // url="https://www.7cgames.cn/GameRes/fangyipengDir/7CGamesBoxWX/JsonData/7cgamesBoxData.json"
            // var urlPath = "https://www.7cgames.cn/transfer.php?url=https://www.7cgames.cn/GameRes/fangyipengDir/7CGamesBoxWX/JsonData/7cgamesBoxData.json"
            // //7CGamesBoxWX/JsonData/7cgamesNavigator.json  7cgamesBoxDataShare.json
            // urlPath = "https://www.7cgames.cn/transfer.php?url=https://www.7cgames.cn/GameRes/7CGamesBoxWX/JsonData/7cgamesNavigator.json"
            // cc.loader.load(urlPath, function (err, res) {
            //     if (err)
            //         console.log('Completed with ' + err.length + ' errors');
            //     else {
            //         console.log(' loadGameBoxWXInfo 加载完成！');
            //         GameDataManager.getInstance().LoadGameInfoByDataJson(res)
            //     }
            // });
        }
    },

    pushSubGameInfoToGameBoxList: function pushSubGameInfoToGameBoxList(subGameInfo) {
        this.m_gameBoxInfoList.push(subGameInfo);
    },

    clearAllGameInfoToGameBoxList: function clearAllGameInfoToGameBoxList(subGameInfo) {
        this.m_gameBoxInfoList = [];
    },

    randGetGameInfoByGameBoxList: function randGetGameInfoByGameBoxList() {
        //从已有列表中随机取出一个游戏的信息
        if (this.m_gameBoxInfoList.length <= 0) {
            this.loadGameBoxWXInfo();
        } else {
            // var min = 0;
            // var max = this.m_gameBoxInfoList.length;
            // var result = min + Math.floor(Math.random() * (max - min + 1));
            // return this.m_gameBoxInfoList[result]
            // define.APP_ID
            ++this.gameBox_pos;
            this.gameBox_pos = this.gameBox_pos % (this.m_gameBoxInfoList.length + 1);
            if (this.m_gameBoxInfoList[this.gameBox_pos].appid == define.APP_ID) {
                ++this.gameBox_pos;
                this.gameBox_pos = this.gameBox_pos % (this.m_gameBoxInfoList.length + 1);
            } else {}
            console.log(' return pos = ' + this.gameBox_pos);
            return this.m_gameBoxInfoList[this.gameBox_pos];
        }
    },

    LoadGameInfoByDataJson: function LoadGameInfoByDataJson(json_string) {

        //解析下载的json文件 
        //获取appid  icon图片地址
        var data_json = JSON.parse(json_string);
        var list_size = data_json.data.length;

        // //json_文件中加入 default_icon_url_dir字段，避免固定死位置
        // var default_icon_url_dir = "https://www.7cgames.cn/GameRes/fangyipengDir/7CGamesBoxWX/game_icons_196_196";

        this.clearAllGameInfoToGameBoxList();

        for (var i = 0; i < list_size; ++i) {
            var subGameInfo = new GameInfo();
            subGameInfo.icon_url = data_json.data[i].navigatorIcon;
            subGameInfo.appid = data_json.data[i].appid;
            if (subGameInfo.icon_url && subGameInfo.appid) {
                this.m_gameBoxInfoList.push(subGameInfo);
                //console.log(' icon_url  =' + subGameInfo.icon_url + ', appid =' + subGameInfo.appid);
            }
        }

        console.log(' LoadGamesListDataJson size =' + this.m_gameBoxInfoList.length);
    },

    setDebugInfo: function setDebugInfo(info) {
        this.debugInfo = info;
    },

    getDebugInfo: function getDebugInfo() {
        return this.debugInfo;
    },

    //记录版本号
    // setGameVersionNum: function (versionNum) {
    //     let key = this.gameName + "GameVersionNum"
    //     cc.sys.localStorage.setItem(key, versionNum.toString());
    // },
    // getGameVersionNum: function () {
    //     let key = this.gameName + "GameVersionNum"
    //     var val = cc.sys.localStorage.getItem(key);
    //     if ((val == null) || (val.length == 0)) {
    //         val = '';
    //     }
    //     return val.toString();
    // },

    // GetUtcStamp: function () {
    //     // 毫秒
    //     var time_stamp = new Date().getTime();
    //     //秒
    //     // var time_stamp_str = String(Date.parse(new Date()));
    //     // var time_stamp = Number(time_stamp_str.substr(0, time_stamp_str.length - 3));
    //     return time_stamp;
    // },

    GetSendErrorMsgRequestStr: function GetSendErrorMsgRequestStr(errorMsg) {
        var errorMsg_request = {
            "gameName": this.gameName,
            "msg": errorMsg,
            // "timeStamp": this.GetUtcStamp(),
            "time": String(this.GetUtcStamp())
        };
        return JSON.stringify(errorMsg_request);
    },

    sendErrorMsg: function sendErrorMsg(errorMsg) {

        var requestUrl = 'http://192.168.1.108:8070/sendErrorMsg';
        requestUrl = 'https://www.7cgames.cn:8070/sendErrorMsg';

        if (CC_WECHATGAME) {
            var buf = this.GetSendErrorMsgRequestStr(errorMsg);
            wx.request({
                url: requestUrl, // 
                data: buf,
                header: {
                    'content-type': 'application/json' // 默认值
                },
                method: 'POST',
                success: function success(res) {
                    console.log(res);
                },
                fail: function fail(res) {
                    console.log(res.data);
                }
            });
        } else {
            var xhr = cc.loader.getXMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
                    //success
                    console.log(" readyState success: ");
                } else {
                    console.log(" readyState error: " + xhr.readyState + ',' + xhr.status);
                }
                var response = xhr.responseText;
                console.log(" response: " + response);
            };
            // this.streamXHREventsToLabel(xhr, this.xhrAB, this.xhrABResp, "POST");
            xhr.open("POST", requestUrl);
            //set Content-type "text/plain" to post ArrayBuffer or ArrayBufferView
            // xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("content-type", "application/json;charset=UTF-8");
            // xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            // Uint8Array is an ArrayBufferView
            var buf = this.GetSendErrorMsgRequestStr(errorMsg);

            xhr.send(buf);
            // xhr.send(new Uint8Array([1,2,3,4,5]));
            // xhr.send(new Uint8Array(errorMsg_request));
        }
    }

});

module.exports = GameDataManager;

cc._RF.pop();