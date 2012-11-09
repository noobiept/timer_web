var CountDown;
(function (CountDown) {
    var COUNT = 0;
    var COUNT_ELEMENT;
    var INTERVAL_F;
    var RUNNING = false;
    var ENTRY_ELEMENT;
    function startTimer() {
        RUNNING = true;
        window.clearInterval(INTERVAL_F);
        INTERVAL_F = window.setInterval(tick, 1000);
    }
    function stopTimer() {
        RUNNING = false;
        window.clearInterval(INTERVAL_F);
    }
    function init() {
        COUNT_ELEMENT = document.querySelector("#CountDown-count");
        ENTRY_ELEMENT = document.querySelector("#CountDown-entry");
        var startStop = document.querySelector("#CountDown-startStop");
        var restart = document.querySelector('#CountDown-restart');
        var reset = document.querySelector('#CountDown-reset');
        updateWatchFromEntry();
        startStop.onclick = function () {
            if(!RUNNING) {
                startTimer();
                startStop.value = 'Stop';
            } else {
                stopTimer();
                startStop.value = 'Continue';
            }
        };
        restart.onclick = function () {
            startStop.value = 'Stop';
            updateWatchFromEntry();
            startTimer();
        };
        reset.onclick = function () {
            stopTimer();
            startStop.value = 'Start';
            updateWatchFromEntry();
        };
    }
    CountDown.init = init;
    function updateWatchFromEntry() {
        var value = parseInt(ENTRY_ELEMENT.value);
        value *= 1000;
        updateWatch(value);
    }
    function stringToMilliseconds(entryValue) {
        return entryValue * 1000;
    }
    function updateWatch(count) {
        COUNT = count;
        COUNT_ELEMENT.innerText = dateToString(COUNT);
    }
    function tick() {
        updateWatch(COUNT - 1000);
    }
})(CountDown || (CountDown = {}));

