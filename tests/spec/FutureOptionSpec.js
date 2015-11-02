describe('MTR Datepicker: When the "future" option is enabled ', function() {
  
  var datepickerSelectorName = 'datepicker';
  var datepickerSelector = '#' + datepickerSelectorName;
  var datepicker;
  var transitionValidationDelay = 500; // Keep it equal with this one in the code

  var current = {
    datetime: null,
    hour: null
  };

  beforeEach(function() {
    setBaseFixtures();

    current.datetime = new Date();
    current.hour = current.datetime.getHours();
    current.month = current.datetime.getMonth();

    if (current.datetime.getMinutes() >= 51) {
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
      if (current.hour >= 2) {
        var oldHourValue = current.hour;
        var newHourValue = current.hour - 1;

        datepicker.setHours(newHourValue);
        var datepickerHour = datepicker.format('H');

        expect(datepickerHour).toEqual(oldHourValue.toString());

        setTimeout(function() {
          done();
        }, transitionValidationDelay);
      }
    });

    it('setHours() should NOT work when you try to assign value which will be 3 hours before the current hour', function(done) {

      // If the hour is 1, we cannot go back in a valid way
      if (current.hour >= 4) {
        var oldHourValue = current.hour;
        var newHourValue = current.hour - 3;

        datepicker.setHours(newHourValue);
        var datepickerHour = datepicker.format('H');

        expect(datepickerHour).toEqual(oldHourValue.toString());

        setTimeout(function() {
          done();
        }, transitionValidationDelay);
      }
    });

    it('setMonth() should NOT work when you try to assign value before the current month', function(done) {
      // If the hour is 1, we cannot go back in a valid way
      if (current.month >= 1) {
        var oldMonthValue = current.month;
        var newMonthValue = current.month - 1;

        datepicker.setHours(newMonthValue);
        var datepickerHour = datepicker.format('M');

        expect(datepickerHour).toEqual((oldMonthValue+1).toString());

        setTimeout(function() {
          done();
        }, transitionValidationDelay);
      }
    });

    it('setMonth() should work when you try to assign value after the current month', function(done) {
      // If the hour is 1, we cannot go back in a valid way
      if (current.month <= 10) {
        var oldMonthValue = current.month;
        var newMonthValue = current.month + 1;

        datepicker.setHours(newMonthValue);
        var datepickerHour = datepicker.format('M');

        expect(datepickerHour).toEqual((oldMonthValue+1).toString());

        setTimeout(function() {
          done();
        }, transitionValidationDelay);
      }
    });

  });

  describe('click event', function() {

    var spyEvent;
    var datepickerElement;
    var arrowUpElement;

    beforeEach(function() {
      datepickerElement = $(datepickerSelector);

      arrowUpElementHours = datepickerElement.find(datepickerSelector + '-input-hours .mtr-arrow.up');
      arrowDownElementHours = datepickerElement.find(datepickerSelector + '-input-hours .mtr-arrow.down');
      inputElementHours = datepickerElement.find(datepickerSelector + '-input-hours input.mtr-input.hours');

      arrowUpElementMonths = datepickerElement.find(datepickerSelector + '-input-months .mtr-arrow.up');
      arrowDownElementMonths = datepickerElement.find(datepickerSelector + '-input-months .mtr-arrow.down');
      inputElementMonths = datepickerElement.find(datepickerSelector + '-input-months input.mtr-input.months');
    });

    it('on the bottom arrow of the hours to be triggered', function(done) {
      spyEvent = spyOnEvent(arrowDownElementHours, 'click');
      $(arrowDownElementHours).trigger( "click" );
           
      expect('click').toHaveBeenTriggeredOn(arrowDownElementHours);
      expect(spyEvent).toHaveBeenTriggered();

      setTimeout(function() {
        done();
      }, transitionValidationDelay);
    });

    /**
     * To be valid the result should be checked using getter, DOM attribute and DOM vissible element
     */

    it('on the down arrow should NOT change the hour', function(done) {
      var expectedHourValue = datepicker.format('H');
      var expectedHourVisualValue = datepicker.format('h');

      spyEvent = spyOnEvent(arrowDownElementHours, 'click');
      $(arrowDownElementHours).trigger( "click" );

      var datepickerGetterValue = datepicker.format('H');
      
      expect(datepickerGetterValue).toEqual(expectedHourValue);

      setTimeout(function() {
        done();
      }, transitionValidationDelay);
    });

    it('on the down arrow should NOT change the month', function(done) {
      var expectedMonthValue = datepicker.format('M');
      var expectedMonthVisualValue = datepicker.format('MMM');

      spyEvent = spyOnEvent(arrowDownElementMonths, 'click');
      $(arrowDownElementMonths).trigger( "click" );

      var datepickerGetterValue = datepicker.format('M');
      
      expect(datepickerGetterValue).toEqual(expectedMonthValue);

      setTimeout(function() {
        done();
      }, transitionValidationDelay);
    });

  });

});