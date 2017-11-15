describe('MTR Datepicker: When timezones plugin is enabled', function() {

  var datepickerSelectorName = 'datepicker';
  var datepickerSelector = '#' + datepickerSelectorName;
  var datepicker;

  beforeEach(function() {
    setBaseFixtures();
  });

  function setBaseFixtures() {
    var datepickerFixture = setFixtures('<div id="datepicker"></div>');
  }

  describe('constructor', function() {
    it('should be able to set the timezone to DST (-12)', function() {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        utcTimezone: 'DST'
      });

      var datepickerOutput = datepicker.toString();
      var datepickerContainsDST = datepickerOutput.indexOf('(DST)') > -1;
      var datepickerContainsGmtOffset = datepickerOutput.indexOf('GMT-1200') > -1;

      expect(datepickerContainsDST).toBe(true);
      expect(datepickerContainsGmtOffset).toBe(true);
    });

    it('should be able to set the timezone to Europe/Sofia (+3)', function() {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        utcTimezone: 'Europe/Sofia'
      });

      var datepickerOutput = datepicker.toString();
      var datepickerContainsFDT = datepickerOutput.indexOf('(FDT)') > -1;
      var datepickerContainsGmtOffset = datepickerOutput.indexOf('GMT+0300') > -1;

      expect(datepickerContainsFDT).toBe(true);
      expect(datepickerContainsGmtOffset).toBe(true);
    });

    it('should be able to set the timezone to (UTC -6)', function() {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        utcTimezone: -6
      });

      var datepickerOutput = datepicker.toString();
      var datepickerContainsGmtOffset = datepickerOutput.indexOf('GMT-0600') > -1;

      expect(datepickerContainsGmtOffset).toBe(true);
    });

  });

  describe('output', function() {

    beforeEach(function() {
      var dateString = 'November 21, 2010 19:21:13 GMT';
      date = new Date(dateString);

      datepicker = new MtrDatepicker({
        target: 'datepicker',
        timestamp: date.getTime(),
        utcTimezone: 'Europe/Sofia'
      });
    });

    it('of toDateString should print Sun Nov 21 2010', function() {
      var expectedDateString = date.toDateString();
      var datepickerDateString = datepicker.toDateString();

      expect(datepickerDateString).toEqual(expectedDateString);
    });

    it('of toGMTString should print Sun, 21 Nov 2010 19:21:13 GMT', function() {
      var expectedDateString = 'Sun, 21 Nov 2010 20:30:00 GMT';
      var datepickerDateString = datepicker.toGMTString();

      expect(datepickerDateString).toEqual(expectedDateString);
    });

    it('of toString should print Sun Nov 21 2010 19:30:00 GMT+0300 (FDT)', function() {
      var expectedDateString = 'Sun Nov 21 2010 22:30:00 GMT+0300 (FDT)';
      var datepickerDateString = datepicker.toString();

      expect(datepickerDateString).toEqual(expectedDateString);
    });

    it('of toUTCString should print Sun, 21 Nov 2010 19:30:00 GMT', function() {
      var expectedDateString = 'Sun, 21 Nov 2010 20:30:00 GMT';
      var datepickerDateString = datepicker.toUTCString();

      expect(datepickerDateString).toEqual(expectedDateString);
    });

    it('of format(Z) should be +3:00', function() {
      var expectedDateString = '+3:00';
      var datepickerDateString = datepicker.format('Z');

      expect(datepickerDateString).toEqual(expectedDateString);
    });

    it('of format(ZZ) should be +03:00', function() {
      var expectedDateString = '+03:00';
      var datepickerDateString = datepicker.format('ZZ');

      expect(datepickerDateString).toEqual(expectedDateString);
    });

  });


});