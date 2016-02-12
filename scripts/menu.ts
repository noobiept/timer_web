/// <reference path="main.ts" />

module Menu
{ 
var SOUND_ELEMENT: HTMLSpanElement;


export function init()
{
    // setup the add watches buttons
var watchObject;

var addCountUp = <HTMLDivElement> document.querySelector( '#Menu-addCountUp' );

addCountUp.onclick = function()
    {
    watchObject = new StopWatch( { countUp: true } );


    if ( isVisible( watchObject.CONTAINER_ELEMENT ) )
        {
        watchObject.TITLE_ELEMENT.focus();
        }

    else
        {
            // scroll to the added element
        $( document.body ).animate(
            {
                // properties to animate
            'scrollTop': $( watchObject.CONTAINER_ELEMENT ).offset().top
            },
            200,    // duration
            function()  // on complete
                {
                watchObject.TITLE_ELEMENT.focus();
                }
            );
        }
    };


var addCountDown = <HTMLDivElement> document.querySelector( '#Menu-addCountDown' );

addCountDown.onclick = function()
    {
    watchObject = new StopWatch( { countUp: false } );

    if ( isVisible( watchObject.CONTAINER_ELEMENT ) )
        {
        watchObject.TITLE_ELEMENT.focus();
        }

    else
        {
            // scroll to the added element
        $( document.body ).animate(
            {
                // properties to animate
            'scrollTop': $( watchObject.CONTAINER_ELEMENT ).offset().top
            },
            200,    // duration
            function()  // on complete
                {
                watchObject.TITLE_ELEMENT.focus();
                }
            );
        }
    };


var sound = <HTMLDivElement> document.querySelector( '#Menu-sound' );
SOUND_ELEMENT = <HTMLSpanElement> document.querySelector( '#Menu-soundState' );

sound.onclick = function()
    {
    if ( OPTIONS.sound )
        {
        setSound( false );
        }

    else
        {
        setSound( true );
        }

    saveOptions();
    };

setSound( OPTIONS.sound );


    // :: Position correctly the menu elements :: //

    // get height of one of the menu entries
var menuEntryHeight = $( addCountUp ).outerHeight();

    // there's 4 pixels between the top of the menu and top of the entry, and 4 pixels difference at the bottom too
var menuHeight = menuEntryHeight + 8;

    // we do this because the font-size can be changed in the browser's options for example, which breaks the alignment
$( '#Menu' ).css( 'height', menuHeight + 'px' );
}


export function setSound( onOff ) 
{
if ( onOff === true )
    {
    OPTIONS.sound = true;

    $( SOUND_ELEMENT ).text( 'On' );
    }

else
    {
    OPTIONS.sound = false;

    $( SOUND_ELEMENT ).text( 'Off' );
    }
}



}
