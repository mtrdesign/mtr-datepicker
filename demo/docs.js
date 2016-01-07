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
		//element.css('width',options.width);
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