"use strict";
cc._RF.push(module, 'ed25e5tecxETY4DUaQy2I9i', 'LevelDataJS');
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