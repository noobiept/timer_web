/*
    to doo:


 */

/*
    Dependencies:

        - jquery
        - jqueryui:
            - position

 */

/// <reference path="../d.ts/jquery-1.8.d.ts" />
/// <reference path="../d.ts/jqueryui-1.9.d.ts" />

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