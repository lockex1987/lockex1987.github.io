var imageAutoCrop = new MarvinImage();
var theCanvas2 = document.getElementById('canvasAutoCrop');
var exampleFeaturesCornersMap;
var exampleFeaturesCropRect;


function clickDetectCorners() {
	var factor = 1000 / 300;
	var image = new MarvinImage(300, 158);
	Marvin.scale(imageAutoCrop, image, 300);
	exampleFeaturesCornersMap = Marvin.moravec(image.clone(), image, 5, 10000);

	var ctx = theCanvas2.getContext('2d');
	ctx.fillStyle = '#ff0000';
	for (var x = 0; x < exampleFeaturesCornersMap.length; x++) {
		for (var y = 0; y < exampleFeaturesCornersMap.length; y++) {
			if (exampleFeaturesCornersMap[x][y] > 0) {
				// scale up the corners coordinates
				ctx.fillRect(Math.floor(x * factor), Math.floor(y * factor), 10, 10);
			}
		}
	}
}

function clickSelectCropArea() {
	imageAutoCrop.draw(theCanvas2);

	var factor = 1000 / 300;
	var x1 = 9999;
	var x2 = 0;
	var y1 = 9999;
	var y2 = 0;
	for (var x = 0; x < exampleFeaturesCornersMap.length; x++) {
		var minY = 9999;
		var maxY = 0;
		for (var y = 0; y < exampleFeaturesCornersMap.length; y++) {
			if (exampleFeaturesCornersMap[x][y]) {
				if (y < minY) { minY = y; }
				if (y > maxY) { maxY = y; }
			}
		}

		if (maxY - minY > 30) {
			if (x < x1) { x1 = x; }
			if (x > x2) { x2 = x; }
			if (minY < y1) { y1 = minY; }
			if (maxY > y2) { y2 = maxY; }
		}
	}

	// Scale up to the original resolution
	x1 = Math.floor(x1 * factor);
	x2 = Math.floor(x2 * factor);
	y1 = Math.floor(y1 * factor);
	y2 = Math.floor(y2 * factor);

	// Add some margin
	x1 -= Math.floor((x2 - x1) * 0.2);
	x2 += Math.floor((x2 - x1) * 0.2);
	y1 -= Math.floor((y2 - y1) * 0.05);
	y2 += Math.floor((y2 - y1) * 0.05);

	exampleFeaturesCropRect = [x1, y1, x2 - x1, y2 - y1];

	console.log('x1:' + x1 + ',x2:' + x2 + ',y1:' + y1 + ',y2:' + y2);
	var ctx = theCanvas2.getContext('2d');
	ctx.strokeStyle = '#ff0000';
	ctx.lineWidth = 4;
	ctx.rect(x1, y1, x2 - x1, y2 - y1);
	ctx.stroke();
}

function clickAutoCropCrop() {
	var image = new MarvinImage(1, 1);
	Marvin.crop(imageAutoCrop, image, exampleFeaturesCropRect[0], exampleFeaturesCropRect[1], exampleFeaturesCropRect[2], exampleFeaturesCropRect[3]);

	// Clear canvas
	var canvas = theCanvas2;
	canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

	image.draw(theCanvas2, exampleFeaturesCropRect[0], exampleFeaturesCropRect[1]);
}

function clickAutoCropReset() {
	imageAutoCrop.draw(theCanvas2);
}

function exampleAutoCrop() {
	imageAutoCrop.load('images/cheetah.jpg', function () {
		imageAutoCrop.draw(theCanvas2);
	});
}


exampleAutoCrop();
