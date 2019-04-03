(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/AudioSourceControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '51fa6kgHXJL3ohx/zOq793u', 'AudioSourceControl', __filename);
// Scripts/AudioSourceControl.js

'use strict';

var define = require("define");
var AudioSourceControl = cc.Class({
    extends: cc.Component,

    properties: {

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

        data: 0

    },
    statics: {
        _instance: null,
        getInstance: function getInstance() {
            if (AudioSourceControl._instance === null) {
                this._instance = new AudioSourceControl();
                console.log('AudioSourceControl _instance=this  !');
            }
            return AudioSourceControl._instance;
        }
    },

    onLoad: function onLoad() {
        cc.game.addPersistRootNode(this.node);
        console.log('AudioSourceControl onLoad  ');
    },
    start: function start() {},

    playAudio: function playAudio() {
        if (this.audio && define.music == true) {
            this.audio.play();
        }
    },
    playClick: function playClick() {
        if (this.audioClick && define.music == true) {
            this.audioClick.play();
        }
    },

    playMove: function playMove() {
        if (this.audioMove && define.music == true) {
            this.audioMove.play();
        }
    },

    playComplete: function playComplete() {
        if (this.audioComplete && define.music == true) {
            this.audioComplete.play();
        }
    }
    // update (dt) {},
});
module.exports = AudioSourceControl;

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
        //# sourceMappingURL=AudioSourceControl.js.map
        