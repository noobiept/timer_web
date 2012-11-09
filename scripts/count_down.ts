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
COUNT_ELEMENT = <HTMLInputElement> document.querySelector( "#CountDown-count" );


ENTRY_ELEMENT = <HTMLInputElement> document.querySelector( "#CountDown-entry" );

var startStop = <HTMLInputElement> document.querySelector( "#CountDown-startStop" );
var restart = <HTMLInputElement> document.querySelector( '#CountDown-restart' );
var reset = <HTMLInputElement> document.querySelector( '#CountDown-reset' );


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
var value = parseInt( ENTRY_ELEMENT.value );

    // seconds to milliseconds ?
value *= 1000;

updateWatch( value );
}



function stringToMilliseconds( entryValue )
{
//HERE
return entryValue * 1000;
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