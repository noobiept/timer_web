

class Message
{

PARENT_ELEMENT: HTMLElement;
MESSAGE_ELEMENT: HTMLDivElement;

constructor( parent: HTMLElement, text: string, positionOptions: JQueryPositionOptions, timeout?: number )
{
var message = <HTMLDivElement> document.createElement( 'div' );

message.className = 'Message';
message.innerText = text;

parent.appendChild( message );

$( message ).position( positionOptions );

this.PARENT_ELEMENT = parent;
this.MESSAGE_ELEMENT = message;

if ( $.isNumeric( timeout ) && timeout > 0 )
    {
    window.setTimeout( () => { this.remove(); }, timeout );
    }
}


remove()
{
this.PARENT_ELEMENT.removeChild( this.MESSAGE_ELEMENT );
}

}