window.onload = function () {
    var addStopWatch = document.querySelector('#StopWatch-add');
    addStopWatch.onclick = function () {
        new StopWatch(true, 'StopWatch');
    };
    var addCountDown = document.querySelector('#CountDown-add');
    addCountDown.onclick = function () {
        new StopWatch(false, 'CountDown');
    };
    new StopWatch(true, 'StopWatch');
    new StopWatch(false, 'CountDown');
};
