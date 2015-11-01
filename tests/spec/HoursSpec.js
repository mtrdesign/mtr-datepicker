describe('MTR Datepicker: Hours ', function() {
  
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
    it('format("H") should return the same hour as the current one', function() {
      var currentDate = new Date();
      var currentHour = currentDate.getHours();

      // Maybe we are in the next hour
      if (currentDate.getMinutes() >= 51) {
        currentHour++;
      }

      var datepickerHour = datepicker.format('H');

      expect(datepickerHour).toEqual(currentHour.toString());
    });

    it('format("HH") should return the same hour as the current one but with leading 0', function() {
      var currentDate = new Date();
      var currentHour = currentDate.getHours();
      var datepickerHour = datepicker.format('HH');

      // Maybe we are in the next hour
      if (currentDate.getMinutes() >= 51) {
        currentHour++;
      }

      if (currentHour < 10) {
        currentHour = '0' + currentHour;
      }

      expect(datepickerHour).toEqual(currentHour.toString());
    });
  });

  describe('setter', function() {

    it('setHours() should work when you try to assign AM value 5', function() {
      var newHourValue = 5;
      datepicker.setHours(newHourValue);
      var datepickerHour = datepicker.format('H');

      expect(datepickerHour).toEqual(newHourValue.toString());
    });

    it('setHours() should work when you try to assign PM value 18', function() {
      var newHourValue = 18;
      datepicker.setHours(newHourValue);
      var datepickerHour = datepicker.format('HH');

      expect(datepickerHour).toEqual(newHourValue.toString());
    });

    it('format("HH") should return 05 if the current hour is 5', function() {
      var newHourValue = 5;
      var expectedHourValue = '05';
      datepicker.setHours(newHourValue);
      var datepickerHour = datepicker.format('HH');

      expect(datepickerHour).toEqual(expectedHourValue.toString());
    });

    it('format("H") should not return 09 if the current hour is 9', function() {
      var newHourValue = 9;
      var expectedHourValueWrong = '09';
      var expectedHourValueCorrect = '9';
      datepicker.setHours(newHourValue);
      var datepickerHour = datepicker.format('H');

      expect(datepickerHour).not.toEqual(expectedHourValueWrong.toString());
      expect(datepickerHour).toEqual(expectedHourValueCorrect.toString());
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

    it('on the upper arrow to be triggered', function() {
      spyEvent = spyOnEvent(arrowUpElement, 'click');
      $(arrowUpElement).trigger( "click" );
           
      expect('click').toHaveBeenTriggeredOn(arrowUpElement);
      expect(spyEvent).toHaveBeenTriggered();
    });

    /**
     * To be valid the result should be checked using getter, DOM attribute and DOM vissible element
     */
    it('on the upper arrow should change the hour from 5 to 6', function() {
      var initHourValue = 5;
      var expectedHourValue = '6';

      datepicker.setHours(initHourValue);

      spyEvent = spyOnEvent(arrowUpElement, 'click');
      $(arrowUpElement).trigger( "click" );

      var datepickerGetterValue = datepicker.format('H');
           
      //expect('click').toHaveBeenTriggeredOn(arrowUpElement);
      //expect(spyEvent).toHaveBeenTriggered();
      
      expect(datepickerGetterValue).toEqual(expectedHourValue);
      expect(inputElement).toHaveAttr('data-old-value', expectedHourValue);

    });

  });

});