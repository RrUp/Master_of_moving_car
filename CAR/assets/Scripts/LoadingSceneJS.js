var GameDataManager = require("GameDataManagerJS");
var define = require("define");
let point = 0;
let isLoading = false;
let isAuthorization = false;
cc.Class({
    extends: cc.Component,

    properties: {
        wxlog_btn: cc.Node,
        // bg_sprite: cc.Sprite,
        loadingBar: {
            type: cc.ProgressBar,
            default: null
        },
        loadinglab: cc.Sprite,
        loadingpercent: cc.Label,
        titlebg: cc.Sprite,
        audioControl:
        {
            default: null,
        },
        testSprite: cc.SpriteFrame
        // btnAuthorization: cc.Node,
    },

    onLoad() {
        // cc.sys.localStorage.clear();
        cc.game.on("impower", (sure) => {
            if (sure) {
                console.log("授权成功！")
                this.wxlog_btn.active = false;
                this.loadingBar.node.active = true;
                this.loadinglab.node.active = true;
                this.loadingpercent.node.active = true;
                // this.wxlog_btn.active=true;
                GameDataManager.getInstance().preLoadingdata();//加载关卡数据(获取maxPackageCount、passCount、unlockCount)
                // this.loadres();
                //首次加载游戏
                cc.log("############", GameDataManager.getInstance().getgold())
                if (!define.getgold()) {
                    GameDataManager.getInstance().savegold(define.money);
                    cc.log("@@@", GameDataManager.getInstance().getgold())
                }
                //    }

            }
            else { }
        })
        this.getInfo();
        this.loadingBar.progress = 0;//进度条
        this.loadingBar.node.active = false;
        this.loadinglab.node.active = false;
        this.loadingpercent.node.active = false;
        // this.loadingTime = 1;
        if (!CC_WECHATGAME){console.log("授权成功！")
        this.wxlog_btn.active = false;
        this.loadingBar.node.active = true;
        this.loadinglab.node.active = true;
        this.loadingpercent.node.active = true;
        // this.wxlog_btn.active=true;
        GameDataManager.getInstance().preLoadingdata();//加载关卡数据(获取maxPackageCount、passCount、unlockCount)
        // this.loadres();
        //首次加载游戏
        cc.log("############", GameDataManager.getInstance().getgold())
        if (!define.getgold()) {
            GameDataManager.getInstance().savegold(define.money);
            cc.log("@@@", GameDataManager.getInstance().getgold())
        }
    }
                // if(cc.sys.localStorage.getItem("first_in") == NaN){
        //     cc.sys.localStorage.setItem("first_in", 100);
        // 游戏首次加载需要初始化的操作
        //   }
        //   this.audioControl = cc.find('AudioControlNode').getComponent('AudioSourceControl');
        // (" 常驻节点 赋值 ")

        // cc.game.addPersistRootNode(this.node);
        // cc.director.preloadScene('main', () => {//预加载
        // });

        // if (CC_WECHATGAME) {
        //         isAuthorization = false;//未授权状态
        //         this.Login();//获取openid
        // }
        // else {//网页测试用
        //     isAuthorization = true;
        //     this.loadingBar.node.active=true;
        //     define.Name = 'testUser'//require('define')
        //     define.Avatra = this.testSprite._texture;
        //     console.log(define.Avatra)
        //     this.scheduleOnce(function () {
        //         Global.server.LoginServer();
        //     }, 1)
        // }
    },
    getInfo() {
        return new Promise(function (resolve, reject) {
            if (CC_WECHATGAME) {
                wx.getSetting({
                    success(res) {
                        if (!res.authSetting['scope.userInfo']) {
                            console.log('ç¨æ·è¿æ²¡ææï¼');
                            if (wx.createUserInfoButton) {
                                console.log("åå»ºæææé®");
                                let button = wx.createUserInfoButton({
                                    type: 'text',
                                    text: '',
                                    style: {
                                        left: 0,
                                        top: 0,
                                        width: 5000,
                                        height: 5000,
                                        lineHeight: 40,
                                        backgroundColor: '',
                                        color: '',
                                        textAlign: 'center',
                                        fontSize: 40,
                                        borderRadius: 10
                                    }
                                });

                                button.onTap(function () {
                                    console.log('åºç°æææé®ï¼');
                                    wx.getUserInfo({
                                        success: function (res) {
                                            button.hide();
                                            define.nickName = res.userInfo.nickName;
                                            define.avatarUrl = res.userInfo.avatarUrl;
                                            console.log("æææå");
                                            cc.game.emit("impower", true);
                                            resolve();
                                        },
                                        fail: function (res) {
                                            console.log(res);
                                            console.log("ææå¤±è´¥");
                                            cc.game.emit("impower", false);
                                            reject();
                                        }
                                    });
                                });
                            } else {
                                console.log("ä¸åå»ºæææé®");
                                wx.authorize({
                                    scope: 'scope.userInfo',
                                    success() {
                                        wx.getUserInfo({
                                            success: function (res) {
                                                define.nickName = res.userInfo.nickName;
                                                define.avatarUrl = res.userInfo.avatarUrl;
                                                // G.LoadingManager.init();
                                                resolve();
                                            },
                                            fail: function (res) {
                                                reject();
                                            }
                                        })
                                    }
                                })
                            }

                        } else {
                            console.log('ç¨æ·å·²ç»ææï¼');
                            wx.getUserInfo({
                                success: function (res) {
                                    console.log('res', res);
                                    define.nickName = res.userInfo.nickName;
                                    define.avatarUrl = res.userInfo.avatarUrl;
                                    cc.game.emit("impower", true);
                                    // G.LoadingManager.init();
                                    resolve();
                                },
                                fail: function (res) {
                                    reject();
                                }
                            })
                        }
                    }
                })
            } else {
                console.log('æµè§å¨æ æ³ææï¼');
                // G.LoadingManager.init();
                resolve();
            }
        })
    },



    Login() {//拿OpenId
        let self = this;
        if (CC_WECHATGAME) {
            wx.login({
                success: function (res1) {
                    if (res1.code) {
                        wx.request({
                            //测试
                            url: 'https://www.7cgames.cn:8070/getOpenId',
                            //生产
                            //url: 'https://www.7cgames.cn:8070/getOpenId',
                            data: {
                                gameName: 'HeadKing',
                                appid: 'wxe7da0f34550b5d3c',
                                secret: '134aa23603b0ab1d8177c6ef65370f40',
                                js_code: res1.code,
                                grant_type: 'authorization_code',
                            },
                            header: {
                                "Content-Type": "application/json"
                            },
                            method: 'POST',
                            success: function (res2) {
                                console.log('res2' + "--------------");
                                console.log(res2);
                                userID = res2.data.openid;
                                if (!userID) {
                                    // self.userID = '123';
                                    console.log('self.userID!!!')
                                }
                                console.log(userID)
                                cc.sys.localStorage.setItem('OpenId', userID);
                                // console.log('userID' + userID)
                                console.log('发起连接请求：' + (new Date()).getTime());
                                self.wxGetUserState();
                            },
                            fail: function (res2) {
                                console.log("openidGet Fail", res2);

                            }
                        })
                    } else {
                        console.log('登录失败！' + res1.errMsg)
                    }
                }
            });

        }
        else {
            //  userID = 'oUQfI5QDgOnYS74rtdfMrBEwV0MM';

        }
    },
    wxGetUserState: function () {

        let self = this
        wx.getSetting({
            fail: function (res) {
                self.wxGetUserInfo()
                console.log('fail1')
            },

            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    self.getUserInfo()
                    self.btnAuthorization.active = false;
                }
                else {
                    self.btnAuthorization.active = true;
                    self.wxGetUserInfo()
                    console.log('fail2')
                }
            }
        })
    },
    wxGetUserInfo() {
        let self = this;
        //this.windowWidth
        this.WXInfoButton = wx.createUserInfoButton({
            type: 'text',
            text: '',
            style: {
                left: 0,
                top: 0,
                width: 5000,
                height: 5000,
                lineHeight: 40,
                backgroundColor: '',
                color: '',
                textAlign: 'center',
                fontSize: 16,
                borderRadius: 4
            }
        })
        this.WXInfoButton.onTap((res) => {
            if (res.errMsg.indexOf('auth deny') > -1 || res.errMsg.indexOf('auth denied') > -1) {
                // 处理用户拒绝授权的情况
                self.guideActive()
            } else {
                self.setUserData(res)
                self.WXInfoButton.hide();
            }

        })
        this.WXInfoButton.show()

    },
    getUserInfo() {
        let self = this;
        console.log('get info')
        wx.getUserInfo({
            fail: function (res) {
                if (res.errMsg.indexOf('auth deny') > -1 || res.errMsg.indexOf('auth denied') > -1) {
                    // 处理用户拒绝授权的情况
                    self.guideActive()
                }
            },
            success: function (res) {
                console.log('get info success')
                self.setUserData(res)
            }
        })
    },
    guideActive: function () {
        wx.showModal({
            title: '警告',
            content: '拒绝授权将无法正常游戏',
            //cancelText: '取消',
            showCancel: false,
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    setUserData: function (res) {
        console.log('login')
        //console.log(res.userInfo)
        define.Name = res.userInfo.nickName
        define.AvatarUrl = res.userInfo.avatarUrl;
        this.btnAuthorization.active = false;
        this.pro.node.active = true;
        isAuthorization = true;
        cc.loader.load({ url: res.userInfo.avatarUrl, type: 'png' }, function (err, newSprite) {
            define.Avatra = newSprite;
        })
        //Global.server.PostUserInfoByUserIdBindFun()//把获得头像数据发送给服务器
        //**  Global.server.LoginServer(res.userInfo.nickName, res.userInfo.avatarUrl, userID);
        // this.signature = res.signature
        // this.encryptedData = res.encryptedData
        // this.rawData = res.rawData
        // this.iv = res.iv

        // this.pro.node.active = true;
    },
    // loadres(dt) { 
    //     if (isAuthorization) {
    //         cc.log("——————",point)
    //         point += dt; cc.log("+++++point",point)
    //         this.loadingBar.progress = ((point / 3) > 1 ? 1 : point / 3);
    //         this.loadingpercent.string = Math.floor(this.loadingBar.progress * 100) + "%";
    //     }
    //     var self = this;
    //     var loadingBar = this.loadingBar;
    //     // var loadtext = this.loadtext;
    //     // var login_button = this.login_button;
    //     var jindu = 0;
    //     self.is_loading = true;
    //     cc.loader.onProgress = function (completedCount, totalCount, item) {
    //         if (totalCount !== 0 && self.is_loading === true) {
    //             jindu = completedCount / totalCount;
    //         }
    //         loadingBar.progress = jindu;
    //         // var number_jindu = parseInt(jindu * 100);
    //         // loadtext.string = number_jindu + '%';
    //         cc.log("*******",loadingBar.progress)
    //     if(loadingBar.progress>=1){
    //     self.onLoadComplete();};

    // }

    // },
    onLoadComplete() {
        cc.director.loadScene("main");
        // this.is_loading = false;
        // // this.login_button.node.active = true;
        // this.loadingBar.node.active = false;
        // this.loadtext.node.active = false;
        // cc.loader.onComplete = null;
        //cc.vv.AudioAction.PlayBGM('bg_one.mp3');
    },

    //预加载、适配
    start() {
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

    },

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
    update(dt) {
        if (this.loadingBar.progress >= 1 && isLoading == false) {
            // cc.director.loadScene("main");
            isLoading = true;
            this.onLoadComplete();
        }
        // if (isAuthorization) {
        point += dt;
        this.loadingBar.progress = ((point / 3) > 1 ? 1 : point / 3);
        this.loadingpercent.string = Math.floor(this.loadingBar.progress * 100) + "%";
        // }
        //     var progress = this.loadingBar.progress;
        //     if(progress<1){
        //         progress+=dt/this.loadingTime;
        //     this.loadingBar.progress =  progress ;  }
        //     else cc.director.loadScene("main");
        //     // this.scheduleOnce(function () {
        //     //     this.onEnterGame();
        //     // }, 0.1);

    },
    // log_btnClick(){
    //     if(isLoading = true){
    //         cc.director.loadScene("main");
    //     }
    // }
});