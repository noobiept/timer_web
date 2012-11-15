/*
    to doo:

        - count down tem uma entry para por o numero inicial, e dps quando acabar tem uma mensagem, e conta o tempo desde k ja acabou 

        - dateToString() doesn't work with negative numbers (in CountDown, when it passes the limit, its just seconds)
        - use jqueryui's Position to position the reachedLimitMessage element

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
    new StopWatch( { countUp: true, baseCssClass: 'StopWatch' } );
    };


var addCountDown = <HTMLDivElement> document.querySelector( '#CountDown-add' );

addCountDown.onclick = function()
    {
    new StopWatch( { countUp: false, baseCssClass: 'CountDown' } );
    }


var loadSuccessful = load();

    // add some watches if its the first time the program is running
if ( !loadSuccessful )
    {
    new StopWatch( { countUp: true, baseCssClass:  'StopWatch' } );
    new StopWatch( { countUp: false, baseCssClass:  'CountDown' } );
    }
};


window.onunload = function()
{
save();
};