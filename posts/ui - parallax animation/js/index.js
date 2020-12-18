window.addEventListener("load", function() {
	var data = [
		{ src: "images/kurama.png", top: -0, left: -0, speed: 0.5, scaleSpeed: 0.001 },
		//{ src: "images/landscape.png", top: 500, left: -250, speed: 0.8 },
		//{ src: "images/grass.png", top: 630, left: -250, speed: 1 },
		//{ src: "images/obito.png", top: 520, left: 550, speed: 1.4 },
		{ src: "images/minato.png", top: 230, left: 250, speed: 1.5 }
		//{ src: "images/leaves.png", top: 350, left: 0, speed: 1.8 }
	];
	var counter = 0;

	function init() {
		var container = document.querySelector(".container");
		for (var i = 0; i < data.length; i++) {
			var e = data[i];
			var img = document.createElement("img");
			img.src = e.src;
			img.style.top = e.top + "px";
			img.style.left = e.left + "px";
			
			e.img = img;

			container.appendChild(img);

			//alert(img.src + ": " + img.style.left + ", " + img.width)	
		}
	}

	function updateAnimation() {
		counter++;
		if (counter > 200) {
			counter = 0;
		}
		
		/*
		for (var i = 0; i < data.length; i++) {
			var e = data[i];
			var img = e.img;

			img.style.left = (e.left + e.speed * counter) + "px";
		}
		*/
		
		var kurama = data[0];
		kurama.img.style.transform = "scale(" + (1 + kurama.scaleSpeed * counter) + ")"; //1.2

		requestAnimationFrame(updateAnimation);
	}

	init();
	updateAnimation();
})
