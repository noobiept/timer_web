/*
    Deals with the options window for the timers
 */
var Options = (function () {
    /*
        Arguments:
    
            watchObject : the object of the stop watch this belongs to
            onRemove    : a function to be called when the window is closed
     */
    function Options(watchObject, onRemove) {
        var _this = this;
        this.WATCH_OBJECT = watchObject;
        // :: Decimal Case Option :: //
        // description
        var caseDescription = document.createElement('div');
        caseDescription.className = 'Options-description';
        $(caseDescription).text('Number of decimal cases');
        // :: Zero/One/Two (values)
        var zero = document.createElement('div');
        zero.className = 'Options-value';
        $(zero).text('Zero');
        zero.onclick = function () {
            _this.selectDecimalCase(0);
        };
        var one = document.createElement('div');
        one.className = 'Options-value';
        $(one).text('One');
        one.onclick = function () {
            _this.selectDecimalCase(1);
        };
        this.ZERO_DECIMAL_CASE = zero;
        this.ONE_DECIMAL_CASE = one;
        // update with the one that is currently selected
        this.selectDecimalCase(watchObject.NUMBER_DECIMAL_CASES);
        var casesValuesContainer = document.createElement('div');
        casesValuesContainer.className = 'Options-valuesContainer';
        casesValuesContainer.appendChild(zero);
        casesValuesContainer.appendChild(one);
        var container = document.createElement('div');
        container.className = 'Options-container';
        // close button
        var close = document.createElement('canvas');
        close.className = 'Options-close';
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
        container.appendChild(caseDescription);
        container.appendChild(casesValuesContainer);
        container.appendChild(close);
        watchObject.CONTAINER_ELEMENT.appendChild(container);
        this.CONTAINER_ELEMENT = container;
        this.ON_REMOVE = onRemove;
        return this;
    }
    /*
        Adds the css class to the selected element, and deals with changing the decimal cases
     */
    Options.prototype.selectDecimalCase = function (newCase) {
        // on load of the options window, we don't need to call this, but since the case hasn't changed it won't do anything
        this.WATCH_OBJECT.changeNumberDecimalCases(newCase);
        var element;
        if (newCase == 0) {
            element = this.ZERO_DECIMAL_CASE;
        }
        else if (newCase == 1) {
            element = this.ONE_DECIMAL_CASE;
        }
        // remove from the old one
        $(this.SELECTED_DECIMAL_CASE).removeClass('Options-selected');
        // and add to the new one
        $(element).addClass('Options-selected');
        this.SELECTED_DECIMAL_CASE = element;
    };
    /*
        Remove/close the options window
     */
    Options.prototype.remove = function () {
        this.CONTAINER_ELEMENT.parentElement.removeChild(this.CONTAINER_ELEMENT);
        if (this.ON_REMOVE) {
            this.ON_REMOVE();
        }
    };
    return Options;
}());
