declare var chrome: any;
interface Window { chrome: any; }


module AppStorage
{
interface Items {
    [ key: string ]: any
}


/**
 * Calls the `callback` with a dictionary that has all the requested keys/values from `localStorage`.
 */
function getLocalStorage( keys: string[], callback: (objects: Items) => void )
    {
    var objects: Items = {};

    for (var a = 0 ; a < keys.length ; a++)
        {
        var key = keys[ a ];
        var value = localStorage.getItem( key );

        objects[ key ] = value && JSON.parse( value );
        }

    callback( objects );
    }


/**
 * Sets the given key/value into `localStorage`. Calls the `callback` when its done.
 * Converts the value to string (with json).
 */
function setLocalStorage( items: Items, callback?: () => any )
    {
    for ( var key in items )
        {
        if ( items.hasOwnProperty( key ) )
            {
            localStorage.setItem( key, JSON.stringify( items[ key ] ) );
            }
        }

    if ( callback )
        {
        callback();
        }
    }


/**
 * Calls the `callback` with a dictionary that has all the requested keys/values from `chrome.storage.local`.
 */
function chromeStorageGet( keys: string[], callback: (objects: Items) => void )
    {
    chrome.storage.local.get( keys, callback );
    }


/**
 * Sets the given key/value into `chrome.storage.local`. Calls the `callback` when its done.
 * Converts the value to string (with json).
 */
function chromeStorageSet( items: Items, callback?: () => void )
    {
    chrome.storage.local.set( items, callback );
    }


/**
 * Uses the `chrome storage` if it's available (when running as a chrome app), otherwise uses the `localStorage`.
 */
export function getData( keys: string[], callback: (items: Items) => void )
    {
    if ( window.chrome && window.chrome.storage )
        {
        chromeStorageGet( keys, callback );
        }

    else
        {
        getLocalStorage( keys, callback );
        }
    }


/**
 * Uses the `chrome storage` if it's available (when running as a chrome app), otherwise uses the `localStorage`.
 */
export function setData( items: Object, callback?: () => void )
    {
    if ( window.chrome && window.chrome.storage )
        {
        chromeStorageSet( items, callback );
        }

    else
        {
        setLocalStorage( items, callback );
        }
    }
}
