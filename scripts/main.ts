/*
    Ideias:

        - do a stopwatch (count up and count down)
        - timer countdown
        - alarm clock

        - world clocks (around the world... be able to set -- see the current time there, with the summer/winter time too, maybe check an external website, or calculate it)

( new Date().toUTCString() )

        - count down tem uma entry para por o numero inicial, e dps quando acabar tem uma mensagem, e conta o tempo desde k ja acabou 

    to doo:

        ~- ter um background-color diferente caso o relogio esteja inactivo, activo mas parado, activo a funcionar, e qd ja passou o limite (no countDown)


 */

/*
    Dependencies:

        - jquery

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