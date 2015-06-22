var Sound = (function () {
    function Sound(id) {
        var source = 'sounds/' + id;
        var audio = document.createElement('audio');
        if (audio.canPlayType('audio/ogg')) {
            source += '.ogg';
        }
        else {
            source += '.mp3';
        }
        audio.src = source;
        audio.play();
    }
    return Sound;
})();
