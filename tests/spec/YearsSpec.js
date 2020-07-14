describe('MTR Datepicker: Years ', function () {
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
    it('format("Y") should return the current year', function () {
      var currentDate = new Date();
      var currentYear = currentDate.getFullYear();
      var datepickerYear = datepicker.format('Y');

      expect(datepickerYear).toEqual(currentYear.toString());
    });
  });

  describe('setter', function () {
    it('setYear() should work when you try to assign value 2013', function () {
      var newYearValue = 2013;
      datepicker.setYear(newYearValue);

      var datepickerYear = datepicker.format('Y');

      expect(datepickerYear).toEqual(newYearValue.toString());
    });

    it('format("YY") should return the last 2 digits of the current year', function () {
      var currentDate = new Date();
      var expectedYearValue = currentDate.getFullYear().toString().substr(2);

      var datepickerYearValue = datepicker.format('YY');

      expect(datepickerYearValue).toEqual(expectedYearValue.toString());
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

      arrowUpElement = datepickerElement.find(datepickerSelector + '-input-years .mtr-arrow.up');
      arrowDownElement = datepickerElement.find(datepickerSelector + '-input-years .mtr-arrow.down');
      inputElement = datepickerElement.find(datepickerSelector + '-input-years input.mtr-input.years');
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
    it('on the upper arrow should change the year from 2010 to 2011', function () {
      var initYearValue = 2010;
      var expectedYearValue = '2011';

      datepicker.setYear(initYearValue);

      spyEvent = spyOnEvent(arrowUpElement, 'click');
      var clickEvent = createClickEvent();
      arrowUpElement[0].dispatchEvent(clickEvent);

      var datepickerGetterValue = datepicker.format('Y');

      expect(datepickerGetterValue).toEqual(expectedYearValue);
      expect(inputElement).toHaveAttr('data-old-value', expectedYearValue);
    });

    /**
     * To be valid the result should be checked using getter, DOM attribute and DOM visible element
     */
    it('2 times on the upper arrow should change the year from 2012 to 2014', function () {
      var initYearValue = 2012;
      var expectedYearValue = 2014;

      datepicker.setYear(initYearValue);

      spyEvent = spyOnEvent(arrowUpElement, 'click');
      var clickEvent = createClickEvent();
      arrowUpElement[0].dispatchEvent(clickEvent);
      arrowUpElement[0].dispatchEvent(clickEvent);

      var datepickerGetterValue = datepicker.format('Y');

      expect(datepickerGetterValue).toEqual(expectedYearValue.toString());
      expect(inputElement).toHaveAttr('data-old-value', expectedYearValue.toString());
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
    it('on the down arrow should change the year from 2010 to 2009', function () {
      var initYearValue = 2010;
      var expectedYearValue = '2009';

      datepicker.setYear(initYearValue);

      spyEvent = spyOnEvent(arrowDownElement, 'click');
      var clickEvent = createClickEvent();
      arrowDownElement[0].dispatchEvent(clickEvent);

      var datepickerGetterValue = datepicker.format('Y');

      expect(datepickerGetterValue).toEqual(expectedYearValue);
      expect(inputElement).toHaveAttr('data-old-value', expectedYearValue);
    });

    /**
     * To be valid the result should be checked using getter, DOM attribute and DOM visible element
     */
    it('2 times on the down arrow should change the year from 2012 to 2010', function () {
      var initYearValue = 2012;
      var expectedYearValue = 2010;

      datepicker.setYear(initYearValue);

      spyEvent = spyOnEvent(arrowDownElement, 'click');
      var clickEvent = createClickEvent();
      arrowDownElement[0].dispatchEvent(clickEvent);
      arrowDownElement[0].dispatchEvent(clickEvent);

      var datepickerGetterValue = datepicker.format('Y');

      expect(datepickerGetterValue).toEqual(expectedYearValue.toString());
      expect(inputElement).toHaveAttr('data-old-value', expectedYearValue.toString());
    });
  });

  describe('keyboard input', function () {
    var datepickerElement;
    var inputElement;
    var inputActivatorElement;
    var transitionBlurDelay = 600; // Keep it equal with this one in the code

    beforeEach(function (done) {
      datepickerElement = jQuery(datepickerSelector);

      inputActivatorElement = datepickerElement.find(datepickerSelector + '-input-years .mtr-values');
      inputElement = datepickerElement.find(datepickerSelector + '-input-years input.mtr-input.years');

      setTimeout(function () {
        done();
      }, transitionBlurDelay * 2);
    });

    it('should change the year to 2013', function (done) {
      var newYearValue = 2013;
      var expectedYear = '2013';

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(inputElement), 'focus');
      var spyEventBlur = spyOnEvent(jQuery(inputElement), 'blur');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var inputElementBlurEvent = createCustomEvent('blur');

      inputActivatorElement[0].dispatchEvent(clickEvent);
      inputElement[0].dispatchEvent(inputElementFocusEvent);
      inputElement.val(newYearValue);
      inputElement[0].dispatchEvent(inputElementBlurEvent);

      setTimeout(function () {
        var datepickerYear = datepicker.format('Y');

        expect(spyEventClick).toHaveBeenTriggered();
        expect(spyEventFocus).toHaveBeenTriggered();
        expect(spyEventBlur).toHaveBeenTriggered();

        expect(datepickerYear).toEqual(expectedYear);
        done();
      }, transitionBlurDelay);
    });

    it('should NOT change the date to 1234, it should keep the old value', function (done) {
      var newYearValue = '1234';
      var expectedYear = datepicker.format('Y');

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(inputElement), 'focus');
      var spyEventBlur = spyOnEvent(jQuery(inputElement), 'blur');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var inputElementBlurEvent = createCustomEvent('blur');

      inputActivatorElement[0].dispatchEvent(clickEvent);
      inputElement[0].dispatchEvent(inputElementFocusEvent);
      inputElement.val(newYearValue);
      inputElement[0].dispatchEvent(inputElementBlurEvent);

      expect(spyEventClick).toHaveBeenTriggered();
      expect(spyEventFocus).toHaveBeenTriggered();
      expect(spyEventBlur).toHaveBeenTriggered();

      setTimeout(function () {
        var datepickerYear = datepicker.format('Y');

        expect(datepickerYear).toEqual(expectedYear);
        done();
      }, transitionBlurDelay);
    });

    it('should apply the change of the year to 2015 on enter keypress ', function (done) {
      var newYearValue = 2015;
      var expectedYear = '2015';

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(inputElement), 'focus');
      var spyEventKeyup = spyOnEvent(jQuery(inputElement), 'keyup');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var inputElementKeyupEvent = createKeyupEvent(13);

      inputActivatorElement[0].dispatchEvent(clickEvent);
      inputElement[0].dispatchEvent(inputElementFocusEvent);
      inputElement.val(newYearValue);
      inputElement[0].dispatchEvent(inputElementKeyupEvent);

      setTimeout(function () {
        var datepickerYear = datepicker.format('Y');

        expect(spyEventClick).toHaveBeenTriggered();
        expect(spyEventFocus).toHaveBeenTriggered();
        expect(spyEventKeyup).toHaveBeenTriggered();

        expect(datepickerYear).toEqual(expectedYear);
        done();
      }, transitionBlurDelay * 2);
    });

    it('should NOT change the year to 3052 on enter keypress, it should keep the old value', function (done) {
      var newYearValue = '3052';
      var expectedYear = datepicker.format('Y');

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(inputElement), 'focus');
      var spyEventKeyup = spyOnEvent(jQuery(inputElement), 'keyup');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var inputElementKeyupEvent = createCustomEvent('keyup');

      inputActivatorElement[0].dispatchEvent(clickEvent);
      inputElement[0].dispatchEvent(inputElementFocusEvent);
      inputElement.val(newYearValue);
      inputElement[0].dispatchEvent(inputElementKeyupEvent);

      expect(spyEventClick).toHaveBeenTriggered();
      expect(spyEventFocus).toHaveBeenTriggered();
      expect(spyEventKeyup).toHaveBeenTriggered();

      setTimeout(function () {
        var datepickerYear = datepicker.format('Y');

        expect(datepickerYear).toEqual(expectedYear);
        done();
      }, transitionBlurDelay * 2);
    });
  });

  describe('wheel move', function () {
    var spyEvent;
    var datepickerElement;
    var yearsElement;
    var inputActivatorElement;
    var yearsInputElement;

    beforeEach(function () {
      datepickerElement = jQuery(datepickerSelector);

      yearsElement = datepickerElement.find(datepickerSelector + '-input-years .mtr-content .mtr-values .mtr-default-value');
      inputActivatorElement = datepickerElement.find(datepickerSelector + '-input-years .mtr-values');
      yearsInputElement = datepickerElement.find(datepickerSelector + '-input-years .mtr-content .mtr-input.years');
    });

    it('should be triggered', function () {
      var wheelEvent = createWheelEvent(120);

      spyEvent = spyOnEvent(yearsElement, 'wheel');
      yearsElement[0].dispatchEvent(wheelEvent);

      expect(spyEvent).toHaveBeenTriggered();
    });

    it('should increase the years when scrolled upwards', function (done) {
      var expectedYears = new Date(datepicker.getTimestamp() + (365 * 24 * 3600 * 1000)).getFullYear().toString();

      var wheelEvent = createWheelEvent(120);

      spyEvent = spyOnEvent(yearsElement, 'wheel');
      yearsElement[0].dispatchEvent(wheelEvent);

      expect(spyEvent).toHaveBeenTriggered();

      setTimeout(function () {
        var datepickerYears = datepicker.format('Y');

        expect(datepickerYears).toEqual(expectedYears.toString());
        done();
      }, transitionBlurDelay * 2);
    });

    it('should decrease the years when scrolled downwards', function (done) {
      var expectedYears = new Date(datepicker.getTimestamp() - (365 * 24 * 3600 * 1000)).getFullYear().toString();

      var wheelEvent = createWheelEvent(-120);

      spyEvent = spyOnEvent(yearsElement, 'wheel');
      yearsElement[0].dispatchEvent(wheelEvent);

      expect(spyEvent).toHaveBeenTriggered();

      setTimeout(function () {
        var datepickerYears = datepicker.format('Y');

        expect(datepickerYears).toEqual(expectedYears);
        done();
      }, transitionBlurDelay * 2);
    });

    it('should increase the year when scrolled upwards in the input', function (done) {
      var expectedYears = new Date(datepicker.getTimestamp() + (365 * 24 * 3600 * 1000)).getFullYear().toString();

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(yearsInputElement), 'focus');
      var spyEventWheel = spyOnEvent(yearsInputElement, 'wheel');
      var spyEventBlur = spyOnEvent(jQuery(yearsInputElement), 'blur');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var wheelEvent = createWheelEvent(120);
      var inputElementBlurEvent = createCustomEvent('blur');

      inputActivatorElement[0].dispatchEvent(clickEvent);
      yearsInputElement[0].dispatchEvent(inputElementFocusEvent);
      yearsInputElement[0].dispatchEvent(wheelEvent);
      yearsInputElement[0].dispatchEvent(inputElementBlurEvent);

      setTimeout(function () {
        var datepickerYear = datepicker.format('Y');

        expect(spyEventClick).toHaveBeenTriggered();
        expect(spyEventFocus).toHaveBeenTriggered();
        expect(spyEventWheel).toHaveBeenTriggered();
        expect(spyEventBlur).toHaveBeenTriggered();

        expect(datepickerYear).toEqual(expectedYears);
        done();
      }, transitionBlurDelay * 2);
    });

    it('should decrease the year when scrolled downwards in the input', function (done) {
      var expectedYears = new Date(datepicker.getTimestamp() - (365 * 24 * 3600 * 1000)).getFullYear().toString();

      var spyEventClick = spyOnEvent(jQuery(inputActivatorElement), 'click');
      var spyEventFocus = spyOnEvent(jQuery(yearsInputElement), 'focus');
      var spyEventWheel = spyOnEvent(yearsInputElement, 'wheel');
      var spyEventBlur = spyOnEvent(jQuery(yearsInputElement), 'blur');

      var clickEvent = createClickEvent();
      var inputElementFocusEvent = createCustomEvent('focus');
      var wheelEvent = createWheelEvent(-120);
      var inputElementBlurEvent = createCustomEvent('blur');

      inputActivatorElement[0].dispatchEvent(clickEvent);
      yearsInputElement[0].dispatchEvent(inputElementFocusEvent);
      yearsInputElement[0].dispatchEvent(wheelEvent);
      yearsInputElement[0].dispatchEvent(inputElementBlurEvent);

      setTimeout(function () {
        var datepickerYear = datepicker.format('Y');

        expect(spyEventClick).toHaveBeenTriggered();
        expect(spyEventFocus).toHaveBeenTriggered();
        expect(spyEventWheel).toHaveBeenTriggered();
        expect(spyEventBlur).toHaveBeenTriggered();

        expect(datepickerYear).toEqual(expectedYears);
        done();
      }, transitionBlurDelay * 2);
    });
  });
});
