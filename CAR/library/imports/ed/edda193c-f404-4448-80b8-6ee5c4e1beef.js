"use strict";
cc._RF.push(module, 'edda1k89ARESIC4buXE4b7v', 'BlockJS');
// Scripts/BlockJS.js

"use strict";

var _properties;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var define = require("define");
var MyLayoutManager = require("MyLayoutManagerJS");
var TILES = [["car0_0-", "car0_1-", "car1", "car0_2-", "car0_3-"], ["car1_0-", "car1_1-", "car2", "car1_2-", "car1_3-"], ["car2_0-", "car2_1-", "car3", "car2_2-", "car2_3-"], ["car3_0-", "car3_1-", "car4", "car3_2-", "car3_3-"], ["car2_0-", "car2_1-", "car5", "car2_2-", "car2_3-"], ["car2_0-", "car2_1-", "car6", "car2_2-", "car2_3-"], ["car0_0-", "car0_1-", "car7", "car0_2-", "car0_3-"], ["car1_0-", "car1_1-", "car8", "car1_2-", "car1_3-"], ["car2_0-", "car2_1-", "car9", "car2_2-", "car2_3-"], ["car3_0-", "car3_1-", "car10", "car3_2-", "car3_3-"], ["car2_0-", "car2_1-", "car11", "car2_2-", "car2_3-"], ["car2_0-", "car2_1-", "car12", "car2_2-", "car2_3-"]];

var Block = cc.Class({
    extends: cc.Component,

    properties: (_properties = {
        m_Tile: 0,
        m_Orientation: 0,
        m_Length: 2,
        m_Id: 0
    }, _defineProperty(_properties, "m_Orientation", 0), _defineProperty(_properties, "m_TouchBeganPos", cc.Vec2), _defineProperty(_properties, "m_TouchBeganGPos", cc.Vec2), _defineProperty(_properties, "m_GPosition", cc.Vec2), _defineProperty(_properties, "m_LastGPosition", cc.Vec2), _defineProperty(_properties, "m_Scale", cc.Vec2), _defineProperty(_properties, "m_State", define.kBlockState_Ungrabbed), _properties),

    statics: {
        s_CurrentTouchedBlock: null,

        getCurrentTouchedBlock: function getCurrentTouchedBlock() {
            return this.s_CurrentTouchedBlock;
        },

        clearCurrentTouchedBlock: function clearCurrentTouchedBlock() {
            this.s_CurrentTouchedBlock = null;
        }
    },
    ctor: function ctor() {
        this.m_GPosition = new cc.Vec2(-1, -1);
    },

    //new 防止成员变量在其他外部被更改 有可能有内存问题
    getGPosition: function getGPosition() {
        return new cc.Vec2(this.m_GPosition);
    },
    getLastGPosition: function getLastGPosition() {
        return new cc.Vec2(this.m_LastGPosition);
    },
    getTouchBeganGPosition: function getTouchBeganGPosition() {
        return new cc.Vec2(this.m_TouchBeganGPos);
    },
    getTouchBeganPosition: function getTouchBeganPosition() {
        return new cc.Vec2(this.m_TouchBeganPos);
    },
    getOrientation: function getOrientation() {
        return this.m_Orientation;
    },

    getLength: function getLength() {
        return this.m_Length;
    },

    init: function init(data) {

        this.m_GPosition = new cc.Vec2(-1, -1);

        this.initWithOrientationAndLength(data.orientation, data.length, data.panda);
    },

    initWithOrientationAndLength: function initWithOrientationAndLength(orientation, length, panda) {
        if (orientation == define.kOrientation_Horizontal) {
            this.m_Tile = length == 2 ? panda ? 2 : 0 : length == 3 ? 3 : -1;
        } else this.m_Tile = length == 2 ? panda ? -1 : 1 : length == 3 ? 4 : -1;

        var buf;
        if (this.m_Tile == 2) {
            buf = TILES[define.getcarskin() - 1][this.m_Tile] + "";
        } else {
            buf = TILES[0][this.m_Tile] + "0";
        }

        if (this.m_Tile >= 0) {
            var urlPath = cc.url.raw("resources/" + buf);
            var sp = this.getComponent(cc.Sprite);
            cc.log("***sp", sp);
            var self = this;
            urlPath = buf;
            cc.loader.loadRes(urlPath, cc.SpriteFrame, function (err, spriteFrame) {
                self.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });

            this.m_Orientation = orientation;
            this.m_Length = length;

            var vecZERO = new cc.Vec2(0, 0);
            sp.node.setAnchorPoint(vecZERO);
            var len = MyLayoutManager.getInstance().getGridSize().width / (71 + 0);
            this.m_Scale = new cc.Vec2(MyLayoutManager.getInstance().getGridSize().width / (91 + 0), MyLayoutManager.getInstance().getGridSize().height / (91 + 0));
            sp.node.setScale(this.m_Scale);

            return true;
        }
        return false;
    },

    getPosition: function getPosition() {
        //返回在gameLayout中的相对坐标
        var newPos = new cc.Vec2();
        var carSprite = this.getComponent(cc.Sprite);
        newPos = carSprite.node.getPosition();
        return newPos;
    },

    getAbsolutePosition: function getAbsolutePosition() {
        //返回在 屏幕中的绝对坐标
        var blockPos = new cc.Vec2();
        var carSprite = this.getComponent(cc.Sprite);
        blockPos = carSprite.node.getPosition();

        var visibleSize = cc.view.getVisibleSize();
        var origin = cc.view.getVisibleOrigin();

        var gameLayout = cc.find("Canvas/gameplay/gameCenterNode");
        var gameLayoutPos = new cc.Vec2(gameLayout.getPosition());

        var absoluPos = new cc.Vec2();
        absoluPos.x = gameLayoutPos.x + (visibleSize.width + origin.x) / 2;
        absoluPos.y = gameLayoutPos.y + (visibleSize.height + origin.y) / 2;

        var newPos = new cc.Vec2();

        newPos.x = absoluPos.x + blockPos.x;
        newPos.y = absoluPos.y + blockPos.y;

        return newPos;
    },

    setPosition: function setPosition(pos) {
        //pos 是在屏幕上的绝对坐标 换算成在gameLayout中的相对坐标再设置位置
        var visibleSize = cc.view.getVisibleSize();
        var origin = cc.view.getVisibleOrigin();
        var newPos = new cc.Vec2();
        var gameLayout = cc.find("Canvas/gameplay/gameCenterNode");
        var gameLayoutPos = new cc.Vec2(gameLayout.getPosition());

        newPos.x = gameLayoutPos.x + (visibleSize.width + origin.x) / 2;
        newPos.y = gameLayoutPos.y + (visibleSize.height + origin.y) / 2;

        newPos.x = pos.x - newPos.x;
        newPos.y = pos.y - newPos.y;

        var carSprite = this.getComponent(cc.Sprite);
        carSprite.node.setPosition(newPos);

        if (define.DEBUG_MODE && define.DEBUG_SHOW_POS) {
            console.log('car setPosition= ' + pos + ',相对Pos=' + newPos);
        }
    },

    setGPosition: function setGPosition(gpos) {
        this.m_LastGPosition = this.m_GPosition;
        this.m_GPosition = gpos;
    },

    getContentSize: function getContentSize() {
        var carSprite = this.getComponent(cc.Sprite);
        return carSprite.node.getContentSize();
    },

    getScaleY: function getScaleY() {
        return this.m_Scale.y;
    },

    getScaleX: function getScaleX() {
        return this.m_Scale.x;
    },

    setId: function setId(id) {
        this.m_Id = id;
    },

    getId: function getId() {
        return this.m_Id;
    },

    onLoad: function onLoad() {
        this.add_touch_listeners();
    },
    start: function start() {},


    // update (dt) {},
    setOnBlockListener: function setOnBlockListener(listener) {
        this.m_OnBlockListener = listener;
    },

    add_touch_listeners: function add_touch_listeners() {
        var carSprite = this.getComponent(cc.Sprite);
        var self = this;
        var canvas = carSprite.node;

        canvas.on(cc.Node.EventType.TOUCH_START, function (event) {

            if (Block.s_CurrentTouchedBlock) return false;
            var pblock = this.getComponent('BlockJS');
            if (pblock.m_State != define.kBlockState_Ungrabbed) return false;

            Block.s_CurrentTouchedBlock = pblock;

            if (pblock.m_OnBlockListener) {
                if (pblock.m_OnBlockListener.onDragged(pblock, event)) {
                    pblock.m_State = define.kBlockState_Grabbed;
                    pblock.m_TouchBeganPos = pblock.getAbsolutePosition();
                    pblock.m_TouchBeganGPos = pblock.m_LastGPosition;

                    if (define.DEBUG_MODE && define.DEBUG_SHOW_POS) {
                        var tempPos = pblock.getAbsolutePosition();
                        console.log("  car " + pblock.getId() + " AbsolutePosition=" + parseInt(tempPos.x) + "," + parseInt(tempPos.y));
                    }
                }
            } else {
                pblock.m_State = define.kBlockState_Grabbed;
                pblock.m_TouchBeganPos = pblock.getAbsolutePosition();

                if (define.DEBUG_MODE && define.DEBUG_SHOW_POS) {
                    var tempPos = pblock.getAbsolutePosition();
                    console.log("  car " + pblock.getId() + " AbsolutePosition=" + parseInt(tempPos.x) + "," + parseInt(tempPos.y));
                }
            }
        }, self.node);

        canvas.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var pblock = this.getComponent('BlockJS');

            if (Block.s_CurrentTouchedBlock != pblock) return;

            if (pblock.m_State == define.kBlockState_Grabbed) {
                if (pblock.m_OnBlockListener) {
                    pblock.m_OnBlockListener.onMove(pblock, event);
                }
            }
        }, self.node);

        canvas.on(cc.Node.EventType.TOUCH_END, function (event) {
            var pblock = this.getComponent('BlockJS');

            if (Block.s_CurrentTouchedBlock != pblock) return;

            if (pblock.m_State == define.kBlockState_Grabbed) {
                pblock.m_State = define.kBlockState_Ungrabbed;

                if (pblock.m_OnBlockListener) {
                    pblock.m_OnBlockListener.onDrop(pblock, event);
                }
            }
            Block.s_CurrentTouchedBlock = null;
        }, self.node);

        canvas.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            var pblock = this.getComponent('BlockJS');

            if (Block.s_CurrentTouchedBlock != pblock) return;

            if (pblock.m_State == define.kBlockState_Grabbed) {
                pblock.m_State = define.kBlockState_Ungrabbed;

                if (pblock.m_OnBlockListener) {
                    pblock.m_OnBlockListener.onDrop(pblock, event);
                }
            }

            Block.s_CurrentTouchedBlock = null;
        }, self.node);
    }

});
module.exports = Block;

cc._RF.pop();