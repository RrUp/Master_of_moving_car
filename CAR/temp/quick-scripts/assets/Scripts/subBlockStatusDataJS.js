(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/subBlockStatusDataJS.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '30a0706qahIOoSd2OBQG5xk', 'subBlockStatusDataJS', __filename);
// Scripts/subBlockStatusDataJS.js

"use strict";

//一块方块的信息

var subBlockStatusData = cc.Class({
    // extends: cc.Component,

    properties: {
        coordinate: "",
        state: ""
    }

});

module.exports = subBlockStatusData;

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
        //# sourceMappingURL=subBlockStatusDataJS.js.map
        