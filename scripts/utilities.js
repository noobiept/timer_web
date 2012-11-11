var EVENT_KEY = {
    backspace: 8,
    tab: 9,
    enter: 13,
    esc: 27,
    space: 32,
    end: 35,
    home: 36,
    leftArrow: 37,
    upArrow: 38,
    rightArrow: 39,
    downArrow: 40,
    del: 46,
    "0": 48,
    "1": 49,
    "2": 50,
    "3": 51,
    "4": 52,
    "5": 53,
    "6": 54,
    "7": 55,
    "8": 56,
    "9": 57,
    a: 65,
    b: 66,
    c: 67,
    d: 68,
    e: 69,
    f: 70,
    g: 71,
    h: 72,
    i: 73,
    j: 74,
    k: 75,
    l: 76,
    m: 77,
    n: 78,
    o: 79,
    p: 80,
    q: 81,
    r: 82,
    s: 83,
    t: 84,
    u: 85,
    v: 86,
    w: 87,
    x: 88,
    y: 89,
    z: 90,
    f1: 112,
    f2: 113,
    f3: 114,
    f4: 115,
    f5: 116,
    f6: 117,
    f7: 118,
    f8: 119,
    f9: 120,
    f10: 121,
    f11: 122,
    f12: 123
};
function dateToString(dateMilliseconds, forceDecimalCases) {
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
    var date = '';
    if(daysLeft !== 0) {
        var dayStr = 'day';
        if(daysLeft !== 1) {
            dayStr += 's';
        }
        date += daysLeft + ' ' + dayStr + ' ';
    }
    if(hoursLeft !== 0) {
        var hourStr = 'hour';
        if(hoursLeft !== 1) {
            hourStr += 's';
        }
        date += hoursLeft + ' ' + hourStr + ' ';
    }
    if(minutesLeft !== 0) {
        var minuteStr = 'minute';
        if(minutesLeft !== 1) {
            minuteStr += 's';
        }
        date += minutesLeft + ' ' + minuteStr + ' ';
    }
    var secondStr = 'second';
    if(secondsLeft !== 1) {
        secondStr += 's';
    }
    var secondsLeftStr;
    if($.isNumeric(forceDecimalCases) && forceDecimalCases >= 0) {
        secondsLeftStr = secondsLeft.toFixed(forceDecimalCases);
    } else {
        secondsLeftStr = secondsLeft.toString();
    }
    date += secondsLeftStr + ' ' + secondStr;
    return date;
}
function numberOfDigits(theNumber) {
    var numberString = theNumber.toString();
    var digits = numberString.length;
    if(numberString[0] === '-') {
        digits--;
    }
    return digits;
}
function timeToMilliseconds(time, type) {
    switch(type) {
        case "s": {
            time *= 1000;
            break;

        }
        case "m": {
            time *= 60 * 1000;
            break;

        }
        case "h": {
            time *= 60 * 60 * 1000;
            break;

        }
        case "d": {
            time *= 24 * 60 * 60 * 1000;
            break;

        }
    }
    return time;
}
; ;
function drawRemoveButton(canvas) {
    canvas.width = 15;
    canvas.height = 15;
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(2, 2);
    ctx.lineTo(13, 13);
    ctx.moveTo(2, 13);
    ctx.lineTo(13, 2);
    ctx.stroke();
}
function round(num, dec) {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
}
