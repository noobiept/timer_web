/*
    to doo:

        - adicionar publicidade
        - por tb no site

        - https://github.com/McPants/jquery.shapeshift

        - drag handler desalinhado no portatil..

        - quando se adiciona um watch, fazer foco no que foi adicionado (scroll ate ser visivel)

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


    // setup the buttons events

var addCountUp = <HTMLDivElement> document.querySelector( '#Menu-addCountUp' );

addCountUp.onclick = function()
    {
    new StopWatch( { countUp: true, baseCssClass: 'CountUp' } );
    };


var addCountDown = <HTMLDivElement> document.querySelector( '#Menu-addCountDown' );

addCountDown.onclick = function()
    {
    new StopWatch( { countUp: false, baseCssClass: 'CountDown' } );
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
