var define = require("define");
var AdsManager = require("AdsManagerJS");

cc.Class({
    extends: cc.Component,
    name: "RankJS",
    properties: {
        groupFriendButton: cc.Button,
        // friendButton: cc.Node,
        rankingScrollView: cc.Sprite,//显示排行榜

        mainNode: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var self = this;
        var canvas = self.mainNode
        canvas.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        }, self.node);
        canvas.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            event.stopPropagation();
        }, self.node);
        canvas.on(cc.Node.EventType.TOUCH_END, function (event) {
            event.stopPropagation();
        }, self.node);

    },

    start () {
        if (CC_WECHATGAME) {
            window.wx.showShareMenu({ withShareTicket: true });//设置分享按钮，方便获取群id展示群排行榜
            this.tex = new cc.Texture2D();
            console.log("rankingScrollView setContentSize " + cc.director.getVisibleSize());
            var k = 0.5;
            //    this.rankingScrollView.node.setContentSize(cc.director.getVisibleSize());
            // window.wx.postMessage({
            //     messageType: 1,
            //     MAIN_MENU_NUM: define.RankKey
            // });
        }
        this.groupFriendButton.getComponentInChildren(cc.Label).string = '群排行'
        cc.log("+========", this.groupFriendButton.getComponentInChildren(cc.Label).string)
        //GameDataManager.getInstance().getTextById(14);
    },
    friendButtonFunc(event) {
        console.log(" show 好友排行榜数据 ");
        AdsManager.getInstance().hideBannerAD();
        if (CC_WECHATGAME) {
            if (window.wx.postMessage&&wx.getOpenDataContext) {
                this.mainNode.active = true;
                // 发消息给子域
                window.wx.postMessage({
                    messageType: 1,
                    MAIN_MENU_NUM: define.RankKey
                });
            } else {
                wx.showModal({
                    title: '提示',
                    content: '当前微信版本过低，好友排行榜，无法使用该功能，请升级到最新微信版本后重试。'
                });
            }

        } else {
            console.log("不支持 获取好友排行榜数据。x1");
        }
    },

    groupFriendButtonFunc: function (event) {
        if (CC_WECHATGAME) {
            var titleText = '90后女司机诚邀您决战秋名山'
            window.wx.shareAppMessage({
                title: titleText,
                imageUrl: "res/raw-assets/resources/share/sharePic4.jpg",
                success: (res) => {
                    if (res.shareTickets != undefined && res.shareTickets.length > 0) {
                        window.wx.postMessage({
                            messageType: 5,
                            MAIN_MENU_NUM: define.RankKey,
                            shareTicket: res.shareTickets[0]
                        });
                    }
                }
            });
        } else {
            console.log("不支持 获取群排行榜数据。x1");
        }
    },

    gameOverButtonFunc: function (event) {
        if (CC_WECHATGAME) {
            window.wx.postMessage({// 发消息给子域
                messageType: 4,
                MAIN_MENU_NUM: define.RankKey
            });
        } else {
            console.log("获取横向展示排行榜数据。x1");
        }
    },

    submitScoreButtonFunc(score) {
        if (CC_WECHATGAME) {
            window.wx.postMessage({
                messageType: 3,
                MAIN_MENU_NUM: define.RankKey,
                score: score,
            });
        } else {
            console.log("fail 提交得分 : " + score)
        }
    },
    update (dt) {
        this._updateSubDomainCanvas();
    },
     // 刷新子域的纹理
     _updateSubDomainCanvas() {
        if (!this.tex) {
            return;
        }
        if (window.sharedCanvas != undefined) {
            if(wx.getOpenDataContext)
            {
                var openDataContext = wx.getOpenDataContext();
                var sharedCanvas = openDataContext.canvas;
                this.tex.initWithElement(sharedCanvas);
                this.tex.handleLoadedTexture();
                this.rankingScrollView.spriteFrame = new cc.SpriteFrame(this.tex);
            }
        }

        // if (window.sharedCanvas != undefined) {
        //     this.tex.initWithElement(window.sharedCanvas);
        //     this.tex.handleLoadedTexture();
        //     this.rankingScrollView.spriteFrame = new cc.SpriteFrame(this.tex);
        // }
    },
});
