/// <reference path="utilities.ts" />
/// <reference path="popup_window.ts" />

class StopWatch
{ 
    // private properties
COUNT: number = 0;

COUNT_UP: bool;
BASE_CSS_CLASS: string;

NUMBER_DECIMAL_CASES: number = 0;

    // number of milliseconds between each tick
TIMER_INTERVAL: number = 1000;

TITLE_ELEMENT: HTMLHeadingElement;
COUNT_ELEMENT: HTMLDivElement;
START_STOP_ELEMENT: HTMLInputElement;
RESTART_ELEMENT: HTMLInputElement;
RESET_ELEMENT: HTMLInputElement;
OPEN_OPTIONS_ELEMENT: HTMLInputElement;
REMOVE_ELEMENT: HTMLCanvasElement;
ENTRY_ELEMENT: HTMLInputElement;    // for count down mode only
CONTAINER_ELEMENT: HTMLDivElement;

INTERVAL_F: number;

    // tells when the stop watch is running or not
RUNNING = false;
    
    // tells if a clock has started (different than running, in the sense that it can be started and then paused, and restarted, which is different than being in its initial state)
STARTED = false;

    // contains all the stopwatches created
static ALL_STOPWATCHES = [];
    

constructor( countUp: bool, baseCssClass: string )
{
this.COUNT_UP = countUp;
this.BASE_CSS_CLASS = baseCssClass;

    // :: Title :: //

var title = <HTMLHeadingElement> document.createElement( 'h2' );

title.className = baseCssClass + '-title';
title.contentEditable = 'true';
title.innerText = separateWords( baseCssClass ) + ' Title';

    // :: Count Element :: //

var count = <HTMLDivElement> document.createElement( 'div' );

count.className = baseCssClass + '-count';

    // :: Start/Stop :: //

var startStop = <HTMLInputElement> document.createElement( 'input' );

startStop.className = baseCssClass + '-startStop';
startStop.type = 'button';
startStop.value = 'Start';

    // :: Restart :: //

var restart = <HTMLInputElement> document.createElement( 'input' );

restart.className = baseCssClass + '-restart';
restart.type = 'button';
restart.value = 'Restart';

    // :: Reset :: //

var reset = <HTMLInputElement> document.createElement( 'input' );

reset.className = baseCssClass + '-reset';
reset.type = 'button';
reset.value = 'Reset';

    // :: Open Options :: //

var options = <HTMLInputElement> document.createElement( 'input' );

options.className = baseCssClass + '-openOptions';
options.type = 'button';
options.value = 'Options';

    // :: Remove Button :: //

var remove = <HTMLCanvasElement> document.createElement( 'canvas' );

remove.className = baseCssClass + '-remove';

drawRemoveButton( remove );

    // :: Entry :: //

var entry = null;

    // when count down mode, add an entry to set the starting time
if ( countUp === false )
    {
    entry = <HTMLInputElement> document.createElement( 'input' );

    entry.className = baseCssClass + '-entry';
    entry.type = 'text';
    entry.value = '10s';
    }


    // :: Container :: //

var container = <HTMLDivElement> document.createElement( 'div' );

container.className = baseCssClass + '-container';

container.appendChild( title );
container.appendChild( count );
container.appendChild( startStop );
container.appendChild( restart );
container.appendChild( reset );
container.appendChild( remove );
container.appendChild( options );

if ( !countUp )
    {
    container.appendChild( entry );
    }


var watchMainContainer = <HTMLDivElement> document.querySelector( '#' + baseCssClass + '-mainContainer' );

watchMainContainer.appendChild( container );

    // :: Set Events :: //

startStop.onclick = () =>
    {
    this.STARTED = true;

        // start the watch
    if ( !this.RUNNING )
        {
        this.startTimer();
   
        startStop.value = "Stop";
        }

        // stop the watch
    else
        {
        this.stopTimer();

        startStop.value = "Continue";
        }
    };


restart.onclick = () =>
    {
    this.STARTED = true;

    startStop.value = 'Stop';

    this.updateWatch( this.getInitialValue() );

    this.startTimer();
    };


reset.onclick = () =>
    {
    this.STARTED = false;

    this.stopTimer();

    startStop.value = "Start";

    this.updateWatch( this.getInitialValue() );
    };


options.onclick = () =>
    {
    this.openOptions();
    };


remove.onclick = () =>
    {
    this.remove();
    };


if ( !countUp )
    {
    entry.onkeypress = ( event ) =>
        {
        var key = event.which;

            // start or restart the watch
        if ( key == EVENT_KEY.enter )
            {
                //HERE same as when pressing the restart button
            startStop.value = 'Stop';

            this.updateWatch( this.getInitialValue() );

            this.startTimer();
            }
        };
    }


    // :: save references to the html elements :: //

this.TITLE_ELEMENT = title;
this.COUNT_ELEMENT = count;
this.START_STOP_ELEMENT = startStop;
this.RESTART_ELEMENT = restart;
this.RESET_ELEMENT = reset;
this.OPEN_OPTIONS_ELEMENT = options;
this.REMOVE_ELEMENT = remove;
this.ENTRY_ELEMENT = entry;
this.CONTAINER_ELEMENT = container;



    // :: Update the watch :: //

this.updateWatch( this.getInitialValue() );


StopWatch.ALL_STOPWATCHES.push( this );
}



/*
    Updates the watch current number
 */

updateWatch( count: number )
{
this.COUNT = count;

this.COUNT_ELEMENT.innerText = dateToString( count, this.NUMBER_DECIMAL_CASES );
}


/*
    The initial value of the stopwatch when it is reset/restart/etc
 */

getInitialValue(): number
{
    // when counting up, start from 0
var value = 0;

    // when counting down, go get the value from the entry
if ( !this.COUNT_UP )
    {
    try
        {
        value = this.stringToMilliseconds( this.ENTRY_ELEMENT.value );
        }
    
    catch( error )
        { 
        //HERE show a message
        console.log( error );
        return;
        }
    }

return value;
}


startTimer()
{
this.RUNNING = true;

window.clearInterval( this.INTERVAL_F );

this.INTERVAL_F = window.setInterval(() => {
    this.tick(); } , this.TIMER_INTERVAL );
}


stopTimer()
{
this.RUNNING = false;

window.clearInterval( this.INTERVAL_F );
}


openOptions()
{
var options = <HTMLDivElement> document.createElement( 'div' );

var roundedCases = document.createElement( 'div' );

roundedCases.innerText = 'Number of decimal cases';

var zero = document.createElement( 'div' );

zero.innerText = 'Zero';
zero.onclick = () =>
    {
    this.changeNumberDecimalCases( 0 );
    };

var one = document.createElement( 'div' );

one.innerText = 'One';
one.onclick = () =>
    {
    this.changeNumberDecimalCases( 1 );
    };

var two = document.createElement( 'div' );

two.innerText = 'Two';
two.onclick = () =>
    {
    this.changeNumberDecimalCases( 2 );
    };

options.appendChild( roundedCases );
options.appendChild( zero );
options.appendChild( one );
options.appendChild( two );

    // position the popup window left to the openOptions button
var offset = $( this.OPEN_OPTIONS_ELEMENT ).offset();

new PopupWindow( options, offset.left + 70, offset.top ); 
}


changeNumberDecimalCases( num )
{
if ( num < 0 || num > 3 )
    {
    return;
    }

this.NUMBER_DECIMAL_CASES = num;

this.TIMER_INTERVAL = 1000 / Math.pow( 10, num );


    // round the COUNT to zero decimal case (if you change from 1 decimal case to 0 for example, the count could be 2.3, and then would continue 3.3, 4.3, etc.. 
    // change milliseconds to seconds, to be able to round
var rounded = this.COUNT / 1000;    


    // round the number to the lowest integer that is close
rounded = Math.floor( rounded );

this.COUNT = rounded * 1000;    // and back to milliseconds


this.updateWatch( this.COUNT );

    // we have to reset the timer to have the changes take effect, but if the watch isn't running, we have to stop it
if ( this.RUNNING )
    {
    this.startTimer();
    }

else
    {
    this.startTimer();

        // just to make the change have effect
    this.stopTimer();
    }
}


remove()
{
    // remove the reference
var position = StopWatch.ALL_STOPWATCHES.indexOf( this );

StopWatch.ALL_STOPWATCHES.splice( position, 1 );

    // remove from the DOM
var mainContainer = <HTMLDivElement> document.querySelector( '#' + this.BASE_CSS_CLASS + '-mainContainer' );

mainContainer.removeChild( this.CONTAINER_ELEMENT );
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


/*
    Possible values:

        - Start    
        - Stop
        - Continue
 */

updateStartStopButtonValue()
{
if ( !this.STARTED )
    {
    this.START_STOP_ELEMENT.value = 'Start';
    }

else if ( this.RUNNING )
    {
    this.START_STOP_ELEMENT.value = 'Stop';
    }

else
    {
    this.START_STOP_ELEMENT.value = 'Continue';
    }
}



getTitle(): string
{
return this.TITLE_ELEMENT.innerText;
}


setTitle( newTitle: string )
{
this.TITLE_ELEMENT.innerText = newTitle;
}


tick()
{
var nextCount; 

if ( this.COUNT_UP )
    {
    nextCount = this.COUNT + this.TIMER_INTERVAL;
    }

else
    {
    nextCount = this.COUNT - this.TIMER_INTERVAL;
    }
this.updateWatch( nextCount );
}

}