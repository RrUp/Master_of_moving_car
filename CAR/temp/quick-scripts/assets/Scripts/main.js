(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/main.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'eacc3/Mc21Pf70wEEVJgFxk', 'main', __filename);
// Scripts/main.js

"use strict";

var define = require("define");
var AdsManager = require("AdsManagerJS");
var ShareManager = require("ShareManagerJS");
var GameDataManager = require("GameDataManagerJS");

cc.Class({
  extends: cc.Component,

  properties: {
    background: cc.Sprite,
    title_bg: cc.Sprite,
    gold_btn: cc.Button,
    audio_btn: cc.Button,
    share_btn: cc.Button,
    moregame_btn: cc.Button,
    begin_btn: cc.Button,
    rank_btn: cc.Button,
    skin_btn: cc.Button,
    rankNode: cc.Node,
    skinNode: cc.Node,
    gold_lab: cc.Label,
    gameBox: cc.Node
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad: function onLoad() {
    var _this = this;

    cc.log("======first=", define.carskin);
    define.carskin = GameDataManager.getInstance().getcarskin();
    cc.log("=======seconed", define.carskin);
    var DesignResolutionSize = cc.view.getDesignResolutionSize();
    var WinSize = cc.director.getWinSize();
    var nodeX = WinSize.width / DesignResolutionSize.width;
    var nodeY = WinSize.height / DesignResolutionSize.height;

    var visibleRect = cc.view.getVisibleSize();
    var kWH = visibleRect.width / visibleRect.height;
    var kMoveHight = kWH - 750 / 1334;
    console.log("  k= " + 750 / 1334 + " kWH= " + kWH);
    if (kMoveHight > 0) {
      //    data.TitlePos = cc.p(width * 0.5, height * 0.9);
    } else {
      var offsetk = 400;
      var begin_btn = this.begin_btn.node.getPosition();
      begin_btn.y -= -kMoveHight * offsetk;
      this.begin_btn.node.setPosition(begin_btn);
      console.log("begin_btn - " + -kMoveHight * offsetk);
    }
    this.audioControl = cc.find('AudioControlNode').getComponent('AudioSourceControl');
    this.mute = cc.find('AudioControlNode/AudioRes/audio').getComponent(cc.AudioSource);
    var carskin = GameDataManager.getInstance().getcarskin();
    define.carskin = carskin;
    var coin = GameDataManager.getInstance().getgold();
    define.money = coin;
    this.gold_lab.string = define.money;
    this.node.on("updatemoney", function () {
      _this.updatemoney();
    });
  },
  updatemoney: function updatemoney() {
    this.gold_lab.string = define.money;
  },
  start: function start() {
    this.rankNode.active = false;
    this.skinNode.active = false;
    this.playAudio();
    var playerStart = GameDataManager.getInstance().getGameCompleteStars();
    this.submitScoreButtonFunc(playerStart); //提交分数
  },
  submitScoreButtonFunc: function submitScoreButtonFunc(score) {
    console.log(" main  提交 : " + score + " key= " + define.RankKey);

    if (CC_WECHATGAME) {
      window.wx.postMessage({
        messageType: 3,
        MAIN_MENU_NUM: define.RankKey,
        score: score
      });
    } else {
      console.log("不支持 提交得分 : " + score);
    }
  },
  update: function update(dt) {
    // this.gold_lab.string = define.money;
  },
  gold_btnClick: function gold_btnClick() {
    this.playClick();
    //去看视频
    // AdsManager.getInstance().showmainRewardedGold();
    define.money += 50;
    GameDataManager.getInstance().savegold(define.money);
    this.node.emit("updatemoney");
  },
  gold_btnCallback: function gold_btnCallback() {
    define.money += 50;
    GameDataManager.getInstance().savegold(define.money);
    this.node.emit("updatemoney");
  },
  audio_btnClick: function audio_btnClick() {
    this.playClick();
    if (define.music == true) {
      define.music = false;
      this.mute.volume = 0;
      var self = this;
      var urlPath = "mute";
      cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
        self.audio_btn.normalSprite = spriteFrame;
        self.audio_btn.pressedSprite = spriteFrame;
        self.audio_btn.hoverSprite = spriteFrame;
      });
    } else {
      define.music = true;
      this.mute.volume = 1;
      var self = this;
      var urlPath = "music";
      cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
        if (err) cc.log('Completed with ' + err.length + ' errors');else {
          self.audio_btn.normalSprite = spriteFrame; //传图
          self.audio_btn.pressedSprite = spriteFrame; //
          self.audio_btn.hoverSprite = spriteFrame; //
        }
      });
    }
  },
  other_btnClick: function other_btnClick() {
    this.playClick();
  },
  moregame_btnClick: function moregame_btnClick() {
    this.playClick();
    // ShareManager.getInstance().NavigateTo7cGameBox();
    // this.gameBox.runAction(cc.moveBy(0.5,cc.v2(0,0)));
    // this.box=cc.find("Canvas/gameBox").getComponent("exported-GameBoxInterface");
    // this.box.show();
  },
  begin_btnClick: function begin_btnClick() {
    this.playClick();
    // cc.director.loadScene('SelectDifficultScene');
    cc.director.loadScene('ChooseStageScene');
  },
  share_btnClick: function share_btnClick() {
    this.playClick();
    this.main = cc.find('Canvas/main');
    // this.main.active = false;
    var text = GameDataManager.getInstance().getTextById(17);
    ShareManager.getInstance().onShareGame("sharePic");
  },
  rank_btnClick: function rank_btnClick() {
    this.playClick();
    this.main = cc.find('Canvas/main');
    this.main.active = false;
    this.rank = cc.find('Canvas/rankNode');
    this.rank.active = true;
  },
  skin_btnClick: function skin_btnClick() {
    this.main = cc.find('Canvas/main');
    this.main.active = false;
    this.skin = cc.find('Canvas/skinNode');
    this.skin.active = true;
    this.playClick();
  },
  back_btnClick: function back_btnClick() {
    cc.director.loadScene('main');
    this.playClick();
  },

  playClick: function playClick() {
    if (this.audioControl) {
      this.audioControl.playClick();
    }
    // AdsManager.getInstance().hideBannerAD();
  },
  playAudio: function playAudio() {
    if (this.audioControl) {
      this.audioControl.playAudio();
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
        //# sourceMappingURL=main.js.map
        