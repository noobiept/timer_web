var Menu;
(function (Menu) {
    var SOUND_ELEMENT;
    function init() {
        var sound = document.querySelector('#sound');
        SOUND_ELEMENT = document.querySelector('#soundState');
        sound.onclick = function () {
            if(OPTIONS.sound) {
                setSound(false);
            } else {
                setSound(true);
            }
        };
        setSound(OPTIONS.sound);
    }
    Menu.init = init;
    function setSound(onOff) {
        if(onOff === true) {
            OPTIONS.sound = true;
            SOUND_ELEMENT.innerHTML = 'On';
        } else {
            OPTIONS.sound = false;
            SOUND_ELEMENT.innerHTML = 'Off';
        }
    }
    Menu.setSound = setSound;
})(Menu || (Menu = {}));
