
"use strict";

/// <reference path="utilities.ts" />

class PopupWindow
{

CONTAINER_ELEMENT: HTMLDivElement;

KEY_DOWN_F: ( event: KeyboardEvent ) => any;

/*
    Arguments:
        content (html element): the content of the window
        x (int) : x position
        y (int) : y position
        afterAppend_f (function) : function to be called after the elements are appended to the DOM

 */

constructor( content: HTMLElement, x: number, y: number, afterAppend_f?: () => any )
{
var container = <HTMLDivElement> document.createElement('div');

container.className = 'PopupWindow-container';


this.CONTAINER_ELEMENT = container;

    // close button

var close = <HTMLCanvasElement> document.createElement('canvas');

close.className = 'PopupWindow-close';

close.title = 'Close Window';
close.width = 15;
close.height = 15;

var ctx = close.getContext('2d');

ctx.strokeStyle = 'rgb(46, 144, 189)';
ctx.lineWidth = 2;

ctx.moveTo(1, 1);
ctx.lineTo(14, 14);

ctx.moveTo(14, 1);
ctx.lineTo(1, 14);

ctx.stroke();


close.onclick = () =>
    {
    this.remove();
    };


    // append stuff

container.appendChild( close );
container.appendChild( content );
      
    // position the element

$( container ).css('left', x + 'px');
$( container ).css('top', y + 'px');

document.body.appendChild( container );


this.KEY_DOWN_F = ( event ) =>
    {
    this.keyboardEvents( event );
    };



$( window ).bind( 'keyup', this.KEY_DOWN_F );


if (typeof afterAppend_f !== 'undefined' && afterAppend_f !== null)
    {
    afterAppend_f();
    }
}


remove()
{
document.body.removeChild( this.CONTAINER_ELEMENT );

//$( window ).unbind('keyup', this.keyDown_f);
window.removeEventListener( 'keyup', this.KEY_DOWN_F );
};


keyboardEvents = function( event: KeyboardEvent )
{
var key = event.keyCode;

if (key === EVENT_KEY.esc)
    {
    this.remove();
    }
};

}