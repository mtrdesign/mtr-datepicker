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
          max: "60"
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

  describe('hours', function() {
    it('.min string should not init the datepicker', function() {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        hours: {
          min: "1"
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occured during the initialization of the datepicker.</div>'));
    });

    it('.max string should not init the datepicker', function() {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        hours: {
          max: "25"
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occured during the initialization of the datepicker.</div>'));
    });

    it('.step string should not init the datepicker', function() {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        hours: {
          step: "1"
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occured during the initialization of the datepicker.</div>'));
    });

    it('.min shoud be less than .max -> should not init the datepicker', function() {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        hours: {
          min: 10,
          max: 5
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occured during the initialization of the datepicker.</div>'));
    });

    it('.step > .max - .min -> should not init the datepicker', function() {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        hours: {
          min: 1,
          max: 2,
          step: 3
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occured during the initialization of the datepicker.</div>'));
    });
  });

  describe('dates', function() {
    it('.min string should not init the datepicker', function() {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        dates: {
          min: "1"
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occured during the initialization of the datepicker.</div>'));
    });

    it('.max string should not init the datepicker', function() {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        dates: {
          max: "32"
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occured during the initialization of the datepicker.</div>'));
    });

    it('.step string should not init the datepicker', function() {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        dates: {
          step: "1"
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occured during the initialization of the datepicker.</div>'));
    });

    it('.min shoud be less than .max -> should not init the datepicker', function() {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        dates: {
          min: 10,
          max: 5
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occured during the initialization of the datepicker.</div>'));
    });

    it('.step > .max - .min -> should not init the datepicker', function() {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        dates: {
          min: 1,
          max: 2,
          step: 3
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occured during the initialization of the datepicker.</div>'));
    });
  });

  describe('months', function() {
    it('.min string should not init the datepicker', function() {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        months: {
          min: "1"
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occured during the initialization of the datepicker.</div>'));
    });

    it('.max string should not init the datepicker', function() {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        months: {
          max: "13"
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occured during the initialization of the datepicker.</div>'));
    });

    it('.step string should not init the datepicker', function() {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        months: {
          step: "1"
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occured during the initialization of the datepicker.</div>'));
    });

    it('.min shoud be less than .max -> should not init the datepicker', function() {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        months: {
          min: 10,
          max: 5
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occured during the initialization of the datepicker.</div>'));
    });

    it('.step > .max - .min -> should not init the datepicker', function() {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        months: {
          min: 1,
          max: 2,
          step: 3
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occured during the initialization of the datepicker.</div>'));
    });
  });

  describe('years', function() {
    it('.min string should not init the datepicker', function() {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        years: {
          min: "1969"
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occured during the initialization of the datepicker.</div>'));
    });

    it('.max string should not init the datepicker', function() {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        years: {
          max: "2021"
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occured during the initialization of the datepicker.</div>'));
    });

    it('.step string should not init the datepicker', function() {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        years: {
          step: "1"
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occured during the initialization of the datepicker.</div>'));
    });

    it('.min shoud be less than .max -> should not init the datepicker', function() {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        years: {
          min: 2010,
          max: 1994
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occured during the initialization of the datepicker.</div>'));
    });

    it('.step > .max - .min -> should not init the datepicker', function() {
      datepicker = new MtrDatepicker({
        target: 'datepicker',
        months: {
          min: 1970,
          max: 1972,
          step: 3
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occured during the initialization of the datepicker.</div>'));
    });
  });

});