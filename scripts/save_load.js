function save(logout) {
    var all = [];
    var i;

    var mainContainer = StopWatch.MAIN_CONTAINER;
    var node;

    for (i = 0; i < mainContainer.childNodes.length; i++) {
        node = mainContainer.childNodes[i];

        if (node.tagName == 'DIV') {
            all.push(mainContainer.childNodes[i].watchObject);
        }
    }

    var saveAll = [];
    var saveWatch;

    var entryValue;
    var watch;

    for (i = 0; i < all.length; i++) {
        watch = all[i];

        entryValue = null;

        if (watch.ENTRY_ELEMENT) {
            entryValue = watch.ENTRY_ELEMENT.value;
        }

        saveWatch = {
            title: watch.getTitle(),
            baseCssClass: watch.BASE_CSS_CLASS,
            count: watch.COUNT,
            running: watch.RUNNING,
            started: watch.STARTED,
            numberDecimalCases: watch.NUMBER_DECIMAL_CASES,
            entryValue: entryValue,
            initValueCountDown: watch.INIT_VALUE_COUNTDOWN,
            countUp: watch.COUNT_UP,
            reachedLimit: watch.REACHED_LIMIT
        };

        saveAll.push(saveWatch);
    }

    if (TYPE == 'server') {
        var data = {
            data: JSON.stringify(saveAll),
            options: JSON.stringify(OPTIONS)
        };

        if (logout === true) {
            data.logout = 1;
        }

        $.ajax({
            type: 'POST',
            async: false,
            url: '/timer/save/',
            data: data
        });
    } else {
        localStorage.setObject('watches', saveAll);

        localStorage.setObject('options', OPTIONS);
    }
}

function load() {
    var stuffJson;
    var optionsJson;

    if (TYPE == 'server') {
        $.ajax({
            type: 'POST',
            async: false,
            url: '/timer/get_data/',
            success: function (jqXHR, textStatus) {
                var stuff = jqXHR;

                stuffJson = JSON.parse(stuff.data);
                optionsJson = JSON.parse(stuff.options);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    } else {
        stuffJson = localStorage.getObject('watches');
        optionsJson = localStorage.getObject('options');
    }

    if (!stuffJson) {
        return false;
    }

    var saveWatch;

    var watch;

    for (var i = 0; i < stuffJson.length; i++) {
        saveWatch = stuffJson[i];

        watch = new StopWatch(saveWatch);
    }

    if (optionsJson) {
        if (typeof optionsJson.sound === 'boolean') {
            OPTIONS.sound = optionsJson.sound;
        }
    }

    return true;
}

Storage.prototype.setObject = function (key, value) {
    this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function (key) {
    var value = this.getItem(key);

    return value && JSON.parse(value);
};

jQuery(document).ajaxSend(function (event, xhr, settings) {
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);

                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    function sameOrigin(url) {
        var host = document.location.host;
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;

        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') || (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') || !(/^(\/\/|http:|https:).*/.test(url));
    }
    function safeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
});
//@ sourceMappingURL=save_load.js.map
