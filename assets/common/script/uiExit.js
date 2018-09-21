var uiPanel = require("uiPanel");
var mvs = require("Matchvs");
cc.Class({
    extends: uiPanel,
    properties: {},

    onLoad() {
        this._super();
        this.nodeDict["sure"].on("click", this.sure, this);
        this.nodeDict["close"].on("click", this.close, this);
    },

    close() {
        uiFunc.closeUI(this.node.name);
    },

    sure() {
        mvs.engine.leaveRoom("");
        uiFunc.closeUI("uiGamePanel");
        uiFunc.closeUI(this.node.name);

        Game.GameManager.lobbyShow();
    }
});
