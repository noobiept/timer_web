var OPTIONS = {
    sound: true
};
var TYPE = 'application';
window.onload = function () {
    StopWatch.init();
    var loadSuccessful = load();
    if(!loadSuccessful) {
        new StopWatch({
            countUp: true,
            baseCssClass: 'CountUp'
        });
        new StopWatch({
            countUp: false,
            baseCssClass: 'CountDown'
        });
    }
    Menu.init();
};
window.onbeforeunload = function () {
    save();
};
window.onkeyup = function (event) {
    var key = event.keyCode;
    var watchObject;
    if(event.altKey && key == EVENT_KEY.q) {
        watchObject = new StopWatch({
            countUp: true,
            baseCssClass: 'CountUp'
        });
        watchObject.TITLE_ELEMENT.focus();
    } else if(event.altKey && key == EVENT_KEY.w) {
        watchObject = new StopWatch({
            countUp: false,
            baseCssClass: 'CountDown'
        });
        watchObject.TITLE_ELEMENT.focus();
    }
};
