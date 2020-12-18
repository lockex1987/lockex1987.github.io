chrome.browserAction.onClicked.addListener(function (tab) {
	// No tabs or host permissions needed!
	console.log(tab);
	
	var cssCode = `a { text-decoration: underline !important; }`;
	var javaScriptCode = `document.body.style.backgroundColor = 'red';`;

	/*
	chrome.tabs.insertCSS({
		//file : 'mystyles.css',
		code: cssCode
	}, function () {
		console.log('CSS inserted!');
	});
	*/

	chrome.tabs.executeScript({
		file : 'js/script.js',
		//code: javaScriptCode
	});
});
