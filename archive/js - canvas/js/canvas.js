function createCanvasWithGrid(no, size) {

	function createCanvas(canvasSize) {
		if (canvasSize == undefined) {
			canvasSize = 500;
		}
		var canvas = document.createElement("canvas");
		canvas.style.border = "1px solid rgba(0, 0, 0, 0.2)";
		document.getElementsByTagName("body")[0].appendChild(canvas);
		canvas.width = canvasSize;
		canvas.height = canvasSize;
		return canvas.getContext("2d");
	}

	function buildGrid(ctx, no, size) {
		var canvasSize = size * no;
		ctx.strokeStyle = 'rgba(200, 200, 200, 0.75)';
		ctx.lineWidth = 0.5;
		ctx.beginPath();
		for (var i = 0; i < no; i++) {	
			ctx.moveTo(size * i, 0);
			ctx.lineTo(size * i, canvasSize);
			ctx.moveTo(0, size * i);
			ctx.lineTo(canvasSize, size * i);
		}
		ctx.stroke();
	}
	
	function plot(x, y) {
		ctx.fillRect(x * size, y * size, size, size);
		console.log(x, y);
	}

	var canvasSize = no * size;
	var ctx = createCanvas(canvasSize);
	buildGrid(ctx, no, size);
	
	return {
		plot: plot
	};	
}
