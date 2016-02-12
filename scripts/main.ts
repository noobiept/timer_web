/// <reference path="../d.ts/jquery.d.ts" />
/// <reference path="../d.ts/jqueryui.d.ts" />

/// <reference path="stopwatch.ts" />
/// <reference path="save_load.ts" />
/// <reference path="menu.ts" />


var OPTIONS: OptionsData = {
    sound: true     // whether we play a sound when a countdown ends or not
    };


interface Data {
    timer_watches: WatchData[];
    timer_options: OptionsData;
}


window.onload = function()
{
AppStorage.getData( [ 'timer_watches', 'timer_options' ], initApp );
};


function initApp( data: Data )
{
StopWatch.init();

loadOptions( data[ 'timer_options' ] );
var loadSuccessful = loadWatches( data[ 'timer_watches' ] );

    // add some watches if its the first time the program is running
if ( !loadSuccessful )
    {
    new StopWatch( { countUp: true } );
    new StopWatch( { countUp: false } );
    }

Menu.init();
}


    // 'on before unload' instead of 'on unload' so that in the server version, when refreshing (F5)
    // the logout gets called first, than the load of the new page (otherwise, the new load will have the previous data)
if ( !(window.chrome && window.chrome.storage) )
    {
    window.onbeforeunload = function()
        {
        saveWatches();
        };
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
