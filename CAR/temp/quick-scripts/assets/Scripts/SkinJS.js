(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/SkinJS.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dedc1s1nolJEbqRHS60Q3UZ', 'SkinJS', __filename);
// Scripts/SkinJS.js

"use strict";

var define = require("define");
var GameDataManager = require("GameDataManagerJS");
cc.Class({
    extends: cc.Component,

    properties: {
        freeButtondefault: cc.Node,
        bottombutton: cc.Node,
        conditionLabel: cc.Label,
        lockbtnLabel: cc.Label,
        goldunlockButton: cc.Node,
        toggle1: cc.Node,
        toggle2: cc.Node,
        toggle3: cc.Node,
        toggle4: cc.Node,
        toggle5: cc.Node,
        toggle6: cc.Node,
        toggle7: cc.Node,
        toggle8: cc.Node,
        toggle9: cc.Node,
        toggle10: cc.Node,
        toggle11: cc.Node,
        toggle12: cc.Node,
        car: {
            default: [],
            type: [cc.Node]
        },
        frame: {
            default: [],
            type: [cc.Node]
        },
        carSprite: cc.Node

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var can = cc.find("Canvas").getComponent(cc.Canvas);
        cc.winSize.width / cc.winSize.height <= (750 / 1334).designScreen ? (can.fitHeight = false, can.fitWidth = true) : (can.fitHeight = true, can.fitWidth = false);
        can.alignWithScreen();
        this.audioControl = cc.find('AudioControlNode').getComponent('AudioSourceControl');
        var carskin = GameDataManager.getInstance().getcarskin();
        define.carskin = carskin;
        for (var i = 0; i < 12; i++) {
            var a = GameDataManager.getInstance().getskinlock(i);
            define.flag[i] = a;
        }
        // 判断——初始赋值
        for (var i = 0; i < 12; i++) {
            if (define.flag[i] == undefined) {
                cc.log("undefined");
                define.flag[i] = 0;
                GameDataManager.getInstance().saveskinlock(i, define.flag[i]);
            }
            cc.log("flag", i, define.flag[i]);
        }
        // test恢复未解锁
        //  for (var i = 0; i < 12; i++) {
        //     let a = GameDataManager.getInstance().getskinlock(i);
        //     define.flag[i] = 0;
        //     GameDataManager.getInstance().saveskinlock(i, define.flag[i]);
        //      cc.log("test恢复未解锁");
        // }
        this.updateskin();
        this.togglecheck();
        //iPhoneX适配
        if (cc.sys.isNative && cc.sys.platform == cc.sys.IPHONE) {
            var size = cc.view.getFrameSize();
            var isIphoneX = size.width == 2436 && size.height == 1125 || size.width == 1125 && size.height == 2436;
            if (isIphoneX) {
                var cvs = this.node.getComponent(cc.Canvas);
                cvs.fitHeight = true;
                cvs.fitWidth = true;
            }
        }
    },
    updateskin: function updateskin() {
        var self = this;
        if (define.flag[1] == 1) {
            var urlPath = "car2";
            cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                self.car[1].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                cc.log("2已解锁");
            });
        }
        if (!define.flag[1] == 1) {
            var urlPath = "uncar2";
            cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                self.car[1].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                cc.log("2未解锁");
            });
        }
        if (define.flag[2] == 1) {
            var urlPath = "car3";
            cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                self.car[2].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                cc.log("3已解锁");
            });
        }
        if (!define.flag[2] == 1) {
            var urlPath = "uncar3";
            cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                self.car[2].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                cc.log("3未解锁");
            });
        }
        if (define.flag[3] == 1) {
            var urlPath = "car4";
            cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                self.car[3].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                cc.log("4已解锁");
            });
        }
        if (!define.flag[3] == 1) {
            var urlPath = "uncar4";
            cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                self.car[3].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                cc.log("4未解锁");
            });
        }
        if (define.flag[4] == 1) {
            var urlPath = "car5";
            cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                self.car[4].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                cc.log("5已解锁");
            });
        }
        if (!define.flag[4] == 1) {
            var urlPath = "uncar5";
            cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                self.car[4].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                cc.log("5未解锁");
            });
        }
        if (define.flag[5] == 1) {
            var urlPath = "car6";
            cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                self.car[5].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                cc.log("6已解锁");
            });
        }
        if (!define.flag[5] == 1) {
            var urlPath = "uncar6";
            cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                self.car[5].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                cc.log("6未解锁");
            });
        }
        if (define.flag[6] == 1) {
            var urlPath = "car7";
            cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                self.car[6].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                cc.log("7已解锁");
            });
        }
        if (!define.flag[6] == 1) {
            var urlPath = "uncar7";
            cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                self.car[6].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                cc.log("7未解锁");
            });
        }
        if (define.flag[7] == 1) {
            var urlPath = "car8";
            cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                self.car[7].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                cc.log("8已解锁");
            });
        }
        if (!define.flag[7] == 1) {
            var urlPath = "uncar8";
            cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                self.car[7].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                cc.log("8未解锁");
            });
        }
        if (define.flag[8] == 1) {
            var urlPath = "car9";
            cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                self.car[8].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                cc.log("9已解锁");
            });
        }
        if (!define.flag[8] == 1) {
            var urlPath = "uncar9";
            cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                self.car[8].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                cc.log("9未解锁");
            });
        }
        if (define.flag[9] == 1) {
            var urlPath = "car10";
            cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                self.car[9].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                cc.log("10已解锁");
            });
        }
        if (!define.flag[9] == 1) {
            var urlPath = "uncar10";
            cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                self.car[9].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                cc.log("10未解锁");
            });
        }
        if (define.flag[10] == 1) {
            var urlPath = "car11";
            cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                self.car[10].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                cc.log("11已解锁");
            });
        }
        if (!define.flag[10] == 1) {
            var urlPath = "uncar11";
            cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                self.car[10].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                cc.log("11未解锁");
            });
        }
        if (define.flag[11] == 1) {
            var urlPath = "car12";
            cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                self.car[11].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                cc.log("12已解锁");
            });
        }
        if (!define.flag[11] == 1) {
            var urlPath = "uncar12";
            cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                self.car[11].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                cc.log("12未解锁");
            });
        }
    },
    start: function start() {
        var _this = this;

        this.node.on("updatskin", function () {
            _this.updateskin();
        });
    },
    update: function update(dt) {
        // this.togglecheck();
        //  this.updateskin();
    },
    goldunlockButton_Click: function goldunlockButton_Click(i) {
        // 解锁皮肤
        this.playClick();

        if (GameDataManager.getInstance().getgold() < 200) {
            cc.log("money not enough!");
        } else {
            if (this.toggle2.getComponent(cc.Toggle).isChecked) {
                define.money -= 200;
                GameDataManager.getInstance().savegold(define.money);

                var i = 1;
                define.flag[i] = 1;
                GameDataManager.getInstance().saveskinlock(i, define.flag[i]);
                this.node.emit("updateskin");
                cc.log("=======falg", i, "=", GameDataManager.getInstance().getskinlock(i));
            }
            if (this.toggle3.getComponent(cc.Toggle).isChecked) {
                define.money -= 200;
                GameDataManager.getInstance().savegold(define.money);

                var i = 2;
                define.flag[i] = 1;
                GameDataManager.getInstance().saveskinlock(i, define.flag[i]);
                this.node.emit("updateskin");
                cc.log("=======falg", i, "=", GameDataManager.getInstance().getskinlock(i));
            }
            if (this.toggle4.getComponent(cc.Toggle).isChecked) {
                define.money -= 300;
                GameDataManager.getInstance().savegold(define.money);

                var i = 3;
                define.flag[i] = 1;
                GameDataManager.getInstance().saveskinlock(i, define.flag[i]);
                this.node.emit("updateskin");
                cc.log("=======falg", i, "=", GameDataManager.getInstance().getskinlock(i));
            }
            if (this.toggle5.getComponent(cc.Toggle).isChecked) {
                define.money -= 300;
                GameDataManager.getInstance().savegold(define.money);

                var i = 4;
                define.flag[i] = 1;
                GameDataManager.getInstance().saveskinlock(i, define.flag[i]);
                this.node.emit("updateskin");
                cc.log("=======falg", i, "=", GameDataManager.getInstance().getskinlock(i));
            }
            if (this.toggle6.getComponent(cc.Toggle).isChecked) {
                define.money -= 500;
                GameDataManager.getInstance().savegold(define.money);

                var i = 5;
                define.flag[i] = 1;
                GameDataManager.getInstance().saveskinlock(i, define.flag[i]);
                this.node.emit("updateskin");
                cc.log("=======falg", i, "=", GameDataManager.getInstance().getskinlock(i));
            }
            if (this.toggle7.getComponent(cc.Toggle).isChecked) {
                define.money -= 500;
                GameDataManager.getInstance().savegold(define.money);

                var i = 6;
                define.flag[i] = 1;
                GameDataManager.getInstance().saveskinlock(i, define.flag[i]);
                this.node.emit("updateskin");
                cc.log("=======falg", i, "=", GameDataManager.getInstance().getskinlock(i));
            }
            if (this.toggle8.getComponent(cc.Toggle).isChecked) {
                define.money -= 500;
                GameDataManager.getInstance().savegold(define.money);

                var i = 7;
                define.flag[i] = 1;
                GameDataManager.getInstance().saveskinlock(i, define.flag[i]);
                this.node.emit("updateskin");
                cc.log("=======falg", i, "=", GameDataManager.getInstance().getskinlock(i));
            }
            if (this.toggle9.getComponent(cc.Toggle).isChecked) {
                define.money -= 500;
                GameDataManager.getInstance().savegold(define.money);

                var i = 8;
                define.flag[i] = 1;
                GameDataManager.getInstance().saveskinlock(i, define.flag[i]);
                this.node.emit("updateskin");
                cc.log("=======falg", i, "=", GameDataManager.getInstance().getskinlock(i));
            }
            if (this.toggle10.getComponent(cc.Toggle).isChecked) {
                define.money -= 500;
                GameDataManager.getInstance().savegold(define.money);

                var i = 9;
                define.flag[i] = 1;
                GameDataManager.getInstance().saveskinlock(i, define.flag[i]);
                this.node.emit("updateskin");
                cc.log("=======falg", i, "=", GameDataManager.getInstance().getskinlock(i));
            }
            if (this.toggle11.getComponent(cc.Toggle).isChecked) {
                define.money -= 500;
                GameDataManager.getInstance().savegold(define.money);

                var i = 10;
                define.flag[i] = 1;
                GameDataManager.getInstance().saveskinlock(i, define.flag[i]);
                this.node.emit("updateskin");
                cc.log("=======falg", i, "=", GameDataManager.getInstance().getskinlock(i));
            }
            if (this.toggle12.getComponent(cc.Toggle).isChecked) {
                define.money -= 500;
                GameDataManager.getInstance().savegold(define.money);

                var i = 11;
                define.flag[i] = 1;
                GameDataManager.getInstance().saveskinlock(i, define.flag[i]);
                this.node.emit("updateskin");
                cc.log("=======falg", i, "=", GameDataManager.getInstance().getskinlock(i));
            }
        }
    },

    // togglecheck1(){
    //     var pic_list = [];
    //     for (var i = 0; i < 5; ++i) {
    //         pic_list.push("car" + (i + 1))
    //     }
    //     var pic_url = pic_list[i];
    //     cc.loader.loadRes(pic_url, cc.SpriteFrame, function (err, spriteFrame) {
    //         self.carSprite.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    //     });
    // },
    togglecheck: function togglecheck() {

        var self = this;var urlPath = "frame";
        if (this.toggle1.getComponent(cc.Toggle).isChecked) {
            this.toggle7.getComponent(cc.Toggle).isChecked = false;
            this.toggle2.getComponent(cc.Toggle).isChecked = false;

            this.freeButtondefault.active = true;
            this.bottombutton.active = false;
            this.conditionLabel.string = "默认皮肤";
            define.carskin = 1;
            GameDataManager.getInstance().savecarskin(define.carskin);
            var url = "car1";
            cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                self.carSprite.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        } else if (this.toggle2.getComponent(cc.Toggle).isChecked) {

            var url = "car2";
            cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                self.carSprite.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });

            this.freeButtondefault.active = false;
            this.bottombutton.active = true;
            this.conditionLabel.string = "解锁条件：200金币";
            this.lockbtnLabel.string = "200￥解锁";
            if (define.flag[1] == 1) {
                define.carskin = 2;
                GameDataManager.getInstance().savecarskin(define.carskin);
                cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                    self.frame[1].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                this.freeButtondefault.active = true;
                this.bottombutton.active = false;
            }
        } else if (this.toggle3.getComponent(cc.Toggle).isChecked) {
            var url = "car3";
            cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                self.carSprite.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });

            this.freeButtondefault.active = false;
            this.bottombutton.active = true;
            this.conditionLabel.string = "解锁条件：200金币";
            this.lockbtnLabel.string = "200￥解锁";
            if (define.flag[2] == 1) {
                define.carskin = 3;
                GameDataManager.getInstance().savecarskin(define.carskin);
                // var urlPath = ("frame3");
                cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                    self.frame[2].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                this.freeButtondefault.active = true;
                this.bottombutton.active = false;
            }
        } else if (this.toggle4.getComponent(cc.Toggle).isChecked) {
            var url = "car4";
            cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                self.carSprite.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });

            this.freeButtondefault.active = false;
            this.bottombutton.active = true;
            this.conditionLabel.string = "解锁条件：300金币";
            this.lockbtnLabel.string = "300￥解锁";
            if (define.flag[3] == 1) {
                define.carskin = 4;
                GameDataManager.getInstance().savecarskin(define.carskin);
                // var urlPath = ("frame4");
                cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                    self.frame[3].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
            }
        } else if (this.toggle5.getComponent(cc.Toggle).isChecked) {
            var url = "car5";
            cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                self.carSprite.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });

            this.freeButtondefault.active = false;
            this.bottombutton.active = true;
            this.conditionLabel.string = "解锁条件：300金币";
            this.lockbtnLabel.string = "300￥解锁";
            if (define.flag[4] == 1) {
                define.carskin = 5;
                GameDataManager.getInstance().savecarskin(define.carskin);
                // var urlPath = ("frame5");
                cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                    self.frame[4].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                this.freeButtondefault.active = true;
                this.bottombutton.active = false;
            }
        } else if (this.toggle6.getComponent(cc.Toggle).isChecked) {
            var url = "car6";
            cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                self.carSprite.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });

            this.freeButtondefault.active = false;
            this.bottombutton.active = true;
            this.conditionLabel.string = "解锁条件：500金币";
            this.lockbtnLabel.string = "500￥解锁";
            if (define.flag[5] == 1) {
                define.carskin = 6;
                GameDataManager.getInstance().savecarskin(define.carskin);
                // var urlPath = ("frame6");
                cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                    self.frame[5].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                this.freeButtondefault.active = true;
                this.bottombutton.active = false;
            }
        } else if (this.toggle7.getComponent(cc.Toggle).isChecked) {
            var url = "car7";
            cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                self.carSprite.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });

            this.freeButtondefault.active = false;
            this.bottombutton.active = true;
            this.conditionLabel.string = "解锁条件：500金币";
            this.lockbtnLabel.string = "500￥解锁";
            if (define.flag[6] == 1) {
                define.carskin = 7;
                GameDataManager.getInstance().savecarskin(define.carskin);
                // var urlPath = ("frame6");
                cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                    self.frame[6].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                this.freeButtondefault.active = true;
                this.bottombutton.active = false;
            }
        } else if (this.toggle8.getComponent(cc.Toggle).isChecked) {
            var url = "car8";
            cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                self.carSprite.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });

            this.freeButtondefault.active = false;
            this.bottombutton.active = true;
            this.conditionLabel.string = "解锁条件：500金币";
            this.lockbtnLabel.string = "500￥解锁";
            if (define.flag[7] == 1) {
                define.carskin = 8;
                GameDataManager.getInstance().savecarskin(define.carskin);
                // var urlPath = ("frame6");
                cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                    self.frame[7].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                this.freeButtondefault.active = true;
                this.bottombutton.active = false;
            }
        } else if (this.toggle9.getComponent(cc.Toggle).isChecked) {
            var url = "car9";
            cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                self.carSprite.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });

            this.freeButtondefault.active = false;
            this.bottombutton.active = true;
            this.conditionLabel.string = "解锁条件：500金币";
            this.lockbtnLabel.string = "500￥解锁";
            if (define.flag[8] == 1) {
                define.carskin = 9;
                GameDataManager.getInstance().savecarskin(define.carskin);
                // var urlPath = ("frame6");
                cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                    self.frame[8].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                this.freeButtondefault.active = true;
                this.bottombutton.active = false;
            }
        } else if (this.toggle10.getComponent(cc.Toggle).isChecked) {
            var url = "car10";
            cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                self.carSprite.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });

            this.freeButtondefault.active = false;
            this.bottombutton.active = true;
            this.conditionLabel.string = "解锁条件：500金币";
            this.lockbtnLabel.string = "500￥解锁";
            if (define.flag[9] == 1) {
                define.carskin = 10;
                GameDataManager.getInstance().savecarskin(define.carskin);
                // var urlPath = ("frame6");
                cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                    self.frame[9].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                this.freeButtondefault.active = true;
                this.bottombutton.active = false;
            }
        } else if (this.toggle11.getComponent(cc.Toggle).isChecked) {
            var url = "car11";
            cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                self.carSprite.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });

            this.freeButtondefault.active = false;
            this.bottombutton.active = true;
            this.conditionLabel.string = "解锁条件：500金币";
            this.lockbtnLabel.string = "500￥解锁";
            if (define.flag[10] == 1) {
                define.carskin = 11;
                GameDataManager.getInstance().savecarskin(define.carskin);
                // var urlPath = ("frame6");
                cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                    self.frame[10].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                this.freeButtondefault.active = true;
                this.bottombutton.active = false;
            }
        } else if (this.toggle12.getComponent(cc.Toggle).isChecked) {
            var url = "car12";
            cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                self.carSprite.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });

            this.freeButtondefault.active = false;
            this.bottombutton.active = true;
            this.conditionLabel.string = "解锁条件：500金币";
            this.lockbtnLabel.string = "500￥解锁";
            if (define.flag[11] == 1) {
                define.carskin = 12;
                GameDataManager.getInstance().savecarskin(define.carskin);
                // var urlPath = ("frame6");
                cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                    self.frame[11].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                this.freeButtondefault.active = true;
                this.bottombutton.active = false;
            }
        }
    },

    playClick: function playClick() {
        if (this.audioControl) {
            this.audioControl.playClick();
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
        //# sourceMappingURL=SkinJS.js.map
        