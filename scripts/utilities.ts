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