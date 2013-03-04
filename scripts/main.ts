/*
    to doo:

        - adicionar publicidade
        - por tb no site

        - drag handler desalinhado no portatil..

        - the height of the #Menu has to be calculated according to the font-size of the text (try options->font size->med/large)
        - and dragHandler being unaligned is probably related?..

        - ctrl + enter no title para adicionar novo watch?..

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

    // alt + q: add count up
if ( event.altKey && key == EVENT_KEY.q )
    {
    new StopWatch({ countUp: true, baseCssClass: 'CountUp' });
    }

    // alt + w: add count down
else if ( event.altKey && key == EVENT_KEY.w )
    {
    new StopWatch({ countUp: false, baseCssClass: 'CountDown' });
    }
};
