var Message = (function () {
    function Message(parent, text, positionOptions, timeout) {
        var _this = this;
        var message = document.createElement('div');
        message.className = 'Message';
        message.innerText = text;
        parent.appendChild(message);
        $(message).position(positionOptions);
        this.PARENT_ELEMENT = parent;
        this.MESSAGE_ELEMENT = message;
        if($.isNumeric(timeout) && timeout > 0) {
            window.setTimeout(function () {
                _this.remove();
            }, timeout);
        }
    }
    Message.prototype.remove = function () {
        this.PARENT_ELEMENT.removeChild(this.MESSAGE_ELEMENT);
    };
    return Message;
})();
