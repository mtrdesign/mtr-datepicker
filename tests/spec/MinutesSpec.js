describe('MTR Datepicker: Minutes ', function() {
  
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
    it('format("m") should return minutes close to the current one', function() {
      var currentDate = new Date();
      var currentMinutes = currentDate.getMinutes();
      var datepickerMinutes = datepicker.format('m');

      if (currentMinutes.toString().length === 1) {
        currentMinutes = 10;
      }
      // else if (currentMinutes.toString().charAt(currentMinutes.toString().length-1) === '0') {
      //   currentMinutes = currentMinutes;
      // }
      else {
        var minutesString = currentMinutes.toString();

        if (minutesString.charAt(0) === '5') {
          currentMinutes = '0';
        }
        else {
          currentMinutes = (parseInt(minutesString.charAt(0))+1) + '0';
        }
      }

      expect(datepickerMinutes).toEqual(currentMinutes.toString());
    });

  });

  describe('setter', function() {

    it('setMinutes() should work when you try to assign value 30', function() {
      var newMinutesValue = 30;
      datepicker.setMinutes(newMinutesValue);
      var datepickerMinutes = datepicker.format('m');

      expect(datepickerMinutes).toEqual(newMinutesValue.toString());
    });

    it('format("mm") should return 00 if the current minutes are 0', function() {
      var newMinutesValue = 0;
      var expectedMinutesValue = '00';
      datepicker.setMinutes(newMinutesValue);
      var datepickerMinutes = datepicker.format('mm');

      expect(datepickerMinutes).toEqual(expectedMinutesValue.toString());
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

    it('on the upper arrow to be triggered', function() {
      spyEvent = spyOnEvent(arrowUpElement, 'click');
      var clickEvent = createClickEvent();
      arrowUpElement[0].dispatchEvent(clickEvent);
           
      expect('click').toHaveBeenTriggeredOn(arrowUpElement);
      expect(spyEvent).toHaveBeenTriggered();
    });

    /**
     * To be valid the result should be checked using getter, DOM attribute and DOM vissible element
     */
    it('on the upper arrow should change the minutes from 40 to 50', function() {
      var initMinutesValue = 40;
      var expectedMinutesValue = '50';

      datepicker.setMinutes(initMinutesValue);

      spyEvent = spyOnEvent(arrowUpElement, 'click');
      var clickEvent = createClickEvent();
      arrowUpElement[0].dispatchEvent(clickEvent);

      var datepickerGetterValue = datepicker.format('m');
      
      expect(datepickerGetterValue).toEqual(expectedMinutesValue);
      expect(inputElement).toHaveAttr('data-old-value', expectedMinutesValue);

    });

    /**
     * To be valid the result should be checked using getter, DOM attribute and DOM vissible element
     */
    it('2 times on the upper arrow should change the minutes from 50 to 10', function() {
      var initMinutesValue = 50;
      var expectedMinutesValue = '10';

      datepicker.setMinutes(initMinutesValue);

      spyEvent = spyOnEvent(arrowUpElement, 'click');
      var clickEvent = createClickEvent();
      arrowUpElement[0].dispatchEvent(clickEvent);
      arrowUpElement[0].dispatchEvent(clickEvent);

      var datepickerGetterValue = datepicker.format('m');
      
      expect(datepickerGetterValue).toEqual(expectedMinutesValue);
      expect(inputElement).toHaveAttr('data-old-value', expectedMinutesValue);
    });

  });

});