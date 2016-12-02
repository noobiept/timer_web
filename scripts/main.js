/// <reference path="../d.ts/jquery.d.ts" />
/// <reference path="../d.ts/jqueryui.d.ts" />
/// <reference path="stopwatch.ts" />
/// <reference path="menu.ts" />
window.onload = function () {
    Data.load(initApp);
};
function initApp() {
    StopWatch.init();
    var watches = Data.getWatches();
    if (watches.length > 0) {
        for (var i = 0; i < watches.length; i++) {
            new StopWatch(watches[i], true);
        }
    }
    else {
        new StopWatch({ countUp: true });
        new StopWatch({ countUp: false });
    }
    Menu.init();
}
window.onkeyup = function (event) {
    var key = event.keyCode;
    var watchObject;
    // alt + q: add count up
    if (event.altKey && key == EVENT_KEY.q) {
        watchObject = new StopWatch({ countUp: true });
        watchObject.gainFocus();
    }
    else if (event.altKey && key == EVENT_KEY.w) {
        watchObject = new StopWatch({ countUp: false });
        watchObject.gainFocus();
    }
};
