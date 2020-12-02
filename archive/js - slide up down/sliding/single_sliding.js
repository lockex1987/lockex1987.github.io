var speed = 10;	// higher value = faster
var delay = 5;	// lower value = faster

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
	var question = document.getElementById('dhtmlgoodies_q' + numericId);
	
	if (!answerDiv.style.display || answerDiv.style.display == 'none') {
		question.className = 'dhtmlgoodies_question open';
		answerDiv.style.display = 'block';
		answerDiv.style.visibility = 'visible';
		slideContent(numericId, speed);
	} else {
		question.className = 'dhtmlgoodies_question';
		slideContent(numericId, (speed * -1));
	}
}

/**
 * Slide animation.
 */
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
	} else {
		slideInProgress = false;
		if (height <= 1) {
			obj.style.display = 'none';
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
