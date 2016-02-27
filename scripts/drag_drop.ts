class DragDrop
{
    //has the object of the element that is been dragged
static CurrentDragElement: StopWatch = null;

dragHandler: HTMLElement;
dragElement: HTMLElement;
element: StopWatch;


constructor( dragElement: HTMLElement, dragHandler: HTMLElement, element: StopWatch )
    {
    var dragObject = this;

    dragElement.addEventListener( 'dragstart', function(event) { dragObject.onDragStart(event); }, false );
    dragElement.addEventListener( 'drop'     , function(event) { dragObject.onDrop(event);      }, false );
    dragElement.addEventListener( 'dragover' , function(event) { dragObject.onDragOver(event);  }, false );
    dragElement.addEventListener( 'dragleave', function(event) { dragObject.onDragLeave(event); }, false );

        //the drag handler
    $( dragHandler ).attr( 'draggable', 'true' );

    this.dragHandler = dragHandler;
    this.dragElement = dragElement;
    this.element = element;
    }


/**
 * Checks if its a valid drop place, for the element you're dragging
 */
isValidDrop()
    {
        //see if we're not dropping on the same place
    if ( DragDrop.CurrentDragElement !== this.element )
        {
        return true;
        }

    return false;
    }


/**
 * when the drag of an element starts
 */
onDragStart( event )
    {
    var dataTransfer = event.dataTransfer;
    dataTransfer.setData( "text", "" );   // required on some browsers
    dataTransfer.effectAllowed = 'move';

        //so that the image that is shown during the drag, is of the element, and not the drag handle
    if ( dataTransfer.setDragImage )
        {
        dataTransfer.setDragImage( this.dragElement, 0, 0 );
        }

        //the element that is been dragged
    DragDrop.CurrentDragElement = this.element;
    event.stopPropagation();
    }


/**
 * when an element is dropped over a valid place, we have to switch the positions between the element that is was
 *      been dragged, and the element where the drop occurred
 */
onDrop( event )
    {
        //remove the css effect for valid drop places
    this.dragElement.classList.remove( 'validDrop' );

        //the element of where we drop the drag one
    var elementObject = this.element;

        //what we're dragging
    var dragObject = DragDrop.CurrentDragElement;

        //see if we're not dropping on the same place
    if ( dragObject !== elementObject )
        {
        dragObject.moveTo( elementObject.POSITION );
        }

    DragDrop.CurrentDragElement = null;

    event.stopPropagation();
    return false;
    }


/**
 * Allows or not the drop to occur
 */
onDragOver( event )
    {
        //if this is a valid drop, let it be possible to occur
    if ( this.isValidDrop() === true )
        {
            //add the css effect for valid drop places (this is also added in the onDragEnter, but having it here helps)
        this.dragElement.classList.add( 'validDrop' );

            //to allow the drop to occur
        event.preventDefault();

            //cancel as-well when its a valid drop
        event.stopPropagation();
        return false;
        }

    event.stopPropagation();
    return true;
    }


/**
 * Remove the effect of a valid drop place
 */
onDragLeave( event )
    {
    if ( this.isValidDrop() === true )
        {
            //remove the css effect for valid drop places
        this.dragElement.classList.remove( 'validDrop' );
        }

    event.stopPropagation();
    }
}
