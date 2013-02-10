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
    var addCountUp = document.querySelector('#CountUp-add');
    addCountUp.onclick = function () {
        new StopWatch({
            countUp: true,
            baseCssClass: 'CountUp'
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
