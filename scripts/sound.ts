class Sound
{

constructor( source: string )
{
var audio = <HTMLAudioElement> document.createElement( 'audio' );

audio.src = source;
audio.play();
}


}