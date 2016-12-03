var Sound = (function () {
    function Sound(id) {
        var source = 'sounds/' + id;
        this.audio = document.createElement('audio');
        if (this.audio.canPlayType('audio/ogg')) {
            source += '.ogg';
        }
        else {
            source += '.mp3';
        }
        this.audio.src = source;
    }
    Sound.prototype.play = function () {
        this.audio.currentTime = 0;
        this.audio.play();
    };
    return Sound;
}());
