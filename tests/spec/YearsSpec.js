describe('MTR Datepicker: Years ', function() {
  
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
    it('format("Y") should return the current year', function() {
      var currentDate = new Date();
      var currentYear = currentDate.getFullYear();
      var datepickerYear = datepicker.format('Y');

      expect(datepickerYear).toEqual(currentYear.toString());
    });

  });

  describe('setter', function() {

    it('setYear() should work when you try to assign value 2013', function() {
      var newYearValue = 2013;
      datepicker.setYear(newYearValue);

      var datepickerYear = datepicker.format('Y');

      expect(datepickerYear).toEqual(newYearValue.toString());
    });

    it('format("YY") should return the last 2 digits of the current year', function() {
      var currentDate = new Date();
      var expectedYearValue = currentDate.getFullYear().toString().substr(2);

      var datepickerYearValue = datepicker.format('YY');

      expect(datepickerYearValue).toEqual(expectedYearValue.toString());
    });

  });

  describe('click event', function() {

    var spyEvent;
    var datepickerElement;
    var arrowUpElement;

    beforeEach(function() {
      datepickerElement = $(datepickerSelector);

      arrowUpElement = datepickerElement.find(datepickerSelector + '-input-years .mtr-arrow.up');
      arrowDownElement = datepickerElement.find(datepickerSelector + '-input-years .mtr-arrow.down');
      inputElement = datepickerElement.find(datepickerSelector + '-input-years input.mtr-input.years');
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
    it('on the upper arrow should change the year from 2010 to 2011', function() {
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
     * To be valid the result should be checked using getter, DOM attribute and DOM vissible element
     */
    it('2 times on the upper arrow should change the year from 2012 to 2014', function() {
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

  });

});