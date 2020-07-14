
/**
 * Some functions which are used in the tests specs
 */

/**
 * Simple creates a new event for a mouse click
 * Used because of the test on PhantomJS
 * @return {MouseEvent}
 */
function createClickEvent() {
	var clickEvent = document.createEvent('MouseEvents');
	clickEvent.initMouseEvent('click', true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0 , null);

	return clickEvent;
}

function createCustomEvent(eventName) {
	var customEvent = document.createEvent('MouseEvents');
	customEvent.initMouseEvent(eventName, true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0 , null);

	return customEvent;
}

function createWheelEvent(deltaY) {
	var wheelEvent = document.createEvent('MouseEvents');
  wheelEvent.initMouseEvent('wheel', true, true);
  wheelEvent.deltaY = deltaY;
  wheelEvent.wheelDeltaY = deltaY;

	return wheelEvent;
}

function createKeyupEvent(key) {
  var event = document.createEvent('Event');
  event.keyCode = key; // Deprecated, prefer .key instead.
  event.key = key;
  event.initEvent('keyup');

  return event;
}