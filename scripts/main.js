window.onload = function () {
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
};
window.onunload = function () {
    save();
};
