/*
 * Converts a date (in milliseconds) to a string (with the number of days/hours...)
 */

function dateToString( dateMilliseconds: number )
{
    // :: convert to days/hours :: //

    //in milliseconds
var second = 1000;
var minute = 60 * second; 
var hour   = 60 * minute;
var day    = 24 * hour;

var minutesLeft = 0;
var hoursLeft = 0;
var daysLeft = 0;
var secondsLeft = 0;


    //count the days
while (dateMilliseconds > day)
    {
    daysLeft++;

    dateMilliseconds -= day;
    }

    //count the hours
while (dateMilliseconds > hour)
    {
    hoursLeft++;
    
    dateMilliseconds -= hour;
    }
    
    //count the minutes
while (dateMilliseconds > minute)
    {
    minutesLeft++;
    
    dateMilliseconds -= minute;
    }

    //and the seconds
secondsLeft = dateMilliseconds / 1000;


    // :: construct the string :: //

var theDate = [ ["day", daysLeft], ["hour", hoursLeft], ["minute", minutesLeft], ["second", secondsLeft] ];

var constructDate = function(dateTmp, numberOf)
    {
        // day to days, hour to hours...
    if (numberOf !== 1)
        {
        dateTmp += "s";
        }   
    
    return numberOf + " " + dateTmp + " ";
    };

    // limit the number of units to be shown (days/hours, or hours/minutes or minutes/seconds, and not days/hours/minutes for example)
var totalUnits = 2;

var date = "";


var i;

for (i = 0 ; i < theDate.length ; i++)
    {
        // reached the limit of the units
    if (totalUnits === 0)
        {
        break;
        }
        
        // only show when there's something relevant to be shown 
        // (for example: 0 days 2 hours 2 minutes... no point showing the days part)
    if ( theDate[ i ][ 1 ] !== 0 )
        {
        date += constructDate( theDate[ i ][ 0 ], theDate[ i ][ 1 ] );
        
        totalUnits--;    
        }
    }


    // special case when we have 0 seconds
if ( date == "" )
    {
    date = "0 seconds";
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

    //it shouldn't have negative numbers?... //HERE
if (numberString[0] === '-')
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



function drawRemoveButton( canvas: HTMLCanvasElement )
{
canvas.width = 15;
canvas.height = 15;

var ctx = canvas.getContext( '2d' );

ctx.beginPath();

ctx.moveTo( 2, 2 );
ctx.lineTo( 13, 13 );
ctx.moveTo( 2, 13 );
ctx.lineTo( 13, 2 );

ctx.stroke();
}