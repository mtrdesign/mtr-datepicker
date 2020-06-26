
// eslint-disable-next-line no-unused-vars
var MtrDatepickerDemo = (function () {
  var exportSettings;
  var datepicker;

  var init = function (config, settings) {
    if (datepicker) {
      datepicker.destroy();
    }

    exportSettings = settings;
    datepicker = new MtrDatepicker(config);

    var exportFormatsContainer = document.getElementById(settings.exportFormats);
    datepickerChange(exportFormatsContainer, datepicker);

    datepicker.onChange('all', function () {
      datepickerChange(exportFormatsContainer, datepicker);
    });

    initShowDatePicker(settings.showDatePicker, config);
    initCustomizeFuture(settings.customizeFuture, config);
    initShowTimePicker(settings.showTimePicker, config);
    initCustomizeSmartAmPm(settings.customizeSmartAmPm, config);
    initCustomizeDisableAmPm(settings.customizeDisableAmPm, config);
    initCustomizeMinutes(settings, config);
    initCustomizeMonths(settings, config);
    initCustomizeYears(settings, config);

    return datepicker;
  };

  /**
   * Dump the datepicker date in different formats
   */
  function datepickerChange (resultElement, datepicker) {
    var result =
      datepicker.toDateString() + '<br />' +
      datepicker.toLocaleDateString() + '<br /><br />' +

      datepicker.toTimeString() + '<br />' +
      datepicker.getFullTime() + '<br />' +
      datepicker.format('M/D/YYYY hh:mm A') + '<br />' +
      datepicker.format('YYYY-MM-DD HH:mm') + '<br />';

    resultElement.innerHTML = result;
  }

  function initShowDatePicker (checkbox, config) {
    var checkboxElement = document.getElementById(checkbox);

    checkboxElement.removeEventListener('change', handleShowDatePickerCheckboxChange, false);
    checkboxElement.addEventListener('change', handleShowDatePickerCheckboxChange, false);
    checkboxElement.config = config;
  }

  function handleShowDatePickerCheckboxChange (event) {
    event.target.config.datepicker = event.target.checked;
    datepicker = init(event.target.config, exportSettings);
  }

  function initCustomizeFuture (checkbox, config) {
    var checkboxElement = document.getElementById(checkbox);

    checkboxElement.removeEventListener('change', handleCustomizeFutureCheckboxChange, false);
    checkboxElement.addEventListener('change', handleCustomizeFutureCheckboxChange, false);
    checkboxElement.config = config;
  }

  function handleCustomizeFutureCheckboxChange (event) {
    event.target.config.future = event.target.checked;

    if (event.target.config.future) {
      var dateNow = new Date();
      event.target.config.timestamp = dateNow.getTime();
    } else {
      delete event.target.config.timestamp;
    }

    datepicker = init(event.target.config, exportSettings);
  }

  function initShowTimePicker (checkbox, config) {
    var checkboxElement = document.getElementById(checkbox);

    checkboxElement.removeEventListener('change', handleShowTimePickerCheckboxChange, false);
    checkboxElement.addEventListener('change', handleShowTimePickerCheckboxChange, false);
    checkboxElement.config = config;
  }

  function handleShowTimePickerCheckboxChange (event) {
    event.target.config.timepicker = event.target.checked;
    datepicker = init(event.target.config, exportSettings);
  }

  function initCustomizeSmartAmPm (checkbox, config) {
    var checkboxElement = document.getElementById(checkbox);

    checkboxElement.removeEventListener('change', handleCustomizeSmartAmPmCheckboxChange, false);
    checkboxElement.addEventListener('change', handleCustomizeSmartAmPmCheckboxChange, false);
    checkboxElement.config = config;
  }

  function handleCustomizeSmartAmPmCheckboxChange (event) {
    event.target.config.smartHours = event.target.checked;
    datepicker = init(event.target.config, exportSettings);
  }

  function initCustomizeDisableAmPm (checkbox, config) {
    var checkboxElement = document.getElementById(checkbox);

    checkboxElement.removeEventListener('change', handleCustomizeDisableAmPmCheckboxChange, false);
    checkboxElement.addEventListener('change', handleCustomizeDisableAmPmCheckboxChange, false);
    checkboxElement.config = config;
  }

  function handleCustomizeDisableAmPmCheckboxChange (event) {
    event.target.config.disableAmPm = event.target.checked;
    datepicker = init(event.target.config, exportSettings);
  }

  function initCustomizeMinutes (selectors, config) {
    var elements = {
      checkboxElement: document.getElementById(selectors.customizeMinutes),
      minElement: document.getElementById(selectors.customizeMinutesMin),
      maxElement: document.getElementById(selectors.customizeMinutesMax),
      stepElement: document.getElementById(selectors.customizeMinutesStep)
    };

    customizeMinMaxStep(elements, 'minutes', config);
  }

  function initCustomizeMonths (selectors, config) {
    var elements = {
      checkboxElement: document.getElementById(selectors.customizeMonths),
      minElement: document.getElementById(selectors.customizeMonthsMin),
      maxElement: document.getElementById(selectors.customizeMonthsMax),
      stepElement: document.getElementById(selectors.customizeMonthsStep)
    };

    customizeMinMaxStep(elements, 'months', config);
  }

  function initCustomizeYears (selectors, config) {
    var elements = {
      checkboxElement: document.getElementById(selectors.customizeYears),
      minElement: document.getElementById(selectors.customizeYearsMin),
      maxElement: document.getElementById(selectors.customizeYearsMax),
      stepElement: document.getElementById(selectors.customizeYearsStep)
    };

    customizeMinMaxStep(elements, 'years', config);
  }

  function customizeMinMaxStep (elements, type, config) {
    elements.checkboxElement.removeEventListener('change', eventListenerFunc, false);
    elements.checkboxElement.addEventListener('change', eventListenerFunc, false);
    elements.checkboxElement.elements = elements;
    elements.checkboxElement.fieldType = type;
    elements.checkboxElement.config = config;

    elements.minElement.removeEventListener('change', eventListenerFunc, false);
    elements.minElement.addEventListener('change', eventListenerFunc, false);
    elements.minElement.elements = elements;
    elements.minElement.fieldType = type;
    elements.minElement.config = config;

    elements.maxElement.removeEventListener('change', eventListenerFunc, false);
    elements.maxElement.addEventListener('change', eventListenerFunc, false);
    elements.maxElement.elements = elements;
    elements.maxElement.fieldType = type;
    elements.maxElement.config = config;

    elements.stepElement.removeEventListener('change', eventListenerFunc, false);
    elements.stepElement.addEventListener('change', eventListenerFunc, false);
    elements.stepElement.elements = elements;
    elements.stepElement.fieldType = type;
    elements.stepElement.config = config;
  }

  function eventListenerFunc (event) {
    if (event.target.elements.checkboxElement.checked) {
      event.target.config[event.target.fieldType] = {
        min: parseInt(event.target.elements.minElement.value),
        max: parseInt(event.target.elements.maxElement.value),
        step: parseInt(event.target.elements.stepElement.value)
      };
    } else {
      delete event.target.config[event.target.fieldType];
    }

    datepicker = init(event.target.config, exportSettings);
  }

  return {
    init: init
  };
})();
