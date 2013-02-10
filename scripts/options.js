var Options = (function () {
    function Options(watchObject) {
        var _this = this;
        this.WATCH_OBJECT = watchObject;
        var optionsDecimalCase = document.createElement('div');
        optionsDecimalCase.className = 'Options-decimalCase';
        var caseTitle = document.createElement('div');
        caseTitle.className = 'Options-decimalCase-title';
        caseTitle.innerText = 'Number of decimal cases';
        var zero = document.createElement('div');
        zero.className = 'Options-decimalCase-value';
        zero.innerText = 'Zero';
        zero.onclick = function () {
            _this.selectDecimalCase(0);
        };
        var one = document.createElement('div');
        one.className = 'Options-decimalCase-value';
        one.innerText = 'One';
        one.onclick = function () {
            _this.selectDecimalCase(1);
        };
        var two = document.createElement('div');
        two.className = 'Options-decimalCase-value';
        two.innerText = 'Two';
        two.onclick = function () {
            _this.selectDecimalCase(2);
        };
        this.ZERO_DECIMAL_CASE = zero;
        this.ONE_DECIMAL_CASE = one;
        this.TWO_DECIMAL_CASE = two;
        this.selectDecimalCase(watchObject.NUMBER_DECIMAL_CASES, true);
        var casesContainer = document.createElement('div');
        casesContainer.className = 'Options-decimalCase-container';
        casesContainer.appendChild(zero);
        casesContainer.appendChild(one);
        casesContainer.appendChild(two);
        optionsDecimalCase.appendChild(caseTitle);
        optionsDecimalCase.appendChild(casesContainer);
        var optionsOffset = $(watchObject.OPEN_OPTIONS_ELEMENT).offset();
        var titleOffset = $(watchObject.TITLE_ELEMENT).offset();
        new PopupWindow(optionsDecimalCase, optionsOffset.left + 70, titleOffset.top);
    }
    Options.prototype.selectDecimalCase = function (newCase, load) {
        if(typeof load == 'undefined') {
            load = false;
        }
        if(load == false) {
            this.WATCH_OBJECT.changeNumberDecimalCases(newCase);
        }
        var element;
        if(newCase == 0) {
            element = this.ZERO_DECIMAL_CASE;
        } else if(newCase == 1) {
            element = this.ONE_DECIMAL_CASE;
        } else if(newCase == 2) {
            element = this.TWO_DECIMAL_CASE;
        }
        $(this.SELECTED_DECIMAL_CASE).removeClass('Options-decimalCase-selected');
        $(element).addClass('Options-decimalCase-selected');
        this.SELECTED_DECIMAL_CASE = element;
    };
    return Options;
})();
