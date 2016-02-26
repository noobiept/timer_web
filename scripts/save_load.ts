

function getSaveData()
{
    // :: Save Watches :: //

    // get the watchObject of both watches types (we're getting them from the DOM instead of directly from the StopWatch.ALL_STOPWATCHES because of the drag and drop, which can change the order)
var all = [];
var i;

var mainContainer = StopWatch.MAIN_CONTAINER;
var node;

for (i = 0 ; i < mainContainer.childNodes.length ; i++)
    {
    node = mainContainer.childNodes[ i ];

    if ( node.tagName == 'DIV' )
        {
        all.push( mainContainer.childNodes[ i ].watchObject );
        }
    }


var saveAll = [];
var saveWatch: WatchData;

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

return {
        timer_watches: saveAll
    };
}


/*
    Returns true/false depending on whether the load was successful
 */
function loadWatches(): boolean
{
var watches = Data.getWatches();

if ( !watches )
    {
    return false;
    }

for (var i = 0 ; i < watches.length ; i++)
    {
    new StopWatch( watches[ i ] );
    }

return true;
}
