/////////////////////////////////////////////////////////////////////////
// Generic Resize by Erik Arvidsson                                    //
//                                                                     //
// You may use this script as long as this disclaimer is remained.     //
// See www.dtek.chalmers.se/~d96erik/dhtml/ for mor info               //
//                                                                     //
// How to use this script!                                             //
// Link the script in the HEAD and create a container (DIV, preferable //
// absolute positioned) and add the class="resizeMe" to it.            //
/////////////////////////////////////////////////////////////////////////

var theobject = null; // this gets a value as soon as a resize start

function resizeObject() {
	this.el = null; // pointer to the object
	this.dir = ""; // type of current resize (n, s, e, w, ne, nw, se, sw)
	this.grabx = null; // some useful values
	this.graby = null;
	this.width = null;
	this.height = null;
	this.left = null;
	this.top = null;
}

// Find out what kind of resize! Return a string inlcluding the directions.
function getDirection(el) {
	var dir = "";
	var xPos = window.event.offsetX;
	var yPos = window.event.offsetY;
	var offset = 8; // the distance from the edge in pixels

	if (yPos < offset) {
		dir += "n";
	} else if (yPos > el.offsetHeight - offset) {
		dir += "s";
	}
	if (xPos < offset) {
		dir += "w";
	} else if (xPos > el.offsetWidth - offset) {
		dir += "e";
	}

	return dir;
}

function doDown() {
	var el = getReal(event.srcElement, "className", "resizeMe");

	if (el == null) {
		theobject = null;
		return;
	}		

	dir = getDirection(el);
	if (dir == "") {
		return;
	}

	theobject = new resizeObject();
	theobject.el = el;
	theobject.dir = dir;
	theobject.grabx = window.event.clientX;
	theobject.graby = window.event.clientY;
	theobject.width = el.offsetWidth;
	theobject.height = el.offsetHeight;
	theobject.left = el.offsetLeft;
	theobject.top = el.offsetTop;

	window.event.returnValue = false;
	window.event.cancelBubble = true;
}

function doUp() {
	if (theobject != null) {
		theobject = null;
	}
}

function doMove() {
	var xMin = 8; // the smallest width possible
	var yMin = 8; //           - height -
	var el = getReal(event.srcElement, "className", "resizeMe");

	if (el.className == "resizeMe") {
		var str = getDirection(el);
		// Fix the cursor.
		if (str == "") {
			str = "default";
		} else {
			str += "-resize";
		}
		el.style.cursor = str;
	}

	// Dragging starts here.
	if (theobject != null) {
		if (dir.indexOf("e") != -1) {
			theobject.el.style.width = Math.max(xMin, theobject.width + window.event.clientX - theobject.grabx) + "px";
		}
		if (dir.indexOf("s") != -1) {
			theobject.el.style.height = Math.max(yMin, theobject.height + window.event.clientY - theobject.graby) + "px";
		}
		if (dir.indexOf("w") != -1) {
			theobject.el.style.left = Math.min(theobject.left + window.event.clientX - theobject.grabx, theobject.left + theobject.width - xMin) + "px";
			theobject.el.style.width = Math.max(xMin, theobject.width - window.event.clientX + theobject.grabx) + "px";
		}
		if (dir.indexOf("n") != -1) {
			theobject.el.style.top = Math.min(theobject.top + window.event.clientY - theobject.graby, theobject.top + theobject.height - yMin) + "px";
			theobject.el.style.height = Math.max(yMin, theobject.height - window.event.clientY + theobject.graby) + "px";
		}
		
		window.event.returnValue = false;
		window.event.cancelBubble = true;
	}
}

function getReal(el, type, value) {
	temp = el;
	while ((temp != null) && (temp.tagName != "BODY")) {
		if (eval("temp." + type) == value) {
			el = temp;
			return el;
		}
		temp = temp.parentElement;
	}
	return el;
}

document.onmousedown = doDown;
document.onmouseup   = doUp;
document.onmousemove = doMove;