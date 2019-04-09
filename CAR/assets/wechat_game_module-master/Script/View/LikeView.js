cc.Class({
    extends: cc.Component,

    properties: {
        idxList: {
            set(v) {
                this.setIdxList(v)
            },
            get() {
                return this.getIdxList()
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.icons = this.node.children[0].children
        this.len = Math.min(G.WECHAT.appIdList.length, G.WECHAT.moreGameIconList.length)
    },

    start() {

    },

    onClick(e) {
        let node = e.target
        let idxList = this.idxList
        let idx = node.getSiblingIndex()
        let lastIdx = idxList[idx]
        let lastAppId = G.WECHAT.appIdList[lastIdx % this.len]
        G.WECHAT.navigateToMiniProgram(lastAppId)

        let btn = node.getComponent(cc.Button)
        btn.interactable = false

        let nextIdx = this.getNextIdx(lastIdx)
        let spriteFrame = G.WECHAT.moreGameIconList[nextIdx % this.len]
        idxList[idx] = nextIdx

        cc.log("idxList:", idxList, " lastIdx:", lastIdx, " nextIdx:", nextIdx)
        this.idxList = idxList
        this.scheduleOnce(() => {
            this.icons[idx].getComponent(cc.Sprite).spriteFrame = spriteFrame
            btn.interactable = true
        }, 2)
    },

    getNextIdx(idx) {
        while (this.idxList.indexOf(idx) > -1) {
            idx++
            idx = idx % this.len
        }
        return idx
    },

    setIdxList(idxList) {
        if (!CC_EDITOR) {
            this._idxList = idxList
            cc.sys.localStorage.setItem("idxList", JSON.stringify(idxList))
        }
    },

    getIdxList() {
        if (!CC_EDITOR) {
            if (this._idxList instanceof Array) return this._idxList
            var idxList = JSON.parse(cc.sys.localStorage.getItem("idxList"))
            if (idxList) {
                this._idxList = idxList
            } else {
                this._idxList = []
                for(var i=0,len=this.icons.length;i<len;i++){
                    this._idxList.push(i)
                }
            }
            return this._idxList
        }
    },
});
