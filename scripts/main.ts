/// <reference path="../d.ts/jquery.d.ts" />
/// <reference path="../d.ts/jqueryui.d.ts" />

/// <reference path="stopwatch.ts" />
/// <reference path="save_load.ts" />
/// <reference path="menu.ts" />


window.onload = function()
{
Data.load( initApp );
};


function initApp()
{
StopWatch.init();

var loadSuccessful = loadWatches();

    // add some watches if its the first time the program is running
if ( !loadSuccessful )
    {
    new StopWatch( { countUp: true } );
    new StopWatch( { countUp: false } );
    }

Menu.init();
}


window.onkeyup = function( event )
{
var key = event.keyCode;

var watchObject;

    // alt + q: add count up
if ( event.altKey && key == EVENT_KEY.q )
    {
    watchObject = new StopWatch({ countUp: true });

    watchObject.TITLE_ELEMENT.focus();
    }

    // alt + w: add count down
else if ( event.altKey && key == EVENT_KEY.w )
    {
    watchObject = new StopWatch({ countUp: false });

    watchObject.TITLE_ELEMENT.focus();
    }
};
