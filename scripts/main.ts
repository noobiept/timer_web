/*
    to doo:

        - adicionar publicidade
        - por tb no site
        - em vez de ter o tipo de timer separado (coluna esquerda/direita), simplesmente adicionar um timer e poder alterar o tipo, e dar o drag/drop em toda a zona
        
            https://github.com/McPants/jquery.shapeshift

        - retirar os mooar, e ter no menu em cima butoes para adicionar o watch (countdown e countup). ter este menu sempre visivel (mm k se faca scroll)
        - ter opcao no watch para alterar o seu tipo

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

var addCountUp = <HTMLDivElement> document.querySelector( '#CountUp-add' );

addCountUp.onclick = function()
    {
    new StopWatch( { countUp: true, baseCssClass: 'CountUp' } );
    };


var addCountDown = <HTMLDivElement> document.querySelector( '#CountDown-add' );

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

    // alt + u: add count up
if ( event.altKey && key == EVENT_KEY.q )
    {
    new StopWatch({ countUp: true, baseCssClass: 'CountUp' });
    }

    // alt + d: add count down
else if ( event.altKey && key == EVENT_KEY.w )
    {
    new StopWatch({ countUp: false, baseCssClass: 'CountDown' });
    }
};