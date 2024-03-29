module Data
{
    // define the data interfaces used by the application
export interface DataOptions {
    sound: boolean;
}

var OPTIONS: DataOptions = {
    sound: true     // whether we play a sound when a countdown ends or not
    };

var WATCHES: WatchData[] = [];


    // we can temporarily disable saving to the storage on every change
    // useful when we're making lots of changes in one go
    // will have to save manually at the end (can happen in the undo/redo for example)
    // don't forget to enable again
var SAVE_ENABLED = true;


export function saveToStorage( yesNo: boolean )
    {
    SAVE_ENABLED = yesNo;
    }


export function load( callback: () => any )
    {
    AppStorage.getData( [ 'timer_watches', 'timer_options' ], function( data )
        {
        var options = data[ 'timer_options' ];
        var watches = data[ 'timer_watches' ];

        if ( options )
            {
            if ( typeof options.sound === 'boolean' )
                {
                OPTIONS.sound = options.sound;
                }
            }

        if ( watches )
            {
            WATCHES = watches;
            }

        callback();
        });
    }


function saveOptions()
    {
    AppStorage.setData({ timer_options: OPTIONS });
    }


function saveWatches()
    {
    AppStorage.setData({ timer_watches: WATCHES });
    }


export function getSound()
    {
    return OPTIONS.sound;
    }


export function setSound( value: boolean )
    {
    OPTIONS.sound = value;

    if ( SAVE_ENABLED )
        {
        saveOptions();
        }
    }


export function getWatches()
    {
    return WATCHES;
    }


export function newWatch( watch: StopWatch )
    {
    WATCHES.splice( watch.POSITION, 0, {
            title              : watch.getTitle(),
            count              : watch.COUNT,
            running            : watch.RUNNING,
            started            : watch.STARTED,
            numberDecimalCases : watch.NUMBER_DECIMAL_CASES,
            entryValue         : watch.getEntryValue(),
            initValueCountDown : watch.INIT_VALUE_COUNTDOWN,
            countUp            : watch.COUNT_UP,
            reachedLimit       : watch.REACHED_LIMIT
        });

    if ( SAVE_ENABLED )
        {
        saveWatches();
        }
    }


export function removeWatch( watch: StopWatch )
    {
    WATCHES.splice( watch.POSITION, 1 );

    if ( SAVE_ENABLED )
        {
        saveWatches();
        }
    }


export function changeTitle( watch: StopWatch )
    {
    WATCHES[ watch.POSITION ].title = watch.getTitle();

    if ( SAVE_ENABLED )
        {
        saveWatches();
        }
    }


export function changePosition( watch: StopWatch, previousPosition: number )
    {
    var data = WATCHES.splice( previousPosition, 1 )[ 0 ];
    WATCHES.splice( watch.POSITION, 0, data );

    if ( SAVE_ENABLED )
        {
        saveWatches();
        }
    }


export function startWatch( watch: StopWatch )
    {
    WATCHES[ watch.POSITION ].started = watch.STARTED;
    WATCHES[ watch.POSITION ].running = watch.RUNNING;

    if ( SAVE_ENABLED )
        {
        saveWatches();
        }
    }


export function stopWatch( watch: StopWatch )
    {
    WATCHES[ watch.POSITION ].started = watch.STARTED;
    WATCHES[ watch.POSITION ].running = watch.RUNNING;

    if ( SAVE_ENABLED )
        {
        saveWatches();
        }
    }


export function restartWatch( watch: StopWatch )
    {
    WATCHES[ watch.POSITION ].started = watch.STARTED;
    WATCHES[ watch.POSITION ].running = watch.RUNNING;
    WATCHES[ watch.POSITION ].reachedLimit = watch.REACHED_LIMIT;
    WATCHES[ watch.POSITION ].count = watch.COUNT;
    WATCHES[ watch.POSITION ].initValueCountDown = watch.INIT_VALUE_COUNTDOWN;

    if ( SAVE_ENABLED )
        {
        saveWatches();
        }
    }


export function resetWatch( watch: StopWatch )
    {
    WATCHES[ watch.POSITION ].started = watch.STARTED;
    WATCHES[ watch.POSITION ].running = watch.RUNNING;
    WATCHES[ watch.POSITION ].reachedLimit = watch.REACHED_LIMIT;
    WATCHES[ watch.POSITION ].count = watch.COUNT;
    WATCHES[ watch.POSITION ].initValueCountDown = watch.INIT_VALUE_COUNTDOWN;

    if ( SAVE_ENABLED )
        {
        saveWatches();
        }
    }


export function updateWatchesTime( watches: StopWatch[] )
    {
    for (var a = 0 ; a < watches.length ; a++)
        {
        var watch = watches[ a ];

        WATCHES[ watch.POSITION ].reachedLimit = watch.REACHED_LIMIT;
        WATCHES[ watch.POSITION ].count = watch.COUNT;
        }

    if ( SAVE_ENABLED )
        {
        saveWatches();
        }
    }


export function changeWatchDecimalCases( watch: StopWatch )
    {
    WATCHES[ watch.POSITION ].numberDecimalCases = watch.NUMBER_DECIMAL_CASES;
    WATCHES[ watch.POSITION ].count = watch.COUNT;

    if ( SAVE_ENABLED )
        {
        saveWatches();
        }
    }


export function changeWatchEntryText( watch: StopWatch )
    {
    WATCHES[ watch.POSITION ].entryValue = watch.getEntryValue();

    if ( SAVE_ENABLED )
        {
        saveWatches();
        }
    }
}
