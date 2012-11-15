var StopWatch = (function () {
    function StopWatch(watchArguments) {
        var _this = this;
        this.COUNT = 0;
        this.NUMBER_DECIMAL_CASES = 0;
        this.TIMER_INTERVAL = 1000;
        this.REACHED_LIMIT = false;
        this.RUNNING = false;
        this.STARTED = false;
        var countUp = watchArguments.countUp;
        var baseCssClass = watchArguments.baseCssClass;
        this.COUNT_UP = countUp;
        this.BASE_CSS_CLASS = baseCssClass;
        var title = document.createElement('h2');
        title.className = baseCssClass + '-title';
        title.contentEditable = 'true';
        if(watchArguments.title) {
            title.innerText = watchArguments.title;
        } else {
            title.innerText = separateWords(baseCssClass) + ' Title';
        }
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
            if(watchArguments.entryValue) {
                entry.value = watchArguments.entryValue;
            } else {
                entry.value = '10s';
            }
        }
        var container = document.createElement('div');
        container.className = baseCssClass + '-container';
        $(container).addClass('notActive');
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
                _this.startWatch();
            } else {
                _this.stopWatch();
            }
        };
        restart.onclick = function () {
            _this.restartWatch();
        };
        reset.onclick = function () {
            _this.resetWatch();
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
                    _this.restartWatch();
                }
            };
        }
        this.TITLE_ELEMENT = title;
        this.COUNT_ELEMENT = count;
        this.START_STOP_ELEMENT = startStop;
        this.RESTART_ELEMENT = restart;
        this.RESET_ELEMENT = reset;
        this.OPEN_OPTIONS_ELEMENT = options;
        this.REMOVE_ELEMENT = remove;
        this.ENTRY_ELEMENT = entry;
        this.CONTAINER_ELEMENT = container;
        if(watchArguments.count) {
            this.updateWatch(watchArguments.count);
        } else {
            this.updateWatch(this.getInitialValue());
        }
        if(watchArguments.started) {
            if(watchArguments.running) {
                this.startWatch();
            } else {
                this.stopWatch();
            }
        }
        StopWatch.ALL_STOPWATCHES.push(this);
    }
    StopWatch.ALL_STOPWATCHES = [];
    StopWatch.prototype.clearContainerCssClasses = function () {
        $(this.CONTAINER_ELEMENT).removeClass('watch-active');
        $(this.CONTAINER_ELEMENT).removeClass('watch-notActive');
        $(this.CONTAINER_ELEMENT).removeClass('watch-stopped');
        $(this.CONTAINER_ELEMENT).removeClass('watch-finished');
    };
    StopWatch.prototype.startWatch = function () {
        this.STARTED = true;
        this.startTimer();
        if(!this.reachedLimit()) {
            this.clearContainerCssClasses();
            $(this.CONTAINER_ELEMENT).addClass('watch-active');
        }
        this.START_STOP_ELEMENT.value = "Stop";
    };
    StopWatch.prototype.stopWatch = function () {
        this.STARTED = true;
        this.stopTimer();
        if(!this.reachedLimit()) {
            this.clearContainerCssClasses();
            $(this.CONTAINER_ELEMENT).addClass('watch-stopped');
        }
        this.START_STOP_ELEMENT.value = "Continue";
    };
    StopWatch.prototype.restartWatch = function () {
        this.STARTED = true;
        this.START_STOP_ELEMENT.value = 'Stop';
        this.clearContainerCssClasses();
        $(this.CONTAINER_ELEMENT).addClass('watch-active');
        this.updateWatch(this.getInitialValue());
        this.startTimer();
    };
    StopWatch.prototype.resetWatch = function () {
        this.STARTED = false;
        this.REACHED_LIMIT = false;
        if(this.REACHED_LIMIT_ELEMENT) {
            this.CONTAINER_ELEMENT.removeChild(this.REACHED_LIMIT_ELEMENT);
        }
        this.stopTimer();
        this.START_STOP_ELEMENT.value = "Start";
        this.clearContainerCssClasses();
        $(this.CONTAINER_ELEMENT).addClass('notActive');
        this.updateWatch(this.getInitialValue());
    };
    StopWatch.prototype.updateWatch = function (count) {
        this.COUNT = count;
        this.COUNT_ELEMENT.innerText = dateToString(count, this.NUMBER_DECIMAL_CASES);
        this.reachedLimit();
    };
    StopWatch.prototype.reachedLimit = function () {
        if(!this.COUNT_UP) {
            if(this.REACHED_LIMIT) {
                return true;
            }
            if(this.COUNT < 0) {
                this.REACHED_LIMIT = true;
                this.clearContainerCssClasses();
                $(this.CONTAINER_ELEMENT).addClass('watch-finished');
                var reachedLimitMessage = document.createElement('div');
                reachedLimitMessage.className = this.BASE_CSS_CLASS + '-reachedLimitMessage';
                reachedLimitMessage.innerText = '<-- Ended';
                this.CONTAINER_ELEMENT.appendChild(reachedLimitMessage);
                this.REACHED_LIMIT_ELEMENT = reachedLimitMessage;
                return true;
            }
        }
        return false;
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
        var two = document.createElement('div');
        two.innerText = 'Two';
        two.onclick = function () {
            _this.changeNumberDecimalCases(2);
        };
        options.appendChild(roundedCases);
        options.appendChild(zero);
        options.appendChild(one);
        options.appendChild(two);
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
    StopWatch.prototype.getTitle = function () {
        return this.TITLE_ELEMENT.innerText;
    };
    StopWatch.prototype.setTitle = function (newTitle) {
        this.TITLE_ELEMENT.innerText = newTitle;
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
