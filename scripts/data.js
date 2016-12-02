var Data;
(function (Data) {
    var OPTIONS = {
        sound: true // whether we play a sound when a countdown ends or not
    };
    var WATCHES = [];
    // we can temporarily disable saving to the storage on every change
    // useful when we're making lots of changes in one go
    // will have to save manually at the end (can happen in the undo/redo for example)
    // don't forget to enable again
    var SAVE_ENABLED = true;
    function saveToStorage(yesNo) {
        SAVE_ENABLED = yesNo;
    }
    Data.saveToStorage = saveToStorage;
    function load(callback) {
        AppStorage.getData(['timer_watches', 'timer_options'], function (data) {
            var options = data['timer_options'];
            var watches = data['timer_watches'];
            if (options) {
                if (typeof options.sound === 'boolean') {
                    OPTIONS.sound = options.sound;
                }
            }
            if (watches) {
                WATCHES = watches;
            }
            callback();
        });
    }
    Data.load = load;
    function saveOptions() {
        AppStorage.setData({ timer_options: OPTIONS });
    }
    function saveWatches() {
        AppStorage.setData({ timer_watches: WATCHES });
    }
    function getSound() {
        return OPTIONS.sound;
    }
    Data.getSound = getSound;
    function setSound(value) {
        OPTIONS.sound = value;
        if (SAVE_ENABLED) {
            saveOptions();
        }
    }
    Data.setSound = setSound;
    function getWatches() {
        return WATCHES;
    }
    Data.getWatches = getWatches;
    function newWatch(watch) {
        WATCHES.splice(watch.POSITION, 0, {
            title: watch.getTitle(),
            count: watch.COUNT,
            running: watch.RUNNING,
            started: watch.STARTED,
            numberDecimalCases: watch.NUMBER_DECIMAL_CASES,
            entryValue: watch.getEntryValue(),
            initValueCountDown: watch.INIT_VALUE_COUNTDOWN,
            countUp: watch.COUNT_UP,
            reachedLimit: watch.REACHED_LIMIT
        });
        if (SAVE_ENABLED) {
            saveWatches();
        }
    }
    Data.newWatch = newWatch;
    function removeWatch(watch) {
        WATCHES.splice(watch.POSITION, 1);
        if (SAVE_ENABLED) {
            saveWatches();
        }
    }
    Data.removeWatch = removeWatch;
    function changeTitle(watch) {
        WATCHES[watch.POSITION].title = watch.getTitle();
        if (SAVE_ENABLED) {
            saveWatches();
        }
    }
    Data.changeTitle = changeTitle;
    function changePosition(watch, previousPosition) {
        var data = WATCHES.splice(previousPosition, 1)[0];
        WATCHES.splice(watch.POSITION, 0, data);
        if (SAVE_ENABLED) {
            saveWatches();
        }
    }
    Data.changePosition = changePosition;
    function startWatch(watch) {
        WATCHES[watch.POSITION].started = watch.STARTED;
        WATCHES[watch.POSITION].running = watch.RUNNING;
        if (SAVE_ENABLED) {
            saveWatches();
        }
    }
    Data.startWatch = startWatch;
    function stopWatch(watch) {
        WATCHES[watch.POSITION].started = watch.STARTED;
        WATCHES[watch.POSITION].running = watch.RUNNING;
        if (SAVE_ENABLED) {
            saveWatches();
        }
    }
    Data.stopWatch = stopWatch;
    function restartWatch(watch) {
        WATCHES[watch.POSITION].started = watch.STARTED;
        WATCHES[watch.POSITION].running = watch.RUNNING;
        WATCHES[watch.POSITION].reachedLimit = watch.REACHED_LIMIT;
        WATCHES[watch.POSITION].count = watch.COUNT;
        WATCHES[watch.POSITION].initValueCountDown = watch.INIT_VALUE_COUNTDOWN;
        if (SAVE_ENABLED) {
            saveWatches();
        }
    }
    Data.restartWatch = restartWatch;
    function resetWatch(watch) {
        WATCHES[watch.POSITION].started = watch.STARTED;
        WATCHES[watch.POSITION].running = watch.RUNNING;
        WATCHES[watch.POSITION].reachedLimit = watch.REACHED_LIMIT;
        WATCHES[watch.POSITION].count = watch.COUNT;
        WATCHES[watch.POSITION].initValueCountDown = watch.INIT_VALUE_COUNTDOWN;
        if (SAVE_ENABLED) {
            saveWatches();
        }
    }
    Data.resetWatch = resetWatch;
    function updateWatchesTime(watches) {
        for (var a = 0; a < watches.length; a++) {
            var watch = watches[a];
            WATCHES[watch.POSITION].reachedLimit = watch.REACHED_LIMIT;
            WATCHES[watch.POSITION].count = watch.COUNT;
        }
        if (SAVE_ENABLED) {
            saveWatches();
        }
    }
    Data.updateWatchesTime = updateWatchesTime;
    function changeWatchDecimalCases(watch) {
        WATCHES[watch.POSITION].numberDecimalCases = watch.NUMBER_DECIMAL_CASES;
        WATCHES[watch.POSITION].count = watch.COUNT;
        if (SAVE_ENABLED) {
            saveWatches();
        }
    }
    Data.changeWatchDecimalCases = changeWatchDecimalCases;
    function changeWatchEntryText(watch) {
        WATCHES[watch.POSITION].entryValue = watch.getEntryValue();
        if (SAVE_ENABLED) {
            saveWatches();
        }
    }
    Data.changeWatchEntryText = changeWatchEntryText;
})(Data || (Data = {}));
