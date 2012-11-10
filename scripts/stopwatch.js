var StopWatch = (function () {
    function StopWatch() {
        var _this = this;
        this.COUNT = 0;
        this.RUNNING = false;
        var title = document.createElement('h2');
        title.className = 'StopWatch-title';
        title.contentEditable = 'true';
        title.innerText = 'Stop Watch Title';
        var count = document.createElement('div');
        count.className = 'StopWatch-count';
        this.COUNT_ELEMENT = count;
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
        var container = document.createElement('div');
        container.className = 'StopWatch-container';
        container.appendChild(title);
        container.appendChild(count);
        container.appendChild(startStop);
        container.appendChild(restart);
        container.appendChild(reset);
        var watchMainContainer = document.querySelector('#StopWatch');
        watchMainContainer.insertBefore(container, StopWatch.ADD_MORE_ELEMENT);
        this.updateWatch(0);
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
            _this.updateWatch(0);
            _this.startTimer();
        };
        reset.onclick = function () {
            _this.stopTimer();
            startStop.value = "Start";
            _this.updateWatch(0);
        };
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
        this.COUNT_ELEMENT.innerText = dateToString(count);
    };
    StopWatch.prototype.startTimer = function () {
        var _this = this;
        this.RUNNING = true;
        window.clearInterval(this.INTERVAL_F);
        this.INTERVAL_F = window.setInterval(function () {
            _this.tick();
        }, 1000);
    };
    StopWatch.prototype.stopTimer = function () {
        this.RUNNING = false;
        window.clearInterval(this.INTERVAL_F);
    };
    StopWatch.prototype.tick = function () {
        this.updateWatch(this.COUNT + 1000);
    };
    return StopWatch;
})();
