(function ($) {
    $(document).on('change keydown keypress input', 'div[data-placeholder]', function () {
        if (this.textContent) {
            this.setAttribute('data-div-placeholder-content', 'true');
        }
        else {
            this.removeAttribute('data-div-placeholder-content');
        }
    });
})(jQuery);