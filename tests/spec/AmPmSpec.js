describe('MTR Datepicker: AM/PM ', function() {

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
    it('format("a") should return the current state AM/PM', function() {
      var currentDate = new Date();
      var currentHours = currentDate.getHours();
      var currentDatepickerHours = datepicker.format('H');
      var datepickerAmPm = datepicker.format('a');
      var expectedAmPm;

      if (currentDate.getMinutes() >= 50) {
        currentHours++;
      }

      if (currentHours === 24) {
        currentHours = 0;
      }

      if (currentHours >= 0 && currentHours <= 11) {
        expectedAmPm = 'am';
      }
      else if (currentHours >= 12 && currentHours <= 23) {
        expectedAmPm = 'pm';
      }

      expect(datepickerAmPm).toEqual(expectedAmPm);
      expect(currentDatepickerHours).toEqual(currentHours.toString());
    });

  });

  describe('setter', function() {

    it('setAmPm(1) should set the 10PM to 10AM', function() {
      var expectedValue = '10 AM';

      datepicker.setHours(22);
      datepicker.setAmPm(1);

      var datepickerValue = datepicker.format('hh A');

      expect(datepickerValue).toEqual(expectedValue);
    });

    it('setAmPm(0) should set the 8AM to 8PM', function() {
      var expectedValue = '08 PM';

      datepicker.setHours(8);
      datepicker.setAmPm(0);

      var datepickerValue = datepicker.format('hh A');

      expect(datepickerValue).toEqual(expectedValue);
    });

  });

  describe('click event', function() {

    var spyEvent;
    var datepickerElement;
    var arrowUpElement;

    beforeEach(function() {
      datepickerElement = $(datepickerSelector);

      arrowUpElement = datepickerElement.find(datepickerSelector + '-input-minutes .mtr-arrow.up');
      arrowDownElement = datepickerElement.find(datepickerSelector + '-input-minutes .mtr-arrow.down');
      inputElement = datepickerElement.find(datepickerSelector + '-input-minutes input.mtr-input.minutes');
    });

  });

});