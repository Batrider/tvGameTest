/*
    create by hao.c 2018/04/10

    desc: 游戏显示相关操作逻辑
 */

window.uiFunc = {
    uiList: []
};

uiFunc.openUI = function(uiName, callBack) {
    var loadOKCallBack = function(err, prefab) {
        if (err) {
            cc.error(err.message || err);
            return;
        }

        var temp = cc.instantiate(prefab);
        temp.parent = cc.Canvas.instance.node;
        uiFunc.uiList.push(temp);

        if (callBack) {
            callBack(temp);
        }
        clientEvent.dispatch(clientEvent.eventType.openUI);
    };

    if (!(Game.UIManager && Game.UIManager.openUI(uiName, loadOKCallBack))) {
        cc.loader.loadRes('ui/' + uiName, loadOKCallBack);
    }
};

uiFunc.closeUI = function(ui, callBack) {
    for (var i = uiFunc.uiList.length - 1; i >= 0; i--) {
        var temp = uiFunc.uiList[i];
        if (temp && (temp === ui || temp.name === ui)) {
            temp.destroy();
            uiFunc.uiList.splice(i, 1);
            clientEvent.dispatch(clientEvent.eventType.closeUI);
            if (callBack) {
                callBack();
            }
            return;
        }
    }
};

uiFunc.findUI = function(uiName) {
    for (var i = uiFunc.uiList.length - 1; i >= 0; i--) {
        var temp = uiFunc.uiList[i];
        if (temp && temp.name === uiName) {
            return temp;
        }
    }
};
