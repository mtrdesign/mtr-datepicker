describe('MTR Datepicker: Dates ', function () {
  var datepickerSelectorName = 'datepicker';
  var datepickerSelector = '#' + datepickerSelectorName;
  var datepicker;
  // var transitionBlurDelay = 600; // Keep it equal with this one in the code

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
    it('format("D") should return the current date', function () {
      var currentDate = new Date();
      var datepickerDay = datepicker.format('D');

      if (currentDate.getHours() === 23 && currentDate.getMinutes() >= 50) {
        currentDate.setDate(currentDate.getDate() + 1);
      }

      var currentDay = currentDate.getDate();

      expect(datepickerDay).toEqual(currentDay.toString());
    });
  });

  describe('setter', function () {
    it('setDate() should work when you try to assign value 13', function () {
      var newDateValue = 13;
      datepicker.setDate(newDateValue);

      var datepickerDate = datepicker.format('D');

      expect(datepickerDate).toEqual(newDateValue.toString());
    });

    it('format("DD") should return the current date with 2 digits', function () {
      var currentDate = new Date();

      if (currentDate.getHours() === 23 && currentDate.getMinutes() >= 50) {
        currentDate.setDate(currentDate.getDate() + 1);
      }

      var expectedDateValue = currentDate.getDate();
      expectedDateValue = (expectedDateValue <= 9) ? '0' + expectedDateValue : expectedDateValue;
      var datepickerDateValue = datepicker.format('DD');

      expect(datepickerDateValue).toEqual(expectedDateValue.toString());
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

      arrowUpElement = datepickerElement.find(datepickerSelector + '-input-dates .mtr-arrow.up');
      arrowDownElement = datepickerElement.find(datepickerSelector + '-input-dates .mtr-arrow.down');
      inputElement = datepickerElement.find(datepickerSelector + '-input-dates input.mtr-input.dates');
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
    it('on the upper arrow should change the date from 3 to 4', function () {
      var initDateValue = 3;
      var expectedDateValue = '4';

      datepicker.setDate(initDateValue);

      spyEvent = spyOnEvent(arrowUpElement, 'click');
      var clickEvent = createClickEvent();
      arrowUpElement[0].dispatchEvent(clickEvent);

      var datepickerGetterValue = datepicker.format('D');

      expect(datepickerGetterValue).toEqual(expectedDateValue);
      expect(inputElement).toHaveAttr('data-old-value', expectedDateValue);
    });

    /**
     * To be valid the result should be checked using getter, DOM attribute and DOM visible element
     */
    it('2 times on the upper arrow should change the date from 8 to 10', function () {
      var initDateValue = 8;
      var expectedDateValue = 10;

      datepicker.setDate(initDateValue);

      spyEvent = spyOnEvent(arrowUpElement, 'click');
      var clickEvent = createClickEvent();
      arrowUpElement[0].dispatchEvent(clickEvent);
      arrowUpElement[0].dispatchEvent(clickEvent);

      var datepickerGetterValue = datepicker.format('D');

      expect(datepickerGetterValue).toEqual(expectedDateValue.toString());
      expect(inputElement).toHaveAttr('data-old-value', expectedDateValue.toString());
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
    it('on the down arrow should change the date from 3 to 2', function () {
      var initDateValue = 3;
      var expectedDateValue = '2';

      datepicker.setDate(initDateValue);

      spyEvent = spyOnEvent(arrowDownElement, 'click');
      var clickEvent = createClickEvent();
      arrowDownElement[0].dispatchEvent(clickEvent);

      var datepickerGetterValue = datepicker.format('D');

      expect(datepickerGetterValue).toEqual(expectedDateValue);
      expect(inputElement).toHaveAttr('data-old-value', expectedDateValue);
    });

    /**
     * To be valid the result should be checked using getter, DOM attribute and DOM visible element
     */
    it('3 times on the upper arrow should change the date from 8 to 5', function () {
      var initDateValue = 8;
      var expectedDateValue = 5;

      datepicker.setDate(initDateValue);

      spyEvent = spyOnEvent(arrowDownElement, 'click');
      var clickEvent = createClickEvent();
      arrowDownElement[0].dispatchEvent(clickEvent);
      arrowDownElement[0].dispatchEvent(clickEvent);
      arrowDownElement[0].dispatchEvent(clickEvent);

      var datepickerGetterValue = datepicker.format('D');

      expect(datepickerGetterValue).toEqual(expectedDateValue.toString());
      expect(inputElement).toHaveAttr('data-old-value', expectedDateValue.toString());
    });
  });

  describe('keyboard input', function () {
    var datepickerElement;
    var inputElement;
    var inputActivatorElement;
    var transitionBlurDelay = 600; // Keep it equal with this one in the code

    beforeEach(function (done) {
      datepickerElement = jQuery(datepickerSelector);

      inputActivatorElement = datepickerElement.find(datepickerSelector + '-input-dates .mtr-values');
      inputElement = datepickerElement.find(datepickerSelector + '-input-dates input.mtr-input.dates');

      setTimeout(function () {
        done();
      }, transitionBlurDelay * 2);
    });

    it('should change the date to 8', function (done) {
      var newDateValue = 8;
      var expectedDate = '08';

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(inputElement), 'focus');
      var spyEventBlur = spyOnEvent(jQuery(inputElement), 'blur');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var inputElementBlurEvent = createCustomEvent('blur');

      inputActivatorElement[0].dispatchEvent(clickEvent);
      inputElement[0].dispatchEvent(inputElementFocusEvent);
      inputElement.val(newDateValue);
      inputElement[0].dispatchEvent(inputElementBlurEvent);

      setTimeout(function () {
        var datepickerDate = datepicker.format('DD');

        expect(spyEventClick).toHaveBeenTriggered();
        expect(spyEventFocus).toHaveBeenTriggered();
        expect(spyEventBlur).toHaveBeenTriggered();

        expect(datepickerDate).toEqual(expectedDate);
        done();
      }, transitionBlurDelay);
    });

    it('should change the date to 06', function (done) {
      var newDateValue = '06';
      var expectedDate = '6';

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(inputElement), 'focus');
      var spyEventBlur = spyOnEvent(jQuery(inputElement), 'blur');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var inputElementBlurEvent = createCustomEvent('blur');

      inputActivatorElement[0].dispatchEvent(clickEvent);
      inputElement[0].dispatchEvent(inputElementFocusEvent);
      inputElement.val(newDateValue);
      inputElement[0].dispatchEvent(inputElementBlurEvent);

      setTimeout(function () {
        var datepickerDate = datepicker.format('D');

        expect(spyEventClick).toHaveBeenTriggered();
        expect(spyEventFocus).toHaveBeenTriggered();
        expect(spyEventBlur).toHaveBeenTriggered();

        expect(datepickerDate).toEqual(expectedDate);
        done();
      }, transitionBlurDelay);
    });

    it('should NOT change the date to 48, it should keep the old value', function (done) {
      var newDateValue = '48';
      var expectedDate = datepicker.format('D');

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(inputElement), 'focus');
      var spyEventBlur = spyOnEvent(jQuery(inputElement), 'blur');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var inputElementBlurEvent = createCustomEvent('blur');

      inputActivatorElement[0].dispatchEvent(clickEvent);
      inputElement[0].dispatchEvent(inputElementFocusEvent);
      inputElement.val(newDateValue);
      inputElement[0].dispatchEvent(inputElementBlurEvent);

      expect(spyEventClick).toHaveBeenTriggered();
      expect(spyEventFocus).toHaveBeenTriggered();
      expect(spyEventBlur).toHaveBeenTriggered();

      setTimeout(function () {
        var datepickerDate = datepicker.format('D');

        expect(datepickerDate).toEqual(expectedDate);
        done();
      }, transitionBlurDelay);
    });

    it('should apply the change of the date to 13 on enter keypress ', function (done) {
      var newDateValue = 13;
      var expectedDate = '13';

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(inputElement), 'focus');
      var spyEventKeyup = spyOnEvent(jQuery(inputElement), 'keyup');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var inputElementKeyupEvent = createKeyupEvent(13);

      inputActivatorElement[0].dispatchEvent(clickEvent);
      inputElement[0].dispatchEvent(inputElementFocusEvent);
      inputElement.val(newDateValue);
      inputElement[0].dispatchEvent(inputElementKeyupEvent);

      setTimeout(function () {
        var datepickerDate = datepicker.format('DD');

        expect(spyEventClick).toHaveBeenTriggered();
        expect(spyEventFocus).toHaveBeenTriggered();
        expect(spyEventKeyup).toHaveBeenTriggered();

        expect(datepickerDate).toEqual(expectedDate);
        done();
      }, transitionBlurDelay * 2);
    });

    it('should NOT change the date to 52 on enter keypress, it should keep the old value', function (done) {
      var newDateValue = '52';
      var expectedDate = datepicker.format('D');

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(inputElement), 'focus');
      var spyEventKeyup = spyOnEvent(jQuery(inputElement), 'keyup');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var inputElementKeyupEvent = createCustomEvent('keyup');

      inputActivatorElement[0].dispatchEvent(clickEvent);
      inputElement[0].dispatchEvent(inputElementFocusEvent);
      inputElement.val(newDateValue);
      inputElement[0].dispatchEvent(inputElementKeyupEvent);

      expect(spyEventClick).toHaveBeenTriggered();
      expect(spyEventFocus).toHaveBeenTriggered();
      expect(spyEventKeyup).toHaveBeenTriggered();

      setTimeout(function () {
        var datepickerDate = datepicker.format('D');

        expect(datepickerDate).toEqual(expectedDate);
        done();
      }, transitionBlurDelay * 2);
    });
  });

  describe('wheel move', function () {
    var spyEvent;
    var datepickerElement;
    var datesElement;

    beforeEach(function () {
      datepickerElement = jQuery(datepickerSelector);

      datesElement = datepickerElement.find(datepickerSelector + '-input-dates .mtr-content .mtr-values');
    });

    it('should be triggered', function () {
      var wheelEvent = createWheelEvent(100);

      spyEvent = spyOnEvent(datesElement, 'wheel');
      datesElement[0].dispatchEvent(wheelEvent);

      expect(spyEvent).toHaveBeenTriggered();
    });

    // TODO: Fix me, the wheel event is not performed
    // it('should increase the dates when scrolled upwards', function (done) {
    //   var expectedDate = new Date(datepicker.getTimestamp() + (24 * 3600 * 1000)).getDate().toString();

    //   var wheelEvent = createWheelEvent(-100);

    //   spyEvent = spyOnEvent(datesElement, 'wheel');
    //   datesElement[0].dispatchEvent(wheelEvent);

    //   expect(spyEvent).toHaveBeenTriggered();

    //   setTimeout(function () {
    //     var datepickerDate = datepicker.format('D');

    //     expect(datepickerDate.toString()).toEqual(expectedDate.toString());
    //     done();
    //   }, transitionBlurDelay * 2);
    // });

    // TODO: Fix me, the wheel event is not performed
    // it('should decrease the dates when scrolled downwards', function (done) {
    //   var expectedDate = new Date(datepicker.getTimestamp() - (24 * 3600 * 1000)).getDate().toString();

    //   var wheelEvent = createWheelEvent(10);

    //   spyEvent = spyOnEvent(datesElement, 'wheel');
    //   datesElement[0].dispatchEvent(wheelEvent);

    //   expect(spyEvent).toHaveBeenTriggered();

    //   setTimeout(function () {
    //     var datepickerDate = datepicker.format('D');

    //     expect(datepickerDate).toEqual(expectedDate);
    //     done();
    //   }, transitionBlurDelay * 2);
    // });
  })
});
