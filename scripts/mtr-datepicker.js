
function MtrDatepicker(inputConfig) {
	var self = this;

	// The main configuration properties
	// All of them can be overided by the ini method
	var config = {
		targetElement: null,
		defaultValues: {
			hours: 				[],
			minutes: 			[],
			dates: 				[],
			datesNames: 	[],
			months: 			[],
			years: 				[],
		},
		hours: {
			min: 1,
			max: 12,
			step: 1
		},
		minutes: {
			min: 0,
			max: 55,
			step: 5
		},
		months: {
			min: 0,
			max: 11,
			step: 1
		},
		years: {
			min: 2000,
			max: 2020,
			step: 1
		},
		animations: true,
		transitionDelay: 100,
		references: { // Used to store references to the main elements
			hours: null
		},

		monthsNames: {
			0: "Jan",
			1: "Feb",
			2: "Mar",
			3: "Apr",
			4: "May",
			5: "Jun",
			6: "Jul",
			7: "Aug",
			8: "Sep",
			9: "Oct",
			10: "Nov",
			11: "Dec",
		},
		daysNames: {
			0: "Sun",
			1: "Mon",
			2: "Tue",
			3: "Wed",
			4: "Thu",
			5: "Fri",
			6: "Sat",
		}
	};																							

	// The main element which holds the datepicker 
	var targetElement;

	var values = {
		date: null,
		timestamp: null,
		ampm: true,
	};

	// Here are the attached user events
	var defaultChangeEventsCategories = {
		'all': [],
		'time': [],
		'date': [],

		'hour': [],
		'minute': [],
		'ampm': [],
		'day': [],
		'month': [],
		'year': [],
	}
	var events = {
		'onChange': clone(defaultChangeEventsCategories),
		'beforeChange': clone(defaultChangeEventsCategories),
		'afterChange': clone(defaultChangeEventsCategories)
	};

	var init = function(inputConfig) {

		setConfig(inputConfig);

		targetElement = byId(config.targetElement);
		targetElement.className += 'mtr-datepicker';

		values.date = new Date();
		values.timestamp = values.date.getTime();
		setDatesRange();

		createMarkup();
	};

	var setConfig = function(input) {
		config.targetElement = input.target;
		config.animations = input.animations !== undefined ? input.animations : config.animations;

		// Init hours
		config.defaultValues.hours = createRange(config.hours);
		config.defaultValues.minutes = createRange(config.minutes);
		config.defaultValues.months = createRange(config.months);
		config.defaultValues.years = createRange(config.years);
	};

	var setDatesRange = function(month, year) {
		month = month !== undefined ? month : getMonth();
		year = year !== undefined ? year : getYear();

		var datesRange = createRangeForDate(month, year);
		config.defaultValues.dates = datesRange.values;
		config.defaultValues.datesNames = datesRange.names;
	};

	var createMarkup = function() {

		// Create time elements
		var hoursElement = createSliderInput({
			name: 'hours',
			values: config.defaultValues.hours,
			value: getHours()
		});

		var minutesElement = createSliderInput({
			name: 'minutes',
			values: config.defaultValues.minutes,
			value: getMinutes()
		});

		var amPmElement = createRadioInput({
			name: 'ampm',
		});

		var rowTime = createElement('div');
		rowTime.className = 'mtr-row';

		var rowClearfixTime = createElement('div');
		rowClearfixTime.className = 'mtr-clearfix';

		rowTime.appendChild(hoursElement);
		rowTime.appendChild(minutesElement);
		rowTime.appendChild(amPmElement);

		targetElement.appendChild(rowTime);
		targetElement.appendChild(rowClearfixTime);

		// Create date elements
		var monthElement = createSliderInput({
			name: 'months',
			values: config.defaultValues.months,
			valuesNames: config.monthsNames,
			value: getMonth()
		}); 
		
		var dateElement = createSliderInput({
			name: 'dates',
			values: config.defaultValues.dates,
			valuesNames: config.defaultValues.datesNames,
			value: getDate()
		});

		var yearElement = createSliderInput({
			name: 'years',
			values: config.defaultValues.years,
			value: getYear()
		});
		
		var rowDate = createElement('div');
		rowDate.className = 'mtr-row';

		var rowClearfixDate = createElement('div');
		rowClearfixDate.className = 'mtr-clearfix';

		rowDate.appendChild(monthElement);
		rowDate.appendChild(dateElement);
		rowDate.appendChild(yearElement);
		
		targetElement.appendChild(rowDate);
		targetElement.appendChild(rowClearfixDate);

		setTimestamp(values.timestamp);
	};	

	/**
	 * This function is creating a slider input
	 *
	 * It is generating the required markup and attaching the needed event listeners
	 * The returned element is fully functional input field with arrows for navigating
	 * through the values
	 * 
	 * @param  {object} elementConfig 
	 * @return {HtmlElement}
	 */
	var createSliderInput = function(elementConfig) {
		var element = createElement('div');
		element.className = 'mtr-input-slider';
		config.references[elementConfig.name] = config.targetElement + '-input-' + elementConfig.name; 
		element.id = config.references[elementConfig.name];

		// First, let's init the main elements
		var divArrowUp = createUpArrow();
		var divArrowDown = createDownArrow();

		// Content of the input, holding the input and the available values
		var divContent = createElement('div');
		divContent.className = "content";

		var inputValue = createInputValue();
		var divValues = createValues();

		// The, let's append them to the element in the correct order
		element.appendChild(divArrowUp);

		// Append holder of the input and values to the main element
		divContent.appendChild(inputValue);
		divContent.appendChild(divValues);
		
		element.appendChild(divContent);

		element.appendChild(divArrowDown);

		// Here are the definitios of the functions which are used to generate the markup 
		// and to attach the needed event listeners

		function createUpArrow() {
			var divArrowUp = createElement('div');
			divArrowUp.className = 'arrow up';
			divArrowUp.innerHTML = 'Up';

			// Attach event listener
			divArrowUp.addEventListener('click', function(e) {
				// Prevent blur event
				var input = qSelect(inputValue, '.input');
				addClass(inputValue, 'arrow-click');
				setTimeout(function() {	removeClass(inputValue, 'arrow-click'); }, 1000);

				// Change the value with the prev one
				var name = elementConfig.name
				var currentValue;
			
				switch(name) {
					case 'hours': currentValue = getHours(); break;
					case 'minutes': currentValue = getMinutes(); break;
					case 'dates': currentValue = getDate(); break;
					case 'months': currentValue = getMonth(); break;
					case 'years': currentValue = getYear(); break;
				}

				var indexInArray = config.defaultValues[name].indexOf(currentValue);
				indexInArray--;

				if (indexInArray < 0) {
					indexInArray = config.defaultValues[name].length - 1;
				}

				switch(name) {
					//case 'hours': setHours(config.defaultValues[name][indexInArray]); break;
					 case 'hours': 
					 	// Check is we have to make a transform of the hour
					 	var newHour = config.defaultValues[name][indexInArray];
					 	if (getIsPm() && newHour !== 12) {
					 		newHour += 12;
					 	}
					 	setHours(newHour); 
					 	break;
					case 'minutes': setMinutes(config.defaultValues[name][indexInArray]); break;
					case 'dates': setDate(config.defaultValues[name][indexInArray]); break;
					case 'months': setMonth(config.defaultValues[name][indexInArray]); break;
					case 'years': setYear(config.defaultValues[name][indexInArray]); break;
				};
			}, false);

			return divArrowUp;
		}

		function createDownArrow() {
			var divArrowDown = createElement('div');
			divArrowDown.className = 'arrow down';
			divArrowDown.innerHTML = 'Down';

			divArrowDown.addEventListener('click', function() {
				// Prevent blur event
				var input = qSelect(inputValue, '.input');
				addClass(inputValue, 'arrow-click');
				setTimeout(function() {	removeClass(inputValue, 'arrow-click'); }, 1000);

				// Change the value with the next one
				var name = elementConfig.name;
				var currentValue;

				switch(name) {
					case 'hours': currentValue = getHours(); break;
					case 'minutes': currentValue = getMinutes(); break;
					case 'dates': currentValue = getDate(); break;
					case 'months': currentValue = getMonth(); break;
					case 'years': currentValue = getYear(); break;
				}

				var indexInArray = config.defaultValues[name].indexOf(currentValue);
				indexInArray++;

				if (indexInArray >= config.defaultValues[name].length) {
					indexInArray = 0;
				}

				switch(name) {
					//case 'hours': setHours(config.defaultValues[name][indexInArray]); break;
					case 'hours': 
					 	// Check is we have to make a transform of the hour
					 	var newHour = config.defaultValues[name][indexInArray];
					 	if (getIsPm() && newHour !== 12) {
					 		newHour += 12;
					 	}
					 	setHours(newHour);
					 	break;
					case 'minutes': setMinutes(config.defaultValues[name][indexInArray]); break;
					case 'dates': setDate(config.defaultValues[name][indexInArray]); break;
					case 'months': setMonth(config.defaultValues[name][indexInArray]); break;
					case 'years': setYear(config.defaultValues[name][indexInArray]); break;
				}
			}, false);

			return divArrowDown;
		}

		function createInputValue() {
			var inputValue = document.createElement('input');
			inputValue.value = elementConfig.value;
			inputValue.className = 'input ' + elementConfig.name;
			inputValue.style.display = 'none';

			// Attach event listeners
			inputValue.addEventListener('blur', function(e) {
				// Blur event has to be calles after specific ammount of time
				// because it can be cause from an arrow button. In this case
				// we shouldn't apple the blur event body	
				setTimeout(blurEvent, 500);
			
				function blurEvent() {
					var newValue = inputValue.value;

					// If the blur is called after click on arrow we shoulnt update the value
					if (e.target.className.indexOf('arrow-click') > -1) {
						removeClass(e.target, 'arrow-click');
						return;
					}

					// If this is the month input we should decrement it because
					// the months are starting from 0
					if (inputValue.className.indexOf('months') > -1) {
						newValue--;
					}

					if (validateValue(elementConfig.name, newValue) === false) {
						inputValue.value = inputValue.getAttribute('data-old-value');
						return;
					}

					inputValue.style.display = 'none';

					switch(elementConfig.name) {
						case 'hours': setHours(newValue); break;
						case 'minutes': setMinutes(newValue); break;
						case 'dates': setDate(newValue); break;
						case 'months': setMonth(newValue); break;
						case 'years': setYear(newValue); break;
					};
				}
			}, false)
			
			return inputValue;	
		}
		
		function createValues() {
			var divValues = createElementValues(elementConfig);
			return divValues;
		}
		
		return element;
	};

	/**
	 * Create HtmlElement with a radio button control
	 * 
	 * @param  {object} elementConfig [description]
	 * @return {HtmlElement}               [description]
	 */
	var createRadioInput = function(elementConfig) {
		var element = document.createElement('div');
		element.className = 'mtr-input-radio';
		config.references[elementConfig.name] = config.targetElement + '-input-' + elementConfig.name; 
		element.id = config.references[elementConfig.name];

		var formHolder = document.createElement('form');
		formHolder.name = config.references[elementConfig.name];

		// First create the elements
		var radioAm = createInputValue('ampm', 1, 'AM');
		var radioPm = createInputValue('ampm', 0, 'PM');

		formHolder.appendChild(radioAm);
		formHolder.appendChild(radioPm);

		formHolder.ampm.value = values.am ? '1' : '0';

		element.appendChild(formHolder);

		function createInputValue(radioName, radioValue, labelValue) {
			var divHolder = document.createElement('div');
			var label = document.createElement('label');
			var input = document.createElement('input');

			label.innerHTML = labelValue;

			input.className = 'input ';
			input.type = 'radio';
			input.name = radioName;
			input.value = radioValue;

			divHolder.appendChild(label);
			label.appendChild(input);

			// Attach event listeners
			input.addEventListener('change', function() {
				setAmPm(radioValue);
			}, false);

			return divHolder;
		}

		return element;
	};

	/**
	 * This function is creating a new set of HtmlElement which 
	 * contains the default values for a specific input
	 * 
	 * @param  {obect} elementConfig 
	 * @return {HtmlElement}
	 */
	var createElementValues = function(elementConfig) {
			
		var divValues = createElement('div');
		divValues.className = 'values';

		elementConfig.values.forEach(function(value) {
			var innerHTML = elementConfig.name === 'months' ? value+1 : value;

			var divValueHolder = createElement('div');
			divValueHolder.className = 'default-value-holder';
			divValueHolder.setAttribute('data-value', value);

			var divValue = createElement('div');
			divValue.className = 'default-value';
			divValue.innerHTML = innerHTML;
			divValue.setAttribute('data-value', value);

			divValueHolder.appendChild(divValue);

			if (elementConfig.valuesNames) {
				var divValueName = createElement('div');
				divValueName.className = 'default-value-name';
				divValueName.innerHTML = elementConfig.valuesNames[value];

				divValue.className += ' has-name';

				divValueHolder.appendChild(divValueName);
			}

			divValues.appendChild(divValueHolder);
		});

		// Attach listeners
		divValues.addEventListener('click', function() {
			// Show the input field for manual setup
			var parent = divValues.parentElement,
					inputValue = qSelect(parent, '.input');
			
			// If we are working with months we have to incement the value
			// because the months are starting from 0
			if (inputValue.className.indexOf('months') > -1) {
				inputValue.value = parseInt(inputValue.value) + 1;
			}

			inputValue.style.display = "block";
			inputValue.focus();
		}, false);

		divValues.addEventListener('wheel', function(e) {
			// If the user is using the mouse wheel the values should be changed
			var target = e.target;
			var parent = target.parentElement.parentElement.parentElement.parentElement; // value -> values -> content -> input slider
			var wheelData = e.wheelDeltaY;
			var arrow;

			if (wheelData > 0) { // Scroll up
				arrow = qSelect(parent, '.arrow.up');
			}
			else { // Scroll down
				arrow = qSelect(parent, '.arrow.down');
			}

			arrow.click();
			e.preventDefault();
			return false;
		}, false);

		return divValues;
	}

	var rebuildElementValues = function(reference, data) {
		var element = byId(reference);
		var elementContent = qSelect(element, '.content');
		var elementContentValues = qSelect(elementContent, '.values');

		elementContentValues.remove();
		var elementContentNewValues = createElementValues({
			name: data.name,
			values: data.values,
			valuesNames: data.valuesNames
		});

		elementContent.appendChild(elementContentNewValues);
	};

	/**
	 * Updating the date when a month or year is changed
	 * It should realculate the dates in the specific month and check
	 * the postition of the date (if it's bigger than the last date of the month)
	 * 
	 * @param  {Number} newMonth [description]
	 * @param  {NUmber} newYar   [description]
	 */
	var updateDate = function(newMonth, newYear) {
		newMonth = newMonth !== undefined ? newMonth : getMonth();
		newYear = newYear !== undefined ? newYear : getYear();

		// After month change we should recalculate the range of the dates
		setDatesRange(newMonth, newYear);
		rebuildElementValues(config.references.dates, {
			name: 'dates',
			values: config.defaultValues.dates,
			valuesNames: config.defaultValues.datesNames
		});

		// After the change in the dates of the month we should check is the current date exist
		// because if the current date is 31 and the month has only 30 days it is not correct
		var maxDay = config.defaultValues.dates[config.defaultValues.dates.length-1];
		var currentDate = getDate();

		if (currentDate > maxDay) {
			setDate(maxDay);
		}
	};

	var validateValue = function(type, value) {
		value = parseInt(value);
		return config.defaultValues[type].indexOf(value) > -1 ? true : false;
	};

	/*****************************************************************************
	 * A lot of getters and setters now
	 ****************************************************************************/

	var setHours = function(input, preventAnimation) {
		executeChangeEvents('hour', 'beforeChange');

		var isAm = getIsAm();

		values.timestamp = values.date.setHours(input);

		if (input === 12 && isAm) {
			values.timestamp = values.date.setHours(0);
		}
		else {
			values.timestamp = values.date.setHours(input);
		}

		if (input > 12) {
			input -= 12; 			// reduce the values with 12 hours
			setAmPm(false); 	// set to PM
		}

		updateInputSlider(config.references.hours, input, preventAnimation);

		executeChangeEvents('hour', 'onChange');
		executeChangeEvents('hour', 'afterChange');
	};

	var getHours = function() {
		var currentHours = values.date.getHours(),
				isAm = getIsAm();

		if (currentHours === 12 || currentHours === 0) {
			return 12;
		}
		return (currentHours < 12 && isAm) ? currentHours : currentHours - 12;
	};

	var setMinutes = function(input, preventAnimation) {
		executeChangeEvents('minute', 'beforeChange');
		// TODO: validate
		var defaultValues = config.defaultValues.minutes;

		values.timestamp = values.date.setMinutes(input);
		updateInputSlider(config.references.minutes, input, preventAnimation);

		executeChangeEvents('minute', 'onChange');
		executeChangeEvents('minute', 'afterChange');
	};

	var getMinutes = function() {
		return values.date.getMinutes();
	};

	var setAmPm = function(setAmPm) {
		executeChangeEvents('ampm', 'beforeChange');
		// TODO: validate

		var currentHours = values.date.getHours(); 
		var currentHoursCalculates = getHours(); 
		
		var currentIsAm = values.ampm;

		if (currentIsAm !== setAmPm) {
			if (setAmPm == true && currentHours > 12 ) { // Set AM
				currentHours -= 12;
				values.timestamp = values.date.setHours(currentHours);
			}
			else if (setAmPm == false && currentHours <= 12) { // Set PM
				currentHours += 12;
				values.timestamp = values.date.setHours(currentHours);
			}
		}

		values.ampm = setAmPm;

		var divRadioInput = byId(config.references.ampm);
		var formRadio = qSelect(divRadioInput, 'form');

		formRadio.ampm.value = setAmPm ? '1' : '0';

		executeChangeEvents('ampm', 'onChange');
		executeChangeEvents('ampm', 'afterChange');
	};

	var getIsAm = function() {
		return values.date.toLocaleTimeString().indexOf('AM') > -1 ? 1 : 0;
		//return values.ampm;
	};

	var getIsPm = function() {
		return !getIsAm();
	};

	var setDate = function(newDate, preventAnimation) {
		executeChangeEvents('day', 'beforeChange');

		// TODO: Validate input
		values.timestamp = values.date.setDate(newDate);
		updateInputSlider(config.references.dates, newDate, preventAnimation);

		executeChangeEvents('day', 'onChange');
		executeChangeEvents('day', 'afterChange');
	};

	var getDate = function() {
		return values.date.getDate();
	};

	var setMonth = function(newMonth, preventAnimation) {
		executeChangeEvents('month', 'beforeChange');
		// TODO: Validate input
		updateDate(newMonth);

		// Finally, update the month
		values.timestamp = values.date.setMonth(newMonth);
		updateInputSlider(config.references.months, newMonth, preventAnimation);

		executeChangeEvents('month', 'onChange');
		executeChangeEvents('month', 'afterChange');
	};

	var getMonth = function() {
		return values.date.getMonth();
	};

	var setYear = function(newYear, preventAnimation) {
		executeChangeEvents('year', 'beforeChange');
		// TODO: Validate input
		updateDate(undefined, newYear); 
		
		values.timestamp = values.date.setFullYear(newYear);
		updateInputSlider(config.references.years, newYear, preventAnimation);

		executeChangeEvents('year', 'onChange');
		executeChangeEvents('year', 'afterChange');
	};

	var getYear = function() {
		return values.date.getFullYear();
	};

	// Bigger getter and setters
	var getTime = function() {
		return getHours() + ':' + getMinutes();
	};

	var getFullTime = function() {
		return getHours() + ':' + getMinutes() + ' ' + (getIsAm() ? 'AM' : 'PM');
	};

	var setTimestamp = function(input) {
		values.date = new Date(input);
		values.timestamp = input;

		var currentHours = values.date.getHours(),
				currentMinutes = getMinutes(),
				currentAmPm = currentHours <= 12 ? true : false
				currentDate = getDate(),
				currentMonth = getMonth(),
				currentYear = getYear();

		// Get the closest minutes
		var defaultMinutes = config.defaultValues.minutes;
		for (var iMinutes = 0; iMinutes < defaultMinutes.length; iMinutes++) {
			var currentValue = defaultMinutes[iMinutes],
					nextValue;
			
			if (iMinutes+1 === defaultMinutes.length) {
				nextValue = defaultMinutes[0];
			}
			else {
				nextValue = defaultMinutes[iMinutes+1];
			}

			if (currentMinutes === currentValue) {
				// The minutes values is the same as the default value
				break;
			}
			else if (currentMinutes > currentValue && currentMinutes < nextValue) {
				// The minutes values will assign the next possible values from the list
				currentMinutes = nextValue;
				break;
			}
			else if (currentMinutes > currentValue && currentMinutes > nextValue && iMinutes === defaultMinutes.length-1) {
				// The next possible values is in the next hour, so change the hours
				currentMinutes = nextValue;
				currentHours += 1;
				break;
			}
		}

		setHours(currentHours);
		setMinutes(currentMinutes);
		setMonth(currentMonth);
		setYear(currentYear);
		setDate(currentDate);
		//setAmPm(currentAmPm);
	};

	var getTimestamp = function() {
		return values.date.getTime();
	}

	/*****************************************************************************
	 * A lot of actions here (used when event is triggered)
	 ****************************************************************************/

	/**
	 * Update the value of the input slider
	 * @param  {string} reference id to the specific element
	 * @param  {integer} newValue  
	 */
	var updateInputSlider = function(reference, newValue, preventAnimation) {
		var element = byId(reference);
		preventAnimation = preventAnimation || false;

		// Find the specific value
		var divValues = qSelect(element, '.content'),
				divValue = qSelect(element, '.values .default-value[data-value="'+newValue+'"]'),
				inputValue = qSelect(element, '.input');

				scrollTo = getRelativeOffset(divValues, divValue);
		
		inputValue.value = newValue;
		inputValue.setAttribute('data-old-value', newValue);

		if (config.animations === false || preventAnimation) {
			divValue.scrollIntoView();
		}
		else {
			smooth_scroll_to(divValues, scrollTo, config.transitionDelay);
		}
	};

	var executeChangeEvents = function(target, changeEvent) {

		events[changeEvent][target].forEach(function(callback) {
			callback();
		});

		events[changeEvent].all.forEach(function(callback) {
			callback();
		});

		switch (target) {
			case 'hour': 
			case 'minute':
			case 'ampm': 
				events[changeEvent].time.forEach(function(callback) {
					callback();
				});			
				break;
			case 'day': 
			case 'month':
			case 'year': 
				events[changeEvent].date.forEach(function(callback) {
					callback();
				});			
				break;
		}

	};

	/*****************************************************************************
	 * Some Aliases
	 ****************************************************************************/
	function byId(selector) {
		return document.getElementById(selector);
	}

	function qSelect(element, selector) {
		return element.querySelector(selector);
	}

	function getRelativeOffset(parent, child) {
		return child.offsetTop - parent.offsetTop;
	}

	function createElement(tag) {
		return document.createElement(tag)
	}

	function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
	}

	function addClass(element, className) {
	  if (element.className.indexOf(className) > -1) {
	    return;
	  }

	  element.className += ' ' + className;
	}

	/**
	 * Short allias for a function which is removing a class name to a specific element
	 * @param {HtmlElement}
	 * @param {string}
	 */
	function removeClass(element, className) {
	  if (element.className.indexOf(className) === -1) {
	    return;
	  }

	  element.className = element.className.replace(new RegExp(className, 'g'), '');
	}

	/**
	 * Create array of values for a specific range with a givvent step
	 * @param  {object} settings 
	 * @return {array}          
	 */
	function createRange(settings) {
		var from = settings.min,
				to = settings.max,
				step = settings.step,
				range = [];

		for (var i=from; i<=to; i+=step) {
			range.push(i);
		}

		return range;
	};

	/**
	 * Create a special range with dates for a specific month
	 */
	function createRangeForDate(month, year) {
		var firstDay = new Date(year, month, 1);
		var lastDay = new Date(year, month + 1, 0);

		var range = {
			values: [],
			names: []
		};

		var currentDate;
		for (var i=firstDay.getDate(); i<=lastDay.getDate(); i++) {
			currentDate = new Date(year, month, i);

			range.values.push(i);
			range.names[i] = config.daysNames[currentDate.getDay()];
		}

		return range;
	}

	/**
    Smoothly scroll element to the given target (element.scrollTop)
    for the given duration

    Returns a promise that's fulfilled when done, or rejected if
    interrupted
 	*/
	var smooth_scroll_to = function(element, target, duration) {
    target = Math.round(target);
    duration = Math.round(duration);
    if (duration < 0) {
        return Promise.reject("bad duration");
    }
    if (duration === 0) {
        element.scrollTop = target;
        return Promise.resolve();
    }

    var start_time = Date.now();
    var end_time = start_time + duration;

    var start_top = element.scrollTop;
    var distance = target - start_top;

    // https://coderwall.com/p/hujlhg/smooth-scrolling-without-jquery
    // based on http://en.wikipedia.org/wiki/Smoothstep
    var smooth_step = function(start, end, point) {
        if(point <= start) { return 0; }
        if(point >= end) { return 1; }
        var x = (point - start) / (end - start); // interpolation
        return x*x*(3 - 2*x);
    }

    	return new Promise(function(resolve, reject) {
        // This is to keep track of where the element's scrollTop is
        // supposed to be, based on what we're doing
        var previous_top = element.scrollTop;

        // This is like a think function from a game loop
        var scroll_frame = function() {
            if(element.scrollTop != previous_top) {
                //reject("interrupted");
                return;
            }

            // set the scrollTop for this frame
            var now = Date.now();
            var point = smooth_step(start_time, end_time, now);
            var frameTop = Math.round(start_top + (distance * point));
            element.scrollTop = frameTop;

            // check if we're done!
            if(now >= end_time) {
                resolve();
                return;
            }

            // If we were supposed to scroll but didn't, then we
            // probably hit the limit, so consider it done; not
            // interrupted.
            if(element.scrollTop === previous_top
                && element.scrollTop !== frameTop) {
                resolve();
                return;
            }
            previous_top = element.scrollTop;

            // schedule next frame for execution
            setTimeout(scroll_frame, 0);
        }

        // boostrap the animation process
        setTimeout(scroll_frame, 0);
    });
	}

	/*****************************************************************************
	 * PUBLIC API
	 *
	 * Getters
	 ****************************************************************************/

	// Here is a set of the default Date function
	// We are providing them because the user are familiar with them and
	// maybe this way they will implemet this library easily in their system

	// "Wed Sep 23 2015"
	var toDateString = function() {
		return values.date.toDateString();
	};

	// "Wed, 23 Sep 2015 08:43:47 GMT"
	var toGMTString = function() {
		return values.date.toGMTString();
	};

	// "2015-09-23T08:43:47.284Z"
	var toISOString = function() {
		return values.date.toISOString();
	};

	// "9/23/2015"
	var toLocaleDateString = function() {
		return values.date.toLocaleDateString();
	};

	// "9/23/2015, 11:43:47 AM"
	var toLocaleString = function() {
		return values.date.toLocaleString();
	};

	// "11:43:47 AM"
	var toLocaleTimeString = function() {
		return values.date.toLocaleTimeString();
	};

	// "Wed Sep 23 2015 11:43:47 GMT+0300 (EEST)"
	var toString = function() {
		return values.date.toString();
	};

	// 11:43:47 GMT+0300 (EEST)"
	var toTimeString = function() {
		return values.date.toTimeString();
	};

	// "Wed, 23 Sep 2015 08:43:47 GMT"
	var toUTCString = function() {
		return values.date.toUTCString();
	};

	/*****************************************************************************
	 * PUBLIC API
	 *
	 * Events
	 ****************************************************************************/

	var onChange = function(target, callback) {
		events.onChange[target].push(callback);
	};

	var beforeChange = function(target, callback) {
		events.beforeChange[target].push(callback);
	};

	var afterChange = function(target, callback) {
		events.afterChange[target].push(callback);
	};

	// Lets init all
	init(inputConfig);

	/**
	 * Public API here
	 */

	this.init = init;
	
	this.getHours = getHours;
	this.getMinutes = getMinutes;
	this.getIsAm = getIsAm;
	this.getIsPm = getIsPm;
	this.getTime = getTime;
	this.getDate = getDate;
	this.getMonth = getMonth;
	this.getYear = getYear;
	this.getFullTime = getFullTime;

	this.setHours = setHours;
	this.setMinutes = setMinutes;
	this.setAmPm = setAmPm;
	this.setDate = setDate;
	this.setMonth = setMonth;
	this.setYear = setYear;

	this.values = values;

	// Here is the set with the default Date getters
	this.toDateString = toDateString;
	this.toGMTString = toGMTString;
	this.toISOString = toISOString;
	this.toLocaleDateString = toLocaleDateString;
	this.toLocaleString = toLocaleString;
	this.toLocaleTimeString = toLocaleTimeString;
	this.toString = toString;
	this.toTimeString = toTimeString;
	this.toUTCString = toUTCString;

	// Here are some events which the api provides
	this.onChange = onChange;
	this.beforeChange = beforeChange;
	this.afterChange = afterChange;
};
