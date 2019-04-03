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

        data: 0,
 
    },
    statics: {
        _instance: null,
        getInstance: function () {
            if (AudioSourceControl._instance === null) {
                this._instance = new AudioSourceControl();
                console.log('AudioSourceControl _instance=this  !');
            }
            return AudioSourceControl._instance;
        }
    },

    onLoad() {
        cc.game.addPersistRootNode(this.node);
        console.log('AudioSourceControl onLoad  ');
    },

    start() {

    },
    playAudio: function () {
        if (this.audio&&define.music==true) {
            this.audio.play();
        }
    },
    playClick: function () {
        if (this.audioClick&&define.music==true) {
            this.audioClick.play();
        }
    },

    playMove: function () {
        if (this.audioMove&&define.music==true) {
            this.audioMove.play();
        }
    },

    playComplete: function () {
        if (this.audioComplete&&define.music==true) {
            this.audioComplete.play();
        }
    },
    // update (dt) {},
});
module.exports = AudioSourceControl;