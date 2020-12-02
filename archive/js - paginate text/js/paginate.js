// The div that contains text
var source = document.querySelector('article');
// Elements: paragraphs, images
var elements = [];
// Pages array
var pages;
// Current page index
var pageIdx;


// Get elements
function getElements() {
	// childNodes method returns all nodes
	var children = source.children;

	for (var i = 0; i < children.length; i++) {
		//if (children[i].nodeName == "P")
		elements.push(children[i].cloneNode(true));
	}
}

function paginate() {
	resetPagination();
	splitPages();
	updateDisplay();
}

// Split the source div into smaller pages
function splitPages() {
	// Check height
	var checkHeight = 500;
	// Max height
	var maxHeight = 600; // based on window's height?

	// Create a new page
	var currentPage = createNewPage();

	// Loop through elements
	for (var i = 0; i < elements.length; i++) {
		// Try to add more element
		currentElement = elements[i];
		currentPage.appendChild(currentElement);

		// Check if the page is too long
		if (currentPage.clientHeight > checkHeight) {
			// Neu trang da dai hon checkHeight nhung van trong pham vi cho phep
			var needRevert = (currentPage.clientHeight > maxHeight) ? true : false;
			if (needRevert) {
				currentPage.removeChild(currentElement);
			}

			//console.info(currentElement.nodeName + ", " + needRevert);
			if (currentElement.nodeName == "P" && needRevert) {
				trySplitParagraph(currentElement, currentPage, maxHeight);
			}
			if ((i < elements.length - 1) || needRevert) {
				currentPage = createNewPage();				
			}
			if (needRevert) {
				currentPage.appendChild(currentElement);
			}	
		}
	}
}

// Neu dang la paragraph thi thu split paragraph
// Vi co khoang cach giau checkHeight va maxHeight nen minh luon co the them 1 the P moi
function trySplitParagraph(currentElement, currentPage, maxHeight) {
	// Get the text as an array of word-like things
	var words = currentElement.textContent.split(' ');

	// Create extra element and add to current page
	var extraElement = currentElement.cloneNode(true);
	extraElement.textContent = "";
	currentPage.appendChild(extraElement);

	// Try to add more text into extra element
	var pageText = words[0];
	var k = 1;
	while (k < words.length) {
		var betterPageText = pageText + " " + words[k];
		extraElement.textContent = betterPageText;

		if (currentPage.clientHeight > maxHeight) {
			// Revert the text
			extraElement.textContent = pageText;

			// and break
			break;
		} else {
			// This longer text still fits
			pageText = betterPageText;
		}

		k++;
	}
	
    // Update currentElement
    if (k < words.length) {
        currentElement.textContent = '';
        while (k < words.length) {
            currentElement.textContent += " " + words[k];
            k++;
        }
    }

	//console.debug("Extra element: " + extraElement.textContent);
	//console.debug("Current element: " + currentElement.textContent);
}

function createNewPage() {
	// Create a new div
	var currentPage = document.createElement("div");
	currentPage.className = "page";
	
	// Append page and add to pages array
	pages.push(currentPage);
	source.appendChild(currentPage);
	return currentPage;
}

function resetPagination() {
	// Reset
	source.innerHTML = "";
	pages = [];
	pageIdx = 0;
}

// Update the current page
function updateDisplay() {
	// Hide all pages except the current page
	for (var i = 0; i < pages.length; i++) {
		if (i == pageIdx) {
			pages[i].style.display = "";
		} else {
			pages[i].style.display = "none";
		}
	}
	
	// Update the page number
	document.querySelector("#pageNumber").textContent = (pageIdx + 1) + "/" + pages.length;
}

// Create controllers: "Previous" and "Next" buttons, page number indicator,...
function createControllers() {
	// Create wrapper div
	var controller = document.createElement("div");
	controller.className = "controller";
	document.querySelector("body").appendChild(controller);

	// Previous button
	var prevButton = document.createElement("button");
	prevButton.id = "prevButton";
	prevButton.textContent = "Prev";
	controller.appendChild(prevButton);
	prevButton.addEventListener("click", gotoPreviousPage);

	// Next button
	var nextButton = document.createElement("button");
	nextButton.id = "nextButton";
	nextButton.textContent = "Next";
	controller.appendChild(nextButton);
	nextButton.addEventListener("click", gotoNextPage);

	// Page number
	var pageNumber = document.createElement("span");
	pageNumber.id = "pageNumber";
	controller.appendChild(pageNumber);
}


function gotoNextPage() {
	if (pageIdx < pages.length - 1) {
		pageIdx++;
		updateDisplay();
	}
}

function gotoPreviousPage() {
	if (pageIdx > 0) {
		pageIdx--;
		updateDisplay();
	}
}

function gotoFirstPage() {
	pageIdx = 0;
	updateDisplay();
}

function gotoLastPage() {
	pageIdx = pages.length - 1;
	updateDisplay();
}

function handleKeyboardEvent(evt) {
	var Key = {
		LEFT:   37,
		UP:     38,
		RIGHT:  39,
		DOWN:   40
	};
	var keyCode = evt.keyCode || evt.which;
	switch (keyCode) {
		case Key.LEFT:
			gotoPreviousPage();
			break;
		case Key.UP:
			gotoFirstPage();
			break;
		case Key.RIGHT:
			gotoNextPage();
			break;
		case Key.DOWN:
			gotoLastPage();
			break;
		default:
			//console.debug(keyCode);
	}
}

// Phai cho vao trong su kien load de GUI duoc load hoan toan
// Neu khong se bi loi khi nhan Ctrl+F5, phai nhan F5 lai lan nua moi co ve OK
window.addEventListener("load", function() {
	// Add resize event?
	window.addEventListener("resize", paginate);
	
	window.addEventListener('keydown', handleKeyboardEvent);
	
	getElements();
	createControllers();
	paginate();
	
	// TODO: Nho xem dang doc trang nao
});
