/// <reference path="utilities.ts" />
/// <reference path="options.ts" />
/// <reference path="sound.ts" />
var StopWatch = (function () {
    function StopWatch(watchArguments) {
        var _this = this;
        // private properties
        this.COUNT = 0;
        this.NUMBER_DECIMAL_CASES = 0;
        // number of milliseconds between each tick
        this.TIMER_INTERVAL = 1000;
        this.INIT_VALUE_COUNTDOWN = StopWatch.DEFAULT_COUNT_DOWN_VALUE; // the value which is set (where it started to count down)
        this.REACHED_LIMIT = false;
        // tells when the stop watch is running or not
        this.RUNNING = false;
        // tells if a clock has started (different than running, in the sense that it can be started and then paused, and restarted, which is different than being in its initial state)
        this.STARTED = false;
        var countUp = watchArguments.countUp;
        this.LOADING = true;
        this.COUNT_UP = countUp;
        if (watchArguments.initValueCountDown) {
            this.INIT_VALUE_COUNTDOWN = watchArguments.initValueCountDown;
        }
        // :: Title :: //
        var title = document.createElement('div');
        var titlePlaceholder;
        if (countUp) {
            titlePlaceholder = 'Count Up (click to edit)';
        }
        else {
            titlePlaceholder = 'Count Down (click to edit)';
        }
        title.className = 'StopWatch-title';
        title.contentEditable = 'true';
        title.setAttribute('data-placeholder', titlePlaceholder);
        if (watchArguments.title) {
            $(title).text(watchArguments.title);
        }
        // :: Count Element :: //
        var count = document.createElement('span');
        count.className = 'StopWatch-count';
        // to display messages (for example when count down finishes)
        var countMessage = document.createElement('span');
        countMessage.className = 'StopWatch-countMessage';
        var countContainer = document.createElement('div');
        countContainer.appendChild(count);
        countContainer.appendChild(countMessage);
        // :: Start/Stop :: //
        var startStop = document.createElement('input');
        startStop.className = 'StopWatch-startStop';
        startStop.type = 'button';
        startStop.value = 'Start';
        // :: Restart :: //
        var restart = document.createElement('input');
        restart.className = 'StopWatch-restart';
        restart.type = 'button';
        restart.value = 'Restart';
        // :: Reset :: //
        var reset = document.createElement('input');
        reset.className = 'StopWatch-reset';
        reset.type = 'button';
        reset.value = 'Reset';
        // :: Open Options :: //
        var options = document.createElement('input');
        options.className = 'StopWatch-openOptions';
        options.type = 'button';
        options.value = 'Options';
        // :: Remove Button :: //
        var remove = document.createElement('canvas');
        remove.className = 'StopWatch-remove';
        drawRemoveButton(remove);
        // :: Entry :: //
        var entry = null;
        var entryMessage = null;
        // when count down mode, add an entry to set the starting time
        if (countUp === false) {
            entry = document.createElement('input');
            entry.className = 'StopWatch-entry';
            entry.type = 'text';
            if (watchArguments.entryValue) {
                entry.value = watchArguments.entryValue;
            }
            else {
                entry.value = '10s';
            }
            // the message, when an error occurs (like not a valid time)
            entryMessage = document.createElement('span');
            entryMessage.className = 'StopWatch-entryMessage';
        }
        // :: Drag Handle :: //
        var dragHandle = document.createElement('canvas');
        dragHandle.className = 'StopWatch-dragHandle';
        drawDragHandle(dragHandle);
        // :: Container :: //
        var container = document.createElement('div');
        container.className = 'StopWatch-container';
        $(container).addClass('notActive');
        container.appendChild(title);
        container.appendChild(countContainer);
        container.appendChild(startStop);
        container.appendChild(restart);
        container.appendChild(reset);
        container.appendChild(remove);
        container.appendChild(dragHandle);
        container.appendChild(options);
        if (!countUp) {
            container.appendChild(entry);
            container.appendChild(entryMessage);
        }
        StopWatch.MAIN_CONTAINER.appendChild(container);
        // :: Set Events :: //
        startStop.onclick = function () {
            _this.STARTED = true;
            // start the watch
            if (!_this.RUNNING) {
                _this.startWatch();
            }
            else {
                _this.stopWatch();
            }
        };
        restart.onclick = function () {
            _this.restartWatch();
        };
        reset.onclick = function () {
            _this.resetWatch();
        };
        var isOptionsOpened = false;
        var optionsWindowObject = null;
        options.onclick = function () {
            if (isOptionsOpened) {
                isOptionsOpened = false;
                optionsWindowObject.remove();
            }
            else {
                isOptionsOpened = true;
                optionsWindowObject = new Options(_this, function () {
                    isOptionsOpened = false;
                });
            }
        };
        remove.onclick = function () {
            _this.remove();
        };
        if (!countUp) {
            entry.onkeypress = function (event) {
                var key = event.which;
                // start or restart the watch
                if (key == EVENT_KEY.enter) {
                    _this.restartWatch();
                }
            };
        }
        // :: save references to the html elements :: //
        this.TITLE_ELEMENT = title;
        this.COUNT_ELEMENT = count;
        this.COUNT_MESSAGE_ELEMENT = countMessage;
        this.START_STOP_ELEMENT = startStop;
        this.RESTART_ELEMENT = restart;
        this.RESET_ELEMENT = reset;
        this.OPEN_OPTIONS_ELEMENT = options;
        this.REMOVE_ELEMENT = remove;
        this.ENTRY_ELEMENT = entry;
        this.ENTRY_MESSAGE_ELEMENT = entryMessage;
        this.DRAG_HANDLE = dragHandle;
        this.CONTAINER_ELEMENT = container;
        // save a reference to this object in the container html element
        container.watchObject = this;
        // :: Update the watch :: //
        if ($.isNumeric(watchArguments.count)) {
            this.updateWatch(watchArguments.count);
        }
        else {
            if (watchArguments.countUp) {
                this.updateWatch(StopWatch.DEFAULT_STOP_WATCH_VALUE);
            }
            else {
                this.updateWatch(StopWatch.DEFAULT_COUNT_DOWN_VALUE);
            }
        }
        // And the number of decimal cases
        if ($.isNumeric(watchArguments.numberDecimalCases)) {
            this.changeNumberDecimalCases(watchArguments.numberDecimalCases);
        }
        if (watchArguments.started) {
            if (watchArguments.running) {
                this.startWatch();
            }
            else {
                this.stopWatch();
            }
        }
        StopWatch.ALL_STOPWATCHES.push(this);
        // :: Other :: //
        // so that the placeholder updates (according to whether there's text in the title or not)
        // it needs to be called after the element was added to the DOM
        $(title).trigger('change');
        // with different font-sizes (for example in chrome, settings -> font size -> medium/large), it makes the drag handle element not being position correctly
        // so we position it here with code
        // we're aligning just for the first line
        var titleFontSize = parseInt($(title).css('font-size'));
        // trying to get the height of the element from the font-size
        var oneLineHeight = titleFontSize * 1.35;
        var dragHeight = dragHandle.height;
        var dragTop = (oneLineHeight - dragHeight) / 2 + 1;
        $(dragHandle).css('top', dragTop + 'px');
        this.LOADING = false;
        return this;
    }
    /*
        Has to be called before constructing any objects
     */
    StopWatch.init = function () {
        StopWatch.MAIN_CONTAINER = document.querySelector('#mainContainer');
        // setup the drag and drop of the watches
        $(StopWatch.MAIN_CONTAINER).sortable({
            handle: '.StopWatch-dragHandle',
            opacity: 0.7
        });
    };
    /*
        Removes the css classes from the container (which set a background-color depending on the state of the watch)
    
        It then is set the correct one
     */
    StopWatch.prototype.clearContainerCssClasses = function () {
        $(this.CONTAINER_ELEMENT).removeClass('watch-active');
        $(this.CONTAINER_ELEMENT).removeClass('watch-notActive');
        $(this.CONTAINER_ELEMENT).removeClass('watch-stopped');
        $(this.CONTAINER_ELEMENT).removeClass('watch-finished');
    };
    /*
        Start the watch (from whatever value it was before)
    
        To start from the beginning, use restartWatch()
     */
    StopWatch.prototype.startWatch = function () {
        this.STARTED = true;
        this.startTimer();
        // if it reached the limit, let it have the background-color for that case, otherwise, the normal watch-active class
        if (!this.reachedLimit()) {
            this.clearContainerCssClasses();
            $(this.CONTAINER_ELEMENT).addClass('watch-active');
        }
        this.START_STOP_ELEMENT.value = "Stop";
    };
    /*
        Stops the watch (but keeps the watch value, to be able to continue from the same time)
     */
    StopWatch.prototype.stopWatch = function () {
        this.STARTED = true;
        this.stopTimer();
        // if it reached the limit, let it have the background-color for that case, otherwise, the normal watch-active class
        if (!this.reachedLimit()) {
            this.clearContainerCssClasses();
            $(this.CONTAINER_ELEMENT).addClass('watch-stopped');
        }
        this.START_STOP_ELEMENT.value = "Continue";
    };
    /*
        Restarts the watch (watch value to its default, start watch again)
     */
    StopWatch.prototype.restartWatch = function () {
        var watchObject = this;
        try {
            var initValue = this.getInitialValue();
        }
        catch (error) {
            console.log(error);
            // clear any possible previous timeout
            window.clearTimeout(this.ENTRY_MESSAGE_TIMEOUT_F);
            $(this.ENTRY_MESSAGE_ELEMENT).text('<-- Error: ' + error);
            // clear the message after some time
            this.ENTRY_MESSAGE_TIMEOUT_F = window.setTimeout(function () {
                $(watchObject.ENTRY_MESSAGE_ELEMENT).text('');
            }, 2000);
            // bring the last valid value that was set (this error only occurs in the CountDown watches)
            initValue = this.INIT_VALUE_COUNTDOWN;
        }
        this.STARTED = true;
        this.REACHED_LIMIT = false;
        // remove the reachedLimit message
        $(this.COUNT_MESSAGE_ELEMENT).text('');
        // update the startStop button text
        this.START_STOP_ELEMENT.value = 'Stop';
        // set the active css class
        this.clearContainerCssClasses();
        $(this.CONTAINER_ELEMENT).addClass('watch-active');
        // reset the watch
        this.updateWatch(initValue);
        this.startTimer();
    };
    /*
        Resets the watch (watch value to the default value, stop timer)
     */
    StopWatch.prototype.resetWatch = function () {
        var watchObject = this;
        try {
            var initValue = this.getInitialValue();
        }
        catch (error) {
            console.log(error);
            // clear any possible previous timeout
            window.clearTimeout(this.ENTRY_MESSAGE_TIMEOUT_F);
            $(this.ENTRY_MESSAGE_ELEMENT).text('<-- Error: ' + error);
            // clear the message after some time
            this.ENTRY_MESSAGE_TIMEOUT_F = window.setTimeout(function () {
                $(watchObject.ENTRY_MESSAGE_ELEMENT).text('');
            }, 2000);
            if (this.COUNT_UP) {
                initValue = StopWatch.DEFAULT_STOP_WATCH_VALUE;
            }
            else {
                initValue = this.INIT_VALUE_COUNTDOWN;
            }
        }
        this.STARTED = false;
        this.REACHED_LIMIT = false;
        // clear any possible messages that could be displayed
        $(this.COUNT_MESSAGE_ELEMENT).text('');
        this.stopTimer();
        this.START_STOP_ELEMENT.value = "Start";
        this.clearContainerCssClasses();
        $(this.CONTAINER_ELEMENT).addClass('notActive');
        this.updateWatch(initValue);
    };
    /*
        Updates the watch current number
     */
    StopWatch.prototype.updateWatch = function (count) {
        this.COUNT = count;
        $(this.COUNT_ELEMENT).text(dateToString(count, this.NUMBER_DECIMAL_CASES));
        // check if the CountDown watches finished (only relevant for CountDown watches)
        this.reachedLimit();
    };
    /*
        For CountDown only, when it reaches the count limit (and if so, change the background-color)
     */
    StopWatch.prototype.reachedLimit = function () {
        var watchObject = this;
        if (!this.COUNT_UP) {
            // no need to do anything
            if (this.REACHED_LIMIT) {
                return true;
            }
            if (this.COUNT <= 0) {
                this.REACHED_LIMIT = true;
                this.clearContainerCssClasses();
                $(this.CONTAINER_ELEMENT).addClass('watch-finished');
                // :: show some message :: //
                $(this.COUNT_MESSAGE_ELEMENT).text('<-- Ended');
                if (!this.LOADING && Data.getOption('sound')) {
                    // play the sound
                    new Sound('sound1');
                }
                return true;
            }
        }
        return false;
    };
    /*
        The initial value of the stopwatch when it is reset/restart/etc
     */
    StopWatch.prototype.getInitialValue = function () {
        // when counting up, start from 0
        var value = 0;
        // when counting down, go get the value from the entry
        if (!this.COUNT_UP) {
            value = this.stringToMilliseconds(this.ENTRY_ELEMENT.value);
            this.INIT_VALUE_COUNTDOWN = value;
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
    StopWatch.prototype.changeNumberDecimalCases = function (num) {
        if ((num < 0 || num > 3) || (num == this.NUMBER_DECIMAL_CASES)) {
            return;
        }
        this.NUMBER_DECIMAL_CASES = num;
        this.TIMER_INTERVAL = 1000 / Math.pow(10, num);
        // round the COUNT to zero decimal case (if you change from 1 decimal case to 0 for example, the count could be 2.3, and then would continue 3.3, 4.3, etc.. 
        // change milliseconds to seconds, to be able to round
        var rounded = this.COUNT / 1000;
        // round the number to the lowest integer that is close
        rounded = Math.floor(rounded);
        this.COUNT = rounded * 1000; // and back to milliseconds
        this.updateWatch(this.COUNT);
        // we have to reset the timer to have the changes take effect, but if the watch isn't running, we have to stop it
        if (this.RUNNING) {
            this.startTimer();
        }
        else {
            this.startTimer();
            // just to make the change have effect
            this.stopTimer();
        }
    };
    StopWatch.prototype.remove = function () {
        this.stopTimer();
        // remove the reference
        var position = StopWatch.ALL_STOPWATCHES.indexOf(this);
        StopWatch.ALL_STOPWATCHES.splice(position, 1);
        // remove from the DOM
        StopWatch.MAIN_CONTAINER.removeChild(this.CONTAINER_ELEMENT);
    };
    StopWatch.prototype.stringToMilliseconds = function (entryValue) {
        /*
         *
         * search for a number with at least one digit, then possibly a space and a letter (works only for positive numbers)
         *
         *  s - second . m - minute , h - hour , d - day
         *  returns two strings (if it finds), one with the number and other with the letter
         *
         * RegExp:
         *
         *      [] : matches the characters within (from 0 to 9)
         *      +  : 1 or more of the preceding match
         *      () : remembers the match - capturing parentheses
         *      *  : matches the preceding character 0 or more times
         *      ?= : matches only if the following pattern exists
         *
         * Flags:
         *
         *      i - case insensitive
         *      g - global ( calling pattern.exec() consecutively will keep returning all of the possibilities )
         *
         */
        var pattern = /[0-9]+(?= *([smhd]))/ig;
        var matches = pattern.exec(entryValue);
        //the number of milliseconds, to add to the current date
        //  for example, if the string is "in 20h 3m", then number will have 20 hours and 3 minutes converted in milliseconds
        var milliseconds = 0;
        var foundPattern = false;
        var temp;
        //deal with 'pattern' - one at the time (for example 20h 3m, cycle goes two times)
        //sum everything into 'number' (in milliseconds)
        while (matches !== null) {
            foundPattern = true;
            temp = parseInt(matches[0], 10);
            //see if it has more than 3 digits the number
            if (numberOfDigits(temp) > 3) {
                throw "Max. 3 digits for each number";
            }
            milliseconds += timeToMilliseconds(temp, matches[1]);
            matches = pattern.exec(entryValue);
        }
        if (!foundPattern) {
            throw "Didn't found the pattern";
        }
        return milliseconds;
    };
    StopWatch.prototype.getTitle = function () {
        return $(this.TITLE_ELEMENT).text();
    };
    StopWatch.prototype.setTitle = function (newTitle) {
        $(this.TITLE_ELEMENT).text(newTitle);
    };
    StopWatch.prototype.tick = function () {
        var nextCount;
        if (this.COUNT_UP) {
            nextCount = this.COUNT + this.TIMER_INTERVAL;
        }
        else {
            nextCount = this.COUNT - this.TIMER_INTERVAL;
        }
        this.updateWatch(nextCount);
    };
    StopWatch.prototype.getEntryValue = function () {
        if (this.ENTRY_ELEMENT) {
            return this.ENTRY_ELEMENT.value;
        }
        return null;
    };
    // default value when a new timer is added (or when an error occurs)
    StopWatch.DEFAULT_STOP_WATCH_VALUE = 0;
    StopWatch.DEFAULT_COUNT_DOWN_VALUE = 10000; // 10s
    // contains all the stopwatches created
    StopWatch.ALL_STOPWATCHES = [];
    StopWatch.MAIN_CONTAINER = null;
    return StopWatch;
}());
