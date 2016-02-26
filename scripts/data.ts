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


export function getOption( key: string )
    {
    return OPTIONS[ key ];
    }


export function setOption( key: string, value: any )
    {
    OPTIONS[ key ] = value;

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
    var data: WatchData = {
        title              : watch.getTitle(),
        count              : watch.COUNT,
        running            : watch.RUNNING,
        started            : watch.STARTED,
        numberDecimalCases : watch.NUMBER_DECIMAL_CASES,
        entryValue         : watch.getEntryValue(),
        initValueCountDown : watch.INIT_VALUE_COUNTDOWN,
        countUp            : watch.COUNT_UP,
        reachedLimit       : watch.REACHED_LIMIT
        };

    WATCHES.splice( watch.POSITION, 0, data );

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


export function changeTitle( watch: StopWatch, text: string )
    {
    WATCHES[ watch.POSITION ].title = text;

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
}
