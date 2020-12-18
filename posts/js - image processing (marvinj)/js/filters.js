var imageExampleFilters = new MarvinImage();
var theCanvas1 = document.getElementById('canvasExampleFilters');
var imageExampleFiltersOut;


function exampleFilters() {
	imageExampleFilters.load('images/example2.jpg', function() {
		imageExampleFilters.draw(theCanvas1);
		imageExampleFiltersOut = new MarvinImage(imageExampleFilters.getWidth(), imageExampleFilters.getHeight())
	});
}

function clickExampleFiltersGrayScale() {
	Marvin.grayScale(imageExampleFilters, imageExampleFiltersOut);
	imageExampleFiltersOut.draw(theCanvas1);
}


function clickExampleFiltersInvertColors() {
	Marvin.invertColors(imageExampleFilters, imageExampleFiltersOut);
	imageExampleFiltersOut.draw(theCanvas1);
}


function clickExampleFiltersInvertScale() {
	Marvin.scale(imageExampleFilters, imageExampleFiltersOut, Math.floor(imageExampleFilters.getWidth() / 2), Math.floor(imageExampleFilters.getHeight() / 2));

	// Clear canvas
	var canvas = theCanvas1;
	canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
	
	imageExampleFiltersOut.draw(theCanvas1, Math.floor(imageExampleFilters.getWidth() / 4), Math.floor(imageExampleFilters.getHeight() / 4));
	imageExampleFiltersOut.setDimension(imageExampleFilters.getWidth(), imageExampleFilters.getHeight());
}

function clickExampleFiltersCrop() {
	Marvin.crop(imageExampleFilters, imageExampleFiltersOut, 250, 35, 180, 368);
	
	// Clear canvas
	var canvas = theCanvas1;
	canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
	
	imageExampleFiltersOut.draw(theCanvas1, 250, 35);
	imageExampleFiltersOut.setDimension(imageExampleFilters.getWidth(), imageExampleFilters.getHeight());
}

function clickExampleFiltersBlackAndWhite() {
	Marvin.blackAndWhite(imageExampleFilters, imageExampleFiltersOut, 30);
	imageExampleFiltersOut.draw(theCanvas1);
}

function clickExampleFiltersSepia() {
	imageExampleFiltersOut.clear(0xFF000000);
	Marvin.sepia(imageExampleFilters, imageExampleFiltersOut, 30);
	imageExampleFiltersOut.draw(theCanvas1);
}

function clickExampleFiltersEmboss() {
	Marvin.emboss(imageExampleFilters, imageExampleFiltersOut);
	imageExampleFiltersOut.draw(theCanvas1);
}

function clickExampleFiltersHalftone() {
	Marvin.halftoneErrorDiffusion(imageExampleFilters, imageExampleFiltersOut);
	imageExampleFiltersOut.draw(theCanvas1);
}

function clickExampleFiltersEdge() {
	imageExampleFiltersOut.clear(0xFF000000);
	Marvin.prewitt(imageExampleFilters, imageExampleFiltersOut);
	imageExampleFiltersOut.draw(theCanvas1)
}

function clickExampleFiltersEdge2() {
	imageExampleFiltersOut.clear(0xFF000000);
	Marvin.prewitt(imageExampleFilters, imageExampleFiltersOut);
	Marvin.invertColors(imageExampleFiltersOut, imageExampleFiltersOut);
	Marvin.thresholding(imageExampleFiltersOut, imageExampleFiltersOut, 150);
	imageExampleFiltersOut.draw(theCanvas1)
}

function clickExampleFiltersReset() {
	imageExampleFilters.draw(theCanvas1)
}

exampleFilters();
