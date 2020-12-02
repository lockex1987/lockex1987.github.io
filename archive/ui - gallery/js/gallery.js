(function () {
  var data = [
    {
      title: "Portfolio",
      image: "images/myblogger.jpg",
      link: ""
    },
    {
      title: "",
			image: "images/home2.jpg",
			link: ""
		},

		{
			title: "",
			image: "images/home3.jpg",
			link: ""
		},
		{
			title: "",
			image: "images/home4.jpg",
			link: ""
		},
		{
			title: "",
			image: "images/home5.jpg", link: ""
		},
		{
			title: "",
			image: "images/home6.jpg", link: ""
		},
		{
			title: "",
			image: "images/home7.jpg", link: ""
		},
		{ title: "", image: "images/home8.jpg", link: "" }
	];
	
	var gallery = document.getElementById("gallery");
	for (var i = 0; i < data.length; i++) {
		var e = data[i];
		var img = document.createElement("img");
		img.src = e.image;
		var figure = document.createElement("figure");
		var figcaption = document.createElement("figcaption");
		figure.appendChild(img);
		figure.appendChild(figcaption);
		var li = document.createElement("li");
		if (e.title) {
			figcaption.textContent = e.title;
			var a = document.createElement("a");
			a.href = e.link;
			a.appendChild(figure);
			li.appendChild(a);
		} else {
			figcaption.textContent = "Comming soon";
			li.appendChild(figure);
		}

		gallery.appendChild(li);
	}
})();
