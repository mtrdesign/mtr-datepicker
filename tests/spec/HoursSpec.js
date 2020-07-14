describe('MTR Datepicker: Hours ', function () {
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
    it('format("H") should return the same hour as the current one', function () {
      var currentDate = new Date();
      var currentHour = currentDate.getHours();

      // Maybe we are in the next hour
      if (currentDate.getMinutes() >= 50) {
        currentHour++;
      }

      if (currentHour === 24) {
        currentHour = 0;
      }

      var datepickerHour = datepicker.format('H');

      expect(datepickerHour).toEqual(currentHour.toString());
    });

    it('format("HH") should return the same hour as the current one but with leading 0', function () {
      var currentDate = new Date();
      var currentHour = currentDate.getHours();
      var datepickerHour = datepicker.format('HH');

      // Maybe we are in the next hour
      if (currentDate.getMinutes() >= 50) {
        currentHour++;
      }

      if (currentHour < 10) {
        currentHour = '0' + currentHour;
      }

      if (currentHour === 24) {
        currentHour = '00';
      }

      expect(datepickerHour).toEqual(currentHour.toString());
    });
  });

  describe('setter', function () {
    it('setHours() should work when you try to assign AM value 5', function () {
      var newHourValue = 5;
      datepicker.setHours(newHourValue);
      var datepickerHour = datepicker.format('H');

      expect(datepickerHour).toEqual(newHourValue.toString());
    });

    it('setHours() should work when you try to assign PM value 18', function () {
      var newHourValue = 18;
      datepicker.setHours(newHourValue);
      var datepickerHour = datepicker.format('HH');

      expect(datepickerHour).toEqual(newHourValue.toString());
    });

    it('format("HH") should return 05 if the current hour is 5', function () {
      var newHourValue = 5;
      var expectedHourValue = '05';
      datepicker.setHours(newHourValue);
      var datepickerHour = datepicker.format('HH');

      expect(datepickerHour).toEqual(expectedHourValue.toString());
    });

    it('format("H") should not return 09 if the current hour is 9', function () {
      var newHourValue = 9;
      var expectedHourValueWrong = '09';
      var expectedHourValueCorrect = '9';
      datepicker.setHours(newHourValue);
      var datepickerHour = datepicker.format('H');

      expect(datepickerHour).not.toEqual(expectedHourValueWrong.toString());
      expect(datepickerHour).toEqual(expectedHourValueCorrect.toString());
    });
  });

  describe('click event', function () {
    var spyEvent;
    var datepickerElement;
    var arrowUpElement;
    var arrowDownElement;
    var inputElement;

    beforeEach(function () {
      datepickerElement = jQuery(datepickerSelector);

      arrowUpElement = datepickerElement.find(datepickerSelector + '-input-hours .mtr-arrow.up');
      arrowDownElement = datepickerElement.find(datepickerSelector + '-input-hours .mtr-arrow.down');
      inputElement = datepickerElement.find(datepickerSelector + '-input-hours input.mtr-input.hours');
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
    it('on the upper arrow should change the hour from 5 to 6', function () {
      var initHourValue = 5;
      var expectedHourValue = '6';

      datepicker.setHours(initHourValue);

      spyEvent = spyOnEvent(arrowUpElement, 'click');
      var clickEvent = createClickEvent();
      arrowUpElement[0].dispatchEvent(clickEvent);

      var datepickerGetterValue = datepicker.format('H');

      // expect('click').toHaveBeenTriggeredOn(arrowUpElement);
      // expect(spyEvent).toHaveBeenTriggered();

      expect(datepickerGetterValue).toEqual(expectedHourValue);
      expect(inputElement).toHaveAttr('data-old-value', expectedHourValue);
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
    it('on the down arrow should change the hour from 5 to 4', function () {
      var initHourValue = 5;
      var expectedHourValue = '4';

      datepicker.setHours(initHourValue);

      spyEvent = spyOnEvent(arrowDownElement, 'click');
      var clickEvent = createClickEvent();
      arrowDownElement[0].dispatchEvent(clickEvent);

      var datepickerGetterValue = datepicker.format('H');

      // expect('click').toHaveBeenTriggeredOn(arrowDownElement);
      // expect(spyEvent).toHaveBeenTriggered();

      expect(datepickerGetterValue).toEqual(expectedHourValue);
      expect(inputElement).toHaveAttr('data-old-value', expectedHourValue);
    });
  });

  describe('keyboard input', function () {
    var datepickerElement;
    var inputElement;
    var inputActivatorElement;

    beforeEach(function (done) {
      datepickerElement = jQuery(datepickerSelector);

      inputActivatorElement = datepickerElement.find(datepickerSelector + '-input-hours .mtr-values');
      inputElement = datepickerElement.find(datepickerSelector + '-input-hours input.mtr-input.hours');

      setTimeout(function () {
        done();
      }, transitionBlurDelay * 2);
    });

    it('should change the hour to 3', function (done) {
      var newHourValue = 3;
      var expectedHour = '3';

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(inputElement), 'focus');
      var spyEventBlur = spyOnEvent(jQuery(inputElement), 'blur');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var inputElementBlurEvent = createCustomEvent('blur');

      inputActivatorElement[0].dispatchEvent(clickEvent);
      inputElement[0].dispatchEvent(inputElementFocusEvent);
      inputElement.val(newHourValue);
      inputElement[0].dispatchEvent(inputElementBlurEvent);

      setTimeout(function () {
        var datepickerHour = datepicker.format('H');

        expect(spyEventClick).toHaveBeenTriggered();
        expect(spyEventFocus).toHaveBeenTriggered();
        expect(spyEventBlur).toHaveBeenTriggered();

        expect(datepickerHour).toEqual(expectedHour);
        done();
      }, transitionBlurDelay);
    });

    it('should change the hour to 05', function (done) {
      var newHourValue = '05';
      var expectedHour = '5';

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(inputElement), 'focus');
      var spyEventBlur = spyOnEvent(jQuery(inputElement), 'blur');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var inputElementBlurEvent = createCustomEvent('blur');

      inputActivatorElement[0].dispatchEvent(clickEvent);
      inputElement[0].dispatchEvent(inputElementFocusEvent);
      inputElement.val(newHourValue);
      inputElement[0].dispatchEvent(inputElementBlurEvent);

      setTimeout(function () {
        var datepickerHour = datepicker.format('H');

        expect(spyEventClick).toHaveBeenTriggered();
        expect(spyEventFocus).toHaveBeenTriggered();
        expect(spyEventBlur).toHaveBeenTriggered();

        expect(datepickerHour).toEqual(expectedHour);
        done();
      }, transitionBlurDelay);
    });

    it('should NOT change the hour to 15, it should keep the old value', function (done) {
      var newHourValue = '15';
      var expectedHour = datepicker.format('h');

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(inputElement), 'focus');
      var spyEventBlur = spyOnEvent(jQuery(inputElement), 'blur');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var inputElementBlurEvent = createCustomEvent('blur');

      inputActivatorElement[0].dispatchEvent(clickEvent);
      inputElement[0].dispatchEvent(inputElementFocusEvent);
      inputElement.val(newHourValue);
      inputElement[0].dispatchEvent(inputElementBlurEvent);

      expect(spyEventClick).toHaveBeenTriggered();
      expect(spyEventFocus).toHaveBeenTriggered();
      expect(spyEventBlur).toHaveBeenTriggered();

      setTimeout(function () {
        var datepickerHour = datepicker.format('h');

        expect(datepickerHour).toEqual(expectedHour);
        done();
      }, transitionBlurDelay);
    });

    it('should apply the change of the hours to 8 on enter keypress ', function (done) {
      var newHourValue = 8;
      var expectedHour = '8';

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(inputElement), 'focus');
      var spyEventKeyup = spyOnEvent(jQuery(inputElement), 'keyup');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var inputElementKeyupEvent = createKeyupEvent(13);

      inputActivatorElement[0].dispatchEvent(clickEvent);
      inputElement[0].dispatchEvent(inputElementFocusEvent);
      inputElement.val(newHourValue);
      inputElement[0].dispatchEvent(inputElementKeyupEvent);

      setTimeout(function () {
        var datepickerHour = datepicker.format('h');

        expect(spyEventClick).toHaveBeenTriggered();
        expect(spyEventFocus).toHaveBeenTriggered();
        expect(spyEventKeyup).toHaveBeenTriggered();

        expect(datepickerHour).toEqual(expectedHour);
        done();
      }, transitionBlurDelay * 2);
    });

    it('should NOT change the hour to 28 on enter keypress, it should keep the old value', function (done) {
      var newHourValue = '52';
      var expectedHour = datepicker.format('h');

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(inputElement), 'focus');
      var spyEventKeyup = spyOnEvent(jQuery(inputElement), 'keyup');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var inputElementKeyupEvent = createCustomEvent('keyup');

      inputActivatorElement[0].dispatchEvent(clickEvent);
      inputElement[0].dispatchEvent(inputElementFocusEvent);
      inputElement.val(newHourValue);
      inputElement[0].dispatchEvent(inputElementKeyupEvent);

      expect(spyEventClick).toHaveBeenTriggered();
      expect(spyEventFocus).toHaveBeenTriggered();
      expect(spyEventKeyup).toHaveBeenTriggered();

      setTimeout(function () {
        var datepickerHour = datepicker.format('h');

        expect(datepickerHour).toEqual(expectedHour);
        done();
      }, transitionBlurDelay * 2);
    });
  });

  describe('wheel move', function () {
    var spyEvent;
    var datepickerElement;
    var hoursElement;
    var hoursInputElement;
    var inputActivatorElement;

    beforeEach(function () {
      datepickerElement = jQuery(datepickerSelector);

      hoursElement = datepickerElement.find(datepickerSelector + '-input-hours .mtr-content .mtr-values .mtr-default-value');
      inputActivatorElement = datepickerElement.find(datepickerSelector + '-input-hours .mtr-values');
      hoursInputElement = datepickerElement.find(datepickerSelector + '-input-hours .mtr-content .mtr-input.hours');
    });

    it('should be triggered', function () {
      var wheelEvent = createWheelEvent(120);

      spyEvent = spyOnEvent(hoursElement, 'wheel');
      hoursElement[0].dispatchEvent(wheelEvent);

      expect(spyEvent).toHaveBeenTriggered();
    });

    it('should increase the hours when scrolled upwards', function (done) {
      var expectedHour = new Date(datepicker.getTimestamp() + (3600 * 1000)).getHours() % 12 || 12;

      var wheelEvent = createWheelEvent(120);

      spyEvent = spyOnEvent(hoursElement, 'wheel');
      hoursElement[0].dispatchEvent(wheelEvent);

      expect(spyEvent).toHaveBeenTriggered();

      setTimeout(function () {
        var datepickerHour = datepicker.format('h');

        expect(datepickerHour.toString()).toEqual(expectedHour.toString());
        done();
      }, transitionBlurDelay * 2);
    });

    it('should decrease the hours when scrolled downwards', function (done) {
      var expectedHour = new Date(datepicker.getTimestamp() - (3600 * 1000)).getHours() % 12 || 12;

      var wheelEvent = createWheelEvent(-120);

      spyEvent = spyOnEvent(hoursElement, 'wheel');

      hoursElement[0].dispatchEvent(wheelEvent);

      expect(spyEvent).toHaveBeenTriggered();

      setTimeout(function () {
        var datepickerHour = datepicker.format('h');

        expect(datepickerHour).toEqual(expectedHour.toString());
        done();
      }, transitionBlurDelay * 2);
    });

    it('should increase the hours when scrolled upwards in the input', function (done) {
      var expectedHour = new Date(datepicker.getTimestamp() + (3600 * 1000)).getHours() % 12 || 12;

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(hoursInputElement), 'focus');
      var spyEventWheel = spyOnEvent(hoursInputElement, 'wheel');
      var spyEventBlur = spyOnEvent(jQuery(hoursInputElement), 'blur');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var wheelEvent = createWheelEvent(120);
      var inputElementBlurEvent = createCustomEvent('blur');

      inputActivatorElement[0].dispatchEvent(clickEvent);
      hoursInputElement[0].dispatchEvent(inputElementFocusEvent);
      hoursInputElement[0].dispatchEvent(wheelEvent);
      hoursInputElement[0].dispatchEvent(inputElementBlurEvent);

      setTimeout(function () {
        var datepickerHour = datepicker.format('h');

        expect(spyEventClick).toHaveBeenTriggered();
        expect(spyEventFocus).toHaveBeenTriggered();
        expect(spyEventWheel).toHaveBeenTriggered();
        expect(spyEventBlur).toHaveBeenTriggered();

        expect(datepickerHour).toEqual(expectedHour.toString());
        done();
      }, transitionBlurDelay * 2);
    });

    it('should decrease the hours when scrolled downwards in the input', function (done) {
      var expectedHour = new Date(datepicker.getTimestamp() - (3600 * 1000)).getHours() % 12 || 12;

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(hoursInputElement), 'focus');
      var spyEventWheel = spyOnEvent(hoursInputElement, 'wheel');
      var spyEventBlur = spyOnEvent(jQuery(hoursInputElement), 'blur');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var wheelEvent = createWheelEvent(-120);
      var inputElementBlurEvent = createCustomEvent('blur');

      inputActivatorElement[0].dispatchEvent(clickEvent);
      hoursInputElement[0].dispatchEvent(inputElementFocusEvent);
      hoursInputElement[0].dispatchEvent(wheelEvent);
      hoursInputElement[0].dispatchEvent(inputElementBlurEvent);

      setTimeout(function () {
        var datepickerHour = datepicker.format('h');

        expect(spyEventClick).toHaveBeenTriggered();
        expect(spyEventFocus).toHaveBeenTriggered();
        expect(spyEventWheel).toHaveBeenTriggered();
        expect(spyEventBlur).toHaveBeenTriggered();

        expect(datepickerHour).toEqual(expectedHour.toString());
        done();
      }, transitionBlurDelay * 2);
    });
  });
});
