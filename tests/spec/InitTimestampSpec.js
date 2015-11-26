describe('MTR Datepicker: Init with timestamp', function() {
  
  var datepickerSelectorName = 'datepicker';
  var datepickerSelector = '#' + datepickerSelectorName;
  var datetimeFormat = 'hh:mmA DD.MM.YYYY';

  beforeEach(function() {
    setBaseFixtures();
  });

  function setBaseFixtures() {
    var datepickerFixture = setFixtures('<div id="datepicker"></div>');
  }

  it('should set and keep the input date November 21, 2010 10:00:00 the same - 10:00AM 21.11.2010', function() {
    var startDate = new Date('November 21, 2010 10:00:00');
    var expectedValue = '10:00AM 21.11.2010';
    var datepicker = new MtrDatepicker({
      target: 'datepicker',
      timestamp: startDate.getTime() 
    });

    var datepickerValue = datepicker.format(datetimeFormat);
    expect(datepickerValue).toEqual(expectedValue);
  });

  it('should set the input date February 15, 2013 10:52 to 11:00PM 15.02.2013', function() {
    var startDate = new Date('February 15, 2013 10:52');
    var expectedValue = '11:00AM 15.02.2013';
    var datepicker = new MtrDatepicker({
      target: 'datepicker',
      timestamp: startDate.getTime(),
    });

    var datepickerValue = datepicker.format(datetimeFormat);
    expect(datepickerValue).toEqual(expectedValue);
  });

  it('should set the input date October 28, 2011 20:03 to 8:10PM 28.10.2011', function() {
    var startDate = new Date('October 28, 2011 20:03');
    var expectedValue = '08:10PM 28.10.2011';
    var datepicker = new MtrDatepicker({
      target: 'datepicker',
      timestamp: startDate.getTime(),
    });

    var datepickerValue = datepicker.format(datetimeFormat);
    expect(datepickerValue).toEqual(expectedValue);
  });

  /*
  it('should set the input date 11:59PM 21.12.2014 to the new year 12:00AM 01.01.2015', function() {
    var startDate = new Date('2014-12-31 23:59');
    var expectedValue = '12:00AM 01.01.2015';
    var datepicker = new MtrDatepicker({
      target: 'datepicker',
      timestamp: startDate.getTime(),
      future: true
    });

    var datepickerValue = datepicker.format(datetimeFormat);
    expect(datepickerValue).toEqual(expectedValue);
  });
  */

});