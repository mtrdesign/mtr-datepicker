describe('MTR Datepicker: When the "timepicker" option is provided ', function () {
  var datepickerSelectorName = 'datepicker';
  var datepickerSelector = '#' + datepickerSelectorName;
  var datepicker;

  beforeEach(function () {
    setBaseFixtures();
  });

  function setBaseFixtures () {
    setFixtures('<div id="datepicker"></div>');
  }

  describe('when timepicker: true', function () {
    beforeEach(function () {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        timepicker: true
      });
    });

    it('should have input slider for the hours', function () {
      var datepickerElement = $(datepickerSelector);
      var expectedElement = datepickerSelector + '-input-hours.mtr-input-slider';

      expect(datepickerElement).toContainElement(expectedElement);
    });

    it('should have input slider for the minutes', function () {
      var datepickerElement = $(datepickerSelector);
      var expectedElement = datepickerSelector + '-input-minutes.mtr-input-slider';

      expect(datepickerElement).toContainElement(expectedElement);
    });

    it('should have input radio for the AM/PM', function () {
      var datepickerElement = $(datepickerSelector);
      var expectedElement = datepickerSelector + '-input-ampm.mtr-input-radio';

      expect(datepickerElement).toContainElement(expectedElement);
    });

    // TODO: Add some more tests to check the interactions with the date fields
  });

  describe('when timepicker: false', function () {
    beforeEach(function () {
      // eslint-disable-next-line no-unused-vars
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        timepicker: false
      });
    });

    it('should not have input slider for the hours', function () {
      var datepickerElement = $(datepickerSelector);
      var expectedElement = datepickerSelector + '-input-hours.mtr-input-slider';

      expect(datepickerElement).not.toContainElement(expectedElement);
    });

    it('should not have input slider for the minutes', function () {
      var datepickerElement = $(datepickerSelector);
      var expectedElement = datepickerSelector + '-input-minutes.mtr-input-slider';

      expect(datepickerElement).not.toContainElement(expectedElement);
    });

    it('should not have input radio for the AM/PM', function () {
      var datepickerElement = $(datepickerSelector);
      var expectedElement = datepickerSelector + '-input-ampm.mtr-input-radio';

      expect(datepickerElement).not.toContainElement(expectedElement);
    });
  });
});
