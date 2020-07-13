describe('MTR Datepicker: Months ', function () {
  var datepickerSelectorName = 'datepicker';
  var datepickerSelector = '#' + datepickerSelectorName;
  var datepicker;
  var transitionBlurDelay = 600; // Keep it equal with this one in the code

  beforeEach(function () {
    setBaseFixtures();

    datepicker = new MtrDatepicker({
      target: 'datepicker'
    });
  });

  function setBaseFixtures () {
    setFixtures('<div id="datepicker"></div>');
  }

  describe('getter', function () {
    it('format("M") should return the current month', function () {
      var currentDate = new Date();
      var currentMonth = currentDate.getMonth() + 1;
      var datepickerMonth = datepicker.format('M');

      expect(datepickerMonth).toEqual(currentMonth.toString());
    });
  });

  describe('setter', function () {
    it('setMonth() should work when you try to assign value 5 and make this month Jun (the JS counting of the months)', function () {
      var newMonthValue = 5;
      var newMonthName = 'Jun';
      datepicker.setMonth(newMonthValue);
      newMonthValue++;
      var datepickerMonth = datepicker.format('M');
      var datepickerMonthName = datepicker.format('MMM');

      expect(datepickerMonth).toEqual(newMonthValue.toString());
      expect(datepickerMonthName).toEqual(newMonthName.toString());
    });

    it('format("MMM") should return Jan if the current month is 0', function () {
      var newMonthValue = 0;
      var expectedMonthValue = '1';
      var expectedMonthName = 'Jan';

      datepicker.setMonth(newMonthValue);
      var datepickerMonthValue = datepicker.format('M');
      var datepickerMonthName = datepicker.format('MMM');

      expect(datepickerMonthValue).toEqual(expectedMonthValue.toString());
      expect(datepickerMonthName).toEqual(expectedMonthName.toString());
    });
  });

  describe('click event', function () {
    var spyEvent;
    var datepickerElement;
    var arrowUpElement;
    var arrowDownElement;
    var inputElement;

    beforeEach(function () {
      datepickerElement = $(datepickerSelector);

      arrowUpElement = datepickerElement.find(datepickerSelector + '-input-months .mtr-arrow.up');
      arrowDownElement = datepickerElement.find(datepickerSelector + '-input-months .mtr-arrow.down');
      inputElement = datepickerElement.find(datepickerSelector + '-input-months input.mtr-input.months');
    });

    it('on the upper arrow to be triggered', function () {
      spyEvent = spyOnEvent(arrowUpElement, 'click');
      var clickEvent = createClickEvent();
      arrowUpElement[0].dispatchEvent(clickEvent);

      expect('click').toHaveBeenTriggeredOn(arrowUpElement);
      expect(spyEvent).toHaveBeenTriggered();
    });

    /**
     * To be valid the result should be checked using getter, DOM attribute and DOM visible element
     */
    it('on the upper arrow should change the month from Mar to Apr', function () {
      var initMonthValue = 2;
      var expectedMonthValue = '3';
      var expectedMonthName = 'Apr';

      datepicker.setMonth(initMonthValue);

      spyEvent = spyOnEvent(arrowUpElement, 'click');
      var clickEvent = createClickEvent();
      arrowUpElement[0].dispatchEvent(clickEvent);

      var datepickerGetterValue = datepicker.format('MMM');

      expect(datepickerGetterValue).toEqual(expectedMonthName);
      expect(inputElement).toHaveAttr('data-old-value', expectedMonthValue);
    });

    /**
     * To be valid the result should be checked using getter, DOM attribute and DOM visible element
     */
    it('2 times on the upper arrow should change the month from Sep to Nov', function () {
      var initMonthValue = 8;
      var expectedMonthValue = 10;
      var expectedMonthName = 'Nov';

      datepicker.setMonth(initMonthValue);

      spyEvent = spyOnEvent(arrowUpElement, 'click');
      var clickEvent = createClickEvent();
      arrowUpElement[0].dispatchEvent(clickEvent);
      arrowUpElement[0].dispatchEvent(clickEvent);

      var datepickerGetterValue = datepicker.format('M');
      var datepickerGetterName = datepicker.format('MMM');

      expect(datepickerGetterValue).toEqual((expectedMonthValue + 1).toString());
      expect(datepickerGetterName).toEqual(expectedMonthName);
      expect(inputElement).toHaveAttr('data-old-value', expectedMonthValue.toString());
    });

    it('on the down arrow to be triggered', function () {
      spyEvent = spyOnEvent(arrowDownElement, 'click');
      var clickEvent = createClickEvent();
      arrowDownElement[0].dispatchEvent(clickEvent);

      expect('click').toHaveBeenTriggeredOn(arrowDownElement);
      expect(spyEvent).toHaveBeenTriggered();
    });

    // TODO: Test with month including the special char M

    /**
     * To be valid the result should be checked using getter, DOM attribute and DOM visible element
     */
    it('on the down arrow should change the month from Jul to Jun', function () {
      var initMonthValue = 6;
      var expectedMonthValue = '5';
      var expectedMonthName = 'Jun';

      datepicker.setMonth(initMonthValue);

      spyEvent = spyOnEvent(arrowDownElement, 'click');
      var clickEvent = createClickEvent();
      arrowDownElement[0].dispatchEvent(clickEvent);

      var datepickerGetterValue = datepicker.format('MMM');

      expect(datepickerGetterValue).toEqual(expectedMonthName);
      expect(inputElement).toHaveAttr('data-old-value', expectedMonthValue);
    });

    /**
     * To be valid the result should be checked using getter, DOM attribute and DOM visible element
     */
    it('2 times on the down arrow should change the month from Jan to Nov', function () {
      var initMonthValue = 0;
      var expectedMonthValue = 10;
      var expectedMonthName = 'Nov';

      datepicker.setMonth(initMonthValue);

      spyEvent = spyOnEvent(arrowDownElement, 'click');
      var clickEvent = createClickEvent();
      arrowDownElement[0].dispatchEvent(clickEvent);
      arrowDownElement[0].dispatchEvent(clickEvent);

      var datepickerGetterValue = datepicker.format('M');
      var datepickerGetterName = datepicker.format('MMM');

      expect(datepickerGetterValue).toEqual((expectedMonthValue + 1).toString());
      expect(datepickerGetterName).toEqual(expectedMonthName);
      expect(inputElement).toHaveAttr('data-old-value', expectedMonthValue.toString());
    });
  });

  describe('keyboard input', function () {
    var datepickerElement;
    var inputElement;
    var inputActivatorElement;
    var transitionBlurDelay = 600; // Keep it equal with this one in the code

    beforeEach(function (done) {
      datepickerElement = jQuery(datepickerSelector);

      inputActivatorElement = datepickerElement.find(datepickerSelector + '-input-months .mtr-values');
      inputElement = datepickerElement.find(datepickerSelector + '-input-months input.mtr-input.months');

      setTimeout(function () {
        done();
      }, transitionBlurDelay * 2);
    });

    it('should change the month to 4', function (done) {
      var newMonthValue = 4;
      var expectedMonth = '4';

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(inputElement), 'focus');
      var spyEventBlur = spyOnEvent(jQuery(inputElement), 'blur');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var inputElementBlurEvent = createCustomEvent('blur');

      inputActivatorElement[0].dispatchEvent(clickEvent);
      inputElement[0].dispatchEvent(inputElementFocusEvent);
      inputElement.val(newMonthValue);
      inputElement[0].dispatchEvent(inputElementBlurEvent);

      setTimeout(function () {
        var datepickerMonth = datepicker.format('M');

        expect(spyEventClick).toHaveBeenTriggered();
        expect(spyEventFocus).toHaveBeenTriggered();
        expect(spyEventBlur).toHaveBeenTriggered();

        expect(datepickerMonth).toEqual(expectedMonth);
        done();
      }, transitionBlurDelay);
    });

    it('should change the month to 06', function (done) {
      var newMonthValue = '06';
      var expectedMonth = '6';

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(inputElement), 'focus');
      var spyEventBlur = spyOnEvent(jQuery(inputElement), 'blur');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var inputElementBlurEvent = createCustomEvent('blur');

      inputActivatorElement[0].dispatchEvent(clickEvent);
      inputElement[0].dispatchEvent(inputElementFocusEvent);
      inputElement.val(newMonthValue);
      inputElement[0].dispatchEvent(inputElementBlurEvent);

      setTimeout(function () {
        var datepickerMonth = datepicker.format('M');

        expect(spyEventClick).toHaveBeenTriggered();
        expect(spyEventFocus).toHaveBeenTriggered();
        expect(spyEventBlur).toHaveBeenTriggered();

        expect(datepickerMonth).toEqual(expectedMonth);
        done();
      }, transitionBlurDelay);
    });

    it('should NOT change the month to 15, it should keep the old value', function (done) {
      var newMonthValue = '15';
      var expectedMonth = datepicker.format('M');

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(inputElement), 'focus');
      var spyEventBlur = spyOnEvent(jQuery(inputElement), 'blur');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var inputElementBlurEvent = createCustomEvent('blur');

      inputActivatorElement[0].dispatchEvent(clickEvent);
      inputElement[0].dispatchEvent(inputElementFocusEvent);
      inputElement.val(newMonthValue);
      inputElement[0].dispatchEvent(inputElementBlurEvent);

      expect(spyEventClick).toHaveBeenTriggered();
      expect(spyEventFocus).toHaveBeenTriggered();
      expect(spyEventBlur).toHaveBeenTriggered();

      setTimeout(function () {
        var datepickerMonth = datepicker.format('M');

        expect(datepickerMonth).toEqual(expectedMonth);
        done();
      }, transitionBlurDelay);
    });

    it('should apply the change of the months to 07 on enter keypress ', function (done) {
      var newMonthValue = 7;
      var expectedMonth = '7';

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(inputElement), 'focus');
      var spyEventKeyup = spyOnEvent(jQuery(inputElement), 'keyup');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var inputElementKeyupEvent = createKeyupEvent(13);

      inputActivatorElement[0].dispatchEvent(clickEvent);
      inputElement[0].dispatchEvent(inputElementFocusEvent);
      inputElement.val(newMonthValue);
      inputElement[0].dispatchEvent(inputElementKeyupEvent);

      setTimeout(function () {
        var datepickerMonth = datepicker.format('M');

        expect(spyEventClick).toHaveBeenTriggered();
        expect(spyEventFocus).toHaveBeenTriggered();
        expect(spyEventKeyup).toHaveBeenTriggered();

        expect(datepickerMonth).toEqual(expectedMonth);
        done();
      }, transitionBlurDelay * 2);
    });

    it('should NOT change the months to 15 on enter keypress, it should keep the old value', function (done) {
      var newMonthValue = '15';
      var expectedMonth = datepicker.format('M');

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(inputElement), 'focus');
      var spyEventKeyup = spyOnEvent(jQuery(inputElement), 'keyup');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var inputElementKeyupEvent = createCustomEvent('keyup');

      inputActivatorElement[0].dispatchEvent(clickEvent);
      inputElement[0].dispatchEvent(inputElementFocusEvent);
      inputElement.val(newMonthValue);
      inputElement[0].dispatchEvent(inputElementKeyupEvent);

      expect(spyEventClick).toHaveBeenTriggered();
      expect(spyEventFocus).toHaveBeenTriggered();
      expect(spyEventKeyup).toHaveBeenTriggered();

      setTimeout(function () {
        var datepickerMonth = datepicker.format('M');

        expect(datepickerMonth).toEqual(expectedMonth);
        done();
      }, transitionBlurDelay * 2);
    });
  });

  describe('wheel move', function () {
    var spyEvent;
    var datepickerElement;
    var monthsElement;
    var inputActivatorElement;
    var monthsInputElement;

    beforeEach(function () {
      datepickerElement = jQuery(datepickerSelector);

      monthsElement = datepickerElement.find(datepickerSelector + '-input-months .mtr-content .mtr-values .mtr-default-value');
      inputActivatorElement = datepickerElement.find(datepickerSelector + '-input-months .mtr-values');
      monthsInputElement = datepickerElement.find(datepickerSelector + '-input-months .mtr-content .mtr-input.months');
    });

    it('should be triggered', function () {
      var wheelEvent = createWheelEvent(120);

      spyEvent = spyOnEvent(monthsElement, 'wheel');
      monthsElement[0].dispatchEvent(wheelEvent);

      expect(spyEvent).toHaveBeenTriggered();
    });

    it('should increase the months when scrolled upwards', function (done) {
      var expectedMonth = (new Date(datepicker.getTimestamp() + (31 * 24 * 3600 * 1000)).getMonth() + 1).toString();

      var wheelEvent = createWheelEvent(120);

      spyEvent = spyOnEvent(monthsElement, 'wheel');
      monthsElement[0].dispatchEvent(wheelEvent);

      expect(spyEvent).toHaveBeenTriggered();

      setTimeout(function () {
        var datepickerMonth = datepicker.format('M');

        expect(datepickerMonth).toEqual(expectedMonth.toString());
        done();
      }, transitionBlurDelay * 2);
    });

    it('should decrease the months when scrolled downwards', function (done) {
      var expectedMonth = (new Date(datepicker.getTimestamp() - (31 * 24 * 3600 * 1000)).getMonth() + 1).toString();

      var wheelEvent = createWheelEvent(-120);

      spyEvent = spyOnEvent(monthsElement, 'wheel');
      monthsElement[0].dispatchEvent(wheelEvent);

      expect(spyEvent).toHaveBeenTriggered();

      setTimeout(function () {
        var datepickerMonth = datepicker.format('M');

        expect(datepickerMonth).toEqual(expectedMonth);
        done();
      }, transitionBlurDelay * 2);
    });

    it('should increase the months when scrolled upwards in the input', function (done) {
      var expectedMonth = new Date(datepicker.getTimestamp() + (31 * 24 * 3600 * 1000)).getMonth().toString();

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(monthsInputElement), 'focus');
      var spyEventWheel = spyOnEvent(monthsInputElement, 'wheel');
      var spyEventBlur = spyOnEvent(jQuery(monthsInputElement), 'blur');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var wheelEvent = createWheelEvent(120);
      var inputElementBlurEvent = createCustomEvent('blur');

      inputActivatorElement[0].dispatchEvent(clickEvent);
      monthsInputElement[0].dispatchEvent(inputElementFocusEvent);
      monthsInputElement[0].dispatchEvent(wheelEvent);
      monthsInputElement[0].dispatchEvent(inputElementBlurEvent);

      setTimeout(function () {
        var datepickerMonth = datepicker.format('M');

        expect(spyEventClick).toHaveBeenTriggered();
        expect(spyEventFocus).toHaveBeenTriggered();
        expect(spyEventWheel).toHaveBeenTriggered();
        expect(spyEventBlur).toHaveBeenTriggered();

        expect(datepickerMonth).toEqual(expectedMonth);
        done();
      }, transitionBlurDelay * 2);
    });

    it('should decrease the months when scrolled downwards in the input', function (done) {
      var expectedMonth = new Date(datepicker.getTimestamp() - (31 * 24 * 3600 * 1000)).getMonth().toString();

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(monthsInputElement), 'focus');
      var spyEventWheel = spyOnEvent(monthsInputElement, 'wheel');
      var spyEventBlur = spyOnEvent(jQuery(monthsInputElement), 'blur');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var wheelEvent = createWheelEvent(-120);
      var inputElementBlurEvent = createCustomEvent('blur');

      inputActivatorElement[0].dispatchEvent(clickEvent);
      monthsInputElement[0].dispatchEvent(inputElementFocusEvent);
      monthsInputElement[0].dispatchEvent(wheelEvent);
      monthsInputElement[0].dispatchEvent(inputElementBlurEvent);

      setTimeout(function () {
        var datepickerMonth = datepicker.format('M');

        expect(spyEventClick).toHaveBeenTriggered();
        expect(spyEventFocus).toHaveBeenTriggered();
        expect(spyEventWheel).toHaveBeenTriggered();
        expect(spyEventBlur).toHaveBeenTriggered();

        expect(datepickerMonth).toEqual(expectedMonth);
        done();
      }, transitionBlurDelay * 2);
    });
  })
});
