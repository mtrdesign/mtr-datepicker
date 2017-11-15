describe('MTR Datepicker: Output', function() {
  
  var datepickerSelectorName = 'datepicker';
  var datepickerSelector = '#' + datepickerSelectorName;
  var datepicker, date;

  beforeEach(function() {
    setBaseFixtures();

    var dateString = 'November 21, 2010 19:21:13 GMT'; 
    date = new Date(dateString);

    datepicker = new MtrDatepicker({
      target: 'datepicker',
      timestamp: date.getTime()
    });

    date.setSeconds(0);
    date = new Date(roundUpTimestamp(date.getTime()));
  });

  function roundUpTimestamp(timestamp) {
   var border = 10 * 60 * 1000; // 10 minutes
   var delta = (border - (timestamp % border)) % timestamp;
   return (timestamp + delta);
  }

  function setBaseFixtures() {
    var datepickerFixture = setFixtures('<div id="datepicker"></div>');
  }

  it('of toDateString should print Sun Nov 21 2010', function() {
    var expectedDateString = date.toDateString();
    var datepickerDateString = datepicker.toDateString();

    expect(datepickerDateString).toEqual(expectedDateString);
  });

  it('of toGMTString should print Sun, 21 Nov 2010 19:21:13 GMT', function() {
    var expectedDateString = date.toGMTString();
    var datepickerDateString = datepicker.toGMTString();

    expect(datepickerDateString).toEqual(expectedDateString);
  });

  it('of toISOString should print 2010-11-21T19:30:00.000Z', function() {
    var expectedDateString = date.toISOString();
    var datepickerDateString = datepicker.toISOString();

    expect(datepickerDateString).toEqual(expectedDateString);
  });

  it('of toLocaleString should print 11/21/2010, 7:30:00 PM', function() {
    var expectedDateString = date.toLocaleString();
    var datepickerDateString = datepicker.toLocaleString();

    expect(datepickerDateString).toEqual(expectedDateString);
  });

  it('of toLocaleTimeString should print 7:30:00 PM', function() {
    var expectedDateString = date.toLocaleTimeString();
    var datepickerDateString = datepicker.toLocaleTimeString();

    expect(datepickerDateString).toEqual(expectedDateString);
  });

  it('of toString should print Sun Nov 21 2010 19:30:00 GMT+0000 (EET)', function() {
    var expectedDateString = date.toString();
    var datepickerDateString = datepicker.toString();

    expect(datepickerDateString).toEqual(expectedDateString);
  });

  it('of toTimeString should print 19:30:00 GMT+0000 (EET)', function() {
    var expectedDateString = date.toTimeString();
    var datepickerDateString = datepicker.toTimeString();

    expect(datepickerDateString).toEqual(expectedDateString);
  });

  it('of toUTCString should print Sun, 21 Nov 2010 19:30:00 GMT', function() {
    var expectedDateString = date.toUTCString();
    var datepickerDateString = datepicker.toUTCString();

    expect(datepickerDateString).toEqual(expectedDateString);
  });
  
});