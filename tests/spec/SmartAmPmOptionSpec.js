describe('MTR Datepicker: When the "smart am pm" option is enabled ', function() {
  
  var datepickerSelectorName = 'datepicker';
  var datepickerSelector = '#' + datepickerSelectorName;
  var datepicker;

  var current = {
    datetime: null,
    hour: null
  };

  beforeEach(function() {
    setBaseFixtures();

    current.datetime = new Date();
    current.datetime.setHours(11);
    current.hour = current.datetime.getHours();

    datepicker = new MtrDatepicker({
      target: 'datepicker',
      smartHours: true
    });
  });

  function setBaseFixtures() {
    var datepickerFixture = setFixtures('<div id="datepicker"></div>');
  }

  describe('setter', function() {

    it('setHours() should swicth the AM to PM when you go from 11 AM to 12', function() {
      var expectedHourValue = '12';
      var expectedAmPmValue = 'pm';

      datepicker.setHours(12);
      var datepickerHour = datepicker.format('H');
      var datepickerAmPm = datepicker.format('a');

      expect(datepickerHour).toEqual(expectedHourValue);
      expect(datepickerAmPm).toEqual(expectedAmPmValue);
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

    it('on the bottom arrow should change 12AM to 12PM', function() {
      var expectedValue = '12 PM';

      spyEvent = spyOnEvent(arrowDownElement, 'click');
      var clickEvent = createClickEvent();
      arrowDownElement[0].dispatchEvent(clickEvent);
      
      var datepickerValue = datepicker.format('HH A');

      expect('click').toHaveBeenTriggeredOn(arrowDownElement);
      expect(spyEvent).toHaveBeenTriggered();
      expect(datepickerValue).toBe(datepickerValue);
    });

  });

});