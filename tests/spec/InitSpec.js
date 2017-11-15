describe('MTR Datepicker: After init', function() {

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

  it('should have .mtr-datepicker class to the target element', function() {
    var datepickerElement = $(datepickerSelector);
    expect(datepickerElement).toHaveClass('mtr-datepicker');
  });

  it('should have input slider for the hours', function() {
    var datepickerElement = $(datepickerSelector);
    var expectedElement = datepickerSelector+'-input-hours.mtr-input-slider';

    expect(datepickerElement).toContainElement(expectedElement);
  });

  it('should have input slider for the minutes', function() {
    var datepickerElement = $(datepickerSelector);
    var expectedElement = datepickerSelector+'-input-minutes.mtr-input-slider';

    expect(datepickerElement).toContainElement(expectedElement);
  });

  it('should have input radio for the AM/PM', function() {
    var datepickerElement = $(datepickerSelector);
    var expectedElement = datepickerSelector+'-input-ampm.mtr-input-radio';

    expect(datepickerElement).toContainElement(expectedElement);
  });

  it('should have input slider for the dates', function() {
    var datepickerElement = $(datepickerSelector);
    var expectedElement = datepickerSelector+'-input-dates.mtr-input-slider';

    expect(datepickerElement).toContainElement(expectedElement);
  });

  it('should have input slider for the months', function() {
    var datepickerElement = $(datepickerSelector);
    var expectedElement = datepickerSelector+'-input-months.mtr-input-slider';

    expect(datepickerElement).toContainElement(expectedElement);
  });

  it('should have input slider for the years', function() {
    var datepickerElement = $(datepickerSelector);
    var expectedElement = '#'+datepickerSelectorName+'-input-years.mtr-input-slider';

    expect(datepickerElement).toContainElement(expectedElement);
  });
});