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

var optionsDecimalCase = <HTMLDivElement> document.createElement( 'div' );

optionsDecimalCase.className = 'Options-decimalCase';


    // Title 

var caseTitle = document.createElement( 'div' );

caseTitle.className = 'Options-decimalCase-title';
caseTitle.innerText = 'Number of decimal cases';

    // :: Zero/One/Two


var zero = <HTMLDivElement> document.createElement( 'div' );

zero.className = 'Options-decimalCase-value';
zero.innerText = 'Zero';
zero.onclick = () =>
    {
    this.selectDecimalCase( 0 );
    };

var one = <HTMLDivElement> document.createElement( 'div' );

one.className = 'Options-decimalCase-value';
one.innerText = 'One';
one.onclick = () =>
    {
    this.selectDecimalCase( 1 );
    };

var two = <HTMLDivElement> document.createElement( 'div' );

two.className = 'Options-decimalCase-value';
two.innerText = 'Two';
two.onclick = () =>
    {
    this.selectDecimalCase( 2 );
    };


this.ZERO_DECIMAL_CASE = zero;
this.ONE_DECIMAL_CASE = one;
this.TWO_DECIMAL_CASE = two;

    // update with the one that is currently selected
this.selectDecimalCase( watchObject.NUMBER_DECIMAL_CASES, true );


var casesContainer = document.createElement( 'div' );

casesContainer.className = 'Options-decimalCase-container';

casesContainer.appendChild( zero );
casesContainer.appendChild( one );
casesContainer.appendChild( two );

optionsDecimalCase.appendChild( caseTitle );
optionsDecimalCase.appendChild( casesContainer );


    // position the popup window left to the openOptions button
var optionsOffset = $( watchObject.OPEN_OPTIONS_ELEMENT ).offset();

    // and on the same level as the title
var titleOffset = $( watchObject.TITLE_ELEMENT ).offset();

new PopupWindow( optionsDecimalCase, optionsOffset.left + 70, titleOffset.top ); 

}

/*
    Adds the css class to the selected element, and deals with changing the decimal cases

    On load, just update the css class
 */

selectDecimalCase( newCase: number, load?: bool )
{
if ( typeof load == 'undefined' )
    {
    load = false;
    }


    // when we select a option in the window, we update the object too. When the window is first opened just update the css
if ( load == false )
    {
    this.WATCH_OBJECT.changeNumberDecimalCases( newCase );
    }

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
$( this.SELECTED_DECIMAL_CASE ).removeClass( 'Options-decimalCase-selected' );

    // and add to the new one
$( element ).addClass( 'Options-decimalCase-selected' );

this.SELECTED_DECIMAL_CASE = element;
}


}