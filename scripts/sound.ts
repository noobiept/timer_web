class Sound
{
constructor( id: string )
    {
    var source = 'sounds/' + id;

    var audio = <HTMLAudioElement> document.createElement( 'audio' );

    if ( audio.canPlayType( 'audio/ogg' ) )
        {
        source += '.ogg';
        }

    else
        {
        source += '.mp3';
        }

    audio.src = source;
    audio.load();
    audio.play();
    }
}