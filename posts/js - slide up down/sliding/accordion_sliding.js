/************************************************************************************************************
(C) www.dhtmlgoodies.com, November 2005

This is a script from www.dhtmlgoodies.com. You will find this and a lot of other scripts at our website.	

Terms of use:
You are free to use this script as long as the copyright message is kept intact. However, you may not
redistribute, sell or repost it without our permission.

Thank you!

www.dhtmlgoodies.com
Alf Magne Kalleland

************************************************************************************************************/

var speed = 10;	// Higher value = faster
var delay = 10;	// Lower value = faster

var objectIdToSlideDown = false;
var activeId = false;
var slideInProgress = false;

/**
 * Hanh dong onclick cua title.
 */
function showHideContent(e, inputId) {
	if (slideInProgress) {
		return;
	}
	slideInProgress = true;
	if (!inputId) {
		inputId = this.id;
	}
	inputId = inputId + '';
	var numericId = inputId.replace(/[^0-9]/g, '');
	var answerDiv = document.getElementById('dhtmlgoodies_a' + numericId);

	objectIdToSlideDown = false;
	
	// neu chua hien answer
	if (!answerDiv.style.display || answerDiv.style.display == 'none') {
		if (activeId &&  activeId != numericId) {
			// ?
			objectIdToSlideDown = numericId;
			slideContent(activeId, (speed * -1));
		} else {
			// start
			answerDiv.style.display = 'block';
			answerDiv.style.visibility = 'visible';
			slideContent(numericId, speed);
		}
	} else {
		// dong answer
		slideContent(numericId, (speed * -1));
		activeId = false;
	}
}

function slideContent(inputId, direction) {
	var obj = document.getElementById('dhtmlgoodies_a' + inputId);
	var contentObj = document.getElementById('dhtmlgoodies_ac' + inputId);
	height = obj.clientHeight;
	if (height == 0) {
		height = obj.offsetHeight;
	}
	height = height + direction;
	rerunFunction = true;
	if (height > contentObj.offsetHeight) {
		height = contentObj.offsetHeight;
		rerunFunction = false;
	}
	if (height <= 1) {
		height = 1;
		rerunFunction = false;
	}

	obj.style.height = height + 'px';
	var topPos = height - contentObj.offsetHeight;
	if (topPos > 0) {
		topPos = 0;
	}
	contentObj.style.top = topPos + 'px';
	if (rerunFunction) {
		setTimeout('slideContent(' + inputId + ',' + direction + ')', delay);
	} else if (height > 1) {
		activeId = inputId;
		slideInProgress = false;
	} else {
		obj.style.display = 'none';
		if (objectIdToSlideDown && objectIdToSlideDown != inputId) {
			document.getElementById('dhtmlgoodies_a' + objectIdToSlideDown).style.display = 'block';
			document.getElementById('dhtmlgoodies_a' + objectIdToSlideDown).style.visibility = 'visible';
			slideContent(objectIdToSlideDown, speed);
		} else {
			slideInProgress = false;
		}
	}
}

/**
 * Khoi tao, gan su kien cho cac the DIV.
 */
function initShowHideDivs() {
	var divs = document.getElementsByTagName('DIV');
	var divCounter = 1;
	for (var no = 0; no < divs.length; no++) {
		if (divs[no].className == 'dhtmlgoodies_question') {
			divs[no].onclick = showHideContent;
			divs[no].id = 'dhtmlgoodies_q' + divCounter;
			var answer = divs[no].nextSibling;
			while (answer && answer.tagName != 'DIV') {
				answer = answer.nextSibling;
			}
			answer.id = 'dhtmlgoodies_a' + divCounter;	
			contentDiv = answer.getElementsByTagName('DIV')[0];
			contentDiv.style.top = 0 - contentDiv.offsetHeight + 'px'; 	
			contentDiv.className = 'dhtmlgoodies_answer_content';
			contentDiv.id = 'dhtmlgoodies_ac' + divCounter;
			answer.style.display = 'none';
			answer.style.height = '1px';
			divCounter++;
		}
	}
}

window.onload = initShowHideDivs;
