var StopWatch = (function () {
    function StopWatch(countUp, baseCssClass) {
        var _this = this;
        this.COUNT = 0;
        this.NUMBER_DECIMAL_CASES = 0;
        this.TIMER_INTERVAL = 1000;
        this.RUNNING = false;
        this.STARTED = false;
        this.COUNT_UP = countUp;
        this.BASE_CSS_CLASS = baseCssClass;
        var title = document.createElement('h2');
        title.className = baseCssClass + '-title';
        title.contentEditable = 'true';
        title.innerText = separateWords(baseCssClass) + ' Title';
        var count = document.createElement('div');
        count.className = baseCssClass + '-count';
        var startStop = document.createElement('input');
        startStop.className = baseCssClass + '-startStop';
        startStop.type = 'button';
        startStop.value = 'Start';
        var restart = document.createElement('input');
        restart.className = baseCssClass + '-restart';
        restart.type = 'button';
        restart.value = 'Restart';
        var reset = document.createElement('input');
        reset.className = baseCssClass + '-reset';
        reset.type = 'button';
        reset.value = 'Reset';
        var options = document.createElement('input');
        options.className = baseCssClass + '-openOptions';
        options.type = 'button';
        options.value = 'Options';
        var remove = document.createElement('canvas');
        remove.className = baseCssClass + '-remove';
        drawRemoveButton(remove);
        var entry = null;
        if(countUp === false) {
            entry = document.createElement('input');
            entry.className = baseCssClass + '-entry';
            entry.type = 'text';
            entry.value = '10s';
        }
        var container = document.createElement('div');
        container.className = baseCssClass + '-container';
        container.appendChild(title);
        container.appendChild(count);
        container.appendChild(startStop);
        container.appendChild(restart);
        container.appendChild(reset);
        container.appendChild(remove);
        container.appendChild(options);
        if(!countUp) {
            container.appendChild(entry);
        }
        var watchMainContainer = document.querySelector('#' + baseCssClass + '-mainContainer');
        watchMainContainer.appendChild(container);
        startStop.onclick = function () {
            _this.STARTED = true;
            if(!_this.RUNNING) {
                _this.startTimer();
                startStop.value = "Stop";
            } else {
                _this.stopTimer();
                startStop.value = "Continue";
            }
        };
        restart.onclick = function () {
            _this.STARTED = true;
            startStop.value = 'Stop';
            _this.updateWatch(_this.getInitialValue());
            _this.startTimer();
        };
        reset.onclick = function () {
            _this.STARTED = false;
            _this.stopTimer();
            startStop.value = "Start";
            _this.updateWatch(_this.getInitialValue());
        };
        options.onclick = function () {
            _this.openOptions();
        };
        remove.onclick = function () {
            _this.remove();
        };
        if(!countUp) {
            entry.onkeypress = function (event) {
                var key = event.which;
                if(key == EVENT_KEY.enter) {
                    startStop.value = 'Stop';
                    _this.updateWatch(_this.getInitialValue());
                    _this.startTimer();
                }
            };
        }
        this.COUNT_ELEMENT = count;
        this.START_STOP_ELEMENT = startStop;
        this.RESTART_ELEMENT = restart;
        this.RESET_ELEMENT = reset;
        this.OPEN_OPTIONS_ELEMENT = options;
        this.REMOVE_ELEMENT = remove;
        this.ENTRY_ELEMENT = entry;
        this.CONTAINER_ELEMENT = container;
        this.updateWatch(this.getInitialValue());
        StopWatch.ALL_STOPWATCHES.push(this);
    }
    StopWatch.ALL_STOPWATCHES = [];
    StopWatch.prototype.updateWatch = function (count) {
        this.COUNT = count;
        this.COUNT_ELEMENT.innerText = dateToString(count, this.NUMBER_DECIMAL_CASES);
    };
    StopWatch.prototype.getInitialValue = function () {
        var value = 0;
        if(!this.COUNT_UP) {
            try  {
                value = this.stringToMilliseconds(this.ENTRY_ELEMENT.value);
            } catch (error) {
                console.log(error);
                return;
            }
        }
        return value;
    };
    StopWatch.prototype.startTimer = function () {
        var _this = this;
        this.RUNNING = true;
        window.clearInterval(this.INTERVAL_F);
        this.INTERVAL_F = window.setInterval(function () {
            _this.tick();
        }, this.TIMER_INTERVAL);
    };
    StopWatch.prototype.stopTimer = function () {
        this.RUNNING = false;
        window.clearInterval(this.INTERVAL_F);
    };
    StopWatch.prototype.openOptions = function () {
        var _this = this;
        var options = document.createElement('div');
        var roundedCases = document.createElement('div');
        roundedCases.innerText = 'Number of decimal cases';
        var zero = document.createElement('div');
        zero.innerText = 'Zero';
        zero.onclick = function () {
            _this.changeNumberDecimalCases(0);
        };
        var one = document.createElement('div');
        one.innerText = 'One';
        one.onclick = function () {
            _this.changeNumberDecimalCases(1);
        };
        options.appendChild(roundedCases);
        options.appendChild(zero);
        options.appendChild(one);
        var offset = $(this.OPEN_OPTIONS_ELEMENT).offset();
        new PopupWindow(options, offset.left + 70, offset.top);
    };
    StopWatch.prototype.changeNumberDecimalCases = function (num) {
        if(num < 0 || num > 3) {
            return;
        }
        this.NUMBER_DECIMAL_CASES = num;
        this.TIMER_INTERVAL = 1000 / Math.pow(10, num);
        var rounded = this.COUNT / 1000;
        rounded = Math.floor(rounded);
        this.COUNT = rounded * 1000;
        this.updateWatch(this.COUNT);
        if(this.RUNNING) {
            this.startTimer();
        } else {
            this.startTimer();
            this.stopTimer();
        }
    };
    StopWatch.prototype.remove = function () {
        var position = StopWatch.ALL_STOPWATCHES.indexOf(this);
        StopWatch.ALL_STOPWATCHES.splice(position, 1);
        var mainContainer = document.querySelector('#' + this.BASE_CSS_CLASS + '-mainContainer');
        mainContainer.removeChild(this.CONTAINER_ELEMENT);
    };
    StopWatch.prototype.stringToMilliseconds = function (entryValue) {
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
    StopWatch.prototype.updateStartStopButtonValue = function () {
        if(!this.STARTED) {
            this.START_STOP_ELEMENT.value = 'Start';
        } else {
            if(this.RUNNING) {
                this.START_STOP_ELEMENT.value = 'Stop';
            } else {
                this.START_STOP_ELEMENT.value = 'Continue';
            }
        }
    };
    StopWatch.prototype.tick = function () {
        var nextCount;
        if(this.COUNT_UP) {
            nextCount = this.COUNT + this.TIMER_INTERVAL;
        } else {
            nextCount = this.COUNT - this.TIMER_INTERVAL;
        }
        this.updateWatch(nextCount);
    };
    return StopWatch;
})();
