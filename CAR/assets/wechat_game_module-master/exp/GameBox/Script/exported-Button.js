
cc.Class({
    extends: cc.Component,

    properties: {
        image: cc.Node,
        all: cc.Node,
    },


    init: function (manager) {
        this.manager = manager
        this.all.active = false;
    },

    change: function () {
        var self = this;
        self.callback = null;
        switch (this.manager.state) {
            case "open":
                self.image.scaleX = -1;
                self.all.active = true;

                break;
            case "close":
                self.image.scaleX = 1;
                self.all.active = false;

                break;

            default:
                break;
        }
    },

    event: function () {
        var self = this;
        switch (this.manager.state) {
            case "open":
                this.manager.hide({
                    callback: function () {
                        self.change();
                    }
                });
                break;
            case "close":
                this.manager.show({
                    callback: function () {
                        self.change();
                    }
                });
                break;

            default:
                break;
        }
    },
});
