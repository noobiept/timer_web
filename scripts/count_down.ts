/// <reference path="utilities.ts" />

module CountDown
{ 

    // counts the number of milliseconds left in the watch
var COUNT = 0;
var COUNT_ELEMENT: HTMLInputElement;

var INTERVAL_F: number;

var RUNNING = false;

var ENTRY_ELEMENT: HTMLInputElement;


function startTimer()
{
RUNNING = true;

window.clearInterval( INTERVAL_F );

INTERVAL_F = window.setInterval( tick, 1000 );
}


function stopTimer()
{
RUNNING = false;

window.clearInterval( INTERVAL_F );
}


export function init()
{
COUNT_ELEMENT = <HTMLInputElement> document.querySelector( ".CountDown-count" );


ENTRY_ELEMENT = <HTMLInputElement> document.querySelector( ".CountDown-entry" );

var startStop = <HTMLInputElement> document.querySelector( ".CountDown-startStop" );
var restart = <HTMLInputElement> document.querySelector( '.CountDown-restart' );
var reset = <HTMLInputElement> document.querySelector( '.CountDown-reset' );


updateWatchFromEntry();

startStop.onclick = function()
    {
        // start the watch
    if ( !RUNNING )
        {
        startTimer();

        startStop.value = 'Stop';
        }

        // stop the watch
    else
        {
        stopTimer();

        startStop.value = 'Continue';
        }  
    };


restart.onclick = function()
    {
    startStop.value = 'Stop';

    updateWatchFromEntry();

    startTimer();
    };


reset.onclick = function()
    {
    stopTimer();

    startStop.value = 'Start';

    updateWatchFromEntry();
    };
}


function updateWatchFromEntry()
{
try
    {
    var value = stringToMilliseconds( ENTRY_ELEMENT.value );
    }
    
catch( error )
    { 
    //HERE show a message
    console.log( error );
    return;
    }

updateWatch( value );
}



function stringToMilliseconds( entryValue: string ): number
{
/*
 * 
 * search for a number with at least one digit, then possibly a space and a letter
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


var matches = pattern.exec( entryValue );    

    //the number of milliseconds, to add to the current date
    //  for example, if the string is "in 20h 3m", then number will have 20 hours and 3 minutes converted in milliseconds
var milliseconds = 0;

var foundPattern = false;
var temp;

    //deal with 'pattern' - one at the time (for example 20h 3m, cycle goes two times)
    //sum everything into 'number' (in milliseconds)
while ( matches !== null )
    {
    foundPattern = true;
        
    temp = parseInt( matches[0], 10 );
    
        //see if it has more than 3 digits the number
    if ( numberOfDigits( temp ) > 3 )
        {
        throw "Max. 3 digits for each number";
        }
        
    milliseconds += timeToMilliseconds( temp, matches[1] );
    
    matches = pattern.exec( entryValue );
    }


if ( !foundPattern )
    {
    throw "Didn't found the pattern";
    }


return milliseconds;
}


function updateWatch( count: number )
{
COUNT = count;

COUNT_ELEMENT.innerText = dateToString( COUNT );
}


function tick()
{
updateWatch( COUNT - 1000 );
}

}