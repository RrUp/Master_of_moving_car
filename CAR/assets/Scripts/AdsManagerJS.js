


var define = require("define");

var GameDataManager = require("GameDataManagerJS");

// let faceBookRewardedVideoId = "432416873919592_433351250492821"
// let faceBookInterstitialId = "432416873919592_433348743826405"

const wxBANNER_ID = "adunit-8ef60975845f4302";
const wxREWARDED_ID = "adunit-a437428aa8ee8909";


var g_preloadedInterstitial = null;
var g_preloadedRewardedVideo = null;

var g_wx_rewardedAD = null;

let AdsManager = cc.Class({
    extends: cc.Component,

    properties: {

        preloadedInterstitial: null,
        preloadedRewardedVideo: null,


    },

    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},

    start() {

    },

    // update (dt) {},

    statics: {
        _instance: null,
        //rewardedAD: null,
        getInstance: function () {
            if (AdsManager._instance === null) {
                this._instance = new AdsManager();
                //    console.log('_instance  null , _instance=this  !');
            }
            return AdsManager._instance;
        }
    },
    ctor: function () {
        this.init()
        // console.log('ctor     GameDataManager ');
    },

    init: function () {
        this.preloadInterstitial();
        this.preloadRewarded();

        this.preloadBannerAD();

        this.closeRewardedAD();

        return 10;
    },


    preloadInterstitial: function () {

        if (typeof FBInstant != 'undefined') {
            var supportedAPIs = FBInstant.getSupportedAPIs();
            if (supportedAPIs.includes('getInterstitialAdAsync') && supportedAPIs.includes('getRewardedVideoAsync')) {
                //
                // Preload Interstitial
                //
                FBInstant.getInterstitialAdAsync(
                    faceBookInterstitialId, // Your Ad Placement Id
                ).then(function (interstitial) {
                    // Load the Ad asynchronously
                    GameDataManager.getInstance().setDebugInfo(' preloadedInterstitial.loadAsync(); ');
                    // this.preloadedInterstitial = interstitial;
                    // return this.preloadedInterstitial.loadAsync();

                    g_preloadedInterstitial = interstitial;
                    return g_preloadedInterstitial.loadAsync();
                }).then(function () {
                    console.log('Interstitial preloaded')
                    //GameDataManager.getInstance().setDebugInfo('Interstitial preloaded  => ' + this.preloadedInterstitial);
                    GameDataManager.getInstance().setDebugInfo('Interstitial preloaded  => ' + g_preloadedInterstitial);

                }).catch(function (err) {
                    console.error('Interstitial failed to preload: ' + err.message);
                    GameDataManager.getInstance().setDebugInfo('Interstitial failed to preload: ' + err.message);
                });


            } else {
                console.log('Ads not supported in this session');
                GameDataManager.getInstance().setDebugInfo('Ads not supported in this session');
            }
        }
    },

    showInterstitial: function () {

        if (define.DEBUG_NO_ADS == true) {

            console.log('Interstitial ad finished successfully');
            GameDataManager.getInstance().setDebugInfo('Interstitial ad finished successfully');
            this.rewardedInterstitialAdsCallback()
        } else {

            if (typeof FBInstant != 'undefined') {
                //var self = _instance
                if (g_preloadedInterstitial != null) {

                    g_preloadedInterstitial.showAsync()
                        .then(function () {
                            // Perform post-ad success operation
                            console.log('Interstitial ad finished successfully');
                            GameDataManager.getInstance().setDebugInfo('Interstitial ad finished successfully');

                            AdsManager.getInstance().rewardedInterstitialAdsCallback();

                        })
                        .catch(function (e) {
                            console.error(e.message);
                            GameDataManager.getInstance().setDebugInfo(e.message);
                        });

                    AdsManager.getInstance().scheduleOnce(function () {

                        GameDataManager.getInstance().setDebugInfo(' scheduleOnce => preloadInterstitial ');
                        AdsManager.getInstance().preloadInterstitial();

                    }, 2);

                } else {
                    GameDataManager.getInstance().setDebugInfo(' error  g_preloadedInterstitial => ' + g_preloadedInterstitial);
                }
            }
        }


    },

    rewardedInterstitialAdsCallback: function () {
        GameDataManager.getInstance().setDebugInfo('Reward    InterstitialAds');
        console.log('Reward    InterstitialAds');
    },

    preloadRewarded: function () {

        if (typeof FBInstant != 'undefined') {
            var supportedAPIs = FBInstant.getSupportedAPIs();
            if (supportedAPIs.includes('getInterstitialAdAsync') && supportedAPIs.includes('getRewardedVideoAsync')) {
                //
                // Preload Rewarded
                //
                FBInstant.getRewardedVideoAsync(
                    faceBookRewardedVideoId, // Your Ad Placement Id
                ).then(function (rewarded) {
                    // Load the Ad asynchronously

                    g_preloadedRewardedVideo = rewarded;
                    GameDataManager.getInstance().setDebugInfo(' preloadedRewardedVideo.loadAsync(); ');
                    return g_preloadedRewardedVideo.loadAsync();

                }).then(function () {
                    console.log('Rewarded video preloaded')
                    GameDataManager.getInstance().setDebugInfo('Rewarded video preloaded => ' + g_preloadedRewardedVideo);


                }).catch(function (err) {
                    console.error('Rewarded video failed to preload: ' + err.message);
                    GameDataManager.getInstance().setDebugInfo('Rewarded video failed to preload: ' + err.message);
                });
            }
        } else if (CC_WECHATGAME) {
            if (wx.createRewardedVideoAd) {
                this.rewardedAD = wx.createRewardedVideoAd({ adUnitId: wxREWARDED_ID });
                console.log('   preloadRewarded  Rewarded ');
                this.rewardedAD.onError(err => {
                    console.log("Rewarded 加载失败" + err);
                });
            }

        } else {
            console.log('Ads not supported in this session');
            GameDataManager.getInstance().setDebugInfo('Ads not supported in this session');
        }

    },

    showRewardedVideo: function () {

        if (define.DEBUG_NO_ADS == true) {
            console.log('Rewarded video watched successfully');
            this.rewardedVideoAdsCallback()
        } else {

            if (typeof FBInstant != 'undefined') {
                //var self = _instance
                if (g_preloadedRewardedVideo != null) {
                    g_preloadedRewardedVideo.showAsync()
                        .then(function () {
                            // Perform post-ad success operation
                            console.log('Rewarded video watched successfully');
                            GameDataManager.getInstance().setDebugInfo('Rewarded video watched successfully');

                            AdsManager.getInstance().rewardedVideoAdsCallback();

                        })
                        .catch(function (e) {
                            console.error(e.message);
                            GameDataManager.getInstance().setDebugInfo(e.message);
                        });


                    AdsManager.getInstance().scheduleOnce(function () {

                        GameDataManager.getInstance().setDebugInfo(' scheduleOnce => preloadRewarded ');

                        AdsManager.getInstance().preloadRewarded();

                    }, 2);
                } else {
                    GameDataManager.getInstance().setDebugInfo(' error  g_preloadedRewardedVideo =>  ' + g_preloadedRewardedVideo);
                }
            } else if (CC_WECHATGAME) {

                if (this.rewardedAD != null) {
                    this.rewardedAD.show().catch(err => {
                        this.rewardedAD.load().then(() => this.rewardedAD.show())
                        AdsManager.getInstance().onShareGame('sharePic')

                    });

                } else {
                    console.log("Rewarded 为  null");
                    wx.showModal({
                        title: '提示',
                        content: '当前微信版本过低，视频广告奖励，无法使用该功能，请升级到最新微信版本后重试。'
                    });
                }
            } else {
                console.log('Ads not supported in this session');
            }
        }
    },
    showRewardedGold: function () {

        if (define.DEBUG_NO_ADS == true) {
            console.log('Rewarded video watched successfully');
            this.rewardedVideoAdsCallback()
        } else {

            if (typeof FBInstant != 'undefined') {
                //var self = _instance
                if (g_preloadedRewardedVideo != null) {
                    g_preloadedRewardedVideo.showAsync()
                        .then(function () {
                            // Perform post-ad success operation
                            console.log('Rewarded video watched successfully');
                            GameDataManager.getInstance().setDebugInfo('Rewarded video watched successfully');

                            AdsManager.getInstance().rewardedGoldAdsCallback();

                        })
                        .catch(function (e) {
                            console.error(e.message);
                            GameDataManager.getInstance().setDebugInfo(e.message);
                        });


                    AdsManager.getInstance().scheduleOnce(function () {

                        GameDataManager.getInstance().setDebugInfo(' scheduleOnce => preloadRewarded ');

                        AdsManager.getInstance().preloadRewarded();

                    }, 2);
                } else {
                    GameDataManager.getInstance().setDebugInfo(' error  g_preloadedRewardedVideo =>  ' + g_preloadedRewardedVideo);
                }
            } else if (CC_WECHATGAME) {

                if (this.rewardedAD != null) {
                    this.rewardedAD.show().catch(err => {
                        this.rewardedAD.load().then(() => this.rewardedAD.show())
                        AdsManager.getInstance().onShareGame('sharePic')

                    });

                } else {
                    console.log("Rewarded 为  null");
                    wx.showModal({
                        title: '提示',
                        content: '当前微信版本过低，视频广告奖励，无法使用该功能，请升级到最新微信版本后重试。'
                    });
                }
            } else {
                console.log('Ads not supported in this session');
            }
        }
    },
    showmainRewardedGold: function () {

        if (define.DEBUG_NO_ADS == true) {
            console.log('Rewarded video watched successfully');
            this.rewardedVideoAdsCallback()
        } else {

            if (typeof FBInstant != 'undefined') {
                //var self = _instance
                if (g_preloadedRewardedVideo != null) {
                    g_preloadedRewardedVideo.showAsync()
                        .then(function () {
                            // Perform post-ad success operation
                            console.log('Rewarded video watched successfully');
                            GameDataManager.getInstance().setDebugInfo('Rewarded video watched successfully');

                            AdsManager.getInstance().rewardedmainGoldAdsCallback();

                        })
                        .catch(function (e) {
                            console.error(e.message);
                            GameDataManager.getInstance().setDebugInfo(e.message);
                        });


                    AdsManager.getInstance().scheduleOnce(function () {

                        GameDataManager.getInstance().setDebugInfo(' scheduleOnce => preloadRewarded ');

                        AdsManager.getInstance().preloadRewarded();

                    }, 2);
                } else {
                    GameDataManager.getInstance().setDebugInfo(' error  g_preloadedRewardedVideo =>  ' + g_preloadedRewardedVideo);
                }
            } else if (CC_WECHATGAME) {

                if (this.rewardedAD != null) {
                    this.rewardedAD.show().catch(err => {
                        this.rewardedAD.load().then(() => this.rewardedAD.show())
                        AdsManager.getInstance().onShareGame('sharePic')

                    });

                } else {
                    console.log("Rewarded 为  null");
                    wx.showModal({
                        title: '提示',
                        content: '当前微信版本过低，视频广告奖励，无法使用该功能，请升级到最新微信版本后重试。'
                    });
                }
            } else {
                console.log('Ads not supported in this session');
            }
        }
    },
    closeRewardedAD: function () {
        if (CC_WECHATGAME) {
            if (wx.createRewardedVideoAd) {
                this.rewardedAD.onClose(res => {
                    // 用户点击了【关闭广告】按钮
                    // 小于 2.1.0 的基础库版本，res 是一个 undefined
                    if (res && res.isEnded || res === undefined) {

                        // 正常播放结束，可以下发游戏奖励
                        console.log("正常结束");

                        AdsManager.getInstance().rewardedVideoAdsCallback();
                        // if(this.ccClassSelf){
                        //     this.eventCallBack(this.ccClassSelf);
                        // }else{
                        //     console.log("ccClassSelf 没有找到");
                        // }

                        return true;
                    }
                    else {
                        // 播放中途退出，不下发游戏奖励
                        console.log("中途退出");

                        return false;
                    }
                });
            }
        } else {
            cc.log("关闭 Rewarded 的回调函数");
        }
    },

    rewardedVideoAdsCallback: function () {

        console.log('Reward    rewardedVideoAds');
        GameDataManager.getInstance().setDebugInfo('Reward    rewardedVideoAds');
        // GameDataManager.getInstance().addHints();

        var video = cc.find('Canvas/game').getComponent('gameplay')
        video.videohint_btnCallback();
    },
    rewardedGoldAdsCallback() {
        console.log('Reward    rewardedVideoAds');
        GameDataManager.getInstance().setDebugInfo('Reward    rewardedVideoAds');

        var gold = cc.find('Canvas/game').getComponent('gameplay')
        gold.gold_btnCallback();
    },
    rewardedmainGoldAdsCallback() {
        console.log('Reward    rewardedVideoAds');
        GameDataManager.getInstance().setDebugInfo('Reward    rewardedVideoAds');
        var gold = cc.find('Canvas').getComponent('main')
        gold.gold_btnCallback();
    },

    //banner代码
    preloadBannerAD: function () {

        if (typeof FBInstant != 'undefined') {

        } else if (CC_WECHATGAME) {
            console.log("wx.getSystemInfoSync().SDKVersion  " + wx.getSystemInfoSync().SDKVersion);
            if (wx.createBannerAd) {
                this.bannerAD = wx.createBannerAd({
                    adUnitId: wxBANNER_ID,
                    style: {
                        left: 0,
                        top: 0,
                        width: wx.getSystemInfoSync().windowWidth
                    }
                });
                this.bannerAD.onResize(res => {
                    this.bannerAD.style.top = wx.getSystemInfoSync().windowHeight - this.bannerAD.style.realHeight;
                    this.bannerAD.style.left = (wx.getSystemInfoSync().windowWidth - this.bannerAD.style.realWidth) / 2;
                });

                this.bannerAD.onError(err => {
                    console.log("banner 加载失败" + err);
                });
            } else {
                console.log("preloadBannerAD SDKVersion 不支持  banner");
            }
        } else {
            console.log("preloadBannerAD 不支持平台 banner");
        }
    },

    showBannerAD: function () {
        if (typeof FBInstant != 'undefined') {

        } else if (CC_WECHATGAME) {
            if (this.bannerAD != null) {
                this.bannerAD.show();
            } else {
                console.log("bannerAD 为  null");
            }

        } else {
            console.log("showBannerAD 不支持平台 banner");
        }

    },

    hideBannerAD: function () {
        if (typeof FBInstant != 'undefined') {

        } else if (CC_WECHATGAME) {
            if (this.bannerAD != null) {
                this.bannerAD.hide();
            } else {
                console.log("bannerAD 为  null");
            }

        } else {
            console.log("hideBannerAD 不支持平台 banner");
        }
    },
    // if (typeof FBInstant != 'undefined') {
    //     PreloadInterstitial();
    //     showInterstitial();
    // }
    // getShare: function () {
    //     let self = this;
    //     if (CC_WECHATGAME) {
    //         wx.shareAppMessage({
    //             imageUrl: "res/raw-assets/Texture/main/w.png",
    //             success: function (res) {
    //                 console.log("成功");
    //                 //console.log(self.isokhit);
    //                 self.hint();
    //             },
    //             fail: function (res) {
    //                 console.log("失败");
    //             }
    //         })
    //     } else if (typeof FBInstant != 'undefined') {
    //         PreloadRewarded();
    //         showRewardedVideo();
    //     } else {
    //         self.hint();
    //     }
    // },

});
module.exports = AdsManager;