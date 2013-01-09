var OPTIONS = {
    sound: true
};
window.onload = function () {
    var loadSuccessful = load();
    if(!loadSuccessful) {
        new StopWatch({
            countUp: true,
            baseCssClass: 'StopWatch'
        });
        new StopWatch({
            countUp: false,
            baseCssClass: 'CountDown'
        });
    }
    var addStopWatch = document.querySelector('#StopWatch-add');
    addStopWatch.onclick = function () {
        new StopWatch({
            countUp: true,
            baseCssClass: 'StopWatch'
        });
    };
    var addCountDown = document.querySelector('#CountDown-add');
    addCountDown.onclick = function () {
        new StopWatch({
            countUp: false,
            baseCssClass: 'CountDown'
        });
    };
    Menu.init();
};
window.onunload = function () {
    save();
};
