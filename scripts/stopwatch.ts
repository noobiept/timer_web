/// <reference path="utilities.ts" />

class StopWatch
{ 
    // private properties
private COUNT: number = 0;
private COUNT_ELEMENT: HTMLDivElement;

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
var title = <HTMLHeadingElement> document.createElement( 'h2' );

title.className = 'StopWatch-title';
title.contentEditable = 'true';
title.innerText = 'Stop Watch Title';

var count = <HTMLDivElement> document.createElement( 'div' );

count.className = 'StopWatch-count';

this.COUNT_ELEMENT = count;

var startStop = <HTMLInputElement> document.createElement( 'input' );

startStop.className = 'StopWatch-startStop';
startStop.type = 'button';
startStop.value = 'Start';

var restart = <HTMLInputElement> document.createElement( 'input' );

restart.className = 'StopWatch-restart';
restart.type = 'button';
restart.value = 'Restart';

var reset = <HTMLInputElement> document.createElement( 'input' );

reset.className = 'StopWatch-reset';
reset.type = 'button';
reset.value = 'Reset';


var container = <HTMLDivElement> document.createElement( 'div' );

container.className = 'StopWatch-container';

container.appendChild( title );
container.appendChild( count );
container.appendChild( startStop );
container.appendChild( restart );
container.appendChild( reset );

var watchMainContainer = <HTMLDivElement> document.querySelector( '#StopWatch' );

watchMainContainer.insertBefore( container, StopWatch.ADD_MORE_ELEMENT );

this.updateWatch( 0 );

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

    this.updateWatch( 0 );

    this.startTimer();
    };


reset.onclick = () =>
    {
    this.stopTimer();

    startStop.value = "Start";

    this.updateWatch( 0 );
    };
}



/*
    Updates the watch current number
 */

updateWatch( count: number )
{
this.COUNT = count;

this.COUNT_ELEMENT.innerText = dateToString( count );
}



startTimer()
{
this.RUNNING = true;

window.clearInterval( this.INTERVAL_F );

this.INTERVAL_F = window.setInterval(() => {
    this.tick(); } , 1000 );
}


stopTimer()
{
this.RUNNING = false;

window.clearInterval( this.INTERVAL_F );
}





tick()
{ 
this.updateWatch( this.COUNT + 1000 );
}

}