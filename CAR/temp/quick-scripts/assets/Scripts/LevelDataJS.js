(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/LevelDataJS.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ed25e5tecxETY4DUaQy2I9i', 'LevelDataJS', __filename);
// Scripts/LevelDataJS.js

"use strict";

//一个关卡下的地图数据

var subBlockStatusData = require("subBlockStatusDataJS");

var LevelData = cc.Class({
    // extends: cc.Component,
    properties: {
        minmove: 0,
        count: 0,
        m_BlockData: [subBlockStatusData]
    }

});
module.exports = LevelData;

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
        //# sourceMappingURL=LevelDataJS.js.map
        