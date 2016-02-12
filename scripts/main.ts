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

var loadSuccessful = load( data[ 'timer_watches' ], data[ 'timer_options' ] );

    // add some watches if its the first time the program is running
if ( !loadSuccessful )
    {
    new StopWatch( { countUp: true, baseCssClass:  'CountUp' } );
    new StopWatch( { countUp: false, baseCssClass:  'CountDown' } );
    }

Menu.init();
}


    // 'on before unload' instead of 'on unload' so that in the server version, when refreshing (F5)
    // the logout gets called first, than the load of the new page (otherwise, the new load will have the previous data)
window.onbeforeunload = function()
{
save();
};



window.onkeyup = function( event )
{
var key = event.keyCode;

var watchObject;

    // alt + q: add count up
if ( event.altKey && key == EVENT_KEY.q )
    {
    watchObject = new StopWatch({ countUp: true, baseCssClass: 'CountUp' });

    watchObject.TITLE_ELEMENT.focus();
    }

    // alt + w: add count down
else if ( event.altKey && key == EVENT_KEY.w )
    {
    watchObject = new StopWatch({ countUp: false, baseCssClass: 'CountDown' });

    watchObject.TITLE_ELEMENT.focus();
    }
};
