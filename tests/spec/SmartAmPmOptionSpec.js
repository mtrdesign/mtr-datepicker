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

    it('setHours() should swicth the AM to PM when you go from 11 AM to 12 PM', function() {
      var initTimestamp = new Date('November 21, 2010 11:11:11');
      datepicker.setTimestamp(initTimestamp.getTime());

      var expectedHourValue = '12';
      var expectedAmPmValue = 'pm';

      datepicker.setHours(12);
      var datepickerHour = datepicker.format('H');
      var datepickerAmPm = datepicker.format('a');

      expect(datepickerHour).toEqual(expectedHourValue);
      expect(datepickerAmPm).toEqual(expectedAmPmValue);
    });

    it('setHours() should swicth the PM to AM when you go from 12 PM to 11 AM', function() {
      var initTimestamp = new Date('November 21, 2010 12:12:12');
      datepicker.setTimestamp(initTimestamp.getTime());

      var expectedHourValue = '11';
      var expectedAmPmValue = 'am';

      datepicker.setHours(11);
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

    it('on the up arrow should change 11AM to 12PM', function() {
       var initTimestamp = new Date('November 21, 2010 11:11:11');
      datepicker.setTimestamp(initTimestamp.getTime());

      var expectedValue = '12 PM';

      spyEvent = spyOnEvent(arrowUpElement, 'click');
      var clickEvent = createClickEvent();
      arrowUpElement[0].dispatchEvent(clickEvent);

      var datepickerValue = datepicker.format('HH A');

      expect('click').toHaveBeenTriggeredOn(arrowUpElement);
      expect(spyEvent).toHaveBeenTriggered();
      expect(datepickerValue).toBe(expectedValue);
    });

    it('on the down arrow should change 12PM to 11AM', function() {
       var initTimestamp = new Date('November 21, 2010 12:12:12');
      datepicker.setTimestamp(initTimestamp.getTime());

      var expectedValue = '11 AM';

      spyEvent = spyOnEvent(arrowDownElement, 'click');
      var clickEvent = createClickEvent();
      arrowDownElement[0].dispatchEvent(clickEvent);

      var datepickerValue = datepicker.format('HH A');

      expect('click').toHaveBeenTriggeredOn(arrowDownElement);
      expect(spyEvent).toHaveBeenTriggered();
      expect(datepickerValue).toBe(expectedValue);
    });

  });

});