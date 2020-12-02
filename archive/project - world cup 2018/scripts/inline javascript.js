//https://en.wikipedia.org/wiki/2018_FIFA_World_Cup_squads

	var countries = [];
	document.querySelectorAll("h3 .mw-headline").forEach((div) => {
		if (countries.length < 32) {
			countries.push(div.textContent.trim());
		}
	});
	//console.log(countries.length);
	//console.log(countries);

	var countX = 0;
	var clubFlags = [];
	var clubCountries = [];
	var text = "";
	document.querySelectorAll(".jquery-tablesorter").forEach((table) => {
		let rowLength = table.rows.length;
		//console.log(rowLength);
		if (rowLength == 24) {
			for (let i = 1; i <= 23; i++) {
				let cells = table.rows[i].cells;
				//console.log(r.innerHTML);
				let number = cells[0].innerHTML.trim();
				let position = cells[1].querySelector("a").innerHTML.trim();
				let name = cells[2].querySelector("a").innerHTML.trim();
				let dob = cells[3].querySelector(".bday").innerHTML.trim();
				// Caps
				// Goals
				let clubCountry = cells[6].querySelectorAll("a")[0].title.trim();
				let clubCountryFlag = cells[6].querySelector("img").src;
				let clubName = cells[6].querySelectorAll("a")[1].innerHTML.trim();
				
				if (!clubFlags.includes(clubCountryFlag)) {
					clubFlags.push(clubCountryFlag);
				}
				if (!clubCountries.includes(clubCountry)) {
					clubCountries.push(clubCountry);
				}

				let country = countries[Math.floor(countX / 23)];
				text += JSON.stringify({ country, number, name, position, dob, clubCountry, clubCountryFlag, clubName }) + ",\n";
				
				countX++;
			}
		}
	});
	//console.log(countX);
	console.log(clubFlags);
	console.log(clubFlags.length);
	console.log(clubCountries.length);
	saveTextAsFile(text, "players-2.json");
	
	for (let i = 0; i < clubFlags.length; i++) {
		//downloadImage(clubFlags[i], clubCountries[i] + ".png");
	}
	
	saveTextAsFile(JSON.stringify(clubFlags, null, 2) + JSON.stringify(clubCountries, null, 2), "clubs.json");

/*	
https://www.fifa.com/worldcup/players/coaches/
*/

	var text = "";
	document.querySelectorAll(".fi-p--hub > div.col-flex").forEach((div) => {
		let image = div.querySelector(".fi-p__picture svg image").getAttribute("xlink:href");
		let name = div.querySelector(".fi-p__wrapper-text .fi-p__name").textContent.trim();
		let country = div.querySelector(".fi-p__wrapper-text .fi-p__country").textContent.trim();
		//console.log(name, country, image);
		//text += JSON.stringify({ name, country, image }) + ",\n";
		downloadImage(image, name + ".jpg");
	});
	//console.log(text);
	//saveTextAsFile(text, "coaches.json");

/*	
https://www.fifa.com/worldcup/players/browser/
736
*/

	var countX = 0;
	var text = "";
	document.querySelectorAll("#team-players-by-browser .fi-p--hub > div.col-flex").forEach((div) => {
		let image = div.querySelector(".fi-p__picture svg image").getAttribute("xlink:href");
		let number = div.querySelector(".fi-p__picture .fi-p__jerseyNum .fi-p__num").textContent.trim();
		let name = div.querySelector(".fi-p__wrapper-text .fi-p__name").textContent.trim();
		let country = div.querySelector(".fi-p__wrapper-text .fi-p__country").textContent.trim();
		//console.log(number, name, country, image);
		if (countX < 10) {
			downloadImage(image, country + "-" + number + ".jpg");
			countX++;
		}
		//text += JSON.stringify({ country, number, name, image }) + ",\n";
	});
	//saveTextAsFile(text, "players-1.json");

/*
Save
*/

	/**
	 * Hàm save as do mình tự làm.
	 * @param textToWrite Nội dung của văn bản cần lưu
	 * @param fileNameToSaveAs Tên file
	 */
	function saveTextAsFile(textToWrite, fileNameToSaveAs) {
		// Tạo đối tượng Blob
		var textFileAsBlob = new Blob([textToWrite], { type:'text/plain' });
		
		// Tạo một thẻ a tạm và giả lập thao tác click vào thẻ đó
		var downloadLink = document.createElement("a");
		downloadLink.download = fileNameToSaveAs;
		downloadLink.innerHTML = "Download File";
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.style.display = "none";
		downloadLink.onclick = function(event) {
			// Remove the a tag
			document.body.removeChild(event.target);
		};
		// Gắn nó vào DOM và thực hiện thao tác click
		document.body.appendChild(downloadLink);
		downloadLink.click();
	}
	
	
	function downloadImage(url, fileName) {
		// Tạo một thẻ a tạm và giả lập thao tác click vào thẻ đó
		var downloadLink = document.createElement("a");
		downloadLink.download = fileName;
		downloadLink.innerHTML = "Download File";
		downloadLink.href = url;
		downloadLink.style.display = "none";
		downloadLink.onclick = function(event) {
			// Remove the a tag
			document.body.removeChild(event.target);
		};
		// Gắn nó vào DOM và thực hiện thao tác click
		document.body.appendChild(downloadLink);
		downloadLink.click();
	}