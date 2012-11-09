function dateToString(dateMilliseconds) {
    var second = 1000;
    var minute = 60 * second;
    var hour = 60 * minute;
    var day = 24 * hour;
    var minutesLeft = 0;
    var hoursLeft = 0;
    var daysLeft = 0;
    var secondsLeft = 0;
    while(dateMilliseconds > day) {
        daysLeft++;
        dateMilliseconds -= day;
    }
    while(dateMilliseconds > hour) {
        hoursLeft++;
        dateMilliseconds -= hour;
    }
    while(dateMilliseconds > minute) {
        minutesLeft++;
        dateMilliseconds -= minute;
    }
    secondsLeft = dateMilliseconds / 1000;
    var theDate = [
        [
            "day", 
            daysLeft
        ], 
        [
            "hour", 
            hoursLeft
        ], 
        [
            "minute", 
            minutesLeft
        ], 
        [
            "second", 
            secondsLeft
        ]
    ];
    var constructDate = function (dateTmp, numberOf) {
        if(numberOf !== 1) {
            dateTmp += "s";
        }
        return numberOf + " " + dateTmp + " ";
    };
    var totalUnits = 2;
    var date = "";
    var i;
    for(i = 0; i < theDate.length; i++) {
        if(totalUnits === 0) {
            break;
        }
        if(theDate[i][1] !== 0) {
            date += constructDate(theDate[i][0], theDate[i][1]);
            totalUnits--;
        }
    }
    if(date == "") {
        date = "0 seconds";
    }
    return date;
}
