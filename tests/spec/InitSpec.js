describe('MTR Datepicker: After init', function () {
  var datepickerSelectorName = 'datepicker';
  var datepickerSelector = '#' + datepickerSelectorName;
  var datepicker;

  beforeEach(function () {
    setBaseFixtures();

    datepicker = new MtrDatepicker({
      target: 'datepicker'
    });
  });

  function setBaseFixtures () {
    setFixtures('<div id="datepicker"></div>');
  }

  it('should have .mtr-datepicker class to the target element', function () {
    var datepickerElement = $(datepickerSelector);

    expect(datepickerElement).toHaveClass('mtr-datepicker');
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

  it('should have input slider for the dates', function () {
    var datepickerElement = $(datepickerSelector);
    var expectedElement = datepickerSelector + '-input-dates.mtr-input-slider';

    expect(datepickerElement).toContainElement(expectedElement);
  });

  it('should have input slider for the months', function () {
    var datepickerElement = $(datepickerSelector);
    var expectedElement = datepickerSelector + '-input-months.mtr-input-slider';

    expect(datepickerElement).toContainElement(expectedElement);
  });

  it('should have input slider for the years', function () {
    var datepickerElement = $(datepickerSelector);
    var expectedElement = '#' + datepickerSelectorName + '-input-years.mtr-input-slider';

    expect(datepickerElement).toContainElement(expectedElement);
  });

  it('should clear the markup after destroy', function () {
    var datepickerElement = $(datepickerSelector);
    var hoursElement = datepickerSelector + '-input-hours.mtr-input-slider';
    var minutesElement = datepickerSelector + '-input-minutes.mtr-input-slider';
    var ampmElement = datepickerSelector + '-input-ampm.mtr-input-radio';
    var datesElement = datepickerSelector + '-input-dates.mtr-input-slider';
    var monthsElement = datepickerSelector + '-input-months.mtr-input-slider';
    var yearsElement = datepickerSelector + '-input-years.mtr-input-slider';

    datepicker.destroy();

    expect(datepickerElement.html()).toEqual('');
    expect(datepickerElement).not.toContainElement(hoursElement);
    expect(datepickerElement).not.toContainElement(minutesElement);
    expect(datepickerElement).not.toContainElement(ampmElement);
    expect(datepickerElement).not.toContainElement(datesElement);
    expect(datepickerElement).not.toContainElement(monthsElement);
    expect(datepickerElement).not.toContainElement(yearsElement);
  });
});
