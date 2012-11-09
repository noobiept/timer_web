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
        try  {
            var value = stringToMilliseconds(ENTRY_ELEMENT.value);
        } catch (error) {
            console.log(error);
            return;
        }
        updateWatch(value);
    }
    function stringToMilliseconds(entryValue) {
        var pattern = /[0-9]+(?= *([smhd]))/gi;
        var matches = pattern.exec(entryValue);
        var milliseconds = 0;
        var foundPattern = false;
        var temp;
        while(matches !== null) {
            foundPattern = true;
            temp = parseInt(matches[0], 10);
            if(numberOfDigits(temp) > 3) {
                throw "Max. 3 digits for each number";
            }
            milliseconds += timeToMilliseconds(temp, matches[1]);
            matches = pattern.exec(entryValue);
        }
        if(!foundPattern) {
            throw "Didn't found the pattern";
        }
        return milliseconds;
    }
    function updateWatch(count) {
        COUNT = count;
        COUNT_ELEMENT.innerText = dateToString(COUNT);
    }
    function tick() {
        updateWatch(COUNT - 1000);
    }
})(CountDown || (CountDown = {}));

