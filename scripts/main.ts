/*
    Ideias:

        - do a stopwatch (count up and count down)
        - timer countdown
        - alarm clock

        - world clocks (around the world... be able to set -- see the current time there, with the summer/winter time too, maybe check an external website, or calculate it)

( new Date().toUTCString() )

        - count down tem uma entry para por o numero inicial, e dps quando acabar tem uma mensagem, e conta o tempo desde k ja acabou 

    to doo:

        - gravar na localStorage os titulos/timers adicionados etc

        - option to specify if we count 1, 2, 3, 4, ...
            or 1.0, 1.1, 1.2, 1.3, 1.4, ...
            or 1.00, 1.01, 1.02, 1.03, 1.04, ... 

 */

/// <reference path="../d.ts/jquery-1.8.d.ts" />

/// <reference path="stopwatch.ts" />
/// <reference path="save_load.ts" />


window.onload = function 
{
var addStopWatch = <HTMLDivElement> document.querySelector( '#StopWatch-add' );

addStopWatch.onclick = function()
    {
    new StopWatch( true, 'StopWatch' );
    };


var addCountDown = <HTMLDivElement> document.querySelector( '#CountDown-add' );

addCountDown.onclick = function()
    {
    new StopWatch( false, 'CountDown' );
    }


var loadSuccessful = load();

    // add some watches if its the first time the program is running
if ( !loadSuccessful )
    {
    new StopWatch( true, 'StopWatch' );
    new StopWatch( false, 'CountDown' );
    }
};


window.onunload = function()
{
save();
};