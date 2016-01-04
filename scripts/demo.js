
var MtrDatepickerDemo = (function() {

	var datepickers = [];

	var init = function(config, settings) {
		var datepicker = new MtrDatepicker(config);
		datepickers.push(datepicker);

		var exportFormatsContainer = document.getElementById(settings.exportFormats);
	 	datepickerChange(exportFormatsContainer, datepicker);

	 	datepicker.onChange('all', function() {
			datepickerChange(exportFormatsContainer, datepicker);
		});

		initCustomizeFuture(datepicker, settings.customizeFuture, config);
		initCustomizeSmartAmPm(datepicker, settings.customizeSmartAmPm, config);

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
      
      datepicker.init(config);
		}, false);
	}

	function initCustomizeSmartAmPm(datepicker, checkbox, config) {
		var checkboxElement = document.getElementById(checkbox);

		checkboxElement.addEventListener('change', function() {
			config.smartHours = checkboxElement.checked;
      datepicker.init(config);
		}, false);

	}

	return {
		init: init
	};

})();

$(document).ready(function() {

	function getCoords(elem) { // crossbrowser version
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
	}

	function setSidebar() {
		var blogSidebar = document.querySelector('.blog-sidebar');
		resetSidebar(blogSidebar);
		if (blogSidebar && $(window).width() >= 768) {
			var blogSidebarCoords = getCoords(blogSidebar);

			setSidebarStyles(blogSidebar, {
				position: 'fixed',
				width: '230px',
				top: blogSidebarCoords.top + 'px',
				left: (blogSidebarCoords.left) + 'px',
			});
		}
	}

	function resetSidebar(element) {
		setSidebarStyles(element, {
			position: 'relative',
			width: 'initial',
			top: 'initial',
			left: 'initial',
		});
	}

	function setSidebarStyles(element, options) {
		element = $(element);

		element.css('position', options.position);
		element.css('width',options.width);
		element.css('top:', options.top);
		element.css('left', options.left);
	}

	setSidebar();

	$(window).resize(function() {
		setSidebar();
	});

	$('a').click(function(){
	  $('html, body').animate({
	      scrollTop: $( $.attr(this, 'href') ).offset().top - 80
	  }, 500);
	  return false;
	});

});