
/**
 * Some functions which are used in the tests specs
 */

/**
 * Simple creates a new event for a mouse click
 * Used because of the test on PhantomJS
 * @return {MouseEvent}
 */
function createClickEvent() {
	var clickEvent = document.createEvent( 'MouseEvents' );
	clickEvent.initMouseEvent('click', true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0 , null);

	return clickEvent;
}

function createCustomEvent(eventName) {
	var customEvent = document.createEvent( 'MouseEvents' );
	customEvent.initMouseEvent(eventName, true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0 , null);

	return customEvent;
}

function createWheelEvent() {
	var wheelEvent = document.createEvent( 'MouseEvents', { delta: -10 } );
	wheelEvent.initMouseEvent('DOMMouseScroll', true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0 , null);

	return wheelEvent;
}