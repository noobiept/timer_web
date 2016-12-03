class Sound
{
private audio: HTMLAudioElement;


constructor( id: string )
    {
    var source = 'sounds/' + id;
    this.audio = <HTMLAudioElement> document.createElement( 'audio' );

    if ( this.audio.canPlayType( 'audio/ogg' ) )
        {
        source += '.ogg';
        }

    else
        {
        source += '.mp3';
        }

    this.audio.src = source;
    }


play()
    {
    this.audio.currentTime = 0;
    this.audio.play();
    }
}