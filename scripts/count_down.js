var CountDown;
(function (CountDown) {
    var COUNT = 0;
    var COUNT_ELEMENT;
    var INTERVAL_F;
    function init() {
        COUNT_ELEMENT = document.querySelector("#CountDown-count");
        var entry = document.querySelector("#CountDown-entry");
        var start = document.querySelector("#CountDown-start");
        start.onclick = function () {
            COUNT_ELEMENT.innerText = entry.value;
            COUNT = stringToMilliseconds(entry.value);
            startTimer();
        };
        var stop = document.querySelector("#CountDown-stop");
        stop.onclick = function () {
            stopTimer();
        };
    }
    CountDown.init = init;
    function startTimer() {
        window.clearInterval(INTERVAL_F);
        INTERVAL_F = window.setInterval(tick, 1000);
    }
    function stopTimer() {
        window.clearInterval(INTERVAL_F);
    }
    function stringToMilliseconds(entryValue) {
        return entryValue * 1000;
    }
    function tick() {
        COUNT -= 1000;
        COUNT_ELEMENT.innerText = dateToString(COUNT);
    }
})(CountDown || (CountDown = {}));

