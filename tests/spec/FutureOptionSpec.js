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

    it('setHours() should not work when you try to assign value before the current hour', function(done) {
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

    it('setHours() should not work when you try to assign value which will be 3 hours before the current hour', function(done) {

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

  });

  describe('click event', function() {

    var spyEvent;
    var datepickerElement;
    var arrowUpElement;

    beforeEach(function() {
      datepickerElement = $(datepickerSelector);

      arrowUpElement = datepickerElement.find(datepickerSelector + '-input-hours .mtr-arrow.up');
      arrowDownElement = datepickerElement.find(datepickerSelector + '-input-hours .mtr-arrow.down');
      inputElement = datepickerElement.find(datepickerSelector + '-input-hours input.mtr-input.hours');
    });

    it('on the bottom arrow to be triggered', function(done) {
      spyEvent = spyOnEvent(arrowDownElement, 'click');
      $(arrowDownElement).trigger( "click" );
           
      expect('click').toHaveBeenTriggeredOn(arrowDownElement);
      expect(spyEvent).toHaveBeenTriggered();

      setTimeout(function() {
        done();
      }, transitionValidationDelay);
    });

    /**
     * To be valid the result should be checked using getter, DOM attribute and DOM vissible element
     */

    it('on the down arrow shouldnt change the hour', function(done) {
      var expectedHourValue = datepicker.format('H');
      var expectedHourVisualValue = datepicker.format('h');

      spyEvent = spyOnEvent(arrowDownElement, 'click');
      $(arrowDownElement).trigger( "click" );

      var datepickerGetterValue = datepicker.format('H');
      
      expect(datepickerGetterValue).toEqual(expectedHourValue);

      setTimeout(function() {
        done();
      }, transitionValidationDelay);
    });

  });

});