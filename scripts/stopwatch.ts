/// <reference path="utilities.ts" />
/// <reference path="popup_window.ts" />

class StopWatch
{ 
    // private properties
private COUNT: number = 0;

private NUMBER_DECIMAL_CASES: number = 0;

    // number of milliseconds between each tick
private TIMER_INTERVAL: number = 1000;

private COUNT_ELEMENT: HTMLDivElement;
private START_STOP_ELEMENT: HTMLInputElement;
private CONTAINER_ELEMENT: HTMLDivElement;

private INTERVAL_F: number;

    // tells when the stop watch is running or not
private RUNNING = false;

private static ADD_MORE_ELEMENT: HTMLDivElement;


static init()
{ 
var addMore = <HTMLDivElement> document.querySelector( '#StopWatch-add' );

addMore.onclick = function()
    {
    new StopWatch();
    };

StopWatch.ADD_MORE_ELEMENT = addMore;
}

constructor()
{
    // :: Title :: //

var title = <HTMLHeadingElement> document.createElement( 'h2' );

title.className = 'StopWatch-title';
title.contentEditable = 'true';
title.innerText = 'Stop Watch Title';

    // :: Count Element :: //

var count = <HTMLDivElement> document.createElement( 'div' );

count.className = 'StopWatch-count';

    // :: Start/Stop :: //

var startStop = <HTMLInputElement> document.createElement( 'input' );

startStop.className = 'StopWatch-startStop';
startStop.type = 'button';
startStop.value = 'Start';

    // :: Restart :: //

var restart = <HTMLInputElement> document.createElement( 'input' );

restart.className = 'StopWatch-restart';
restart.type = 'button';
restart.value = 'Restart';

    // :: Reset :: //

var reset = <HTMLInputElement> document.createElement( 'input' );

reset.className = 'StopWatch-reset';
reset.type = 'button';
reset.value = 'Reset';

    // :: Open Options :: //

var options = <HTMLInputElement> document.createElement( 'input' );

options.className = 'StopWatch-openOptions';
options.type = 'button';
options.value = 'Options';

    // :: Remove Button :: //

var remove = <HTMLCanvasElement> document.createElement( 'canvas' );

remove.className = 'StopWatch-remove';

drawRemoveButton( remove );


    // :: Container :: //

var container = <HTMLDivElement> document.createElement( 'div' );

container.className = 'StopWatch-container';

container.appendChild( title );
container.appendChild( count );
container.appendChild( startStop );
container.appendChild( restart );
container.appendChild( reset );
container.appendChild( remove );
container.appendChild( options );

var watchMainContainer = <HTMLDivElement> document.querySelector( '#StopWatch' );

watchMainContainer.insertBefore( container, StopWatch.ADD_MORE_ELEMENT );

    // :: Set Events :: //

startStop.onclick = () =>
    {
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
    startStop.value = 'Stop';

    this.updateWatch( this.getInitialValue() );

    this.startTimer();
    };


reset.onclick = () =>
    {
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


    // :: save references to the html elements :: //

this.COUNT_ELEMENT = count;
this.START_STOP_ELEMENT = startStop;
this.CONTAINER_ELEMENT = container;

    // :: Update the watch :: //

this.updateWatch( this.getInitialValue() );
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
return 0;
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

options.appendChild( roundedCases );
options.appendChild( zero );
options.appendChild( one );

    //HERE use jqueryui position 
new PopupWindow( options, 200, 200 ); 
}


changeNumberDecimalCases( num )
{
if ( num < 0 || num > 3 )
    {
    return;
    }

this.NUMBER_DECIMAL_CASES = num;

this.TIMER_INTERVAL = 1000 / Math.pow( 10, num );

this.START_STOP_ELEMENT.value = 'Stop';

    // round the COUNT to zero decimal case (if you change from 1 decimal case to 0 for example, the count could be 2.3, and then would continue 3.3, 4.3, etc.. 
var rounded = this.COUNT / 1000;    // change milliseconds to seconds, to be able to round

    // round the number to the lowest integer that is close
rounded = Math.floor( rounded );

this.COUNT = rounded * 1000;    // and back to milliseconds

this.startTimer();
}


remove()
{
var mainContainer = <HTMLDivElement> document.querySelector( '#StopWatch' );


mainContainer.removeChild( this.CONTAINER_ELEMENT );
}



tick()
{ 
this.updateWatch( this.COUNT + this.TIMER_INTERVAL );
}

}