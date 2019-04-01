"use strict";
cc._RF.push(module, '51fa6kgHXJL3ohx/zOq793u', 'AudioSourceControl');
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
    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        cc.game.addPersistRootNode(this.node); //将myNode成为常驻节点，场景切换时不会清除这个节点的内存 
        console.log('AudioSourceControl onLoad  ');
    },
    start: function start() {},

    // setdata(json){
    //     this.data=json
    // },
    // getdata(json){
    //     return this.data
    // },
    playAudio: function playAudio() {
        console.log("--------audio---->>", this.audio, define.music);
        if (this.audio && define.music == true) {
            console.log("--------------play");
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