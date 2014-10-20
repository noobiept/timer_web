var Menu;
(function (Menu) {
    var SOUND_ELEMENT;

    function init() {
        var watchObject;

        var addCountUp = document.querySelector('#Menu-addCountUp');

        addCountUp.onclick = function () {
            watchObject = new StopWatch({ countUp: true, baseCssClass: 'CountUp' });

            if (isVisible(watchObject.CONTAINER_ELEMENT)) {
                watchObject.TITLE_ELEMENT.focus();
            } else {
                $(document.body).animate({
                    'scrollTop': $(watchObject.CONTAINER_ELEMENT).offset().top
                }, 200, function () {
                    watchObject.TITLE_ELEMENT.focus();
                });
            }
        };

        var addCountDown = document.querySelector('#Menu-addCountDown');

        addCountDown.onclick = function () {
            watchObject = new StopWatch({ countUp: false, baseCssClass: 'CountDown' });

            if (isVisible(watchObject.CONTAINER_ELEMENT)) {
                watchObject.TITLE_ELEMENT.focus();
            } else {
                $(document.body).animate({
                    'scrollTop': $(watchObject.CONTAINER_ELEMENT).offset().top
                }, 200, function () {
                    watchObject.TITLE_ELEMENT.focus();
                });
            }
        };

        var sound = document.querySelector('#Menu-sound');
        SOUND_ELEMENT = document.querySelector('#Menu-soundState');

        sound.onclick = function () {
            if (OPTIONS.sound) {
                setSound(false);
            } else {
                setSound(true);
            }
        };

        setSound(OPTIONS.sound);

        var menuEntryHeight = $(addCountUp).outerHeight();

        var menuHeight = menuEntryHeight + 8;

        $('#Menu').css('height', menuHeight + 'px');
    }
    Menu.init = init;

    function setSound(onOff) {
        if (onOff === true) {
            OPTIONS.sound = true;

            $(SOUND_ELEMENT).text('On');
        } else {
            OPTIONS.sound = false;

            $(SOUND_ELEMENT).text('Off');
        }
    }
    Menu.setSound = setSound;
})(Menu || (Menu = {}));
