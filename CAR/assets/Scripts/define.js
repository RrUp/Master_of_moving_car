// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

module.exports = {
    avatarUrl:'',//头像
    nickName:'xx',//昵称
    AvatarUrl:'', 
  
    kVersion_number: '1.0.6',
    APP_ID: '   ',

    goal:0,
  money: 100,
    flag:[0],
    carskin:1,
    //枚举 水平 垂直方向
    kOrientation_Horizontal: 0,
    kOrientation_Vertical: 1,

    //是否被选中
    kBlockState_Grabbed: 2,
    kBlockState_Ungrabbed: 3,

    GRIDIRON_WIDTH: 6,

    //默认提示次数
    Default_Hints: 3,

    // 默认开启关卡数
    Default_Open: 1,

    MaxCustomsPass: 100,
    RankKey: 'gameRank',

    kDirection_Left: 1,
    kDirection_Down: 2,
    kDirection_Right: 3,
    kDirection_Up: 4,

    GameMode_Relax: 10,

    //定时改变展示的其他游戏的icon
    kChangeOtherIconTime: 5,

    designSize: new cc.Vec2(750, 1334),

    kMoveActionTag: 0xc0c05031,

    kBlinkActionTag: 0xc0c03051,

    //-----debug-----
    //debug模式
    DEBUG_MODE: false,
    //显示scroll Pos
    DEBUG_SCROLL_POS: false,
    //显示 关卡数据 block 位置
    DEBUG_SHOW_POS: false,
    //显示block地图
    DEBUG_SHOW_MAP: false,
    //无限提示
    DEBUG_HINTS: false,
    //不显示广告
    DEBUG_NO_ADS: false,
    //测试广告
    DEBUG_TEST_ADS: false,

    //-----debug----- end

    LANGUAGE_EN: 1,
    LANGUAGE_CH: 0,

    CUR_LANGUAGE_TYPE: 0,
    music: true,
    getgold:function(){
        let key = "gold";
        var money=cc.sys.localStorage.getItem(key);
        return parseInt(money);
     
    },

};
