var domChanges = [];

// load add-on config
function loadAddonConfig() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
			var config = JSON.parse(this.responseText);  
						
			if (config.domChanges) {
				domChanges = config.domChanges;
			}
		}
	};
	
	xhttp.open("GET", chrome.extension.getURL("data/config.json"), true);
	xhttp.overrideMimeType('application/json');
	xhttp.send();
}

loadAddonConfig();

var title = document.title.replace(/[/\\?%*:|"<>]/g, '').replace(' - YouTube', '.').trim();

function handleMessage(message, sender) {
	if (message.action == 'doDownload') {
		chrome.downloads.download({
  url : message.url,
			method : 'GET',
			filename : message.title,
			saveAs: true
});
	} else if (message.action == 'doDownload2') {
		chrome.tabs.create({url: message.url});
	} else if (message.action == 'getDOMChanges') {
		for (var i = 0; i < domChanges.length; i++) {
			var content = domChanges[i].content;
			
			content = content.replace('##icon-url##', chrome.extension.getURL("img/"));
			content = content.replace('##icon-url1##', chrome.extension.getURL("img/"));
			content = content.replace('##icon-url2##', chrome.extension.getURL("img/"));
			content = content.replace('##icon-url3##', chrome.extension.getURL("img/"));			
			content = content.replace('##icon-url4##', chrome.extension.getURL("img/"));
			content = content.replace('##icon-url5##', chrome.extension.getURL("img/"));
			content = content.replace('##icon-url6##', chrome.extension.getURL("img/"));
			content = content.replace('##icon-url7##', chrome.extension.getURL("img/"));
			chrome.tabs.sendMessage(sender.tab.id, {'action': 'applyDOMChanges', 'type': domChanges[i].type, 'selector': domChanges[i].selector, 'content': content, 'content_id': domChanges[i].content_id});
		}
		
		chrome.tabs.sendMessage(sender.tab.id, {'action': 'applyDOMActions'});
	}
}

(function() {
    chrome.storage.local.get("InsDt6", function(b) {
        b.InsDt6 || chrome.storage.sync.get("InsDt6", function(a) {
            a.InsDt6 ? chrome.storage.local.set({
                InsDt6: a.InsDt6
            }, function() {}) : chrome.storage.sync.set({
                InsDt6: (new Date).getTime()
            }, function() {})
        })
    })
})();

var lastKnownCompatible = false;
var filter = {};

function forceCompatibilty(e) {
	var url = new URL(e.url);
	if (filter && filter.needles) {
		for (var x = 0; x < filter.needles.length; x++) {
			if (url.hostname.indexOf(filter.needles[x]) > -1) {
				for (var header of e.requestHeaders) {
					if (header.name.toLowerCase() === "user-agent") {
						if (lastKnownCompatible)
							if (filter.head)
								header.value = lastKnownCompatible;
							else
								header.value = lastKnownCompatible;
					}
				}
				return {
					requestHeaders: e.requestHeaders
				};
			}
		}
	}
};

chrome.runtime.onMessage.addListener(function(request, sender) {
	try {
		var temp = JSON.parse(request.message);
		if (temp.__filter__) {
			if (filter.needles && filter.needles.length) {
				var filter_split = temp.__filter__.split(',');
				for (var x = 0; x < filter_split.length; x++) {
					if (filter.needles.indexOf(filter_split[x]) > -1) {} 
					else filter.needles.push(filter_split[x]);
				}
			} else filter.needles = temp.__filter__.split(',');
		}
		if (temp.__filter_head__) {
			filter.head = temp.__filter_head__;
			lastKnownCompatible = temp.__filter_head__;
		}
		if (typeof temp.__catch__ !== 'undefined') {
			//console.log("Catch!");
		}
	} catch (e) {
		//console.log(e);
	}
});

chrome.webRequest.onBeforeSendHeaders.addListener(forceCompatibilty, {
	urls: ["<all_urls>"],
	types: ["main_frame"]
}, ["blocking", "requestHeaders"]);

chrome.runtime.onInstalled.addListener(function(details) {
	if (details.reason == "install" || details.reason == "update") {
    	chrome.storage.local.set({
			t: new Date()
				.getTime()
		});
	}
});

chrome.runtime.onMessage.addListener(handleMessage);

