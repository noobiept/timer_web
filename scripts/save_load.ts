
interface SaveStopWatch
    {
    title: string;
    baseCssClass: string;
    count: number;
    running: bool;
    started: bool;
    numberDecimalCases: number;
    entryValue: string;    // for CountDown only (null for the other type)
    countUp: bool;
    }


function save()
{
var all = StopWatch.ALL_STOPWATCHES;
var watch: StopWatch;

var saveAll = [];
var saveWatch: SaveStopWatch;

var entryValue;

for (var i = 0 ; i < all.length ; i++)
    {
    watch = all[ i ];
    
    entryValue = null;

    if ( watch.ENTRY_ELEMENT )
        {
        entryValue = watch.ENTRY_ELEMENT.value;
        }

    saveWatch = {
        title: watch.getTitle(),
        baseCssClass: watch.BASE_CSS_CLASS,
        count: watch.COUNT,
        running: watch.RUNNING,
        started: watch.STARTED,
        numberDecimalCases: watch.NUMBER_DECIMAL_CASES,
        entryValue: entryValue,
        countUp: watch.COUNT_UP
        };

    saveAll.push( saveWatch );
    }

localStorage.setObject( 'watches', saveAll );
}


/*
    Returns true/false depending on whether the load was successful
 */

function load(): bool
{
var all: SaveStopWatch[] = localStorage.getObject( 'watches' );

if ( !all )
    {
    return false;
    }

var saveWatch: SaveStopWatch;

var watch: StopWatch;

for (var i = 0 ; i < all.length ; i++)
    {
    saveWatch = all[ i ]; 

    watch = new StopWatch( saveWatch.countUp, saveWatch.baseCssClass );

    watch.setTitle( saveWatch.title );

        // if its of the type count down, update the entry's value
    if ( !saveWatch.countUp )
        {
        watch.ENTRY_ELEMENT.value = saveWatch.entryValue;
        }

    watch.changeNumberDecimalCases( saveWatch.numberDecimalCases );
    watch.STARTED = saveWatch.started;

    watch.updateWatch( saveWatch.count );

    if ( saveWatch.running )
        {
        watch.startTimer();
        }

    watch.updateStartStopButtonValue();
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
