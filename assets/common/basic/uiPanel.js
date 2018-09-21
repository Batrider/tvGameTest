cc.Class({
    extends: cc.Component,
    onLoad: function() {
        this.nodeLink();
        this.btnLink();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    start() {
        this.focusBtnIndex = 0;
        this.focusTarget(0);
    },

    nodeLink() {
        this.nodeDict = {};
        var linkWidget = function(self, nodeDict) {
            var children = self.children;
            for (var i = 0; i < children.length; i++) {
                var widgetName = children[i].name;
                if (widgetName && widgetName.indexOf("key_") >= 0) {
                    var nodeName = widgetName.substring(4);
                    if (nodeDict[nodeName]) {
                        cc.error("控件名字重复!" + children[i].name);
                    }
                    nodeDict[nodeName] = children[i];
                }
                if (children[i].childrenCount > 0) {
                    linkWidget(children[i], nodeDict);
                }
            }
        }.bind(this);
        linkWidget(this.node, this.nodeDict);
    },

    btnLink() {
        this.btnNodeDict = [];
        var linkWidget = function(self, nodeDict) {
            var children = self.children;
            for (var i = 0; i < children.length; i++) {
                var btn = children[i].getComponent(cc.Button);
                if (btn) {
                    nodeDict.push(btn);
                }
                if (children[i].childrenCount > 0) {
                    linkWidget(children[i], nodeDict);
                }
            }
        }.bind(this);
        linkWidget(this.node, this.btnNodeDict);
    },

    focusTarget(delta) {
        for (var i = 0; i < this.btnNodeDict.length; i++) {
            this.btnNodeDict[i].node.color = this.btnNodeDict[i].normalColor;
        }

        this.focusBtnIndex += delta;
        if (this.focusBtnIndex >= this.btnNodeDict.length) {
            this.focusBtnIndex = 0;
        }
        if (this.focusBtnIndex < 0) {
            this.focusBtnIndex = this.btnNodeDict.length - 1;
        }
        this.btnNodeDict[this.focusBtnIndex].node.color = this.btnNodeDict[this.focusBtnIndex].hoverColor;
    },

    onKeyDown: function(event) {
        var uis = cc.Canvas.instance.node.children;
        if (uis.length > 0 && uis[uis.length - 1] === this.node) {
            switch (event.keyCode) {
                case 37:
                case 38:
                    this.focusTarget(-1);
                    break;
                case 39:
                case 40:
                    this.focusTarget(1);
                    break;
                case 13:
                    this.callBtnMethod(this.btnNodeDict[this.focusBtnIndex]);
                    break;
            }
        }
    },

    callBtnMethod(targetBtn) {
        var event = {
            type: "touchend",
            bubbles: true,
            target: targetBtn.node,
            currentTarget: targetBtn.node,
            eventPhase: 2
        };
        cc.Component.EventHandler.emitEvents(targetBtn.clickEvents, event);
    },

    onDestroy: function() {
        clientEvent.clear(this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },
});
