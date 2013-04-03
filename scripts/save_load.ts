

function save( logout ?: bool )
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



if ( TYPE == 'server' )
    {
    /*
        fields:
            data
            options
            logout
     */

    var data = {
        data: JSON.stringify( saveAll ),
        options: JSON.stringify( OPTIONS )
        };

    if ( logout === true )
        {
            // doesn't matter the value, just by having the property works
        data.logout = 1;
        }

    $.ajax({

        type        : 'POST',
        async       : false,
        url         : '/logout_timer/',
        data        : data,
        complete    : function( jqXHR, textStatus )
            {
            $( location ).attr( 'href', '/' );
            }
        });
    }

    // save to localStorage
else
    {
    localStorage.setObject( 'watches', saveAll );

    localStorage.setObject( 'options', OPTIONS );
    }
}


/*
    Returns true/false depending on whether the load was successful
 */

function load(): bool
{
var stuffJson;
var optionsJson;


if ( TYPE == 'server' )
    {
    $.ajax({

        type: 'POST',
        async: false,
        url: '/load_timer/',
        success: function( jqXHR, textStatus )
            {
            var stuff = jqXHR;

            stuffJson = JSON.parse( stuff.data );
            optionsJson = JSON.parse( stuff.options );
            },

        error: function( jqXHR, textStatus, errorThrown )
            {
            console.log( jqXHR, textStatus, errorThrown );
            }
        });
    }

    // load from the localStorage
else
    {
    stuffJson = localStorage.getObject( 'watches' );
    optionsJson = localStorage.getObject( 'options' );
    }


if ( !stuffJson )
    {
    return false;
    }

var saveWatch: StopWatchArguments;

var watch: StopWatch;

for (var i = 0 ; i < stuffJson.length ; i++)
    {
    saveWatch = stuffJson[ i ];

    watch = new StopWatch( saveWatch );
    }


    // load the options

if ( optionsJson )
    {
    if ( typeof optionsJson.sound === 'boolean' )
        {
        OPTIONS.sound = optionsJson.sound;
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





/*
 * For jquery ajax to work (server only)
 */

jQuery(document).ajaxSend(function(event, xhr, settings) {
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    function sameOrigin(url) {
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }
    function safeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
});
