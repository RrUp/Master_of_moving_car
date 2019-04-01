"use strict";
cc._RF.push(module, 'eacc3/Mc21Pf70wEEVJgFxk', 'main');
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
    // turntable_btn: cc.Button,
    // checkin_btn: cc.Button,
    rank_btn: cc.Button,
    skin_btn: cc.Button,
    rankNode: cc.Node,
    skinNode: cc.Node,
    // turntable:cc.Node,
    // audioControl:
    // {
    //   default: null,
    // },
    gold_lab: cc.Label,
    gameBox: cc.Node
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad: function onLoad() {
    var _this = this;

    // //首次加载游戏
    // if(cc.sys.localStorage.getItem("first_in") == undefined){
    //   cc.sys.localStorage.setItem("first_in", 100);
    //   // 游戏首次加载需要初始化的操作

    // }
    // AdsManager.getInstance();
    // ShareManager.getInstance();

    // define.money = this.gold;
    this.audioControl = cc.find('AudioControlNode').getComponent('AudioSourceControl');
    // // (" 常驻节点 赋值 ")
    // cc.audioEngine.playMusic(this.audio,true);

    this.mute = cc.find('AudioControlNode/AudioRes/audio').getComponent(cc.AudioSource);
    // this.money= 
    var coin = GameDataManager.getInstance().getgold();
    define.money = coin;
    console.log("----------------->>", coin);
    this.gold_lab.string = define.money;
    // cc.log("===jinbi=", GameDataManager.getInstance().getgold());
    // cc.log("====", this.gold)
    this.node.on("updatemoney", function () {
      _this.updatemoney();
    });

    // cc.game.on("updatemoney",()=>{
    //   this.updatemoney();
    // });
  },
  updatemoney: function updatemoney() {
    this.gold_lab.string = define.money;
  },
  start: function start() {
    this.rankNode.active = false;
    this.skinNode.active = false;
    this.playAudio();
    var playerStart = GameDataManager.getInstance().getGameCompleteStars();
    console.log("playerStart = " + playerStart);
    this.submitScoreButtonFunc(playerStart); //提交分数
  },

  // updatemoney(){
  //   this.gold_lab.string = define.money;
  // },
  //提交分数 
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
        self.audio_btn.normalSprite = spriteFrame; //传图
        self.audio_btn.pressedSprite = spriteFrame; //
        self.audio_btn.hoverSprite = spriteFrame; //

      });
    } else {
      define.music = true;
      this.mute.volume = 1;
      var self = this;
      var urlPath = "music";
      cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {

        if (err) cc.log('Completed with ' + err.length + ' errors');else {
          console.log('换图声音完成！' + spriteFrame._name + '  ');
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
    ShareManager.getInstance().NavigateTo7cGameBox();
    this.gameBox.runAction(cc.moveBy(0.5, cc.v2(0, 0)));
    this.box = cc.find("Canvas/gameBox").getComponent("exported-GameBoxInterface");
    cc.log("this.box", this.box);
    this.box.show();
    cc.log("gamebox");
  },
  begin_btnClick: function begin_btnClick() {
    this.playClick();
    cc.director.loadScene('SelectDifficultScene');
  },
  share_btnClick: function share_btnClick() {
    this.playClick();
    cc.log("share");
    this.main = cc.find('Canvas/main');
    this.main.active = false;
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