var CountDown = (function () {
    function CountDown() {
        var _this = this;
        this.COUNT = 0;
        this.RUNNING = false;
        var title = document.createElement('h2');
        title.className = 'CountDown-title';
        title.contentEditable = 'true';
        title.innerText = 'Count Down Title';
        var countElement = document.createElement('div');
        countElement.className = 'CountDown-count';
        this.COUNT_ELEMENT = countElement;
        var startStop = document.createElement('input');
        startStop.className = 'CountDown-startStop';
        startStop.type = 'button';
        startStop.value = 'Start';
        var restart = document.createElement('input');
        restart.className = 'CountDown-restart';
        restart.type = 'button';
        restart.value = 'Restart';
        var reset = document.createElement('input');
        reset.className = 'CountDown-reset';
        reset.type = 'button';
        reset.value = 'Reset';
        var entry = document.createElement('input');
        entry.className = 'CountDown-entry';
        entry.type = 'text';
        entry.value = '10s';
        this.ENTRY_ELEMENT = entry;
        var container = document.createElement('div');
        container.className = 'CountDown-container';
        container.appendChild(title);
        container.appendChild(countElement);
        container.appendChild(startStop);
        container.appendChild(restart);
        container.appendChild(reset);
        container.appendChild(entry);
        var countDownContainer = document.querySelector('#CountDown');
        countDownContainer.insertBefore(container, CountDown.ADD_MORE_ELEMENT);
        this.updateWatchFromEntry();
        startStop.onclick = function () {
            if(!_this.RUNNING) {
                _this.startTimer();
                startStop.value = 'Stop';
            } else {
                _this.stopTimer();
                startStop.value = 'Continue';
            }
        };
        restart.onclick = function () {
            startStop.value = 'Stop';
            _this.updateWatchFromEntry();
            _this.startTimer();
        };
        reset.onclick = function () {
            _this.stopTimer();
            startStop.value = 'Start';
            _this.updateWatchFromEntry();
        };
    }
    CountDown.ADD_MORE_ELEMENT = null;
    CountDown.init = function init() {
        var addMore = document.querySelector('#CountDown-add');
        addMore.onclick = function () {
            new CountDown();
        };
        CountDown.ADD_MORE_ELEMENT = addMore;
    }
    CountDown.prototype.startTimer = function () {
        var _this = this;
        this.RUNNING = true;
        window.clearInterval(this.INTERVAL_F);
        this.INTERVAL_F = window.setInterval(function () {
            _this.tick();
        }, 1000);
    };
    CountDown.prototype.stopTimer = function () {
        this.RUNNING = false;
        window.clearInterval(this.INTERVAL_F);
    };
    CountDown.prototype.updateWatchFromEntry = function () {
        try  {
            var value = this.stringToMilliseconds(this.ENTRY_ELEMENT.value);
        } catch (error) {
            console.log(error);
            return;
        }
        this.updateWatch(value);
    };
    CountDown.prototype.stringToMilliseconds = function (entryValue) {
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
    };
    CountDown.prototype.updateWatch = function (count) {
        this.COUNT = count;
        this.COUNT_ELEMENT.innerText = dateToString(this.COUNT);
    };
    CountDown.prototype.tick = function () {
        this.updateWatch(this.COUNT - 1000);
    };
    return CountDown;
})();
