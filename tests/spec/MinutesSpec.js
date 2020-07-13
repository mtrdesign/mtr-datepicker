describe('MTR Datepicker: Minutes ', function () {
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
    it('format("m") should return minutes close to the current one', function () {
      var currentDate = new Date();
      var currentMinutes = currentDate.getMinutes();
      var datepickerMinutes = datepicker.format('m');

      if (currentMinutes.toString().length === 1) {
        currentMinutes = 10;
      } else {
        var minutesString = currentMinutes.toString();

        if (minutesString.charAt(0) === '5') {
          currentMinutes = '0';
        } else {
          currentMinutes = (parseInt(minutesString.charAt(0)) + 1) + '0';
        }
      }

      expect(datepickerMinutes).toEqual(currentMinutes.toString());
    });
  });

  describe('setter', function () {
    it('setMinutes() should work when you try to assign value 30', function () {
      var newMinutesValue = 30;
      datepicker.setMinutes(newMinutesValue);
      var datepickerMinutes = datepicker.format('m');

      expect(datepickerMinutes).toEqual(newMinutesValue.toString());
    });

    it('format("mm") should return 00 if the current minutes are 0', function () {
      var newMinutesValue = 0;
      var expectedMinutesValue = '00';
      datepicker.setMinutes(newMinutesValue);
      var datepickerMinutes = datepicker.format('mm');

      expect(datepickerMinutes).toEqual(expectedMinutesValue.toString());
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

      arrowUpElement = datepickerElement.find(datepickerSelector + '-input-minutes .mtr-arrow.up');
      arrowDownElement = datepickerElement.find(datepickerSelector + '-input-minutes .mtr-arrow.down');
      inputElement = datepickerElement.find(datepickerSelector + '-input-minutes input.mtr-input.minutes');
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
    it('on the upper arrow should change the minutes from 40 to 50', function () {
      var initMinutesValue = 40;
      var expectedMinutesValue = '50';

      datepicker.setMinutes(initMinutesValue);

      spyEvent = spyOnEvent(arrowUpElement, 'click');
      var clickEvent = createClickEvent();
      arrowUpElement[0].dispatchEvent(clickEvent);

      var datepickerGetterValue = datepicker.format('m');

      expect(datepickerGetterValue).toEqual(expectedMinutesValue);
      expect(inputElement).toHaveAttr('data-old-value', expectedMinutesValue);
    });

    /**
     * To be valid the result should be checked using getter, DOM attribute and DOM visible element
     */
    it('2 times on the upper arrow should change the minutes from 50 to 10', function () {
      var initMinutesValue = 50;
      var expectedMinutesValue = '10';

      datepicker.setMinutes(initMinutesValue);

      spyEvent = spyOnEvent(arrowUpElement, 'click');
      var clickEvent = createClickEvent();
      arrowUpElement[0].dispatchEvent(clickEvent);
      arrowUpElement[0].dispatchEvent(clickEvent);

      var datepickerGetterValue = datepicker.format('m');

      expect(datepickerGetterValue).toEqual(expectedMinutesValue);
      expect(inputElement).toHaveAttr('data-old-value', expectedMinutesValue);
    });

    it('on the down arrow to be triggered', function () {
      spyEvent = spyOnEvent(arrowDownElement, 'click');
      var clickEvent = createClickEvent();
      arrowDownElement[0].dispatchEvent(clickEvent);

      expect('click').toHaveBeenTriggeredOn(arrowDownElement);
      expect(spyEvent).toHaveBeenTriggered();
    });

    /**
     * To be valid the result should be checked using getter, DOM attribute and DOM visible element
     */
    it('on the down arrow should change the minutes from 40 to 30', function () {
      var initMinutesValue = 40;
      var expectedMinutesValue = '30';

      datepicker.setMinutes(initMinutesValue);

      spyEvent = spyOnEvent(arrowDownElement, 'click');
      var clickEvent = createClickEvent();
      arrowDownElement[0].dispatchEvent(clickEvent);

      var datepickerGetterValue = datepicker.format('m');

      expect(datepickerGetterValue).toEqual(expectedMinutesValue);
      expect(inputElement).toHaveAttr('data-old-value', expectedMinutesValue);
    });

    /**
     * To be valid the result should be checked using getter, DOM attribute and DOM visible element
     */
    it('2 times on the down arrow should change the minutes from 10 to 50', function () {
      var initMinutesValue = 10;
      var expectedMinutesValue = '50';

      datepicker.setMinutes(initMinutesValue);

      spyEvent = spyOnEvent(arrowDownElement, 'click');
      var clickEvent = createClickEvent();
      arrowDownElement[0].dispatchEvent(clickEvent);
      arrowDownElement[0].dispatchEvent(clickEvent);

      var datepickerGetterValue = datepicker.format('m');

      expect(datepickerGetterValue).toEqual(expectedMinutesValue);
      expect(inputElement).toHaveAttr('data-old-value', expectedMinutesValue);
    });
  });

  describe('keyboard input', function () {
    var datepickerElement;
    var inputElement;
    var inputActivatorElement;
    var transitionBlurDelay = 600; // Keep it equal with this one in the code

    beforeEach(function (done) {
      datepickerElement = jQuery(datepickerSelector);

      inputActivatorElement = datepickerElement.find(datepickerSelector + '-input-minutes .mtr-values');
      inputElement = datepickerElement.find(datepickerSelector + '-input-minutes input.mtr-input.minutes');

      setTimeout(function () {
        done();
      }, transitionBlurDelay * 2);
    });

    it('should change the minutes to 30', function (done) {
      var newMinutesValue = 30;
      var expectedMinutes = '30';

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(inputElement), 'focus');
      var spyEventBlur = spyOnEvent(jQuery(inputElement), 'blur');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var inputElementBlurEvent = createCustomEvent('blur');

      inputActivatorElement[0].dispatchEvent(clickEvent);
      inputElement[0].dispatchEvent(inputElementFocusEvent);
      inputElement.val(newMinutesValue);
      inputElement[0].dispatchEvent(inputElementBlurEvent);

      setTimeout(function () {
        var datepickerMinutes = datepicker.format('m');

        expect(spyEventClick).toHaveBeenTriggered();
        expect(spyEventFocus).toHaveBeenTriggered();
        expect(spyEventBlur).toHaveBeenTriggered();

        expect(datepickerMinutes).toEqual(expectedMinutes);
        done();
      }, transitionBlurDelay);
    });

    // TODO: Test with minutes input with leading zero

    it('should NOT change the minutes to 70, it should keep the old value', function (done) {
      var newMinutesValue = '70';
      var expectedMinutes = datepicker.format('mm');

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(inputElement), 'focus');
      var spyEventBlur = spyOnEvent(jQuery(inputElement), 'blur');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var inputElementBlurEvent = createCustomEvent('blur');

      inputActivatorElement[0].dispatchEvent(clickEvent);
      inputElement[0].dispatchEvent(inputElementFocusEvent);
      inputElement.val(newMinutesValue);
      inputElement[0].dispatchEvent(inputElementBlurEvent);

      expect(spyEventClick).toHaveBeenTriggered();
      expect(spyEventFocus).toHaveBeenTriggered();
      expect(spyEventBlur).toHaveBeenTriggered();

      setTimeout(function () {
        var datepickerMinutes = datepicker.format('mm');

        expect(datepickerMinutes).toEqual(expectedMinutes);
        done();
      }, transitionBlurDelay);
    });

    it('should apply the change of the minutes to 30 on enter keypress ', function (done) {
      var newMinutesValue = 30;
      var expectedMinutes = '30';

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(inputElement), 'focus');
      var spyEventKeyup = spyOnEvent(jQuery(inputElement), 'keyup');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var inputElementKeyupEvent = createKeyupEvent(13);

      inputActivatorElement[0].dispatchEvent(clickEvent);
      inputElement[0].dispatchEvent(inputElementFocusEvent);
      inputElement.val(newMinutesValue);
      inputElement[0].dispatchEvent(inputElementKeyupEvent);

      setTimeout(function () {
        var datepickerMinutes = datepicker.format('mm');

        expect(spyEventClick).toHaveBeenTriggered();
        expect(spyEventFocus).toHaveBeenTriggered();
        expect(spyEventKeyup).toHaveBeenTriggered();

        expect(datepickerMinutes).toEqual(expectedMinutes);
        done();
      }, transitionBlurDelay * 2);
    });

    it('should NOT change the minutes to 78 on enter keypress, it should keep the old value', function (done) {
      var newMinutesValue = '78';
      var expectedMinutes = datepicker.format('mm');

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(inputElement), 'focus');
      var spyEventKeyup = spyOnEvent(jQuery(inputElement), 'keyup');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var inputElementKeyupEvent = createCustomEvent('keyup');

      inputActivatorElement[0].dispatchEvent(clickEvent);
      inputElement[0].dispatchEvent(inputElementFocusEvent);
      inputElement.val(newMinutesValue);
      inputElement[0].dispatchEvent(inputElementKeyupEvent);

      expect(spyEventClick).toHaveBeenTriggered();
      expect(spyEventFocus).toHaveBeenTriggered();
      expect(spyEventKeyup).toHaveBeenTriggered();

      setTimeout(function () {
        var datepickerMinutes = datepicker.format('mm');

        expect(datepickerMinutes).toEqual(expectedMinutes);
        done();
      }, transitionBlurDelay * 2);
    });
  });

  describe('wheel move', function () {
    var spyEvent;
    var datepickerElement;
    var minutesElement;
    var inputActivatorElement;
    var minutesInputElement;

    beforeEach(function () {
      datepickerElement = jQuery(datepickerSelector);

      minutesElement = datepickerElement.find(datepickerSelector + '-input-minutes .mtr-content .mtr-values .mtr-default-value');
      inputActivatorElement = datepickerElement.find(datepickerSelector + '-input-minutes .mtr-values');
      minutesInputElement = datepickerElement.find(datepickerSelector + '-input-minutes .mtr-content .mtr-input.minutes');
    });

    it('should be triggered', function () {
      var wheelEvent = createWheelEvent(120);

      spyEvent = spyOnEvent(minutesElement, 'wheel');
      minutesElement[0].dispatchEvent(wheelEvent);

      expect(spyEvent).toHaveBeenTriggered();
    });

    it('should increase the minutes when scrolled upwards', function (done) {
      var expectedMinutes = new Date(datepicker.getTimestamp() + (10 * 60 * 1000)).getMinutes().toString();

      var wheelEvent = createWheelEvent(120);

      spyEvent = spyOnEvent(minutesElement, 'wheel');
      minutesElement[0].dispatchEvent(wheelEvent);

      expect(spyEvent).toHaveBeenTriggered();

      setTimeout(function () {
        var datepickerMinutes = datepicker.format('m');

        expect(datepickerMinutes.toString()).toEqual(expectedMinutes.toString());
        done();
      }, transitionBlurDelay * 2);
    });

    it('should decrease the minutes when scrolled downwards', function (done) {
      var expectedMinutes = new Date(datepicker.getTimestamp() - (10 * 60 * 1000)).getMinutes().toString();

      var wheelEvent = createWheelEvent(-120);

      spyEvent = spyOnEvent(minutesElement, 'wheel');
      minutesElement[0].dispatchEvent(wheelEvent);

      expect(spyEvent).toHaveBeenTriggered();

      setTimeout(function () {
        var datepickerMinutes = datepicker.format('m');

        expect(datepickerMinutes).toEqual(expectedMinutes);
        done();
      }, transitionBlurDelay * 2);
    });

    it('should increase the minutes when scrolled upwards in the input', function (done) {
      var expectedMinutes = new Date(datepicker.getTimestamp() + (10 * 60 * 1000)).getMinutes().toString();

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(minutesInputElement), 'focus');
      var spyEventWheel = spyOnEvent(minutesInputElement, 'wheel');
      var spyEventBlur = spyOnEvent(jQuery(minutesInputElement), 'blur');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var wheelEvent = createWheelEvent(120);
      var inputElementBlurEvent = createCustomEvent('blur');

      inputActivatorElement[0].dispatchEvent(clickEvent);
      minutesInputElement[0].dispatchEvent(inputElementFocusEvent);
      minutesInputElement[0].dispatchEvent(wheelEvent);
      minutesInputElement[0].dispatchEvent(inputElementBlurEvent);

      setTimeout(function () {
        var datepickerMinutes = datepicker.format('m');

        expect(spyEventClick).toHaveBeenTriggered();
        expect(spyEventFocus).toHaveBeenTriggered();
        expect(spyEventWheel).toHaveBeenTriggered();
        expect(spyEventBlur).toHaveBeenTriggered();

        expect(datepickerMinutes).toEqual(expectedMinutes);
        done();
      }, transitionBlurDelay * 2);
    });

    it('should decrease the minutes when scrolled downwards in the input', function (done) {
      var expectedMinutes = new Date(datepicker.getTimestamp() - (10 * 60 * 1000)).getMinutes().toString();

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(minutesInputElement), 'focus');
      var spyEventWheel = spyOnEvent(minutesInputElement, 'wheel');
      var spyEventBlur = spyOnEvent(jQuery(minutesInputElement), 'blur');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var wheelEvent = createWheelEvent(-120);
      var inputElementBlurEvent = createCustomEvent('blur');

      inputActivatorElement[0].dispatchEvent(clickEvent);
      minutesInputElement[0].dispatchEvent(inputElementFocusEvent);
      minutesInputElement[0].dispatchEvent(wheelEvent);
      minutesInputElement[0].dispatchEvent(inputElementBlurEvent);

      setTimeout(function () {
        var datepickerMinutes = datepicker.format('m');

        expect(spyEventClick).toHaveBeenTriggered();
        expect(spyEventFocus).toHaveBeenTriggered();
        expect(spyEventWheel).toHaveBeenTriggered();
        expect(spyEventBlur).toHaveBeenTriggered();

        expect(datepickerMinutes).toEqual(expectedMinutes);
        done();
      }, transitionBlurDelay * 2);
    });
  });
});
