document.fonts.ready.then(function() {
	document.getElementById("fit").addEventListener("click", function() {
		ftw_fit(".ftw", undefined, 600);
	});
});

document.getElementById("width-slider").addEventListener("input", function() {
    let sliderPos = document.getElementById("width-slider").value;
		ftw_fit(".ftw", undefined, 200 + sliderPos * 600);
});
