/*
    to doo:

        - adicionar publicidade
        - por tb no site

        - ctrl + enter no title para adicionar novo watch?..


        - its redundant to have different css classes for both types of watches (ends up selecting both everytime), simplify that
 */

/*
    Dependencies:

        - jquery
            - jqueryui:
                - position
                - sortable

            - div placeholder - https://github.com/sprucemedia/jQuery.divPlaceholder.js

    Bell Sound:

        http://www.freesound.org/people/dADDoiT/sounds/57070/   (Creative Commons 0 License)
        

 */

/// <reference path="../d.ts/jquery-1.8.d.ts" />
/// <reference path="../d.ts/jqueryui-1.9.d.ts" />

/// <reference path="stopwatch.ts" />
/// <reference path="save_load.ts" />
/// <reference path="menu.ts" />


var OPTIONS = {
    sound: true     // whether we play a sound when a countdown ends or not
    };


window.onload = function()
{
StopWatch.init();

var loadSuccessful = load();


    // add some watches if its the first time the program is running
if ( !loadSuccessful )
    {
    new StopWatch( { countUp: true, baseCssClass:  'CountUp' } );
    new StopWatch( { countUp: false, baseCssClass:  'CountDown' } );
    }



Menu.init();
};


window.onunload = function()
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
