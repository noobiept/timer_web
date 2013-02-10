/*
    to doo:

        - adicionar publicidade
        - por tb no site
        - click to edit: retirar o texto quando se clica.. e se n se escrever nada, voltar a por o 'click to edit'


 */

/*
    Dependencies:

        - jquery
        - jqueryui:
            - position
            - sortable

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


window.onload = function 
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