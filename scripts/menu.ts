/// <reference path="main.ts" />

module Menu
{ 
var SOUND_ELEMENT: HTMLSpanElement;


export function init()
{ 
var sound = <HTMLDivElement> document.querySelector( '#sound' );
SOUND_ELEMENT = <HTMLSpanElement> document.querySelector( '#soundState' );

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
    };

setSound( OPTIONS.sound );
}


export function setSound( onOff ) 
{
if ( onOff === true )
    {
    OPTIONS.sound = true;

    SOUND_ELEMENT.innerHTML = 'On';
    }

else
    {
    OPTIONS.sound = false;

    SOUND_ELEMENT.innerHTML = 'Off';
    }
}




}