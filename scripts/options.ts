/*
    Deals with the options window for the timers
 */
class Options
{
    // current decimal case element that is selected
SELECTED_DECIMAL_CASE: HTMLDivElement;

    // points to the elements
ZERO_DECIMAL_CASE: HTMLDivElement;
ONE_DECIMAL_CASE: HTMLDivElement;

WATCH_OBJECT: StopWatch;
CONTAINER_ELEMENT: HTMLDivElement;

ON_REMOVE: () => any;


/*
    Arguments:

        watchObject : the object of the stop watch this belongs to
        onRemove    : a function to be called when the window is closed
 */
constructor( watchObject: StopWatch, onRemove?: () => any )
    {
    this.WATCH_OBJECT = watchObject;

        // :: Decimal Case Option :: //

        // description
    var caseDescription = <HTMLDivElement> document.createElement( 'div' );

    caseDescription.className = 'Options-description';
    $( caseDescription ).text( 'Number of decimal cases' );

        // :: Zero/One/Two (values)
    var zero = <HTMLDivElement> document.createElement( 'div' );

    zero.className = 'Options-value';
    $( zero ).text( 'Zero' );
    zero.onclick = () =>
        {
        this.selectDecimalCase( 0 );
        };

    var one = <HTMLDivElement> document.createElement( 'div' );

    one.className = 'Options-value';
    $( one ).text( 'One' );
    one.onclick = () =>
        {
        this.selectDecimalCase( 1 );
        };

    this.ZERO_DECIMAL_CASE = zero;
    this.ONE_DECIMAL_CASE = one;

        // update with the one that is currently selected
    this.selectDecimalCase( watchObject.NUMBER_DECIMAL_CASES );

    var casesValuesContainer = <HTMLDivElement> document.createElement( 'div' );

    casesValuesContainer.className = 'Options-valuesContainer';

    casesValuesContainer.appendChild( zero );
    casesValuesContainer.appendChild( one );

    var container = <HTMLDivElement> document.createElement( 'div' );
    container.className = 'Options-container';

        // close button
    var close = <HTMLCanvasElement> document.createElement('canvas');

    close.className = 'Options-close';

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
    container.appendChild( caseDescription );
    container.appendChild( casesValuesContainer );
    container.appendChild( close );

    watchObject.CONTAINER_ELEMENT.appendChild( container );

    this.CONTAINER_ELEMENT = container;
    this.ON_REMOVE = onRemove;

    return this;
    }


/*
    Adds the css class to the selected element, and deals with changing the decimal cases
 */
selectDecimalCase( newCase: number )
    {
        // on load of the options window, we don't need to call this, but since the case hasn't changed it won't do anything
    this.WATCH_OBJECT.changeNumberDecimalCases( newCase );

    var element;

    if ( newCase == 0 )
        {
        element = this.ZERO_DECIMAL_CASE;
        }

    else if ( newCase == 1 )
        {
        element = this.ONE_DECIMAL_CASE;
        }

        // remove from the old one
    $( this.SELECTED_DECIMAL_CASE ).removeClass( 'Options-selected' );

        // and add to the new one
    $( element ).addClass( 'Options-selected' );

    this.SELECTED_DECIMAL_CASE = element;
    }


/*
    Remove/close the options window
 */
remove()
    {
    this.CONTAINER_ELEMENT.parentElement.removeChild( this.CONTAINER_ELEMENT );

    if ( this.ON_REMOVE )
        {
        this.ON_REMOVE();
        }
    }
}
