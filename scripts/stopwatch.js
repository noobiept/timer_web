var StopWatch = (function () {
    function StopWatch() {
        var _this = this;
        this.COUNT = 0;
        this.NUMBER_DECIMAL_CASES = 0;
        this.TIMER_INTERVAL = 1000;
        this.RUNNING = false;
        var title = document.createElement('h2');
        title.className = 'StopWatch-title';
        title.contentEditable = 'true';
        title.innerText = 'Stop Watch Title';
        var count = document.createElement('div');
        count.className = 'StopWatch-count';
        var startStop = document.createElement('input');
        startStop.className = 'StopWatch-startStop';
        startStop.type = 'button';
        startStop.value = 'Start';
        var restart = document.createElement('input');
        restart.className = 'StopWatch-restart';
        restart.type = 'button';
        restart.value = 'Restart';
        var reset = document.createElement('input');
        reset.className = 'StopWatch-reset';
        reset.type = 'button';
        reset.value = 'Reset';
        var options = document.createElement('input');
        options.className = 'StopWatch-openOptions';
        options.type = 'button';
        options.value = 'Options';
        var remove = document.createElement('canvas');
        remove.className = 'StopWatch-remove';
        drawRemoveButton(remove);
        var container = document.createElement('div');
        container.className = 'StopWatch-container';
        container.appendChild(title);
        container.appendChild(count);
        container.appendChild(startStop);
        container.appendChild(restart);
        container.appendChild(reset);
        container.appendChild(remove);
        container.appendChild(options);
        var watchMainContainer = document.querySelector('#StopWatch');
        watchMainContainer.insertBefore(container, StopWatch.ADD_MORE_ELEMENT);
        startStop.onclick = function () {
            if(!_this.RUNNING) {
                _this.startTimer();
                startStop.value = "Stop";
            } else {
                _this.stopTimer();
                startStop.value = "Continue";
            }
        };
        restart.onclick = function () {
            startStop.value = 'Stop';
            _this.updateWatch(_this.getInitialValue());
            _this.startTimer();
        };
        reset.onclick = function () {
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
        this.COUNT_ELEMENT = count;
        this.START_STOP_ELEMENT = startStop;
        this.CONTAINER_ELEMENT = container;
        this.updateWatch(this.getInitialValue());
    }
    StopWatch.ADD_MORE_ELEMENT = null;
    StopWatch.init = function init() {
        var addMore = document.querySelector('#StopWatch-add');
        addMore.onclick = function () {
            new StopWatch();
        };
        StopWatch.ADD_MORE_ELEMENT = addMore;
    }
    StopWatch.prototype.updateWatch = function (count) {
        this.COUNT = count;
        this.COUNT_ELEMENT.innerText = dateToString(count, this.NUMBER_DECIMAL_CASES);
    };
    StopWatch.prototype.getInitialValue = function () {
        return 0;
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
        new PopupWindow(options, 200, 200);
    };
    StopWatch.prototype.changeNumberDecimalCases = function (num) {
        if(num < 0 || num > 3) {
            return;
        }
        this.NUMBER_DECIMAL_CASES = num;
        this.TIMER_INTERVAL = 1000 / Math.pow(10, num);
        this.START_STOP_ELEMENT.value = 'Stop';
        var rounded = this.COUNT / 1000;
        rounded = Math.floor(rounded);
        this.COUNT = rounded * 1000;
        this.startTimer();
    };
    StopWatch.prototype.remove = function () {
        var mainContainer = document.querySelector('#StopWatch');
        mainContainer.removeChild(this.CONTAINER_ELEMENT);
    };
    StopWatch.prototype.tick = function () {
        this.updateWatch(this.COUNT + this.TIMER_INTERVAL);
    };
    return StopWatch;
})();
