var fs = require('fs');
//var jsonFilePath = 'coaches.json';
var jsonFilePath = 'players-1.json';

fs.readFile(jsonFilePath, function(error, data) {
	if (error) {
		console.log(error);
		return;
	}
	var a = JSON.parse(data);
	a.forEach((e) => {
		//console.log(JSON.stringify(e));

		//console.log(e.image);
		var idx1 = e.image.lastIndexOf("/");
		var idx2 = e.image.indexOf("?");
		var oldFile = e.image.substring(idx1 + 1, idx2) + '.png';
		console.log(oldFile);
		
		//var newFile = e.country + " - " + e.name + '.png';
		var newFile = e.country + " - " + e.number + ".png";
		console.log(newFile);

		fs.rename(oldFile, newFile, function(err) {
			if (err) {
				console.log('ERROR: ' + err);
			}
		});
	});
});
