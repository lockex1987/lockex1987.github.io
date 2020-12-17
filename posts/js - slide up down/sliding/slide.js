var speed = 10;	// higher value = faster
var delay = 5;	// lower value = faster
var slideInProgress = false;

function toggle(obj) {
	if (slideInProgress) {
		return;
	}

	slideInProgress = true;
	var titleDiv = obj.parentNode;
	var contentDiv = titleDiv.nextSibling;

	while (contentDiv.nodeType != 1) {
		contentDiv = contentDiv.nextSibling;
	}

	if (contentDiv.style.display == "none") {
		obj.style.backgroundPosition = "0px -30px";
		contentDiv.style.display =  "block";
		contentDiv.style.visibility = 'visible';
		slideContent(speed);
	} else {
		obj.style.backgroundPosition = "0px -45px";
		slideContent(speed * -1);
	}
}

/**
 * Slide animation.
 */
function slideContent(direction) {
	try {
		var obj = document.getElementById("ABC");
		var height = obj.style.height;
		alert(height);
		//height = contentObj.offsetHeight;obj.clientHeight
		height = height + direction;
		if (height < 1) {
			height = 1;
			slideInProgress = false;
			obj.style.display = 'none';
		} else if (height > 200) {
			height = 200;
			slideInProgress = false;
		} else {
			setTimeout('slideContent(' + direction + ')', delay);
		}
		obj.style.height = height + 'px';
	} catch (ex) {
		alert(ex);
	}
}