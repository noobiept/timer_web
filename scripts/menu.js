/// <reference path="main.ts" />
var Menu;
(function (Menu) {
    var SOUND_ELEMENT;
    function init() {
        // setup the add watches buttons
        var addCountUp = document.querySelector('#Menu-addCountUp');
        addCountUp.onclick = function () {
            var watchObject = new StopWatch({ countUp: true });
            if (isVisible(watchObject.CONTAINER_ELEMENT)) {
                watchObject.gainFocus();
            }
            else {
                // scroll to the added element
                $(document.body).animate({
                    // properties to animate
                    'scrollTop': $(watchObject.CONTAINER_ELEMENT).offset().top
                }, 200, // duration
                function () {
                    watchObject.gainFocus();
                });
            }
        };
        var addCountDown = document.querySelector('#Menu-addCountDown');
        addCountDown.onclick = function () {
            var watchObject = new StopWatch({ countUp: false });
            if (isVisible(watchObject.CONTAINER_ELEMENT)) {
                watchObject.gainFocus();
            }
            else {
                // scroll to the added element
                $(document.body).animate({
                    // properties to animate
                    'scrollTop': $(watchObject.CONTAINER_ELEMENT).offset().top
                }, 200, // duration
                function () {
                    watchObject.gainFocus();
                });
            }
        };
        var sound = document.querySelector('#Menu-sound');
        SOUND_ELEMENT = document.querySelector('#Menu-soundState');
        sound.onclick = function () {
            if (Data.getSound() === true) {
                setSound(false);
            }
            else {
                setSound(true);
            }
        };
        setSound(Data.getSound());
        // :: Position correctly the menu elements :: //
        // get height of one of the menu entries
        var menuEntryHeight = $(addCountUp).outerHeight();
        // there's 4 pixels between the top of the menu and top of the entry, and 4 pixels difference at the bottom too
        var menuHeight = menuEntryHeight + 8;
        // we do this because the font-size can be changed in the browser's options for example, which breaks the alignment
        $('#Menu').css('height', menuHeight + 'px');
    }
    Menu.init = init;
    function setSound(onOff) {
        if (onOff === true) {
            Data.setSound(true);
            $(SOUND_ELEMENT).text('On');
        }
        else {
            Data.setSound(false);
            $(SOUND_ELEMENT).text('Off');
        }
    }
    Menu.setSound = setSound;
})(Menu || (Menu = {}));
