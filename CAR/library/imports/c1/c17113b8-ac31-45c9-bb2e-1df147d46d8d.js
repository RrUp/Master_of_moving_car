"use strict";
cc._RF.push(module, 'c1711O4rDFFybsuHfFH1G2N', 'gameplay');
// Scripts/gameplay.js

"use strict";

var define = require("define");
var Block = require("BlockJS");
var GameDataManager = require("GameDataManagerJS");
var MyLayoutManager = require("MyLayoutManagerJS");
var ShareManager = require("ShareManagerJS");
var AdsManager = require("AdsManagerJS");

var HintNode = cc.Class({
    properties: {
        position: 0,
        move: 0,
        prev: 0,
        index: 0
    },
    statics: {
        count: 0
    },
    ctor: function ctor(position, move, prev) {
        this.position = position;
        this.move = move;
        this.prev = prev;
        this.index = HintNode.count++;
    }
});

cc.Class({
    extends: cc.Component,
    properties: {
        m_Gridiron: [0], //car数组
        m_pPanda: cc.Node, //目标车
        m_pBlocks: [cc.Node],
        m_History: [0],

        m_GridironSize: 0,
        m_GameScaleY: 1,
        m_GridSize: cc.Size,

        curDate: 0,
        m_MinSteps: 1,
        m_Package: 0,
        m_stage: 0,
        m_HintBlockDestCoordinate: 0,
        m_CurrentHintIndex: -1,
        m_lastHints: 0,

        m_HintMode: false,
        m_SolutionMoves: [0],

        m_pHintBlock: {
            default: null,
            type: cc.Block
        },
        bg_sprite: cc.Sprite, //一层背景图
        menu_btn: cc.Button,
        back_menu_btn: cc.Button,
        stage_btn: cc.Button,
        main_btn: cc.Button,
        sub_gameTitle: cc.Sprite, //上面两个挂载节点
        stageIdLab: cc.Label, //关卡id
        stageTitleLab: cc.Label, //第   关
        gold_btn: cc.Button,

        time: cc.node,
        timeLab: cc.Label,

        gamepass: cc.Node,
        gameCenter: cc.Node,

        gameBtnNode: cc.Node, //底部btn
        m_pHint: cc.Button,
        m_pVideoHint: cc.Button,
        m_pRetry: cc.Button,
        // m_share_btn: cc.Button,

        m_pGuideHintDest: cc.Sprite,
        m_pGuideHintPointer: cc.Sprite,

        audio: {
            type: cc.AudioSource,
            default: null
        },
        audioClick: {
            type: cc.AudioSource,
            default: null
        },
        audioMove: {
            type: cc.AudioSource,
            default: null
        },
        audioComplete: {
            type: cc.AudioSource,
            default: null
        },
        audioControl: {
            default: null
        },
        // gameLayout: {

        //     default: null,
        // },
        // 缩放系数
        m_kOffsetScale: 1,

        m_DraggedMinX: 0.0,
        m_DraggedMaxX: 0.0,
        m_DraggedMinY: 0.0,
        m_DraggedMaxY: 0.0,

        gold_lab: cc.Label

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var _this = this;

        this.curDate = new Date();
        // this.gamepass.active = false;
        this.audioControl = cc.find('AudioControlNode').getComponent('AudioSourceControl');
        this.init();
        cc.log("+++++", define.money);
        this.node.on("updatemoney", function () {
            _this.updatemoney();
        });
        cc.log("*********", GameDataManager.getInstance().getGoals());
    },
    init: function init() {
        //  cc.director.loadScene("game");

        cc.log("===========GAME INIT============");
        for (var i = 0; i < 8; ++i) {
            this.m_Gridiron[i] = 0;
        }
        // this.gold = GameDataManager.getInstance().getgold();
        this.gold_lab.string = define.money;
        this.m_Package = GameDataManager.getInstance().getLatestPackage(); //1
        this.m_stage = GameDataManager.getInstance().getGameCurLevelNum(); //0
        this.stageIdLab.string = GameDataManager.getInstance().getTextById(12) + (this.m_stage + 1); //关卡1
        this.m_GridironSize = MyLayoutManager.getInstance().getGridironSize(); // width 6   height 6

        // this.stageTitleLab.string = GameDataManager.getInstance().getTextById(12);//' LEVEL ';// GameDataManager.getInstance().getTextById(12);

        var visibleRect = MyLayoutManager.getInstance().getVisibleRect(); //{x: 0, y: 0, width: 750, height: 1334}
        var visibleCenter = visibleRect.origin + visibleRect.size / 2; //(0.00, 0.00)NaN
        var kWH = visibleRect.size.width / visibleRect.size.height; //0.5622188905547226
        var kHW = visibleRect.size.height / visibleRect.size.width; //1.778666666666666
        var scaleY = visibleRect.size.height / 1334; //1
        //==========
        var kOffsetHW = kHW / (1334 / 750.0); //1
        //MyLayoutManager.getInstance().getHorizontalGridironPadding()是8
        var gameRectWidth = visibleRect.size.width - MyLayoutManager.getInstance().getHorizontalGridironPadding() * 2; // visibleRect.size.width - MyLayoutManager.getInstance().getHorizontalGridironPadding() * 2;
        var gameRectHeight = gameRectWidth; //734
        {
            // var gameRectHeight = visibleRect.size.height - MyLayoutManager.getInstance().getHorizontalGridironPadding() * 10 * 2;
            // var gameRectWidth = this.gameCenter.width - MyLayoutManager.getInstance().getHorizontalGridironPadding() * 2;// visibleRect.size.width - MyLayoutManager.getInstance().getHorizontalGridironPadding() * 2;
            // var gameRectHeight = this.gameCenter.height - MyLayoutManager.getInstance().getHorizontalGridironPadding() * 10 * 2;
            //gameRectWidth:24,gameRectHeight:-124
            //高宽比 较小的
            // if (kOffsetHW < 0.75) {
            //     //pad
            //     var kOffsetRedress = 1.3
            //     this.m_kOffsetScale = kOffsetHW * kOffsetRedress
            //     gameRectWidth = gameRectWidth * (this.m_kOffsetScale);
            //     gameRectHeight *= (this.m_kOffsetScale);
            //     this.gameCenter.node.setScale(this.m_kOffsetScale);
            // } else
            //     if (kOffsetHW < 0.9) {
            //         //pad
            //         var kOffsetRedress = 1.10
            //         this.m_kOffsetScale = kOffsetHW * kOffsetRedress
            //         gameRectWidth = gameRectWidth * (this.m_kOffsetScale);
            //         gameRectHeight *= (this.m_kOffsetScale);
            //         this.gameCenter.setScale(this.m_kOffsetScale);
            //     } else if (kOffsetHW < 0.95) {
            //         //pad
            //         var kOffsetRedress = 1.04
            //         this.m_kOffsetScale = kOffsetHW * kOffsetRedress
            //         gameRectWidth = gameRectWidth * (this.m_kOffsetScale);
            //         gameRectHeight *= (this.m_kOffsetScale);
            //         this.gameCenter.node.setScale(this.m_kOffsetScale);
            //     }

            // console.log(" gameRect  " + gameRectWidth + " " + gameRectHeight);
        }
        this.m_GridironSize.width = this.m_GridironSize.height = define.GRIDIRON_WIDTH;
        this.m_GridSize.width = gameRectWidth / this.m_GridironSize.width;
        this.m_GridSize.height = gameRectHeight / this.m_GridironSize.height;
        MyLayoutManager.getInstance().setGridSize(this.m_GridSize); //设置一个格子大小

        // var gameCenterBox = this.gameCenter.getBoundingBox();//返回父节坐标系下的轴向对齐的包围盒//0000
        var rectX = visibleRect.origin.x + visibleRect.size.width * 0.5 + this.gameCenter.getPosition().x - gameRectWidth * 0.5;
        var rectY = visibleRect.origin.y + visibleRect.size.height * 0.5 + this.gameCenter.getPosition().y - gameRectHeight * 0.5 - 10;
        this.m_GameRect = new cc.Rect(rectX, rectY, gameRectWidth, gameRectHeight);
        {
            //             var kMoveHight = (kWH - 750 / 1334)
            //             console.log("  k= " + 750 / 1334 + " kWH= " + kWH);
            //             if (kMoveHight > 0) {
            //                 //<1.778的屏幕 eg  pad
            //                 var offsetk = 700;
            //                 var title_pos = this.sub_gameTitle.node.getPosition();
            //                 title_pos.y -= kMoveHight * offsetk;

            //                 //移动到top位置
            //                 //title_pos.y = (visibleRect.size.height - this.sub_gameTitle.node.getContentSize().height * this.m_kOffsetScale) / 2

            //                 //移动到中心区域上方
            //                 var topOffset = this.sub_gameTitle.node.height * this.m_kOffsetScale * 0.5
            //                 title_pos.y = this.gameCenter.node.getPosition().y + (gameCenterBox.height) / 2 + topOffset;
            //                 if (title_pos.y > visibleRect.size.height / 2 + topOffset * 0.3) {
            //                     console.log(" sub_gameTitle up 超过top区域  固定在top区域 ");
            //                     title_pos.y = (visibleRect.size.height - topOffset * 0.2) / 2
            //                 }

            //                 this.sub_gameTitle.node.setPosition(title_pos);

            //                 var bg_title = this.sub_gameTitle.node.getChildByName("bgSprite");
            //                 bg_title.setScale(visibleRect.size.width / 750, kOffsetHW);
            //                 console.log(" pad  this  k  " + kOffsetHW);

            //                 //底部按钮 挨着中间区域底部
            //                 var funBtn_pos = this.gameBtnNode.getPosition();
            //                 funBtn_pos.y = this.gameCenter.node.getPosition().y - (this.gameBtnNode.height + gameCenterBox.height) / 2

            //                 if (funBtn_pos.y < -visibleRect.size.height / 2) {
            //                     funBtn_pos.y = -visibleRect.size.height / 2 + this.gameBtnNode.height * (1 / 3)
            //                 }
            //                 this.gameBtnNode.setPosition(funBtn_pos);

            //                 console.log(" sub_gameTitle down ");
            //             } else {
            //                 var offsetk = 1000;
            //                 var title_pos = this.sub_gameTitle.node.getPosition();
            //                 title_pos.y += (-kMoveHight) * offsetk;

            //                 title_pos.y = (visibleRect.size.height - this.sub_gameTitle.node.getContentSize().height * this.m_kOffsetScale) / 2
            //                 this.sub_gameTitle.node.setPosition(title_pos);

            //                 console.log(" sub_gameTitle up ");
            //             }

            //             console.log(" m_CurrentHintIndex " + this.m_CurrentHintIndex);
        }
        var curLevelData = GameDataManager.getInstance().getStageData(this.m_Package, this.m_stage);
        this.m_MinSteps = curLevelData.minmove;
        for (var i = 0; i < curLevelData.m_BlockData.length; i++) {
            var coordinate = curLevelData.m_BlockData[i].coordinate;
            var state = curLevelData.m_BlockData[i].state;
            this.addBlock((coordinate & 0xF0) >> 4, coordinate & 0x0F, state & 0x20 ? define.kOrientation_Horizontal : define.kOrientation_Vertical, state & 0x0F, (state & 0x10) != 0);
        }
    },
    addBlock: function addBlock(x, y, orientation, length, panda) {
        var id = 0;
        if (orientation == define.kOrientation_Horizontal) {
            //方向是水平的
            y = this.m_GridironSize.height - 1 - y;
        } else if (orientation == define.kOrientation_Vertical) {
            y = this.m_GridironSize.height - length - y;
        }
        if (id <= 0) {
            id = this.m_pBlocks.length + 1;
        }
        var urlPath = "resources/playGamePic/car0.png";
        var blockNode = new cc.Node('Sprite');
        var blockSp = blockNode.addComponent(cc.Sprite);
        var gameLayout = cc.find("Canvas/gameplay/gameCenterNode");
        gameLayout.addChild(blockNode);

        var pBlock = blockNode.addComponent('BlockJS');
        var data = { orientation: 0, length: 0, panda: true };
        data.orientation = orientation;
        data.length = length;
        data.panda = panda;

        blockNode.getComponent('BlockJS').init(data); //设置方向长度panda
        blockNode.getComponent('BlockJS').setId(id); //传id
        var gPosition = new cc.Vec2(x, y);
        if (!this.isOccupiedBlock(pBlock, gPosition)) {
            this.m_pBlocks.push(blockNode);
            blockNode.getComponent('BlockJS').setOnBlockListener(this);
            blockNode.getComponent('BlockJS').setPosition(this.getPosition(gPosition));
            blockNode.getComponent('BlockJS').setGPosition(gPosition);
            this.updateGridiron();
            if (panda) {
                this.m_pPanda = blockNode.getComponent("BlockJS");
            }
            return true;
        }
        return false;
    },

    isOccupiedPos: function isOccupiedPos(x, y) {
        if (x >= 0 && y >= 0 && x < this.m_GridironSize.width && y < this.m_GridironSize.height) {
            return (this.m_Gridiron[y] & 0x1 << x) != 0;
        } else {
            return true;
        }
    },
    isOccupiedGpos: function isOccupiedGpos(gpos) {
        return this.isOccupiedPos(gpos.x, gpos.y);
    },
    isOccupiedBlock: function isOccupiedBlock(pBlock, gpos) {
        var orientation = pBlock.getOrientation();
        if (orientation == define.kOrientation_Horizontal) {
            var t = new cc.Vec2(gpos.x, gpos.y);
            for (var i = 0; i < pBlock.getLength(); i++, t.x++) {
                if (this.isOccupiedGpos(t)) {
                    return true;
                }
            }
        } else if (orientation == define.kOrientation_Vertical) {
            var t = new cc.Vec2(gpos.x, gpos.y);
            for (var i = 0; i < pBlock.getLength(); i++, t.y++) {
                if (this.isOccupiedGpos(t)) {
                    return true;
                }
            }
        }
        return false;
    },
    updateGridiron: function updateGridiron() {
        for (var i = 0; i < this.m_Gridiron.length; i++) {
            this.m_Gridiron[i] = 0;
        }

        for (var i = 0; i < this.m_pBlocks.length; i++) {
            var blockNode = this.m_pBlocks[i];
            var pBlock = blockNode.getComponent('BlockJS');

            var orientation = pBlock.getOrientation();
            var gPosition = pBlock.getGPosition();

            if (gPosition.x >= 0 && gPosition.y >= 0) {
                if (orientation == define.kOrientation_Horizontal) {
                    for (var j = 0; j < pBlock.getLength(); j++) {
                        this.m_Gridiron[parseInt(gPosition.y)] |= 0x1 << parseInt(gPosition.x + j);
                    }
                } else if (orientation == define.kOrientation_Vertical) {
                    for (var j = 0; j < pBlock.getLength(); j++) {
                        this.m_Gridiron[parseInt(gPosition.y + j)] |= 0x1 << parseInt(gPosition.x);
                    }
                }
            }
        }

        if (define.DEBUG_MODE && define.DEBUG_SHOW_MAP) {
            console.log("*************begin to print*************\n");
            var res = new Array();
            for (var i = this.m_GridironSize.height - 1; i >= 0; i--) {
                for (var j = 0; j < this.m_GridironSize.width; j++) {
                    res[j] = this.m_Gridiron[i] & 0x1 << j ? 'x' : '.';
                }
                res[parseInt(this.m_GridironSize.width)] = 0;

                var temp = new Array();
                for (var j = 0; j < this.m_GridironSize.width; j++) {
                    temp += res[j];
                }
                //    console.log(" "+res);
                console.log(i + " " + temp);
            }
            console.log("*************end print*************\n");
        }
    },
    getPosition: function getPosition(gPosition) {
        var pos = new cc.Vec2(this.m_GameRect.origin.x + gPosition.x * this.m_GridSize.width, this.m_GameRect.origin.y + gPosition.y * this.m_GridSize.height);
        return pos;
    },

    getGPosition: function getGPosition(position) {
        var x = (position.x - this.m_GameRect.origin.x) / this.m_GridSize.width; //在第x个格子
        x = parseInt(x + (x > 0 ? 0.5 : -0.5));
        x = Math.min(Math.max(0, x), this.m_GridironSize.width - 1);

        var y = (position.y - this.m_GameRect.origin.y) / this.m_GridSize.height;
        y = parseInt(y + (y > 0 ? 0.5 : -0.5));
        y = Math.min(Math.max(0, y), this.m_GridironSize.height - 1);

        return new cc.Vec2(x, y);
    },
    onDragged: function onDragged(pBlock, event) {

        if (this.m_pHintBlock && this.m_pHintBlock != pBlock) {
            return false;
        }

        var gPosition = pBlock.getGPosition();
        var orientation = pBlock.getOrientation();
        if (orientation == define.kOrientation_Horizontal) {
            var minX = gPosition.x;
            var maxX = gPosition.x;

            while (!this.isOccupiedPos(minX - 1, gPosition.y)) {
                minX--;
            }
            while (!this.isOccupiedPos(maxX + pBlock.getLength(), gPosition.y)) {
                maxX++;
            }

            this.m_DraggedMinX = this.m_GameRect.origin.x + minX * this.m_GridSize.width;
            this.m_DraggedMaxX = this.m_GameRect.origin.x + maxX * this.m_GridSize.width;
            this.m_DraggedMinY = this.m_DraggedMaxY = pBlock.getAbsolutePosition().y;
        } else if (orientation == define.kOrientation_Vertical) {
            var minY = gPosition.y;
            var maxY = gPosition.y;

            while (!this.isOccupiedPos(gPosition.x, minY - 1)) {
                minY--;
            }
            while (!this.isOccupiedPos(gPosition.x, maxY + pBlock.getLength())) {
                maxY++;
            }

            this.m_DraggedMinX = this.m_DraggedMaxX = pBlock.getAbsolutePosition().x;
            this.m_DraggedMinY = this.m_GameRect.origin.y + minY * this.m_GridSize.height;
            this.m_DraggedMaxY = this.m_GameRect.origin.y + maxY * this.m_GridSize.height;
        }

        var newGpos = new cc.Vec2(-1, -1);
        pBlock.setGPosition(newGpos);

        this.updateGridiron();

        if (define.DEBUG_MODE && define.DEBUG_SHOW_POS) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            console.log("  car " + pBlock.getId() + " start" + "=" + touchLoc.x + "," + touchLoc.y);
            console.log(" game onDragged =");
        }
        return true;
    },

    onMove: function onMove(pBlock, event) {
        var touches = event.getTouches();
        var touch = touches[0];
        var touchLoc = touches[0].getLocation();
        //最后终点位置
        var newPosition = new cc.Vec2();
        //移动
        var movePosition = new cc.Vec2();
        movePosition.x = pBlock.getTouchBeganPosition().x + touch.getLocation().x - touch.getStartLocation().x;
        movePosition.y = pBlock.getTouchBeganPosition().y + touch.getLocation().y - touch.getStartLocation().y;

        newPosition = new cc.Vec2(Math.min(Math.max(this.m_DraggedMinX, movePosition.x), this.m_DraggedMaxX), Math.min(Math.max(this.m_DraggedMinY, movePosition.y), this.m_DraggedMaxY));
        //屏幕绝对坐标
        pBlock.setPosition(newPosition);

        if (define.DEBUG_MODE && define.DEBUG_SHOW_POS) {
            console.log(" game onMove =");

            console.log("  car " + pBlock.getId() + " move" + "=" + touchLoc.x + "," + touchLoc.y);
        }

        if (touchLoc.x > pBlock.getAbsolutePosition().x && touchLoc.x < pBlock.getAbsolutePosition().x + pBlock.getContentSize().width * 1.3 && touchLoc.y > pBlock.getAbsolutePosition().y && touchLoc.y < pBlock.getAbsolutePosition().y + pBlock.getContentSize().height * 1.3) {} else {
            console.log("  超出矩形范围  " + touchLoc.x + " ，" + touchLoc.y);
            if (Block.s_CurrentTouchedBlock != pBlock) return;
            if (pBlock.m_State == define.kBlockState_Grabbed) {
                pBlock.m_State = define.kBlockState_Ungrabbed;
                if (pBlock.m_OnBlockListener) {
                    this.onDrop(pBlock, event);
                }
            }
            Block.s_CurrentTouchedBlock = null;
        }
    },

    onDrop: function onDrop(pBlock, event) {

        this.setBlockPosition(pBlock, pBlock.getAbsolutePosition());
        var diff = new cc.Vec2();
        diff.x = pBlock.getGPosition().x - pBlock.getTouchBeganGPosition().x;
        diff.y = pBlock.getGPosition().y - pBlock.getTouchBeganGPosition().y;

        if (diff.x || diff.y) {
            var temp = pBlock.getId() << 24 | (pBlock.getOrientation() == define.kOrientation_Horizontal ? parseInt(diff.x + 10) : parseInt(diff.y + 10)) << 16 | this.m_CurrentHintIndex + 1;
            this.m_History.unshift(temp);

            var steps = this.m_History.length;

            if (define.DEBUG_MODE) {
                console.log(" getId=  " + pBlock.getId() + " x= " + diff.x + " y= " + diff.y + " m_CurrentHintIndex=" + this.m_CurrentHintIndex);
                console.log(" temp=  " + temp);
            }
            // m_pUndo.setEnabled(true);
            // m_pRetry.setEnabled(true);

            if (this.m_pHintBlock && this.m_pHintBlock == pBlock) {
                var coordinate = this.m_pHintBlock.getOrientation() == define.kOrientation_Horizontal ? this.m_pHintBlock.getGPosition().x : this.m_pHintBlock.getGPosition().y;
                if (coordinate == this.m_HintBlockDestCoordinate) {
                    this.showHint(this.m_CurrentHintIndex + 1);
                } else {
                    this.updateHint();
                }
            }
        }

        this.playMove();

        // AudioManager::getInstance()->playEffect(MOVE_EFFECT_FILE);
        if (this.m_pPanda && pBlock == this.m_pPanda) {
            console.log(" checkComplete  ");
            if (this.checkComplete()) {
                console.log(" on Complete  ");
                this.playComplete();
                this.onGameComplete();
            }
        }

        if (define.DEBUG_MODE && define.DEBUG_SHOW_POS) {
            console.log(" game onDrop =");
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            console.log("  car " + pBlock.getId() + " end" + "=" + touchLoc.x + "," + touchLoc.y);
        }
    },
    setBlockPosition: function setBlockPosition(pBlock, position) {
        if (define.DEBUG_MODE && define.DEBUG_SHOW_POS) {
            console.log("  setBlockPosition= " + parseInt(position.x) + "," + parseInt(position.y));
        }
        var gPosition = this.getGPosition(position);
        if (!this.isOccupiedBlock(pBlock, gPosition)) {
            pBlock.setPosition(this.getPosition(gPosition));
            pBlock.setGPosition(gPosition);
            this.updateGridiron();
        } else {
            pBlock.setPosition(this.getPosition(pBlock.getLastGPosition()));
        }
    },
    //目标车位置判断过关
    checkComplete: function checkComplete() {
        if (this.m_pPanda && this.m_pPanda.getGPosition().x + this.m_pPanda.getLength() == this.m_GridironSize.width) {
            return true;
        }
        return false;
    },
    onGameComplete: function onGameComplete() {
        // 如果有提示，则删除提示
        if (this.m_HintMode) {
            this.m_pGuideHintPointer.node.stopActionByTag(define.kMoveActionTag);
            this.m_pGuideHintDest.node.stopAllActions();
            this.m_pGuideHintDest.node.active = false;
            this.m_pGuideHintPointer.node.active = false;
            this.m_HintMode = false;
        }
        define.money += 5;
        GameDataManager.getInstance().savegold(define.money);
        this.node.emit("updatemoney");
        var state = GameDataManager.getInstance().getGameState(this.m_Package, this.m_stage);
        var steps = this.m_History.length;
        var m_Mode = define.GameMode_Relax;
        if (m_Mode == define.GameMode_Relax) {
            // stars
            var winStarNum = steps <= this.m_MinSteps + 3 ? 3 : steps <= this.m_MinSteps + 10 ? 2 : 1;
            var lastStars = state;
            if (define.DEBUG_MODE) {
                console.log("winStarNum = " + winStarNum);
            }

            if (winStarNum > lastStars) {
                //更新星星数目
                GameDataManager.getInstance().saveGameState(this.m_Package, this.m_stage, winStarNum);
                // AudioManager::getInstance()->playEffect(ADD_STAR);
            }
        }
        // AudioManager::getInstance()->playEffect(COMPLETE_EFFECT_FILE);
        this.showCompleteView(winStarNum);

        GameDataManager.getInstance().addGoals();

        var goals = GameDataManager.getInstance().getGoals();
        if (define.DEBUG_MODE) {
            console.log("play counts = " + goals);
        }
    },
    showCompleteView: function showCompleteView(winStarNum) {
        this.playComplete();
        var dialogGamePass = cc.find("Canvas/DialogGamePass").getComponent('DialogGamePassJS');
        dialogGamePass.showDialog(winStarNum);

        console.log("popGamePassDialog ");
    },

    // 第一次玩  启动提示
    start: function start() {

        if (GameDataManager.getInstance().getIsFistPlay() == true) {
            cc.log("第一次玩");
            if (GameDataManager.getInstance().getGamePlaySceneReload() == false) {
                GameDataManager.getInstance().setGamePlaySceneReload(true);
                console.log("  Reload game");
                cc.director.loadScene("game");
            } else {
                cc.log("第一次玩,开始提示");
                this.scheduleOnce(function () {
                    this.startFindSolution();
                }, 0.5);
            }
        }
    },
    startFindSolution: function startFindSolution() {
        console.log("  findSolutionProc  ");

        var queue = new Array();
        var record = new Set();
        this.m_SolutionMoves = new Array();

        var gridironW = this.m_GridironSize.width;
        var gridironH = this.m_GridironSize.height;
        var current = 0;
        var solutionIndex = 0;
        var size = this.m_pBlocks.length;
        var position = 0;
        var base = 1;

        var EXIT_Flag = false;

        for (var index = 0; index < size; index++, base *= gridironW) {
            var blockNode = this.m_pBlocks[index];
            var pBlock = blockNode.getComponent('BlockJS');

            position += (pBlock.getOrientation() == define.kOrientation_Horizontal ? parseInt(pBlock.getGPosition().x) : parseInt(pBlock.getGPosition().y)) * base;
        }

        var newNode = new HintNode(position, 0, null);
        queue.push(newNode);
        record.add(position);

        var gridiron = new Array();

        while (current < queue.length) {
            var node = queue[current++];
            var lastMoveBlockId = node.move > 0 ? node.move / 1000 : -1;

            for (var i = 0; i < gridironW * gridironH; i++) {
                gridiron[i] = 0;
            }

            // resolve position information from long int position
            base = 1;

            for (var index = 0; index < size; index++, base *= gridironW) {
                var blockNode = this.m_pBlocks[index];
                var pBlock = blockNode.getComponent('BlockJS');

                var p = parseInt(node.position % (base * gridironW) / base);

                if (pBlock.getOrientation() == define.kOrientation_Horizontal) {
                    var offset = pBlock.getGPosition().y * gridironW;
                    for (var j = p; j <= p + pBlock.getLength() - 1; j++) {
                        //  CC_ASSERT(offset + j >= 0);
                        gridiron[offset + j] = pBlock.getId();
                    }
                } else {
                    for (var j = p; j <= p + pBlock.getLength() - 1; j++) {
                        //CC_ASSERT((int )pBlock.getGPosition().x + j * gridironH >= 0);
                        gridiron[parseInt(pBlock.getGPosition().x + j * gridironW)] = pBlock.getId();
                    }
                }
            }

            base = 1;

            for (var index = 0; index < size; index++, base *= gridironW) {
                var blockNode = this.m_pBlocks[index];
                var pBlock = blockNode.getComponent('BlockJS');

                if (pBlock.getId() == lastMoveBlockId) {
                    continue;
                }

                var x, y;
                if (pBlock.getOrientation() == define.kOrientation_Horizontal) {
                    x = parseInt(node.position % (base * gridironW) / base);
                    y = parseInt(pBlock.getGPosition().y);
                } else {
                    x = parseInt(pBlock.getGPosition().x);
                    y = parseInt(node.position % (base * gridironW) / base);
                }

                if (pBlock.getOrientation() == define.kOrientation_Horizontal) {
                    var offset = y * gridironW + x;
                    // Move Right
                    var maxRightStep = 0;
                    for (var step = 1; x + step + pBlock.getLength() - 1 < gridironW && gridiron[offset + step + pBlock.getLength() - 1] == 0; step++) {

                        var b1 = x + step + pBlock.getLength() - 1 < gridironW;
                        var b2 = gridiron[offset + step + pBlock.getLength() - 1] == 0;
                        //CC_ASSERT(offset + step + pBlock.getLength() - 1 >= 0);
                        var newPosition = node.position + base * step;
                        if (record.has(newPosition) == false) {
                            var tempNode = new HintNode(newPosition, this.encodeMove(pBlock.getId(), define.kDirection_Right, x + step), node);
                            queue.push(tempNode);
                            record.add(newPosition);

                            maxRightStep = step;
                        }
                    }
                    if (this.m_pPanda && pBlock == this.m_pPanda && x + maxRightStep + pBlock.getLength() == gridironW) {
                        solutionIndex = queue.length - 1;
                        // goto EXIT;
                        EXIT_Flag = true;
                        break;
                    }

                    // Move Left
                    for (var step = -1; x + step >= 0 && gridiron[offset + step] == 0; step--) {
                        //    CC_ASSERT(offset + step >= 0);
                        var newPosition = node.position + base * step;
                        if (record.has(newPosition) == false) {
                            var tempNode = new HintNode(newPosition, this.encodeMove(pBlock.getId(), define.kDirection_Left, x + step), node);
                            queue.push(tempNode);
                            record.add(newPosition);
                        }
                    }
                } else {
                    var offset = y * gridironW + x;
                    // Move Up
                    for (var step = 1; y + step + pBlock.getLength() - 1 < gridironH && gridiron[offset + (step + pBlock.getLength() - 1) * gridironW] == 0; step++) {
                        //    CC_ASSERT(offset + (step + pBlock.getLength() - 1) * gridironW >= 0);
                        var newPosition = node.position + base * step;
                        if (record.has(newPosition) == false) {
                            var tempNode = new HintNode(newPosition, this.encodeMove(pBlock.getId(), define.kDirection_Up, y + step), node);
                            queue.push(tempNode);
                            record.add(newPosition);
                        }
                    }

                    // Move Down
                    for (var step = -1; y + step >= 0 && gridiron[offset + step * gridironW] == 0; step--) {
                        //    CC_ASSERT(offset + step * gridironW >= 0);
                        var newPosition = node.position + base * step;
                        if (record.has(newPosition) == false) {
                            var tempNode = new HintNode(newPosition, this.encodeMove(pBlock.getId(), define.kDirection_Down, y + step), node);
                            queue.push(tempNode);
                            record.add(newPosition);
                        }
                    }
                }
            }

            if (EXIT_Flag == true) {
                break;
            }
        }
        // EXIT:
        var tempArr = new Array();
        if (solutionIndex >= 0) {
            var node = queue[solutionIndex];
            while (node) {
                if (node.move != 0) {
                    tempArr.push(node.move);
                    this.m_SolutionMoves.unshift(node.move);
                }
                node = node.prev;
            }

            tempArr.length;
            for (var i = 0; i < this.m_SolutionMoves.length; ++i) {
                console.log(" " + this.m_SolutionMoves[i]);
            }

            if (this.m_SolutionMoves.length > 0) {

                this.scheduleOnce(function () {
                    this.startShowHints();
                }, 0);
            }
        }
    },

    encodeMove: function encodeMove(id, direction, step) {
        return id * 1000 + direction * 100 + step;
    },

    updatemoney: function updatemoney() {
        this.gold_lab.string = define.money;
    },

    startShowHints: function startShowHints(index) {
        cc.log("startShowHints");
        this.showHint(0);
        // m_pHint->setEnabled(true);
    },

    showHint: function showHint(index) {
        cc.log("showHint");
        if (index < 0) {
            this.m_HintMode = false;
            if (this.m_pGuideHintDest) {
                this.m_pGuideHintDest.node.active = false;
                this.m_pGuideHintPointer = null;
                //     removeChild(m_pGuideHintDest);
            }
            if (this.m_pGuideHintPointer) {
                //     removeChild(m_pGuideHintPointer);
                this.m_pGuideHintPointer.node.active = false;
                this.m_pGuideHintPointer = null;
            }
            this.m_SolutionMoves.clear();
            this.m_HintBlockDestCoordinate = 0;
            this.m_CurrentHintIndex = index;

            return;
        }
        this.m_HintMode = true;

        // var iter = this.m_SolutionMoves[0];

        if (index < parseInt(this.m_SolutionMoves.length)) {
            var move = this.m_SolutionMoves[index];
            var id = parseInt(move / 1000);
            var dest = parseInt(move % 100);

            for (var i = 0; i < this.m_pBlocks.length; i++) {
                var blockNode = this.m_pBlocks[i];
                var pBlock = blockNode.getComponent('BlockJS');

                if (pBlock.getId() == id) {
                    // if (this.m_pHintBlock)
                    // {
                    //     this.m_pHintBlock.clearHint();
                    // }
                    this.m_pHintBlock = pBlock;

                    this.m_HintBlockDestCoordinate = dest;
                    this.m_CurrentHintIndex = index;

                    this.m_pGuideHintPointer.node.active = true;
                    this.m_pGuideHintDest.node.active = true;
                    if (this.m_pGuideHintPointer.spriteFrame == null) {
                        var action = new cc.blink(1, 1);
                        action.setTag(define.kBlinkActionTag);
                        this.m_pGuideHintDest.node.runAction(new cc.repeatForever(action));

                        // var urlPath = cc.url.raw("resources/playGamePic/hint_pointer.png");
                        // this.m_pGuideHintPointer.spriteFrame = new cc.SpriteFrame(urlPath);
                        this.m_pGuideHintPointer.node.setScale(1, MyLayoutManager.getInstance().getVisibleRect().size.height / define.designSize.height);
                        var self = this;
                        var urlPath = "playGamePic/hint_pointer";
                        cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                            self.m_pGuideHintPointer.spriteFrame = spriteFrame;
                        });
                    }

                    this.updateHint();
                    break;
                }
            }
        }
    },
    //展现提示框图片
    getHintDestFrameName: function getHintDestFrameName(orientation, length) {
        cc.log("调用getHintDestFrameName");
        if (orientation == define.kOrientation_Horizontal) {
            return length == 2 ? "bk_hint_dest2h" : "bk_hint_dest3h";
        } else {
            return length == 2 ? "bk_hint_dest2v" : "bk_hint_dest3v";
        }
    },

    updateHint: function updateHint() {
        cc.log("调用updateHint");
        var step = parseInt(this.m_pHintBlock.getOrientation() == define.kOrientation_Horizontal ? this.m_HintBlockDestCoordinate - this.m_pHintBlock.getGPosition().x : this.m_HintBlockDestCoordinate - this.m_pHintBlock.getGPosition().y);
        var gpDest = this.m_pHintBlock.getGPosition();

        var pointerRotation = 0;
        if (this.m_pHintBlock.getOrientation() == define.kOrientation_Horizontal) {
            gpDest.x += step;
            pointerRotation = step > 0 ? 0 : 180;
        } else {
            gpDest.y += step;
            pointerRotation = step > 0 ? 270 : 90;
        }
        var offsetResolutionSize = cc.view.getVisibleSize();
        this.m_pGuideHintDest.node.stopActionByTag(define.kBlinkActionTag);
        var hideAction = cc.hide();
        this.m_pGuideHintDest.node.runAction(hideAction);

        var positionDest = this.getPosition(gpDest);
        var centerOffset = new cc.Vec2(this.m_pHintBlock.getContentSize().width * this.m_pHintBlock.getScaleX() / 2, this.m_pHintBlock.getContentSize().height * this.m_pHintBlock.getScaleY() / 2);

        // var urlPath = cc.url.raw("playGamePic/" + this.getHintDestFrameName(this.m_pHintBlock.getOrientation(), this.m_pHintBlock.getLength()));

        // this.m_pGuideHintDest.spriteFrame = new cc.SpriteFrame(urlPath);
        var urlPath = "playGamePic/" + this.getHintDestFrameName(this.m_pHintBlock.getOrientation(), this.m_pHintBlock.getLength());
        var self = this;
        cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
            self.m_pGuideHintDest.spriteFrame = spriteFrame;
        });

        var Scale = new cc.Vec2(MyLayoutManager.getInstance().getGridSize().width / (91 + 4), MyLayoutManager.getInstance().getGridSize().height / (91 + 4));
        this.m_pGuideHintDest.node.setScale(Scale);
        this.m_pGuideHintDest.node.setPosition(new cc.Vec2(positionDest.x + centerOffset.x - offsetResolutionSize.width * 0.5, positionDest.y + centerOffset.y - offsetResolutionSize.height * 0.5));

        var showAction = cc.show();
        this.m_pGuideHintDest.node.runAction(showAction);
        var actionBlick = new cc.blink(1, 1);
        actionBlick.setTag(define.kBlinkActionTag);
        this.m_pGuideHintDest.node.runAction(new cc.repeatForever(actionBlick));

        var guideHintPointerPos = new cc.Vec2(this.m_pHintBlock.getAbsolutePosition().x + centerOffset.x - offsetResolutionSize.width * 0.5, this.m_pHintBlock.getAbsolutePosition().y + centerOffset.y - offsetResolutionSize.height * 0.5);
        this.m_pGuideHintPointer.node.runAction(showAction.clone());

        this.m_pGuideHintPointer.node.setPosition(guideHintPointerPos);
        this.m_pGuideHintPointer.node.setRotation(pointerRotation);

        // var dest_pos=this.m_pGuideHintDest.node.getPosition()
        // this.m_pGuideHintPointer.node.setPosition(dest_pos);
        // this.m_pGuideHintPointer.node.active=true;
        this.m_pGuideHintPointer.node.stopActionByTag(define.kMoveActionTag);
        this.m_pGuideHintPointer.node.opacity = 255;

        var action1 = new cc.moveTo(0.7, this.m_pGuideHintDest.node.getPosition());
        var action2 = new cc.fadeOut(0.5);
        var action3 = new cc.fadeIn(0.0);
        var action4 = new cc.moveTo(0.0, this.m_pGuideHintPointer.node.getPosition());
        var action = new cc.repeatForever(cc.sequence(action1, action2, action3, action4));
        action.setTag(define.kMoveActionTag);
        this.m_pGuideHintPointer.node.runAction(action);
    },
    //金币提示按钮事件
    getHintCallback: function getHintCallback() {
        this.playClick();
        if (Block.getCurrentTouchedBlock()) {
            return;
        };

        if (this.m_HintMode) {} else if (!GameDataManager.getInstance().getgold() > 0) {
            cc.log("nomoney!");
        } else {
            cc.log("金币提示");
            this.scheduleOnce(function () {
                this.startFindSolution();
            }, 0);
            define.money -= 50;
            // cc.sys.localStorage.setItem("gold",define.money)
            GameDataManager.getInstance().savegold(define.money);
            this.node.emit("updatemoney");
        }
    },
    gold_btnClick: function gold_btnClick() {
        this.playClick();
        //去看视频
        // AdsManager.getInstance().showRewardedGold();
    },
    gold_btnCallback: function gold_btnCallback() {
        define.money += 50;
        // cc.sys.localStorage.setItem("gold",define.money)
        GameDataManager.getInstance().savegold(define.money);
        this.node.emit("updatemoney");
    },
    videohint_btnClick: function videohint_btnClick() {
        this.playClick();
        //去看视频
        // AdsManager.getInstance().showRewardedVideo();
    },
    videohint_btnCallback: function videohint_btnCallback() {
        this.scheduleOnce(function () {
            this.startFindSolution();
        }, 0);
    },

    //触摸监听
    add_touch_listeners: function add_touch_listeners() {
        var self = this;
        var canvas = cc.find("Canvas");

        canvas.on(cc.Node.EventType.TOUCH_START, function (event) {
            var touches = event.getTouches(); //touches获取触控数组
            var touchLoc = touches[0].getLocation(); //touchLoc第一个触控点的世界地图坐标（node.convertToNodeSpaceAR()可以将世界地图坐标转换为node的局部坐标）

            console.log("  touch  start" + "=" + touchLoc.x + "," + touchLoc.y);
        }, self.node);

        canvas.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();

            console.log("  touch  move" + "=" + touchLoc.x + "," + touchLoc.y);
        }, self.node);

        canvas.on(cc.Node.EventType.TOUCH_END, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();

            console.log("  touch  end" + "=" + touchLoc.x + "," + touchLoc.y);
        }, self.node);
    },
    //记录游戏开始时间  
    update: function update(dt) {
        // this.gold_lab.string=define.money;
        {
            var secondTime = parseInt(this.getPassTime()); // 秒
            var minuteTime = 0; // 分
            var hourTime = 0; // 时
            // var dayTime = 0;// 天
            if (secondTime < 60) {
                secondTime = secondTime > 9 ? secondTime : "0" + secondTime;
                this.timeLab.getComponent(cc.Label).string = "00:" + secondTime;
            } else {
                if (secondTime >= 60 & secondTime < 3600) {
                    minuteTime = parseInt(secondTime / 60);
                    secondTime = parseInt(secondTime % 60);
                    secondTime = secondTime > 9 ? secondTime : "0" + secondTime;
                    minuteTime = minuteTime > 9 ? minuteTime : "0" + minuteTime;
                    this.timeLab.getComponent(cc.Label).string = minuteTime + ":" + secondTime;
                } else if (secondTime >= 3600) {
                    hourTime = parseInt(secondTime / 3600);
                    minuteTime = parseInt(secondTime % 3600 / 60);
                    secondTime = parseInt(secondTime % 3600 % 60);
                    secondTime = secondTime > 9 ? secondTime : "0" + secondTime;
                    minuteTime = minuteTime > 9 ? minuteTime : "0" + minuteTime;
                    hourTime = hourTime > 9 ? hourTime : "0" + hourTime;
                    this.timeLab.getComponent(cc.Label).string = hourTime + ":" + minuteTime + ":" + secondTime;
                }
            }
        }
    },

    //获取当前时间
    getNowTime: function getNowTime() {
        var testDate = new Date();
        //获取当前时间(从1970.1.1开始的毫秒数)
        console.log('date ' + testDate.getTime());
        cc.log(testDate);
        return testDate.getTime();
    },

    //获取过去的秒数
    getPassTime: function getPassTime() {
        var nowDate = new Date();
        var passTime = nowDate - this.curDate;
        // this.curDate = nowDate;
        var passtime = passTime / 1000;
        return passtime;
    },
    //菜单按钮
    menu_btnClick: function menu_btnClick() {
        this.playClick();
        this.menu_btn.node.active = false;
        this.back_menu_btn.node.active = true;
        this.main_btn.node.active = true;
        this.stage_btn.node.active = true;
        this.sub_gameTitle.node.active = false;
    },

    //返回菜单按钮
    back_menu_btnClick: function back_menu_btnClick() {
        this.playClick();
        this.menu_btn.node.active = true;
        this.sub_gameTitle.node.active = true;
        this.back_menu_btn.node.active = false;
        this.main_btn.node.active = false;
        this.stage_btn.node.active = false;
    },

    //进入关卡界面按钮
    stage_btnClick: function stage_btnClick() {
        this.playClick();
        cc.director.loadScene("ChooseStageScene");
    },

    //进入主界面按钮
    main_btnClick: function main_btnClick() {
        this.playClick();
        cc.director.loadScene("main");
    },

    //重试
    retryCallback: function retryCallback() {
        console.log(" click retryCallback");
        this.playClick();
        cc.director.loadScene("game");
    },
    //音频
    playClick: function playClick() {
        if (this.audioControl) {
            this.audioControl.playClick();
        } else {
            console.log("audioControl null click playClick");
        }
    },
    playMove: function playMove() {
        if (this.audioControl) {
            this.audioControl.playMove();
        }
    },
    playComplete: function playComplete() {
        if (this.audioControl) {
            this.audioControl.playComplete();
        }
    }

});

cc._RF.pop();