"use strict";
/// <reference path="utilities.ts" />
var PopupWindow = (function () {
    /*
        Arguments:
            content (html element): the content of the window
            x (int) : x position
            y (int) : y position
            afterAppend_f (function) : function to be called after the elements are appended to the DOM
    
     */
    function PopupWindow(popupArguments) {
        var _this = this;
        var container = document.createElement('div');
        container.className = 'PopupWindow-container';
        this.CONTAINER_ELEMENT = container;
        // close button
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
        // append stuff
        container.appendChild(close);
        container.appendChild(popupArguments.content);
        // position the element
        $(container).css('left', popupArguments.x + 'px');
        $(container).css('top', popupArguments.y + 'px');
        document.body.appendChild(container);
        this.KEY_DOWN_F = function (event) {
            _this.keyboardEvents(event);
        };
        $(window).bind('keyup', this.KEY_DOWN_F);
        if (typeof popupArguments.afterAppend !== 'undefined' && popupArguments.afterAppend !== null) {
            popupArguments.afterAppend();
        }
        this.ON_REMOVE = popupArguments.onRemove;
    }
    PopupWindow.prototype.remove = function () {
        document.body.removeChild(this.CONTAINER_ELEMENT);
        //$( window ).unbind('keyup', this.keyDown_f);
        window.removeEventListener('keyup', this.KEY_DOWN_F);
        if (this.ON_REMOVE) {
            this.ON_REMOVE();
        }
    };
    PopupWindow.prototype.keyboardEvents = function (event) {
        var key = event.keyCode;
        if (key === EVENT_KEY.esc) {
            this.remove();
        }
    };
    return PopupWindow;
})();
