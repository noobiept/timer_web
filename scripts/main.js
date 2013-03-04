var OPTIONS = {
    sound: true
};
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
window.onunload = function () {
    save();
};
window.onkeyup = function (event) {
    var key = event.keyCode;
    if(event.altKey && key == EVENT_KEY.q) {
        new StopWatch({
            countUp: true,
            baseCssClass: 'CountUp'
        });
    } else if(event.altKey && key == EVENT_KEY.w) {
        new StopWatch({
            countUp: false,
            baseCssClass: 'CountDown'
        });
    }
};
