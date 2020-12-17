function backToList() {
	$("#list").show();
	$("#contentWrap").hide();
}

function hideAllArticles() {
	var a = document.querySelectorAll("#contentWrap article");
	for (var i = 0; i < a.length; i++) {
		a[i].style.display = "none";
	}
}

function updateStory(idx) {
	hideAllArticles();
	$("#s" + idx).show();
	
	$("#list").hide();
	$("#contentWrap").show();
}

function buildPage() {
	var list = document.getElementById("list");
	var contentWrap = document.getElementById("contentWrap");
	for (var i = 0; i < data.length; i++) {
		var e = data[i];
		
		var div = document.createElement("div");
		div.innerHTML = '<img src="images/' + e.id + '.jpg" alt="Story ' + e.id + '"/> '
				+ '<a href="" onclick="updateStory(' + e.id + '); return false;">' + e.title + '</a>'; 
		list.appendChild(div);
		
		var article = document.createElement("article");
		article.id = "s" + e.id;
		article.innerHTML = '<h3>' + e.title + '</h3>'
				+ '<img src="images/' + e.id + '.jpg"/>'
				+ e.content;
		contentWrap.appendChild(article);
	}
	//delete data;
}

backToList();
hideAllArticles();
buildPage();
