(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/wechat_game_module-master/Script/View/LikeView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '977e6lKtxRNQY2Wi6Wlk6UQ', 'LikeView', __filename);
// wechat_game_module-master/Script/View/LikeView.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        idxList: {
            set: function set(v) {
                this.setIdxList(v);
            },
            get: function get() {
                return this.getIdxList();
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.icons = this.node.children[0].children;
        this.len = Math.min(G.WECHAT.appIdList.length, G.WECHAT.moreGameIconList.length);
    },
    start: function start() {},
    onClick: function onClick(e) {
        var _this = this;

        var node = e.target;
        var idxList = this.idxList;
        var idx = node.getSiblingIndex();
        var lastIdx = idxList[idx];
        var lastAppId = G.WECHAT.appIdList[lastIdx % this.len];
        G.WECHAT.navigateToMiniProgram(lastAppId);

        var btn = node.getComponent(cc.Button);
        btn.interactable = false;

        var nextIdx = this.getNextIdx(lastIdx);
        var spriteFrame = G.WECHAT.moreGameIconList[nextIdx % this.len];
        idxList[idx] = nextIdx;

        cc.log("idxList:", idxList, " lastIdx:", lastIdx, " nextIdx:", nextIdx);
        this.idxList = idxList;
        this.scheduleOnce(function () {
            _this.icons[idx].getComponent(cc.Sprite).spriteFrame = spriteFrame;
            btn.interactable = true;
        }, 2);
    },
    getNextIdx: function getNextIdx(idx) {
        while (this.idxList.indexOf(idx) > -1) {
            idx++;
            idx = idx % this.len;
        }
        return idx;
    },
    setIdxList: function setIdxList(idxList) {
        if (!CC_EDITOR) {
            this._idxList = idxList;
            cc.sys.localStorage.setItem("idxList", JSON.stringify(idxList));
        }
    },
    getIdxList: function getIdxList() {
        if (!CC_EDITOR) {
            if (this._idxList instanceof Array) return this._idxList;
            var idxList = JSON.parse(cc.sys.localStorage.getItem("idxList"));
            if (idxList) {
                this._idxList = idxList;
            } else {
                this._idxList = [];
                for (var i = 0, len = this.icons.length; i < len; i++) {
                    this._idxList.push(i);
                }
            }
            return this._idxList;
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
        //# sourceMappingURL=LikeView.js.map
        