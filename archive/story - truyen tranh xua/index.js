function replaceImages(htmlCode) {
	var newCode = htmlCode.replace(/\(http:\/\/seraphim01.com\/thieulam\/[^\)]*\)/gi, link => `<img src="${link.substring(1, link.length - 1)}"/>`);
	return newCode;
}

function test() {
	var htmlCode = `
			The Goddamned 4 - tranh r.m. Guéra - Image Comics 2016<br /><br />(http://seraphim01.com/thieulam/thegoddamned4.jpg)<br /><br />(http://seraphim01.com/thieulam/thegoddamned4-1.jpg)`;
	var newCode = replaceImages(htmlCode);
	console.log(newCode);	
}


document.querySelectorAll('.postbody').forEach(div => {
	//console.log(div.innerHTML);
	div.innerHTML = replaceImages(div.innerHTML);
});

