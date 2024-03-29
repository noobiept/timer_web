/*
 * Keys code for the keyboard events
 */
var EVENT_KEY = {

    backspace  : 8,
    tab        : 9,
    enter      : 13,
    esc        : 27,
    space      : 32,
    end        : 35,
    home       : 36,
    leftArrow  : 37,
    upArrow    : 38,
    rightArrow : 39,
    downArrow  : 40,
    del        : 46,

    "0" : 48,
    "1" : 49,
    "2" : 50,
    "3" : 51,
    "4" : 52,
    "5" : 53,
    "6" : 54,
    "7" : 55,
    "8" : 56,
    "9" : 57,

    a : 65,
    b : 66,
    c : 67,
    d : 68,
    e : 69,
    f : 70,
    g : 71,
    h : 72,
    i : 73,
    j : 74,
    k : 75,
    l : 76,
    m : 77,
    n : 78,
    o : 79,
    p : 80,
    q : 81,
    r : 82,
    s : 83,
    t : 84,
    u : 85,
    v : 86,
    w : 87,
    x : 88,
    y : 89,
    z : 90,

    f1  : 112,
    f2  : 113,
    f3  : 114,
    f4  : 115,
    f5  : 116,
    f6  : 117,
    f7  : 118,
    f8  : 119,
    f9  : 120,
    f10 : 121,
    f11 : 122,
    f12 : 123

};


/*
 * Converts a date (in seconds) to a string (with the number of days/hours...)
 */
function dateToString( dateSeconds: number, decimalCases: number )
{
    // :: Deal with negative numbers :: //

var isNegative = false;

    // if its negative, we turn it positive for now, and then later add a minus sign
if ( dateSeconds < 0 )
    {
    isNegative = true;

    dateSeconds *= -1;
    }

    // :: convert to days/hours :: //

    //in seconds
var minute = 60;
var hour   = 60 * minute;
var day    = 24 * hour;

var minutesLeft = 0;
var hoursLeft = 0;
var daysLeft = 0;
var secondsLeft = 0;


    //count the days
while (dateSeconds >= day)
    {
    daysLeft++;

    dateSeconds -= day;
    }

    //count the hours
while (dateSeconds >= hour)
    {
    hoursLeft++;

    dateSeconds -= hour;
    }

    //count the minutes
while (dateSeconds >= minute)
    {
    minutesLeft++;

    dateSeconds -= minute;
    }

    //and the seconds
secondsLeft = dateSeconds;


    // :: construct the string :: //

var date = '';

    // only show when there's something relevant to be shown
    // (for example: 0 days 2 hours 2 minutes... no point showing the days part)
if ( daysLeft !== 0 )
    {
    var dayStr = 'day';

    if ( daysLeft !== 1 )
        {
        dayStr += 's';
        }

    date += daysLeft + ' ' + dayStr + ' ';
    }


    // same for hours and minutes
if ( hoursLeft !== 0 )
    {
    var hourStr = 'hour';

    if ( hoursLeft !== 1 )
        {
        hourStr += 's';
        }

    date += hoursLeft + ' ' + hourStr + ' ';
    }


if ( minutesLeft !== 0 )
    {
    var minuteStr = 'minute';

    if ( minutesLeft !== 1 )
        {
        minuteStr += 's';
        }

    date += minutesLeft + ' ' + minuteStr + ' ';
    }


var secondStr = 'seconds';

    // always show seconds, even if 0
if ( secondsLeft === 1 )
    {
    secondStr = 'second';
    }

date += secondsLeft.toFixed( decimalCases ) + ' ' + secondStr;

    // add the minus sign
if ( isNegative )
    {
    date = '-' + date;
    }

return date;
}


/*
 * Returns the number of digits in a number
 */
function numberOfDigits( theNumber: number ): number
{
var numberString = theNumber.toString();
var digits = numberString.length;

if ( numberString[0] === '-' )
    {
    digits--;
    }

return digits;
}


/*
 * Arguments:
 *
 *      time (int)    : represents the amount of time, of the type specified
 *      type (string) : a single character (h - hour, m - minute, etc)
 *
 *
 * Returns the time in milliseconds (as an int)
 */
function timeToMilliseconds( time: number, type: string ): number
{
    /*
     * 1 day    -> 24 hours
     * 1 hour   -> 60 minutes
     * 1 minute -> 60 seconds
     * 1 second -> 1000 milliseconds
     *
     * So for example, 1 hour is 60 * 60 * 1000 milliseconds
     */

    //a letter: (s)econd, (m)inute, (h)our, or (d)ay
switch ( type )
    {
    case "s":

        time *= 1000;
        break;

    case "m":

        time *= 60 * 1000;
        break;

    case "h":

        time *= 60 * 60 * 1000;
        break;

    case "d":

        time *= 24 * 60 * 60 * 1000;
        break;
    }

return time;
};


function drawDragHandle( canvas: HTMLCanvasElement )
{
var width = 15;
var height = 20;

canvas.width = width;
canvas.height = height;

var ctx = canvas.getContext( '2d' )!;

ctx.beginPath();

var step = 5;
var radius = 1;

for (let x = 0 ; x < width ; x += step)
    {
    for (let y = 0 ; y < height ; y += step)
        {
        ctx.beginPath();

            // make a circle
        ctx.arc( x + 1, y + 1, radius, 0, Math.PI * 2, true );

        ctx.fill();
        }
    }
}


/*
    Rounds a number to a specified decimal case
 */
function round( num: number, dec: number )
{
return Math.round( num * Math.pow( 10, dec ) ) / Math.pow( 10,dec );
}


/*
    'SomethingLikeThis' into 'Something Like This'
 */
function separateWords( str: string )
{
    // add a space before a capitalized letter
str = str.replace( /([A-Z])/g, ' $1' );

    // remove spaces from the beginning of the string
str = str.replace( /^s*/, '' );

return str;
}


/*
    To know if an html element is in visible by the user currently
 */
function isVisible( element: HTMLElement ): boolean
{
var rect = element.getBoundingClientRect();

if ( rect.top >= 0 &&
     rect.left >= 0 &&
     rect.bottom <= window.innerHeight &&
     rect.right <= window.innerWidth )
    {
    return true;
    }

return false;
}


/**
 * Return a limited/truncated number based on the number of decimal cases.
 */
function limitValue( value: number, decimalCases: number, floor: boolean )
{
var scale = Math.pow( 10, decimalCases );
var limitFunc: (x: number) => number;

if ( floor )
    {
    limitFunc = Math.floor;
    }

else
    {
    limitFunc = Math.ceil;
    }

    // use floor so that it only gets the next value when its there
    // for example we don't want '0.7s' to be seen as '1s'
return limitFunc( value * scale ) / scale;
}
