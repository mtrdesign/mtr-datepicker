/* eslint-disable jasmine/no-spec-dupes */
describe('MTR Datepicker: Should validate user input for', function () {
  var loadedFixtures;

  beforeEach(function () {
    setBaseFixtures();
    loadedFixtures = jQuery('#datepicker');

    spyOn(console, 'error');
  });

  function setBaseFixtures () {
    setFixtures('<div id="datepicker"></div>');
  }

  describe('datepicker and timepicker props', function () {
    it('should not be able to disable both pickers', function () {
      var datepicker = new MtrDatepicker({
        target: 'datepicker',
        datepicker: false,
        timepicker: false
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occurred during the initialization of the datepicker.</div>'));

      datepicker.destroy();
    });
  });

  describe('minutes', function () {
    it('.min string should not init the datepicker', function () {
      var datepicker = new MtrDatepicker({
        target: 'datepicker',
        minutes: {
          min: '1'
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occurred during the initialization of the datepicker.</div>'));
      expect(console.error).toHaveBeenCalledWith('Invalid argument: minutes.min should be a number.');
      expect(console.error).toHaveBeenCalledWith('Initialization of the datepicker is blocked because of errors in the config.');

      datepicker.destroy();
    });

    it('.max string should not init the datepicker', function () {
      var datepicker = new MtrDatepicker({
        target: 'datepicker',
        minutes: {
          max: '60'
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occurred during the initialization of the datepicker.</div>'));
      expect(console.error).toHaveBeenCalledWith('Invalid argument: minutes.max should be a number.');
      expect(console.error).toHaveBeenCalledWith('Initialization of the datepicker is blocked because of errors in the config.');

      datepicker.destroy();
    });

    it('.step string should not init the datepicker', function () {
      var datepicker = new MtrDatepicker({
        target: 'datepicker',
        minutes: {
          step: '1'
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occurred during the initialization of the datepicker.</div>'));
      expect(console.error).toHaveBeenCalledWith('Invalid argument: minutes.step should be a number.');
      expect(console.error).toHaveBeenCalledWith('Initialization of the datepicker is blocked because of errors in the config.');

      datepicker.destroy();
    });

    it('.min should be less than .max -> should not init the datepicker', function () {
      var datepicker = new MtrDatepicker({
        target: 'datepicker',
        minutes: {
          min: 10,
          max: 5
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occurred during the initialization of the datepicker.</div>'));
      expect(console.error).toHaveBeenCalledWith('Invalid argument: minutes.max should be larger than minutes.min.');
      expect(console.error).toHaveBeenCalledWith('Initialization of the datepicker is blocked because of errors in the config.');

      datepicker.destroy();
    });

    it('.step > .max - .min -> should not init the datepicker', function () {
      var datepicker = new MtrDatepicker({
        target: 'datepicker',
        minutes: {
          min: 0,
          max: 20,
          step: 30
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occurred during the initialization of the datepicker.</div>'));
      expect(console.error).toHaveBeenCalledWith('Invalid argument: minutes.step should be less than minutes.max-minutes.min.');
      expect(console.error).toHaveBeenCalledWith('Initialization of the datepicker is blocked because of errors in the config.');

      datepicker.destroy();
    });
  });

  describe('hours', function () {
    it('.min string should not init the datepicker', function () {
      var datepicker = new MtrDatepicker({
        target: 'datepicker',
        hours: {
          min: '1'
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occurred during the initialization of the datepicker.</div>'));
      expect(console.error).toHaveBeenCalledWith('Invalid argument: hours.min should be a number.');
      expect(console.error).toHaveBeenCalledWith('Initialization of the datepicker is blocked because of errors in the config.');

      datepicker.destroy();
    });

    it('.max string should not init the datepicker', function () {
      var datepicker = new MtrDatepicker({
        target: 'datepicker',
        hours: {
          max: '25'
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occurred during the initialization of the datepicker.</div>'));
      expect(console.error).toHaveBeenCalledWith('Invalid argument: hours.max should be a number.');
      expect(console.error).toHaveBeenCalledWith('Initialization of the datepicker is blocked because of errors in the config.');

      datepicker.destroy();
    });

    it('.step string should not init the datepicker', function () {
      var datepicker = new MtrDatepicker({
        target: 'datepicker',
        hours: {
          step: '1'
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occurred during the initialization of the datepicker.</div>'));
      expect(console.error).toHaveBeenCalledWith('Invalid argument: hours.step should be a number.');
      expect(console.error).toHaveBeenCalledWith('Initialization of the datepicker is blocked because of errors in the config.');

      datepicker.destroy();
    });

    it('.min should be less than .max -> should not init the datepicker', function () {
      var datepicker = new MtrDatepicker({
        target: 'datepicker',
        hours: {
          min: 10,
          max: 5
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occurred during the initialization of the datepicker.</div>'));
      expect(console.error).toHaveBeenCalledWith('Invalid argument: hours.max should be larger than hours.min.');
      expect(console.error).toHaveBeenCalledWith('Initialization of the datepicker is blocked because of errors in the config.');

      datepicker.destroy();
    });

    it('.step > .max - .min -> should not init the datepicker', function () {
      var datepicker = new MtrDatepicker({
        target: 'datepicker',
        hours: {
          min: 1,
          max: 2,
          step: 3
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occurred during the initialization of the datepicker.</div>'));
      expect(console.error).toHaveBeenCalledWith('Invalid argument: hours.step should be less than hours.max-hours.min.');
      expect(console.error).toHaveBeenCalledWith('Initialization of the datepicker is blocked because of errors in the config.');

      datepicker.destroy();
    });
  });

  describe('dates', function () {
    it('.min string should not init the datepicker', function () {
      var datepicker = new MtrDatepicker({
        target: 'datepicker',
        dates: {
          min: '1'
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occurred during the initialization of the datepicker.</div>'));
      expect(console.error).toHaveBeenCalledWith('Invalid argument: dates.min should be a number.');
      expect(console.error).toHaveBeenCalledWith('Initialization of the datepicker is blocked because of errors in the config.');

      datepicker.destroy();
    });

    it('.max string should not init the datepicker', function () {
      var datepicker = new MtrDatepicker({
        target: 'datepicker',
        dates: {
          max: '32'
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occurred during the initialization of the datepicker.</div>'));
      expect(console.error).toHaveBeenCalledWith('Invalid argument: dates.max should be a number.');
      expect(console.error).toHaveBeenCalledWith('Initialization of the datepicker is blocked because of errors in the config.');

      datepicker.destroy();
    });

    it('.step string should not init the datepicker', function () {
      var datepicker = new MtrDatepicker({
        target: 'datepicker',
        dates: {
          step: '1'
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occurred during the initialization of the datepicker.</div>'));
      expect(console.error).toHaveBeenCalledWith('Invalid argument: dates.step should be a number.');
      expect(console.error).toHaveBeenCalledWith('Initialization of the datepicker is blocked because of errors in the config.');

      datepicker.destroy();
    });

    it('.min should be less than .max -> should not init the datepicker', function () {
      var datepicker = new MtrDatepicker({
        target: 'datepicker',
        dates: {
          min: 10,
          max: 5
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occurred during the initialization of the datepicker.</div>'));
      expect(console.error).toHaveBeenCalledWith('Invalid argument: dates.max should be larger than dates.min.');
      expect(console.error).toHaveBeenCalledWith('Initialization of the datepicker is blocked because of errors in the config.');

      datepicker.destroy();
    });

    it('.step > .max - .min -> should not init the datepicker', function () {
      var datepicker = new MtrDatepicker({
        target: 'datepicker',
        dates: {
          min: 1,
          max: 2,
          step: 3
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occurred during the initialization of the datepicker.</div>'));
      expect(console.error).toHaveBeenCalledWith('Invalid argument: dates.step should be less than dates.max-dates.min.');
      expect(console.error).toHaveBeenCalledWith('Initialization of the datepicker is blocked because of errors in the config.');

      datepicker.destroy();
    });
  });

  describe('months', function () {
    it('.min string should not init the datepicker', function () {
      var datepicker = new MtrDatepicker({
        target: 'datepicker',
        months: {
          min: '1'
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occurred during the initialization of the datepicker.</div>'));
      expect(console.error).toHaveBeenCalledWith('Invalid argument: months.min should be a number.');
      expect(console.error).toHaveBeenCalledWith('Initialization of the datepicker is blocked because of errors in the config.');

      datepicker.destroy();
    });

    it('.max string should not init the datepicker', function () {
      var datepicker = new MtrDatepicker({
        target: 'datepicker',
        months: {
          max: '13'
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occurred during the initialization of the datepicker.</div>'));
      expect(console.error).toHaveBeenCalledWith('Invalid argument: months.max should be a number.');
      expect(console.error).toHaveBeenCalledWith('Initialization of the datepicker is blocked because of errors in the config.');

      datepicker.destroy();
    });

    it('.step string should not init the datepicker', function () {
      var datepicker = new MtrDatepicker({
        target: 'datepicker',
        months: {
          step: '1'
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occurred during the initialization of the datepicker.</div>'));
      expect(console.error).toHaveBeenCalledWith('Invalid argument: months.step should be a number.');
      expect(console.error).toHaveBeenCalledWith('Initialization of the datepicker is blocked because of errors in the config.');

      datepicker.destroy();
    });

    it('.min should be less than .max -> should not init the datepicker', function () {
      var datepicker = new MtrDatepicker({
        target: 'datepicker',
        months: {
          min: 10,
          max: 5
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occurred during the initialization of the datepicker.</div>'));
      expect(console.error).toHaveBeenCalledWith('Invalid argument: months.max should be larger than months.min.');
      expect(console.error).toHaveBeenCalledWith('Initialization of the datepicker is blocked because of errors in the config.');

      datepicker.destroy();
    });

    it('.step > .max - .min -> should not init the datepicker', function () {
      var datepicker = new MtrDatepicker({
        target: 'datepicker',
        months: {
          min: 1,
          max: 2,
          step: 3
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occurred during the initialization of the datepicker.</div>'));
      expect(console.error).toHaveBeenCalledWith('Invalid argument: months.step should be less than months.max-months.min.');
      expect(console.error).toHaveBeenCalledWith('Initialization of the datepicker is blocked because of errors in the config.');

      datepicker.destroy();
    });
  });

  describe('years', function () {
    it('.min string should not init the datepicker', function () {
      var datepicker = new MtrDatepicker({
        target: 'datepicker',
        years: {
          min: '1969'
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occurred during the initialization of the datepicker.</div>'));
      expect(console.error).toHaveBeenCalledWith('Invalid argument: years.min should be a number.');
      expect(console.error).toHaveBeenCalledWith('Initialization of the datepicker is blocked because of errors in the config.');

      datepicker.destroy();
    });

    it('.max string should not init the datepicker', function () {
      var datepicker = new MtrDatepicker({
        target: 'datepicker',
        years: {
          max: '2021'
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occurred during the initialization of the datepicker.</div>'));
      expect(console.error).toHaveBeenCalledWith('Invalid argument: years.max should be a number.');
      expect(console.error).toHaveBeenCalledWith('Initialization of the datepicker is blocked because of errors in the config.');

      datepicker.destroy();
    });

    it('.step string should not init the datepicker', function () {
      var datepicker = new MtrDatepicker({
        target: 'datepicker',
        years: {
          step: '1'
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occurred during the initialization of the datepicker.</div>'));
      expect(console.error).toHaveBeenCalledWith('Invalid argument: years.step should be a number.');
      expect(console.error).toHaveBeenCalledWith('Initialization of the datepicker is blocked because of errors in the config.');

      datepicker.destroy();
    });

    it('.min should be less than .max -> should not init the datepicker', function () {
      var datepicker = new MtrDatepicker({
        target: 'datepicker',
        years: {
          min: 2010,
          max: 1994
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occurred during the initialization of the datepicker.</div>'));
      expect(console.error).toHaveBeenCalledWith('Invalid argument: years.max should be larger than years.min.');
      expect(console.error).toHaveBeenCalledWith('Initialization of the datepicker is blocked because of errors in the config.');

      datepicker.destroy();
    });

    it('.step > .max - .min -> should not init the datepicker', function () {
      var datepicker = new MtrDatepicker({
        target: 'datepicker',
        years: {
          min: 1970,
          max: 1972,
          step: 3
        }
      });

      expect(loadedFixtures).toContainHtml(jQuery('<div class=" mtr-error-message">An error has occurred during the initialization of the datepicker.</div>'));
      expect(console.error).toHaveBeenCalledWith('Invalid argument: years.step should be less than years.max-years.min.');
      expect(console.error).toHaveBeenCalledWith('Initialization of the datepicker is blocked because of errors in the config.');

      datepicker.destroy();
    });
  });
});
