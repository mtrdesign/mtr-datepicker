describe('MTR Datepicker: Should validate user input for', function() {
  
  var datepickerSelectorName = 'datepicker';
  var datepickerSelector = '#' + datepickerSelectorName;
  var datepicker;
  var loadedFixtures;

  beforeEach(function() {
    setBaseFixtures();
    loadedFixtures = jQuery('#datepicker');
  });

  function setBaseFixtures() {
    var datepickerFixture = setFixtures('<div id="datepicker"></div>');
  }

  describe('minutes', function() {
    it('.min string should not init the datepicker', function() {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        minutes: {
          min: "1"
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occured during the initialization of the datepicker.</div>'));
    });

    it('.max string should not init the datepicker', function() {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        minutes: {
          max: "1"
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occured during the initialization of the datepicker.</div>'));
    });

    it('.step string should not init the datepicker', function() {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        minutes: {
          step: "1"
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occured during the initialization of the datepicker.</div>'));
    });

    it('.min shoud be less than .max -> should not init the datepicker', function() {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        minutes: {
          min: 10,
          max: 5
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occured during the initialization of the datepicker.</div>'));
    });

    it('.step > .max - .min -> should not init the datepicker', function() {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        minutes: {
          min: 0,
          max: 20,
          step: 30
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occured during the initialization of the datepicker.</div>'));
    });
  });

});