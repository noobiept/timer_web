/// <reference path="popup_window.ts" />


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
POPUP_WINDOW_OBJECT: PopupWindow;


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

var decimalCaseContainer = <HTMLDivElement> document.createElement( 'div' );

decimalCaseContainer.className = 'Options-container';

decimalCaseContainer.appendChild( caseDescription );
decimalCaseContainer.appendChild( casesValuesContainer );


    // position the popup window left to the openOptions button
var optionsOffset = $( watchObject.OPEN_OPTIONS_ELEMENT ).offset();

    // and on the same level as the title
var titleOffset = $( watchObject.TITLE_ELEMENT ).offset();

this.POPUP_WINDOW_OBJECT = new PopupWindow({

    content  : decimalCaseContainer,
    x        : optionsOffset.left + 70,
    y        : titleOffset.top,
    onRemove : onRemove
    });

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
this.POPUP_WINDOW_OBJECT.remove();
}

}
