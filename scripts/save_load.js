function save() {
    var all = StopWatch.ALL_STOPWATCHES;
    var watch;
    var saveAll = [];
    var saveWatch;
    var entryValue;
    for(var i = 0; i < all.length; i++) {
        watch = all[i];
        entryValue = null;
        if(watch.ENTRY_ELEMENT) {
            entryValue = watch.ENTRY_ELEMENT.value;
        }
        saveWatch = {
            title: watch.getTitle(),
            baseCssClass: watch.BASE_CSS_CLASS,
            count: watch.COUNT,
            running: watch.RUNNING,
            started: watch.STARTED,
            numberDecimalCases: watch.NUMBER_DECIMAL_CASES,
            entryValue: entryValue,
            initValueCountDown: watch.INIT_VALUE_COUNTDOWN,
            countUp: watch.COUNT_UP,
            reachedLimit: watch.REACHED_LIMIT
        };
        saveAll.push(saveWatch);
    }
    localStorage.setObject('watches', saveAll);
}
function load() {
    var all = localStorage.getObject('watches');
    if(!all) {
        return false;
    }
    var saveWatch;
    var watch;
    for(var i = 0; i < all.length; i++) {
        saveWatch = all[i];
        watch = new StopWatch(saveWatch);
    }
    return true;
}
Storage.prototype.setObject = function (key, value) {
    this.setItem(key, JSON.stringify(value));
};
Storage.prototype.getObject = function (key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
};
