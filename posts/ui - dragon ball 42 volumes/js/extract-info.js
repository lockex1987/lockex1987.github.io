function extractInfo() {
	var volumes = [];
	document.querySelectorAll('ul').forEach((ul, idx) => {
		var n = idx + 1;
		//console.log(n);
		var chapters = [];
		ul.querySelectorAll('li').forEach(li => {
			var jaLang = li.querySelector('span[lang="ja"]');
			if (jaLang) {
				li.removeChild(jaLang);
			}
			var text = li.textContent;
			text = text.replace(/\s+/g, ' ');
			text = text.replace(/"/g, '');
			if (text.endsWith('(')) {
				text = text.substring(0, text.length - 1);
			}
			text = text.substring(5);
			text = text.trim();
			//console.log(text);
			chapters.push(text);
		});
		volumes.push(chapters);
	});
	console.log(JSON.stringify(volumes, null, 2));
}