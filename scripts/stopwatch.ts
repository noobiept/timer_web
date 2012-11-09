/// <reference path="utilities.ts" />

module StopWatch
{ 

var COUNT = 0;
var COUNT_ELEMENT: HTMLDivElement;


var INTERVAL_F: number;

    // tells when the stop watch is running or not
var RUNNING = false;

/*
    Updates the watch current number
 */

function updateWatch( count: number )
{
COUNT = count;

COUNT_ELEMENT.innerText = dateToString( count );
}



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
var startStop = <HTMLInputElement> document.querySelector(".StopWatch-startStop");
var restart = <HTMLInputElement> document.querySelector(".StopWatch-restart");
var reset = <HTMLInputElement> document.querySelector( ".StopWatch-reset" );

COUNT_ELEMENT = <HTMLDivElement> document.querySelector(".StopWatch-count");


updateWatch( 0 );

startStop.onclick = function()
    {
        // start the watch
    if ( !RUNNING )
        {
        startTimer();
   
        startStop.value = "Stop";
        }

        // stop the watch
    else
        {
        stopTimer();

        startStop.value = "Continue";
        }
    };


restart.onclick = function()
    {
    startStop.value = 'Stop';

    updateWatch( 0 );

    startTimer();
    };


reset.onclick = function()
    {
    stopTimer();

    startStop.value = "Start";

    updateWatch( 0 );
    };
}




function tick()
{ 
updateWatch( COUNT + 1000 );
}

}