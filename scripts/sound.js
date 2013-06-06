var Sound = (function () {
    function Sound(source) {
        var audio = document.createElement('audio');
        audio.src = source;
        audio.play();
    }
    return Sound;
})();
//@ sourceMappingURL=sound.js.map
