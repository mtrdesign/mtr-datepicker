describe('MTR Datepicker: Dates ', function() {
  
  var datepickerSelectorName = 'datepicker';
  var datepickerSelector = '#' + datepickerSelectorName;
  var datepicker;

  beforeEach(function() {
    setBaseFixtures();

    datepicker = new MtrDatepicker({
      target: 'datepicker'
    });
  });

  function setBaseFixtures() {
    var datepickerFixture = setFixtures('<div id="datepicker"></div>');
  }

  describe('getter', function() {
    it('format("D") should return the current date', function() {
      var currentDate = new Date();
      var datepickerDay = datepicker.format('D');

      if (currentDate.getHours() === 23 && currentDate.getMinutes() >= 50) {
        currentDate.setDate(currentDate.getDate() + 1);
      }

      var currentDay = currentDate.getDate();

      expect(datepickerDay).toEqual(currentDay.toString());
    });

  });

  describe('setter', function() {

    it('setDate() should work when you try to assign value 13', function() {
      var newDateValue = 13;
      datepicker.setDate(newDateValue);

      var datepickerDate = datepicker.format('D');

      expect(datepickerDate).toEqual(newDateValue.toString());
    });

    it('format("DD") should return the current date with 2 digits', function() {
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

  describe('click event', function() {

    var spyEvent;
    var datepickerElement;
    var arrowUpElement;

    beforeEach(function() {
      datepickerElement = $(datepickerSelector);

      arrowUpElement = datepickerElement.find(datepickerSelector + '-input-dates .mtr-arrow.up');
      arrowDownElement = datepickerElement.find(datepickerSelector + '-input-dates .mtr-arrow.down');
      inputElement = datepickerElement.find(datepickerSelector + '-input-dates input.mtr-input.dates');
    });

    it('on the upper arrow to be triggered', function() {
      spyEvent = spyOnEvent(arrowUpElement, 'click');
      var clickEvent = createClickEvent();
      arrowUpElement[0].dispatchEvent(clickEvent);
           
      expect('click').toHaveBeenTriggeredOn(arrowUpElement);
      expect(spyEvent).toHaveBeenTriggered();
    });

    /**
     * To be valid the result should be checked using getter, DOM attribute and DOM vissible element
     */
    it('on the upper arrow should change the date from 3 to 4', function() {
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
     * To be valid the result should be checked using getter, DOM attribute and DOM vissible element
     */
    it('2 times on the upper arrow should change the date from 8 to 10', function() {
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

  });

});