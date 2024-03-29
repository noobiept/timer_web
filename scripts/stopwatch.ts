interface WatchData
    {
        // required
    countUp      : boolean;

        // optional arguments
    started    ? : boolean;
    running    ? : boolean;
    count      ? : number;
    title      ? : string;
    entryValue ? : string;  // for CountDown only (null for the other type)
    initValueCountDown ? : number;   // for CountDown only
    reachedLimit       ? : boolean;
    numberDecimalCases ? : number;
    }


class StopWatch
{
    // private properties
COUNT: number = 0;
COUNT_UP: boolean;
REACHED_LIMIT = false;
NUMBER_DECIMAL_CASES: number = 0;

private TITLE_ELEMENT: HTMLDivElement;
private COUNT_ELEMENT: HTMLSpanElement;
private COUNT_MESSAGE_ELEMENT: HTMLSpanElement;
private START_STOP_ELEMENT: HTMLInputElement;
CONTAINER_ELEMENT: HTMLDivElement;

    // for CountDown mode only
private ENTRY_ELEMENT: HTMLInputElement | null;
INIT_VALUE_COUNTDOWN: number = StopWatch.DEFAULT_COUNT_DOWN_VALUE;    // the value which is set (where it started to count down)

private ENTRY_MESSAGE_ELEMENT: HTMLSpanElement | null;
private ENTRY_MESSAGE_TIMEOUT_F: number;    // reference to the window.setTimeout(), to be able to cancel it if necessary

private OPTIONS_WINDOW: Options | null = null;

    // tells when the stop watch is running or not
RUNNING = false;

    // tells when we're still on the constructor
private LOADING: boolean;

    // tells if a clock has started (different than running, in the sense that it can be started and then paused, and restarted, which is different than being in its initial state)
STARTED = false;
POSITION: number;   // order position (within the main container)
private DRAG_DROP: DragDrop;

    // default value when a new timer is added (or when an error occurs)
private static DEFAULT_STOP_WATCH_VALUE = 0;
private static DEFAULT_COUNT_DOWN_VALUE = 10000;    // 10s

    // contains all the stopwatches created
private static ALL_STOPWATCHES: StopWatch[] = [];
private static ACTIVE_WATCHES: StopWatch[] = [];
private static MAIN_CONTAINER: HTMLElement;
private static TIMER_INTERVAL = 100;    // 0.1 seconds

private static WORKER = new Worker( 'web_workers/stopwatch_worker.js' );
private static SOUND: Sound;


/*
    Has to be called before constructing any objects
 */
static init()
    {
    StopWatch.MAIN_CONTAINER = <HTMLElement> document.querySelector( '#mainContainer' );

    StopWatch.WORKER.onmessage = function( event )
        {
        StopWatch.tick();
        };

    StopWatch.SOUND = new Sound( 'sound1' );
    }


/**
 * When there's a change in the order of the watches, need to update the 'POSITION' property.
 *
 * There's a change when a stopwatch is moved to a different position, or when a stopwatch is removed (if its not the last element).
 */
static updateWatchesPosition()
    {
    var all = StopWatch.ALL_STOPWATCHES;

    for (var a = 0 ; a < all.length ; a++)
        {
        all[ a ].POSITION = a;
        }
    }


/**
 * Update all the watches time.
 */
static tick()
    {
    var activeWatches = StopWatch.ACTIVE_WATCHES;

    for (var a = 0 ; a < activeWatches.length ; a++)
        {
        activeWatches[ a ].tick();
        }

    Data.updateWatchesTime( activeWatches );
    }


constructor( watchArguments: WatchData, loading= false )
    {
    var countUp = watchArguments.countUp;

    this.LOADING = true;
    this.COUNT_UP = countUp;

    if ( watchArguments.initValueCountDown )
        {
        this.INIT_VALUE_COUNTDOWN = watchArguments.initValueCountDown;
        }

        // :: Title :: //

    var title = <HTMLDivElement> document.createElement( 'div' );
    var titlePlaceholder: string;

    if ( countUp )
        {
        titlePlaceholder = 'Count Up';
        }

    else
        {
        titlePlaceholder = 'Count Down';
        }

    title.className = 'StopWatch-title';
    title.contentEditable = 'true';
    title.setAttribute( 'data-placeholder', titlePlaceholder );

    if ( watchArguments.title )
        {
        $( title ).text( watchArguments.title );
        }
    title.addEventListener( 'input', () => {
        Data.changeTitle( this );
        });

        // :: Count Element :: //

    var count = <HTMLSpanElement> document.createElement( 'span' );
    count.className = 'StopWatch-count';

        // to display messages (for example when count down finishes)
    var countMessage = <HTMLSpanElement> document.createElement( 'span' );

    countMessage.className = 'StopWatch-countMessage';

    var countContainer = <HTMLDivElement> document.createElement( 'div' );

    countContainer.appendChild( count );
    countContainer.appendChild( countMessage );

        // :: Start/Stop :: //

    var startStop = <HTMLInputElement> document.createElement( 'input' );

    startStop.className = 'StopWatch-startStop';
    startStop.type = 'button';
    startStop.value = 'Start';

        // :: Restart :: //

    var restart = <HTMLInputElement> document.createElement( 'input' );

    restart.className = 'StopWatch-restart';
    restart.type = 'button';
    restart.value = 'Restart';

        // :: Reset :: //

    var reset = <HTMLInputElement> document.createElement( 'input' );

    reset.className = 'StopWatch-reset';
    reset.type = 'button';
    reset.value = 'Reset';

        // :: Open Options :: //

    var options = document.createElement( 'div' );

    options.className = 'StopWatch-openOptions StopWatch-topButtons';
    options.innerText = '⚙';
    options.title = 'Open Options';

        // :: Remove Button :: //

    var remove = document.createElement( 'div' );

    remove.className = 'StopWatch-remove StopWatch-topButtons';
    remove.innerText = '✕';
    remove.title = 'Remove';

        // :: Entry :: //

    var entry: HTMLInputElement | null = null;
    var entryMessage: HTMLSpanElement | null = null;

        // when count down mode, add an entry to set the starting time
    if ( countUp === false )
        {
        entry = <HTMLInputElement> document.createElement( 'input' );

        entry.className = 'StopWatch-entry';
        entry.type = 'text';

        if ( watchArguments.entryValue )
            {
            entry.value = watchArguments.entryValue;
            }

        else
            {
            entry.value = '10s';
            }

        entry.addEventListener( 'input', () => {
                Data.changeWatchEntryText( this );
            });

            // the message, when an error occurs (like not a valid time)
        entryMessage = <HTMLSpanElement> document.createElement( 'span' );
        entryMessage.className = 'StopWatch-entryMessage';
        }

        // :: Drag Handle :: //

    var dragHandle = document.createElement( 'canvas' );

    dragHandle.className = 'StopWatch-dragHandle StopWatch-topButtons';
    dragHandle.title = 'Drag';
    drawDragHandle( dragHandle );

        // :: Container :: //

    var container = <HTMLDivElement> document.createElement( 'div' );

    container.className = 'StopWatch-container';
    $( container ).addClass( 'notActive' );

    container.appendChild( title );
    container.appendChild( countContainer );
    container.appendChild( startStop );
    container.appendChild( restart );
    container.appendChild( reset );
    container.appendChild( remove );
    container.appendChild( dragHandle );
    container.appendChild( options );

    if ( !countUp )
        {
        container.appendChild( entry! );
        container.appendChild( entryMessage! );
        }

    this.POSITION = StopWatch.MAIN_CONTAINER.children.length;
    StopWatch.MAIN_CONTAINER.appendChild( container );

        // :: Set Events :: //

    startStop.onclick = () =>
        {
        this.STARTED = true;

            // start the watch
        if ( !this.RUNNING )
            {
            this.startWatch();
            }

            // stop the watch
        else
            {
            this.stopWatch();
            }
        };

    restart.onclick = () =>
        {
        this.restartWatch();
        };

    reset.onclick = () =>
        {
        this.resetWatch();
        };

    options.onclick = () =>
        {
        this.optionsWindow();
        };

    remove.onclick = () =>
        {
        this.remove();
        };


    if ( entry )
        {
        entry.onkeypress = ( event ) =>
            {
            var key = event.which;

                // start or restart the watch
            if ( key == EVENT_KEY.enter )
                {
                this.restartWatch();
                }
            };
        }


        // :: save references to the html elements :: //

    this.TITLE_ELEMENT = title;
    this.COUNT_ELEMENT = count;
    this.COUNT_MESSAGE_ELEMENT = countMessage;
    this.START_STOP_ELEMENT = startStop;
    this.ENTRY_ELEMENT = entry;
    this.ENTRY_MESSAGE_ELEMENT = entryMessage;
    this.CONTAINER_ELEMENT = container;

        // :: Update the watch :: //

    if ( typeof watchArguments.count === 'number' )
        {
        this.updateWatch( watchArguments.count );
        }

    else
        {
        if ( watchArguments.countUp )
            {
            this.updateWatch( StopWatch.DEFAULT_STOP_WATCH_VALUE );
            }

        else
            {
            this.updateWatch( StopWatch.DEFAULT_COUNT_DOWN_VALUE );
            }
        }

        // And the number of decimal cases
    if ( typeof watchArguments.numberDecimalCases === 'number' )
        {
        this.changeNumberDecimalCases( watchArguments.numberDecimalCases );
        }

    if ( watchArguments.started )
        {
        if ( watchArguments.running )
            {
            this.startWatch();
            }

        else
            {
            this.stopWatch();
            }
        }


    StopWatch.ALL_STOPWATCHES.push( this );

        // :: Other :: //

        // so that the placeholder updates (according to whether there's text in the title or not)
        // it needs to be called after the element was added to the DOM
    $( title ).trigger( 'change' );


        // with different font-sizes (for example in chrome, settings -> font size -> medium/large), it makes the drag handle element not being position correctly
        // so we position it here with code
        // we're aligning just for the first line
    var titleFontSize = parseInt( $( title ).css('font-size') );

        // trying to get the height of the element from the font-size
    var oneLineHeight = titleFontSize * 1.35;
    var dragHeight = dragHandle.height;
    var dragTop = (oneLineHeight - dragHeight) / 2 + 1;

    $( dragHandle ).css( 'top', dragTop + 'px' );
    this.DRAG_DROP = new DragDrop( container, dragHandle, this );
    this.LOADING = false;

    if ( loading !== true )
        {
        Data.newWatch( this );
        }
    }


moveTo( position: number )
    {
    var mainContainer = StopWatch.MAIN_CONTAINER;

    if ( position > this.POSITION )
        {
        mainContainer.insertBefore( this.CONTAINER_ELEMENT, mainContainer.children[ position + 1 ] );
        }

    else
        {
        mainContainer.insertBefore( this.CONTAINER_ELEMENT, mainContainer.children[ position ] );
        }

    var all = StopWatch.ALL_STOPWATCHES;
    var previousPosition = this.POSITION;

    all.splice( previousPosition, 1 );
    all.splice( position, 0, this );

    StopWatch.updateWatchesPosition();

    Data.changePosition( this, previousPosition );
    }


/*
    Removes the css classes from the container (which set a background-color depending on the state of the watch)

    It then is set the correct one
 */
clearContainerCssClasses()
    {
    $( this.CONTAINER_ELEMENT ).removeClass( 'watch-active' );
    $( this.CONTAINER_ELEMENT ).removeClass( 'watch-notActive' );
    $( this.CONTAINER_ELEMENT ).removeClass( 'watch-stopped' );
    $( this.CONTAINER_ELEMENT ).removeClass( 'watch-finished' );
    }


/*
    Start the watch (from whatever value it was before)

    To start from the beginning, use restartWatch()
 */
startWatch()
    {
    this.STARTED = true;
    this.startTimer();


        // if it reached the limit, let it have the background-color for that case, otherwise, the normal watch-active class
    if ( !this.reachedLimit() )
        {
        this.clearContainerCssClasses();

        $( this.CONTAINER_ELEMENT ).addClass( 'watch-active' );
        }


    this.START_STOP_ELEMENT.value = "Stop";
    Data.startWatch( this );
    }


/*
    Stops the watch (but keeps the watch value, to be able to continue from the same time)
 */
stopWatch()
    {
    this.STARTED = true;
    this.stopTimer();

        // if it reached the limit, let it have the background-color for that case, otherwise, the normal watch-active class
    if ( !this.reachedLimit() )
        {
        this.clearContainerCssClasses();

        $( this.CONTAINER_ELEMENT ).addClass( 'watch-stopped' );
        }

    this.START_STOP_ELEMENT.value = "Continue";
    Data.stopWatch( this );
    }


/*
    Restarts the watch (watch value to its default, start watch again)
 */
restartWatch()
    {
    var watchObject = this;

    try
        {
        var initValue = this.getInitialValue();
        }

    catch( error )
        {
        console.log( error );

            // clear any possible previous timeout
        window.clearTimeout( this.ENTRY_MESSAGE_TIMEOUT_F );

        if ( this.ENTRY_MESSAGE_ELEMENT )
            {
            $( this.ENTRY_MESSAGE_ELEMENT ).text( '<-- Error: ' + error );
            }

            // clear the message after some time
        this.ENTRY_MESSAGE_TIMEOUT_F = window.setTimeout( function()
            {
            if ( watchObject.ENTRY_MESSAGE_ELEMENT )
                {
                $( watchObject.ENTRY_MESSAGE_ELEMENT ).text( '' );
                }

            }, 2000 );

            // bring the last valid value that was set (this error only occurs in the CountDown watches)
        initValue = this.INIT_VALUE_COUNTDOWN;
        }

    this.STARTED = true;
    this.REACHED_LIMIT = false;

        // remove the reachedLimit message
    $( this.COUNT_MESSAGE_ELEMENT ).text( '' );


        // update the startStop button text
    this.START_STOP_ELEMENT.value = 'Stop';

        // set the active css class
    this.clearContainerCssClasses();

    $( this.CONTAINER_ELEMENT ).addClass( 'watch-active' );

        // reset the watch
    this.updateWatch( initValue );
    this.startTimer();
    Data.restartWatch( this );
    }


/*
    Resets the watch (watch value to the default value, stop timer)
 */
resetWatch()
    {
    var watchObject = this;

    try
        {
        var initValue = this.getInitialValue();
        }

    catch( error )
        {
        console.log( error );

            // clear any possible previous timeout
        window.clearTimeout( this.ENTRY_MESSAGE_TIMEOUT_F );

        if ( this.ENTRY_MESSAGE_ELEMENT )
            {
            $( this.ENTRY_MESSAGE_ELEMENT ).text( '<-- Error: ' + error );
            }

            // clear the message after some time
        this.ENTRY_MESSAGE_TIMEOUT_F = window.setTimeout( function()
            {
            if ( watchObject.ENTRY_MESSAGE_ELEMENT )
                {
                $( watchObject.ENTRY_MESSAGE_ELEMENT ).text( '' );
                }

            }, 2000 );


        if ( this.COUNT_UP )
            {
            initValue = StopWatch.DEFAULT_STOP_WATCH_VALUE;
            }

        else
            {
            initValue = this.INIT_VALUE_COUNTDOWN;
            }
        }


    this.STARTED = false;
    this.REACHED_LIMIT = false;

        // clear any possible messages that could be displayed
    $( this.COUNT_MESSAGE_ELEMENT ).text( '' );
    $( this.CONTAINER_ELEMENT ).addClass( 'notActive' );
    this.START_STOP_ELEMENT.value = "Start";

    this.clearContainerCssClasses();
    this.stopTimer();
    this.updateWatch( initValue );
    Data.resetWatch( this );
    }


/*
    Updates the watch current number
 */
updateWatch( count: number )
    {
    this.COUNT = count;

    var seconds = limitValue( count / 1000, this.NUMBER_DECIMAL_CASES, this.COUNT_UP );
    $( this.COUNT_ELEMENT ).text( dateToString( seconds, this.NUMBER_DECIMAL_CASES ) );

        // check if the CountDown watches finished (only relevant for CountDown watches)
    this.reachedLimit();
    }


/*
    For CountDown only, when it reaches the count limit (and if so, change the background-color)
 */
reachedLimit(): boolean
    {
    if ( !this.COUNT_UP )
        {
            // no need to do anything
        if ( this.REACHED_LIMIT )
            {
            return true;
            }

        if ( this.COUNT <= 0 )
            {
            this.REACHED_LIMIT = true;

            this.clearContainerCssClasses();

            $( this.CONTAINER_ELEMENT ).addClass( 'watch-finished' );

                // :: show some message :: //

            $( this.COUNT_MESSAGE_ELEMENT ).text( '<-- Ended' );


            if ( !this.LOADING && Data.getSound() )
                {
                    // play the sound
                StopWatch.SOUND.play();
                }

            return true;
            }
        }

    return false;
    }


/*
    The initial value of the stopwatch when it is reset/restart/etc
 */
getInitialValue(): number
    {
        // when counting up, start from 0
    var value = 0;

        // when counting down, go get the value from the entry
    if ( !this.COUNT_UP )
        {
        value = this.stringToMilliseconds( this.ENTRY_ELEMENT!.value );

        this.INIT_VALUE_COUNTDOWN = value;
        }

    return value;
    }


startTimer()
    {
    if ( !this.RUNNING )
        {
        this.RUNNING = true;

        StopWatch.ACTIVE_WATCHES.push( this );
        }
    }


stopTimer()
    {
    if ( this.RUNNING )
        {
        this.RUNNING = false;
        var index = StopWatch.ACTIVE_WATCHES.indexOf( this );

        if ( index >= 0 )
            {
            StopWatch.ACTIVE_WATCHES.splice( index, 1 );
            }
        }
    }


changeNumberDecimalCases( num: number )
    {
    if ( num < 0 || num > 1 || num == this.NUMBER_DECIMAL_CASES )
        {
        return;
        }

    this.NUMBER_DECIMAL_CASES = num;
    this.updateWatch( this.COUNT );

    Data.changeWatchDecimalCases( this );
    }


remove()
    {
    this.stopTimer();
    this.optionsWindow( false );

        // remove the reference
    StopWatch.ALL_STOPWATCHES.splice( this.POSITION, 1 );

        // remove from the DOM
    StopWatch.MAIN_CONTAINER.removeChild( this.CONTAINER_ELEMENT );
    Data.removeWatch( this );

    StopWatch.updateWatchesPosition();
    }


stringToMilliseconds( entryValue: string ): number
    {
    /*
    *
    * search for a number with at least one digit, then possibly a space and a letter (works only for positive numbers)
    *
    *  s - second . m - minute , h - hour , d - day
    *  returns two strings (if it finds), one with the number and other with the letter
    *
    * RegExp:
    *
    *      [] : matches the characters within (from 0 to 9)
    *      +  : 1 or more of the preceding match
    *      () : remembers the match - capturing parentheses
    *      *  : matches the preceding character 0 or more times
    *      ?= : matches only if the following pattern exists
    *
    * Flags:
    *
    *      i - case insensitive
    *      g - global ( calling pattern.exec() consecutively will keep returning all of the possibilities )
    *
    */
    var pattern = /[0-9]+(?= *([smhd]))/ig;
    var matches = pattern.exec( entryValue );

        //the number of milliseconds, to add to the current date
        //  for example, if the string is "in 20h 3m", then number will have 20 hours and 3 minutes converted in milliseconds
    var milliseconds = 0;
    var foundPattern = false;

        //deal with 'pattern' - one at the time (for example 20h 3m, cycle goes two times)
        //sum everything into 'number' (in milliseconds)
    while ( matches !== null )
        {
        foundPattern = true;

        let temp = parseInt( matches[0], 10 );

            //see if it has more than 3 digits the number
        if ( numberOfDigits( temp ) > 3 )
            {
            throw "Max. 3 digits for each number";
            }

        milliseconds += timeToMilliseconds( temp, matches[1] );

        matches = pattern.exec( entryValue );
        }

    if ( !foundPattern )
        {
        throw "Didn't found the pattern";
        }

    return milliseconds;
    }


getTitle(): string
    {
    return $( this.TITLE_ELEMENT ).text();
    }


setTitle( newTitle: string )
    {
    $( this.TITLE_ELEMENT ).text( newTitle );
    }


/**
 * If `open` not provided, then it toggles the option window state (between opened/closed).
 */
optionsWindow( open?: boolean )
    {
    var isOpened = Boolean( this.OPTIONS_WINDOW );

    if ( typeof open === 'undefined' )
        {
        if ( isOpened )
            {
            open = false;
            }

        else
            {
            open = true;
            }
        }

    if ( open && !isOpened )
        {
        this.OPTIONS_WINDOW = new Options( this, () =>
            {
            this.OPTIONS_WINDOW = null;
            });
        }

    else if ( !open && isOpened )
        {
        this.OPTIONS_WINDOW!.remove();
        this.OPTIONS_WINDOW = null;
        }
    }


tick()
    {
    var nextCount: number;

    if ( this.COUNT_UP )
        {
        nextCount = this.COUNT + StopWatch.TIMER_INTERVAL;
        }

    else
        {
        nextCount = this.COUNT - StopWatch.TIMER_INTERVAL;
        }

    this.updateWatch( nextCount );
    }


getEntryValue()
    {
    if ( this.ENTRY_ELEMENT )
        {
        return this.ENTRY_ELEMENT.value;
        }

    return undefined;
    }


gainFocus()
    {
    this.TITLE_ELEMENT.focus();
    }
}
