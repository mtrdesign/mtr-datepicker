describe('MTR Datepicker: Months ', function() {
  
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
    it('format("M") should return the current month', function() {
      var currentDate = new Date();
      var currentMonth = currentDate.getMonth() + 1;
      var datepickerMonth = datepicker.format('M');

      expect(datepickerMonth).toEqual(currentMonth.toString());
    });

  });

  describe('setter', function() {

    it('setMonth() should work when you try to assign value 5 and make this month Jun (the JS counting of the monhs)', function() {
      var newMonthValue = 5;
      var newMonthName = 'Jun';
      datepicker.setMonth(newMonthValue);
      newMonthValue++;
      var datepickerMonth = datepicker.format('M');
      var datepickerMonthName = datepicker.format('MMM');

      expect(datepickerMonth).toEqual(newMonthValue.toString());
      expect(datepickerMonthName).toEqual(newMonthName.toString());
    });

    it('format("MMM") should return Jan if the current month is 0', function() {
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

  describe('click event', function() {

    var spyEvent;
    var datepickerElement;
    var arrowUpElement;

    beforeEach(function() {
      datepickerElement = $(datepickerSelector);

      arrowUpElement = datepickerElement.find(datepickerSelector + '-input-months .mtr-arrow.up');
      arrowDownElement = datepickerElement.find(datepickerSelector + '-input-months .mtr-arrow.down');
      inputElement = datepickerElement.find(datepickerSelector + '-input-months input.mtr-input.months');
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
    it('on the upper arrow should change the month from Mar to Apr', function() {
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
     * To be valid the result should be checked using getter, DOM attribute and DOM vissible element
     */
    it('2 times on the upper arrow should change the month from Sep to Nov', function() {
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
      
      expect(datepickerGetterValue).toEqual((expectedMonthValue+1).toString());
      expect(datepickerGetterName).toEqual(expectedMonthName);
      expect(inputElement).toHaveAttr('data-old-value', expectedMonthValue.toString());
    });

  });

});