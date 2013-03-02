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
TWO_DECIMAL_CASE: HTMLDivElement;

WATCH_OBJECT: StopWatch;

constructor( watchObject: StopWatch )
{
this.WATCH_OBJECT = watchObject;

    // :: Decimal Case Option :: //

    // description
var caseDescription = <HTMLDivElement> document.createElement( 'div' );

caseDescription.className = 'Options-description';
caseDescription.innerText = 'Number of decimal cases';

    // :: Zero/One/Two (values)
var zero = <HTMLDivElement> document.createElement( 'div' );

zero.className = 'Options-value';
zero.innerText = 'Zero';
zero.onclick = () =>
    {
    this.selectDecimalCase( 0 );
    };

var one = <HTMLDivElement> document.createElement( 'div' );

one.className = 'Options-value';
one.innerText = 'One';
one.onclick = () =>
    {
    this.selectDecimalCase( 1 );
    };

var two = <HTMLDivElement> document.createElement( 'div' );

two.className = 'Options-value';
two.innerText = 'Two';
two.onclick = () =>
    {
    this.selectDecimalCase( 2 );
    };


this.ZERO_DECIMAL_CASE = zero;
this.ONE_DECIMAL_CASE = one;
this.TWO_DECIMAL_CASE = two;

    // update with the one that is currently selected
this.selectDecimalCase( watchObject.NUMBER_DECIMAL_CASES );


var casesValuesContainer = <HTMLDivElement> document.createElement( 'div' );

casesValuesContainer.className = 'Options-valuesContainer';

casesValuesContainer.appendChild( zero );
casesValuesContainer.appendChild( one );
casesValuesContainer.appendChild( two );

var decimalCaseContainer = <HTMLDivElement> document.createElement( 'div' );

decimalCaseContainer.className = 'Options-container';

decimalCaseContainer.appendChild( caseDescription );
decimalCaseContainer.appendChild( casesValuesContainer );


    // position the popup window left to the openOptions button
var optionsOffset = $( watchObject.OPEN_OPTIONS_ELEMENT ).offset();

    // and on the same level as the title
var titleOffset = $( watchObject.TITLE_ELEMENT ).offset();

new PopupWindow( decimalCaseContainer, optionsOffset.left + 70, titleOffset.top );
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

else if ( newCase == 2 )
    {
    element = this.TWO_DECIMAL_CASE;
    }

    // remove from the old one
$( this.SELECTED_DECIMAL_CASE ).removeClass( 'Options-selected' );

    // and add to the new one
$( element ).addClass( 'Options-selected' );

this.SELECTED_DECIMAL_CASE = element;
}


}
