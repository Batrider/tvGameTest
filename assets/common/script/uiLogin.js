var uiPanel = require("uiPanel");
cc.Class({
    extends: uiPanel,
    properties: {},

    onLoad() {
        this._super();
    },

    start() {
        this._super();
        Game.UIManager.btnMethodBind(this.nodeDict["start"], "matchVsInit", this);
    },

    matchVsInit(){
        Game.GameManager.matchVsInit();
    }
});
