var Options = (function () {
    function Options(watchObject, onRemove) {
        var _this = this;
        this.WATCH_OBJECT = watchObject;
        var caseDescription = document.createElement('div');
        caseDescription.className = 'Options-description';
        caseDescription.innerText = 'Number of decimal cases';
        var zero = document.createElement('div');
        zero.className = 'Options-value';
        zero.innerText = 'Zero';
        zero.onclick = function () {
            _this.selectDecimalCase(0);
        };
        var one = document.createElement('div');
        one.className = 'Options-value';
        one.innerText = 'One';
        one.onclick = function () {
            _this.selectDecimalCase(1);
        };
        var two = document.createElement('div');
        two.className = 'Options-value';
        two.innerText = 'Two';
        two.onclick = function () {
            _this.selectDecimalCase(2);
        };
        this.ZERO_DECIMAL_CASE = zero;
        this.ONE_DECIMAL_CASE = one;
        this.TWO_DECIMAL_CASE = two;
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
        var optionsOffset = $(watchObject.OPEN_OPTIONS_ELEMENT).offset();
        var titleOffset = $(watchObject.TITLE_ELEMENT).offset();
        this.POPUP_WINDOW_OBJECT = new PopupWindow({
            content: decimalCaseContainer,
            x: optionsOffset.left + 70,
            y: titleOffset.top,
            onRemove: onRemove
        });
        return this;
    }
    Options.prototype.selectDecimalCase = function (newCase) {
        this.WATCH_OBJECT.changeNumberDecimalCases(newCase);
        var element;
        if(newCase == 0) {
            element = this.ZERO_DECIMAL_CASE;
        } else if(newCase == 1) {
            element = this.ONE_DECIMAL_CASE;
        } else if(newCase == 2) {
            element = this.TWO_DECIMAL_CASE;
        }
        $(this.SELECTED_DECIMAL_CASE).removeClass('Options-selected');
        $(element).addClass('Options-selected');
        this.SELECTED_DECIMAL_CASE = element;
    };
    Options.prototype.remove = function () {
        this.POPUP_WINDOW_OBJECT.remove();
    };
    return Options;
})();
//@ sourceMappingURL=options.js.map
