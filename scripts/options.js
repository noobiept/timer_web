/// <reference path="popup_window.ts" />
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
        var two = document.createElement('div');
        two.className = 'Options-value';
        $(two).text('Two');
        two.onclick = function () {
            _this.selectDecimalCase(2);
        };
        this.ZERO_DECIMAL_CASE = zero;
        this.ONE_DECIMAL_CASE = one;
        this.TWO_DECIMAL_CASE = two;
        // update with the one that is currently selected
        this.selectDecimalCase(watchObject.NUMBER_DECIMAL_CASES);
        var casesValuesContainer = document.createElement('div');
        casesValuesContainer.className = 'Options-valuesContainer';
        casesValuesContainer.appendChild(zero);
        casesValuesContainer.appendChild(one);
        casesValuesContainer.appendChild(two);
        var decimalCaseContainer = document.createElement('div');
        decimalCaseContainer.className = 'Options-container';
        decimalCaseContainer.appendChild(caseDescription);
        decimalCaseContainer.appendChild(casesValuesContainer);
        // position the popup window left to the openOptions button
        var optionsOffset = $(watchObject.OPEN_OPTIONS_ELEMENT).offset();
        // and on the same level as the title
        var titleOffset = $(watchObject.TITLE_ELEMENT).offset();
        this.POPUP_WINDOW_OBJECT = new PopupWindow({
            content: decimalCaseContainer,
            x: optionsOffset.left + 70,
            y: titleOffset.top,
            onRemove: onRemove
        });
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
        else if (newCase == 2) {
            element = this.TWO_DECIMAL_CASE;
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
        this.POPUP_WINDOW_OBJECT.remove();
    };
    return Options;
}());
