describe('MTR Datepicker: When the "future" option is enabled ', function() {
  
  var datepickerSelectorName = 'datepicker';
  var datepickerSelector = '#' + datepickerSelectorName;
  var datepicker;
  var transitionValidationDelay = 500; // Keep it equal with this one in the code

  var current = {
    datetime: null,
    date: null,
    hour: null,
    month: null,
    timestamp: null
  };

  beforeEach(function() {
    setBaseFixtures();

    current.datetime = new Date();
    current.hour = current.datetime.getHours();
    current.month = current.datetime.getMonth();
    current.timestamp = current.datetime.getTime();
    current.date = current.datetime.getDate();

    if (current.datetime.getMinutes() >= 50) {
      current.hour++;
      current.datetime.setHours(current.hour);
    }

    datepicker = new MtrDatepicker({
      target: 'datepicker',
      future: true
    });
  });

  function setBaseFixtures() {
    var datepickerFixture = setFixtures('<div id="datepicker"></div>');
  }

  describe('setter', function() {

    it('setHours() should NOT work when you try to assign value before the current hour', function(done) {
      // If the hour is 1, we cannot go back in a valid way
      if (current.hour >= 2 && current.date == datepicker.format('D')) {
        var oldHourValue = current.hour;
        var newHourValue = current.hour - 1;

        datepicker.setHours(newHourValue);
        var datepickerHour = datepicker.format('H');

        expect(datepickerHour).toEqual(oldHourValue.toString());

        setTimeout(function() {
          done();
        }, transitionValidationDelay);
      }
      else {
        expect(true).toEqual(true);
        done();
      }
    });

    it('setHours() should NOT work when you try to assign value which will be 3 hours before the current hour', function(done) {

      // If the hour is 1, we cannot go back in a valid way
      if (current.hour >= 4 && current.date == datepicker.format('D')) {
        var oldHourValue = current.hour;
        var newHourValue = current.hour - 3;

        datepicker.setHours(newHourValue);
        var datepickerHour = datepicker.format('H');

        expect(datepickerHour).toEqual(oldHourValue.toString());

        setTimeout(function() {
          done();
        }, transitionValidationDelay);
      }
      else {
        expect(true).toEqual(true);
        done();
      }
    });

    it('setMonth() should NOT work when you try to assign value before the current month', function(done) {
      // If the month is 1, we cannot go back in a valid way
      if (current.month >= 1) {
        var oldMonthValue = current.month;
        var newMonthValue = current.month - 1;

        datepicker.setMonth(newMonthValue);
        var datepickerHour = datepicker.format('M');

        expect(datepickerHour).toEqual((oldMonthValue+1).toString());

        setTimeout(function() {
          done();
        }, transitionValidationDelay);
      }
      else {
        expect(true).toEqual(true);
        done();
      }
    });

    it('setMonth() should work when you try to assign value after the current month', function(done) {
      // If the month is December, we cannot go to the next month in a valid way without changing the year
      if (current.month <= 10) {
        var oldMonthValue = current.month;
        var newMonthValue = current.month + 1;

        datepicker.setMonth(newMonthValue);
        var datepickerMonth = datepicker.format('M');

        expect(datepickerMonth).toEqual((newMonthValue+1).toString());

        setTimeout(function() {
          done();
        }, transitionValidationDelay);
      }
      else {
        expect(true).toEqual(true);
        done();
      }
    });

  });

  describe('click event', function() {

    var spyEvent;
    var datepickerElement;
    var arrowUpElement;

    beforeEach(function(done) {
      datepickerElement = $(datepickerSelector);

      arrowUpElementHours = datepickerElement.find(datepickerSelector + '-input-hours .mtr-arrow.up');
      arrowDownElementHours = datepickerElement.find(datepickerSelector + '-input-hours .mtr-arrow.down');
      inputElementHours = datepickerElement.find(datepickerSelector + '-input-hours input.mtr-input.hours');

      arrowUpElementMonths = datepickerElement.find(datepickerSelector + '-input-months .mtr-arrow.up');
      arrowDownElementMonths = datepickerElement.find(datepickerSelector + '-input-months .mtr-arrow.down');
      inputElementMonths = datepickerElement.find(datepickerSelector + '-input-months input.mtr-input.months');

      setTimeout(function() {
        done();
      }, transitionValidationDelay * 2);
    });

    it('on the bottom arrow of the hours to be triggered', function(done) {
      spyEvent = spyOnEvent(arrowDownElementHours, 'click');
      var clickEvent = createClickEvent();
      arrowDownElementHours[0].dispatchEvent(clickEvent);
           
      expect('click').toHaveBeenTriggeredOn(arrowDownElementHours);
      expect(spyEvent).toHaveBeenTriggered();

      setTimeout(function() {
        done();
      }, transitionValidationDelay);
    });

    /**
     * To be valid the result should be checked using getter, DOM attribute and DOM vissible element
     */

    it('on the down arrow should NOT change the hour if the result will be in the past', function(done) {
      var expectedHourValue = datepicker.format('H');
      var expectedHourVisualValue = datepicker.format('h');

      spyEvent = spyOnEvent(arrowDownElementHours, 'click');
      var clickEvent = createClickEvent();
      arrowDownElementHours[0].dispatchEvent(clickEvent);

      var datepickerGetterValue = datepicker.format('H');
      var datepickerTimestamp = datepicker.getTimestamp();

      if (expectedHourValue != 12 && expectedHourValue != 0) {
        expect(datepickerGetterValue).toEqual(expectedHourValue);
      }
      else {
        // Needed because when it is 12PM you can actualy click the down arrow and go to 11PM whcih is 23h
        expect(datepickerTimestamp).toBeGreaterThan(current.timestamp);
      }

      setTimeout(function() {
        done();
      }, transitionValidationDelay);
    });

    it('on the down arrow should NOT change the month if the result is in the past', function(done) {
      if (current.month === 0) {
        var expectedMonthValue = '12';
      }
      else {
        var expectedMonthValue = datepicker.format('M'); 
      }

      spyEvent = spyOnEvent(arrowDownElementMonths, 'click');
      var clickEvent = createClickEvent();
      arrowDownElementMonths[0].dispatchEvent(clickEvent);

      var datepickerGetterValue = datepicker.format('M');
      
      expect(datepickerGetterValue).toEqual(expectedMonthValue);

      setTimeout(function() {
        done();
      }, transitionValidationDelay);
    });

  });

});