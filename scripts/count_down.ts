/// <reference path="utilities.ts" />

module CountDown
{ 

var COUNT = 0;
var COUNT_ELEMENT: HTMLInputElement;

var INTERVAL_F;

export function init()
{
COUNT_ELEMENT = <HTMLInputElement> document.querySelector( "#CountDown-count" );


var entry = <HTMLInputElement> document.querySelector( "#CountDown-entry" );

var start = <HTMLInputElement> document.querySelector( "#CountDown-start" );

start.onclick = function()
    {
    COUNT_ELEMENT.innerText = entry.value;

    COUNT = stringToMilliseconds( entry.value );

    startTimer();
    };

var stop = <HTMLInputElement> document.querySelector( "#CountDown-stop" );


stop.onclick = function()
    {
    stopTimer();
    };
}


function startTimer()
{
window.clearInterval( INTERVAL_F );

INTERVAL_F = window.setInterval( tick, 1000 );
}


function stopTimer()
{
window.clearInterval( INTERVAL_F );
}


function stringToMilliseconds( entryValue )
{
//HERE
return entryValue * 1000;
}


function tick()
{
COUNT -= 1000;

COUNT_ELEMENT.innerText = dateToString( COUNT );
}

}