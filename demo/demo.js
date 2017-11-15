
var MtrDatepickerDemo = (function() {

	var datepickers = [];
	var exportSettings;

	var init = function(config, settings) {
		exportSettings = settings;
		var datepicker = new MtrDatepicker(config);
		datepickers.push(datepicker);

		var exportFormatsContainer = document.getElementById(settings.exportFormats);
	 	datepickerChange(exportFormatsContainer, datepicker);

	 	datepicker.onChange('all', function() {
			datepickerChange(exportFormatsContainer, datepicker);
		});

		initCustomizeFuture(datepicker, settings.customizeFuture, config);
		initCustomizeSmartAmPm(datepicker, settings.customizeSmartAmPm, config);
		initCustomizeDisableAmPm(datepicker, settings.customizeDisableAmPm, config);
		initCustomizeMinutes(datepicker, settings, config);
		initCustomizeMonths(datepicker, settings, config);
		initCustomizeYears(datepicker, settings, config);

		return datepicker;
	};

	/**
	 * Dump the datepicker date in different formats
	 */
	function datepickerChange(resultElement, datepicker) {
		var result =
			datepicker.toDateString() + '<br />' +
			datepicker.toLocaleDateString() + '<br /><br />' +

			datepicker.toTimeString() + '<br />' +
			datepicker.getFullTime() + '<br />' +
			datepicker.format('M/D/YYYY hh:mm A') + '<br />' +
			datepicker.format('YYYY-MM-DD HH:mm') + '<br />';

		resultElement.innerHTML = result;
	}

	function initCustomizeFuture(datepicker, checkbox, config) {
		var checkboxElement = document.getElementById(checkbox);

		checkboxElement.addEventListener('change', function() {
			config.future = checkboxElement.checked;
      if (config.future) {
        var dateNow = new Date();
        config.timestamp = dateNow.getTime();
      }
      else {
        delete config.timestamp;
      }

      datepicker = init(config, exportSettings);
		}, false);
	}

	function initCustomizeSmartAmPm(datepicker, checkbox, config) {
		var checkboxElement = document.getElementById(checkbox);

		checkboxElement.addEventListener('change', function() {
			config.smartHours = checkboxElement.checked;
			datepicker = init(config, exportSettings);
		}, false);

	}

	function initCustomizeDisableAmPm(datepicker, checkbox, config) {
		var checkboxElement = document.getElementById(checkbox);

		checkboxElement.addEventListener('change', function() {
			config.disableAmPm = checkboxElement.checked;
			datepicker = init(config, exportSettings);
		}, false);
	}

	function initCustomizeMinutes(datepicker, selectors, config) {

		var elements = {
			checkboxElement: document.getElementById(selectors.customizeMinutes),
			minElement: document.getElementById(selectors.customizeMinutesMin),
			maxElement: document.getElementById(selectors.customizeMinutesMax),
			stepElement: document.getElementById(selectors.customizeMinutesStep)
		};

		customizeMinMaxStep(elements, 'minutes', datepicker, config);
	}

	function initCustomizeMonths(datepicker, selectors, config) {

		var elements = {
			checkboxElement: document.getElementById(selectors.customizeMonths),
			minElement: document.getElementById(selectors.customizeMonthsMin),
			maxElement: document.getElementById(selectors.customizeMonthsMax),
			stepElement: document.getElementById(selectors.customizeMonthsStep)
		};

		customizeMinMaxStep(elements, 'months', datepicker, config);
	}

	function initCustomizeYears(datepicker, selectors, config) {

		var elements = {
			checkboxElement: document.getElementById(selectors.customizeYears),
			minElement: document.getElementById(selectors.customizeYearsMin),
			maxElement: document.getElementById(selectors.customizeYearsMax),
			stepElement: document.getElementById(selectors.customizeYearsStep)
		};

		customizeMinMaxStep(elements, 'years', datepicker, config);
	}

	function customizeMinMaxStep(elements, type, datepicker, config) {
		elements.checkboxElement.addEventListener('change', function() {
			eventListenerFunc(datepicker, config);
		}, false);

		elements.minElement.addEventListener('change', function() {
			eventListenerFunc(datepicker, config);
		}, false);

		elements.maxElement.addEventListener('change', function() {
			eventListenerFunc(datepicker, config);
		}, false);

		elements.stepElement.addEventListener('change', function() {
			eventListenerFunc(datepicker, config);
		}, false);

		function eventListenerFunc(datepicker, config) {
			if (elements.checkboxElement.checked) {
				config[type] = {
					min: parseInt(elements.minElement.value),
					max: parseInt(elements.maxElement.value),
					step: parseInt(elements.stepElement.value),
				};
			}
			else {
				delete config[type];
			}

			datepicker = init(config, exportSettings);
		}
	}

	return {
		init: init
	};

})();
