/// <reference path="../d.ts/jquery.d.ts" />
/// <reference path="../d.ts/jqueryui.d.ts" />
/// <reference path="stopwatch.ts" />
/// <reference path="save_load.ts" />
/// <reference path="menu.ts" />
var OPTIONS = {
    sound: true // whether we play a sound when a countdown ends or not
};
// 'application' or 'server'
var TYPE = 'application';
var BASE_URL = '../'; // server only, its in the template
window.onload = function () {
    StopWatch.init();
    var loadSuccessful = load();
    // add some watches if its the first time the program is running
    if (!loadSuccessful) {
        new StopWatch({ countUp: true, baseCssClass: 'CountUp' });
        new StopWatch({ countUp: false, baseCssClass: 'CountDown' });
    }
    Menu.init();
};
// 'on before unload' instead of 'on unload' so that in the server version, when refreshing (F5)
// the logout gets called first, than the load of the new page (otherwise, the new load will have the previous data)
window.onbeforeunload = function () {
    save();
};
window.onkeyup = function (event) {
    var key = event.keyCode;
    var watchObject;
    // alt + q: add count up
    if (event.altKey && key == EVENT_KEY.q) {
        watchObject = new StopWatch({ countUp: true, baseCssClass: 'CountUp' });
        watchObject.TITLE_ELEMENT.focus();
    }
    else if (event.altKey && key == EVENT_KEY.w) {
        watchObject = new StopWatch({ countUp: false, baseCssClass: 'CountDown' });
        watchObject.TITLE_ELEMENT.focus();
    }
};
