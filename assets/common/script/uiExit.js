var uiPanel = require("uiPanel");
var mvs = require("Matchvs");
cc.Class({
    extends: uiPanel,
    properties: {},

    onLoad() {
        this._super();
        Game.UIManager.btnMethodBind(this.nodeDict["sure"], "sure", this);
        Game.UIManager.btnMethodBind(this.nodeDict["close"], "close", this);

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
