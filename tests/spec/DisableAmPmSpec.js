describe('MTR Datepicker: When the "disable am pm" option is enabled ', function() {

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
    current.datetime.setHours(12);
    current.hour = current.datetime.getHours();

    datepicker = new MtrDatepicker({
      target: 'datepicker',
      disableAmPm: true
    });
  });

  function setBaseFixtures() {
    var datepickerFixture = setFixtures('<div id="datepicker"></div>');
  }

  describe('setter', function() {

    it('setHours() should be able to set the hours to 13', function() {
      var initTimestamp = new Date('November 21, 2010 10:00:00');
      datepicker.setTimestamp(initTimestamp.getTime());

      var expectedHourValue = '13';
      var expectedAmPmValue = 'pm';

      datepicker.setHours(13);
      var datepickerHour = datepicker.format('H');
      var datepickerAmPm = datepicker.format('a');

      expect(datepickerHour).toEqual(expectedHourValue);
      expect(datepickerAmPm).toEqual(expectedAmPmValue);
    });

    it('setHours() should be able to set the hours to 0', function() {
      var initTimestamp = new Date('November 21, 2010 12:12:12');
      datepicker.setTimestamp(initTimestamp.getTime());

      var expectedHourValue = '0';
      var expectedAmPmValue = 'am';

      datepicker.setHours(0);
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

    it('on the up arrow should change 6 to 7', function() {
       var initTimestamp = new Date('November 21, 2010 06:20:00');
      datepicker.setTimestamp(initTimestamp.getTime());

      var expectedValue = '07';

      spyEvent = spyOnEvent(arrowUpElement, 'click');
      var clickEvent = createClickEvent();
      arrowUpElement[0].dispatchEvent(clickEvent);

      var datepickerValue = datepicker.format('HH');

      expect('click').toHaveBeenTriggeredOn(arrowUpElement);
      expect(spyEvent).toHaveBeenTriggered();
      expect(datepickerValue).toBe(expectedValue);
    });

    it('on the up arrow should change 12 to 13', function() {
       var initTimestamp = new Date('November 21, 2010 12:20:00');
      datepicker.setTimestamp(initTimestamp.getTime());

      var expectedValue = '13';

      spyEvent = spyOnEvent(arrowUpElement, 'click');
      var clickEvent = createClickEvent();
      arrowUpElement[0].dispatchEvent(clickEvent);

      var datepickerValue = datepicker.format('HH');

      expect('click').toHaveBeenTriggeredOn(arrowUpElement);
      expect(spyEvent).toHaveBeenTriggered();
      expect(datepickerValue).toBe(expectedValue);
    });

    it('on the up arrow should change 17 to 18', function() {
       var initTimestamp = new Date('November 21, 2010 17:20:00');
      datepicker.setTimestamp(initTimestamp.getTime());

      var expectedValue = '18';

      spyEvent = spyOnEvent(arrowUpElement, 'click');
      var clickEvent = createClickEvent();
      arrowUpElement[0].dispatchEvent(clickEvent);

      var datepickerValue = datepicker.format('HH');

      expect('click').toHaveBeenTriggeredOn(arrowUpElement);
      expect(spyEvent).toHaveBeenTriggered();
      expect(datepickerValue).toBe(expectedValue);
    });

    it('on the up arrow should change 23 to 00', function() {
       var initTimestamp = new Date('November 21, 2010 23:20:00');
      datepicker.setTimestamp(initTimestamp.getTime());

      var expectedValue = '00';

      spyEvent = spyOnEvent(arrowUpElement, 'click');
      var clickEvent = createClickEvent();
      arrowUpElement[0].dispatchEvent(clickEvent);

      var datepickerValue = datepicker.format('HH');

      expect('click').toHaveBeenTriggeredOn(arrowUpElement);
      expect(spyEvent).toHaveBeenTriggered();
      expect(datepickerValue).toBe(expectedValue);
    });

    it('on the down arrow should change 07 to 06', function() {
       var initTimestamp = new Date('November 21, 2010 07:30:00');
      datepicker.setTimestamp(initTimestamp.getTime());

      var expectedValue = '06';

      spyEvent = spyOnEvent(arrowDownElement, 'click');
      var clickEvent = createClickEvent();
      arrowDownElement[0].dispatchEvent(clickEvent);

      var datepickerValue = datepicker.format('HH');

      expect('click').toHaveBeenTriggeredOn(arrowDownElement);
      expect(spyEvent).toHaveBeenTriggered();
      expect(datepickerValue).toBe(expectedValue);
    });

    it('on the down arrow should change 13 to 12', function() {
       var initTimestamp = new Date('November 21, 2010 13:30:00');
      datepicker.setTimestamp(initTimestamp.getTime());

      var expectedValue = '12';

      spyEvent = spyOnEvent(arrowDownElement, 'click');
      var clickEvent = createClickEvent();
      arrowDownElement[0].dispatchEvent(clickEvent);

      var datepickerValue = datepicker.format('HH');

      expect('click').toHaveBeenTriggeredOn(arrowDownElement);
      expect(spyEvent).toHaveBeenTriggered();
      expect(datepickerValue).toBe(expectedValue);
    });

    it('on the down arrow should change 19 to 18', function() {
      var initTimestamp = new Date('November 21, 2010 19:30:00');
      datepicker.setTimestamp(initTimestamp.getTime());

      var expectedValue = '18';

      spyEvent = spyOnEvent(arrowDownElement, 'click');
      var clickEvent = createClickEvent();
      arrowDownElement[0].dispatchEvent(clickEvent);

      var datepickerValue = datepicker.format('HH');

      expect('click').toHaveBeenTriggeredOn(arrowDownElement);
      expect(spyEvent).toHaveBeenTriggered();
      expect(datepickerValue).toBe(expectedValue);
    });

    it('on the down arrow should change 00 to 23', function() {
      var initTimestamp = new Date('November 21, 2010 01:30:00');
      datepicker.setTimestamp(initTimestamp.getTime());

      var expectedValue = '23';

      spyEvent = spyOnEvent(arrowDownElement, 'click');
      var clickEvent = createClickEvent();
      arrowDownElement[0].dispatchEvent(clickEvent);
      arrowDownElement[0].dispatchEvent(clickEvent);

      var datepickerValue = datepicker.format('HH');

      expect('click').toHaveBeenTriggeredOn(arrowDownElement);
      expect(spyEvent).toHaveBeenTriggered();
      expect(datepickerValue).toBe(expectedValue);
    });

  });

});