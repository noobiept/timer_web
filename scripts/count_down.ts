/// <reference path="utilities.ts" />

class CountDown
{ 

    // counts the number of milliseconds left in the watch
private COUNT: number = 0;
private COUNT_ELEMENT: HTMLDivElement;

private INTERVAL_F: number;

private RUNNING: bool = false;

private ENTRY_ELEMENT: HTMLInputElement;

private static ADD_MORE_ELEMENT: HTMLDivElement;

static init()
{
var addMore = <HTMLDivElement> document.querySelector( '#CountDown-add' );

addMore.onclick = function()
    {
    new CountDown();
    };

CountDown.ADD_MORE_ELEMENT = addMore;
}


constructor()
{
    // :: Title :: //

var title = <HTMLHeadingElement> document.createElement( 'h2' );

title.className = 'CountDown-title';
title.contentEditable = 'true';
title.innerText = 'Count Down Title';

    // :: Count Element :: //

var countElement = <HTMLDivElement> document.createElement( 'div' );

countElement.className = 'CountDown-count';

this.COUNT_ELEMENT = countElement;

    // :: Start/Stop :: //

var startStop = <HTMLInputElement> document.createElement( 'input' );

startStop.className = 'CountDown-startStop';
startStop.type = 'button';
startStop.value = 'Start';

    // :: Restart :: //

var restart = <HTMLInputElement> document.createElement( 'input' );

restart.className = 'CountDown-restart';
restart.type = 'button';
restart.value = 'Restart';

    // :: Reset :: //

var reset = <HTMLInputElement> document.createElement( 'input' );

reset.className = 'CountDown-reset';
reset.type = 'button';
reset.value = 'Reset';

    // :: Entry :: //

var entry = <HTMLInputElement> document.createElement( 'input' );

entry.className = 'CountDown-entry';
entry.type = 'text';
entry.value = '10s';

this.ENTRY_ELEMENT = entry;

    // :: Container :: //

var container = <HTMLDivElement> document.createElement( 'div' );

container.className = 'CountDown-container';

container.appendChild( title );
container.appendChild( countElement );
container.appendChild( startStop );
container.appendChild( restart );
container.appendChild( reset );
container.appendChild( entry );

var countDownContainer = <HTMLDivElement> document.querySelector( '#CountDown' );

countDownContainer.insertBefore( container, CountDown.ADD_MORE_ELEMENT );

    // :: Set Events :: //

this.updateWatchFromEntry();

startStop.onclick = () =>
    {
        // start the watch
    if ( !this.RUNNING )
        {
        this.startTimer();

        startStop.value = 'Stop';
        }

        // stop the watch
    else
        {
        this.stopTimer();

        startStop.value = 'Continue';
        }  
    };


restart.onclick = () =>
    {
    startStop.value = 'Stop';

    this.updateWatchFromEntry();

    this.startTimer();
    };


reset.onclick = () =>
    {
    this.stopTimer();

    startStop.value = 'Start';

    this.updateWatchFromEntry();
    };
}


startTimer()
{
this.RUNNING = true;

window.clearInterval( this.INTERVAL_F );

this.INTERVAL_F = window.setInterval( () => { this.tick(); }, 1000 );
}


stopTimer()
{
this.RUNNING = false;

window.clearInterval( this.INTERVAL_F );
}



updateWatchFromEntry()
{
try
    {
    var value = this.stringToMilliseconds( this.ENTRY_ELEMENT.value );
    }
    
catch( error )
    { 
    //HERE show a message
    console.log( error );
    return;
    }

this.updateWatch( value );
}



stringToMilliseconds( entryValue: string ): number
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


updateWatch( count: number )
{
this.COUNT = count;

this.COUNT_ELEMENT.innerText = dateToString( this.COUNT );
}


tick()
{
this.updateWatch( this.COUNT - 1000 );
}

}