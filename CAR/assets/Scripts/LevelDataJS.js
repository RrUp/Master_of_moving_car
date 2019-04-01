
//一个关卡下的地图数据
 
var subBlockStatusData = require("subBlockStatusDataJS");

var LevelData = cc.Class({
    // extends: cc.Component,
    properties: {
        minmove: 0,
        count: 0,
        m_BlockData: [subBlockStatusData]
    },

 
});
module.exports = LevelData;