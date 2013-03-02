

function save()
{
    // :: Save Watches :: //

    // get the watchObject of both watches types (we're getting them from the DOM instead of directly from the StopWatch.ALL_STOPWATCHES because of the drag and drop, which can change the order)
var all = [];
var i;

var mainContainer = StopWatch.MAIN_CONTAINER;

for (i = 0 ; i < mainContainer.childNodes.length ; i++)
    {
    all.push( mainContainer.childNodes[ i ].watchObject );
    }


var saveAll = [];
var saveWatch: StopWatchArguments;

var entryValue;
var watch: StopWatch;

for (i = 0 ; i < all.length ; i++)
    {
    watch = all[ i ];
    
    entryValue = null;

    if ( watch.ENTRY_ELEMENT )
        {
        entryValue = watch.ENTRY_ELEMENT.value;
        }

    saveWatch = {
        title              : watch.getTitle(),
        baseCssClass       : watch.BASE_CSS_CLASS,
        count              : watch.COUNT,
        running            : watch.RUNNING,
        started            : watch.STARTED,
        numberDecimalCases : watch.NUMBER_DECIMAL_CASES,
        entryValue         : entryValue,
        initValueCountDown : watch.INIT_VALUE_COUNTDOWN,
        countUp            : watch.COUNT_UP,
        reachedLimit       : watch.REACHED_LIMIT
        };

    saveAll.push( saveWatch );
    }

localStorage.setObject( 'watches', saveAll );

    // :: Save Options :: //

localStorage.setObject( 'options', OPTIONS );
}


/*
    Returns true/false depending on whether the load was successful
 */

function load(): bool
{
    // load the watches
var all: StopWatchArguments[] = localStorage.getObject( 'watches' );

if ( !all )
    {
    return false;
    }

var saveWatch: StopWatchArguments;

var watch: StopWatch;

for (var i = 0 ; i < all.length ; i++)
    {
    saveWatch = all[ i ]; 

    watch = new StopWatch( saveWatch );
    }


    // load the options

var options = localStorage.getObject( 'options' );

if ( options )
    {
    if ( typeof options.sound === 'boolean' )
        {
        OPTIONS.sound = options.sound;
        }
    }

return true;
}




/*
 * Converts an object to string, and saves it in storage
 *
 * usage:
 *      localStorage.setObject( "...", { ... } );
 */

Storage.prototype.setObject = function( key, value )
{
this.setItem( key, JSON.stringify( value ) );
};


/*
 * Returns null if it doesn't find, otherwise returns the string correspondent
 */

Storage.prototype.getObject = function( key )
{
var value = this.getItem( key );

return value && JSON.parse( value );
};
