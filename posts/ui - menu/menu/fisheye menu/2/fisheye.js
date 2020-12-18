/* 
   Fisheye Menu v1.0 
   Written by Marc Grabanski (m@marcgrabanski.com)

   Copyright (c) 2007 Marc Grabanski (http://marcgrabanski.com/code/fisheye-menu)
   Dual licensed under the GPL (http://www.gnu.org/licenses/gpl-3.0.txt) and 
   CC (http://creativecommons.org/licenses/by/3.0/) licenses. "Share or Remix it but please Attribute the authors."
   Date: 10-05-2007
*/

var fisheyemenu = {
	startSize: 55,
	endSize: 88,

	// Initialize
	init: function () {
		var animElements = document.getElementById("fisheye_menu").getElementsByTagName("img");
		var titleElements = document.getElementById("fisheye_menu").getElementsByTagName("span");
		for (var j = 0; j < titleElements.length; j++) {
			titleElements[j].style.display = 'none';
		}
		for (var i = 0; i < animElements.length; i++) {
			var y = animElements[i];
			fisheyemenu.imgSmall(y);
			animElements[i].onmouseover = changeSize;
			animElements[i].onmouseout = restoreSize;
			animElements[i].currentWidth = fisheyemenu.startSize;
		}

		// Change image size
		function changeSize() {
			var x = this.parentNode.getElementsByTagName("span");
			x[0].style.display = 'block';
			fisheyemenu.resizeAnimation(this, this.currentWidth, fisheyemenu.endSize, 15, 10, 0.333);
			fisheyemenu.imgLarge(elem);
		}

		// Restore image size
		function restoreSize() {
			var x = this.parentNode.getElementsByTagName("span");
			x[0].style.display = 'none';
			fisheyemenu.resizeAnimation(this, this.currentWidth, fisheyemenu.startSize, 15, 10, 0.5);
			fisheyemenu.imgSmall(this);
		}
	},

	// Resize image process
	resizeAnimation: function (elem, startWidth, endWidth, steps, intervals, powr) {
		if (elem.widthChangeMemInt) {
			window.clearInterval(elem.widthChangeMemInt);
		}
		var actStep = 0;
		elem.widthChangeMemInt = window.setInterval(function() {
			elem.currentWidth = fisheyemenu.easeInOut(startWidth, endWidth, steps, actStep, powr);
			elem.style.width = elem.currentWidth + "px";
			elem.style.height = elem.currentWidth + "px";
			actStep++;
			if (actStep > steps) {
				window.clearInterval(elem.widthChangeMemInt);
			}
		}
		, intervals);
	},

	// Scale power
	easeInOut: function (minValue, maxValue, totalSteps, actualStep, powr) {
		// Generic Animation Step Value Generator By www.hesido.com
		var delta = maxValue - minValue;
		var stepp = minValue + (Math.pow(((1 / totalSteps) * actualStep), powr) * delta);
		return Math.ceil(stepp);
	},

	// Set small image.
	imgSmall: function (obj) {
		//obj.setAttribute("width", fisheyemenu.startSize);
		//obj.setAttribute("height", fisheyemenu.startSize);
		obj.style.width = fisheyemenu.startSize + 'px';
		obj.style.height = fisheyemenu.startSize + 'px';
	},

	// Set large image.
	imgLarge: function (obj) {
		//obj.setAttribute("width", fisheyemenu.endSize);
		//obj.setAttribute("height", fisheyemenu.endSize);
		obj.style.width = fisheyemenu.endSize + 'px';
		obj.style.height = fisheyemenu.endSize + 'px';
	}
}

// Add event with wide browser support
if (typeof window.addEventListener != "undefined") {
	window.addEventListener("load", fisheyemenu.init, false);
} else if (typeof window.attachEvent != "undefined") {
	window.attachEvent("onload", fisheyemenu.init);
} else if (window.onload != null) {
	var oldOnload = window.onload;
	window.onload = function (e) {
		oldOnload(e);
		fisheyemenu.init();
	};
} else {
	window.onload = fisheyemenu.init;
}