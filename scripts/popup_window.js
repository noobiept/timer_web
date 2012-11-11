"use strict";
var PopupWindow = (function () {
    function PopupWindow(content, x, y, afterAppend_f) {
        var _this = this;
        this.keyboardEvents = function (event) {
            var key = event.keyCode;
            if(key === EVENT_KEY.esc) {
                this.remove();
            }
        };
        var container = document.createElement('div');
        container.className = 'PopupWindow-container';
        this.CONTAINER_ELEMENT = container;
        var close = document.createElement('canvas');
        close.className = 'PopupWindow-close';
        close.title = 'Close Window';
        close.width = 15;
        close.height = 15;
        var ctx = close.getContext('2d');
        ctx.strokeStyle = 'rgb(46, 144, 189)';
        ctx.lineWidth = 2;
        ctx.moveTo(1, 1);
        ctx.lineTo(14, 14);
        ctx.moveTo(14, 1);
        ctx.lineTo(1, 14);
        ctx.stroke();
        close.onclick = function () {
            _this.remove();
        };
        container.appendChild(close);
        container.appendChild(content);
        $(container).css('left', x + 'px');
        $(container).css('top', y + 'px');
        document.body.appendChild(container);
        this.KEY_DOWN_F = function (event) {
            _this.keyboardEvents(event);
        };
        $(window).bind('keyup', this.KEY_DOWN_F);
        if(typeof afterAppend_f !== 'undefined' && afterAppend_f !== null) {
            afterAppend_f();
        }
    }
    PopupWindow.prototype.remove = function () {
        document.body.removeChild(this.CONTAINER_ELEMENT);
        window.removeEventListener('keyup', this.KEY_DOWN_F);
    };
    return PopupWindow;
})();
