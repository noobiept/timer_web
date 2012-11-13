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
            countUp: watch.COUNT_UP
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
        watch = new StopWatch(saveWatch.countUp, saveWatch.baseCssClass);
        watch.setTitle(saveWatch.title);
        if(!saveWatch.countUp) {
            watch.ENTRY_ELEMENT.value = saveWatch.entryValue;
        }
        watch.changeNumberDecimalCases(saveWatch.numberDecimalCases);
        watch.STARTED = saveWatch.started;
        watch.updateWatch(saveWatch.count);
        if(saveWatch.running) {
            watch.startTimer();
        }
        watch.updateStartStopButtonValue();
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
