var StopWatch;
(function (StopWatch) {
    var COUNT = 0;
    var COUNT_ELEMENT;
    var INTERVAL_F;
    var RUNNING = false;
    function updateWatch(count) {
        COUNT = count;
        COUNT_ELEMENT.innerText = dateToString(count);
    }
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
        var startStop = document.querySelector(".StopWatch-startStop");
        var restart = document.querySelector(".StopWatch-restart");
        var reset = document.querySelector(".StopWatch-reset");
        COUNT_ELEMENT = document.querySelector(".StopWatch-count");
        updateWatch(0);
        startStop.onclick = function () {
            if(!RUNNING) {
                startTimer();
                startStop.value = "Stop";
            } else {
                stopTimer();
                startStop.value = "Continue";
            }
        };
        restart.onclick = function () {
            startStop.value = 'Stop';
            updateWatch(0);
            startTimer();
        };
        reset.onclick = function () {
            stopTimer();
            startStop.value = "Start";
            updateWatch(0);
        };
    }
    StopWatch.init = init;
    function tick() {
        updateWatch(COUNT + 1000);
    }
})(StopWatch || (StopWatch = {}));

