var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var Preloader = function () {
	function Preloader(_ref) {var container = _ref.container,dimX = _ref.dimX,dimY = _ref.dimY,cellSize = _ref.cellSize,lettersColor = _ref.lettersColor;_classCallCheck(this, Preloader);
		this.container = document.querySelector(container);
		this.color = lettersColor;
		this.dimx = dimX;
		this.dimy = dimY;
		this.cellAmount = this.dimx * this.dimy;
		this.cellSize = cellSize;
		this.cells = [];
		this.cellProperties = {
			"width": this.cellSize + "px",
			"height": this.cellSize + "px",
			"float": "left",
			"border": "1px solid #fef",
			"background": "#555" };

		this.inPoint = 184;
		this.leftBorder = null;
		this.counter = 0;
		this.stopRAF = null;
		this.letters = {
			"l": [
			[1, 0, 0, 0],
			[1, 0, 0, 0],
			[1, 0, 0, 0],
			[1, 0, 0, 0],
			[1, 1, 1, 1]],

			"o": [
			[1, 1, 1, 1],
			[1, 0, 0, 1],
			[1, 0, 0, 1],
			[1, 0, 0, 1],
			[1, 1, 1, 1]],

			"a": [
			[0, 0, 1, 1],
			[0, 1, 0, 1],
			[1, 1, 1, 1],
			[1, 0, 0, 1],
			[1, 0, 0, 1]],

			"d": [
			[1, 1, 1, 0],
			[1, 0, 0, 1],
			[1, 0, 0, 1],
			[1, 0, 0, 1],
			[1, 1, 1, 0]],

			"i": [
			[1],
			[1],
			[1],
			[1],
			[1]],

			"n": [
			[1, 1, 1, 0],
			[1, 0, 0, 1],
			[1, 0, 0, 1],
			[1, 0, 0, 1],
			[1, 0, 0, 1]],

			"g": [
			[1, 1, 1, 1],
			[1, 0, 0, 0],
			[1, 0, 1, 1],
			[1, 0, 0, 1],
			[1, 1, 1, 1]],

			"dots": [
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[1, 0, 1, 0, 1]] };


		this.lettersOrder = [
		{
			letter: "l",
			enterPoint: this.inPoint },

		{
			letter: "o",
			enterPoint: this.inPoint + 5 },

		{
			letter: "a",
			enterPoint: this.inPoint + 10 },

		{
			letter: "d",
			enterPoint: this.inPoint + 15 },

		{
			letter: "i",
			enterPoint: this.inPoint + 20 },

		{
			letter: "n",
			enterPoint: this.inPoint + 22 },

		{
			letter: "g",
			enterPoint: this.inPoint + 27 },

		{
			letter: "dots",
			enterPoint: this.inPoint + 32 }];


		this.init = this.init.bind(this);
	}_createClass(Preloader, [{ key: "setContainerProperties", value: function setContainerProperties()
		{
			this.container.style.width = this.dimx * this.cellSize + "px";
			this.container.style.height = this.dimy * this.cellSize + "px";
		} }, { key: "createCells", value: function createCells()
		{
			for (var i = 0; i < this.cellAmount; i++) {
				var cell = document.createElement('span');
				for (var prop in this.cellProperties) {
					cell.style[prop] = this.cellProperties[prop];
				}
				this.cells.push(cell);
			}
		} }, { key: "drawCells", value: function drawCells()
		{
			for (var i = 0; i < this.cells.length; i++) {
				this.container.appendChild(this.cells[i]);
			}
		} }, { key: "outputLetter", value: function outputLetter(
		inPoint, letter, letterOffset) {
			var beginPoint = void 0;
			for (var i = 0; i < letter.length; i++) {
				for (var y = 0; y < letter[i].length; y++) {
					beginPoint = inPoint + y - letterOffset;
					if (this.counter > this.dimx - 1) {
						this.counter = 0;
						beginPoint = inPoint + y - letterOffset;
					}
					if (beginPoint < this.leftBorder) {
						beginPoint = inPoint + this.dimx + y - letterOffset;
					}
					if (letter[i][y]) {
						this.cells[beginPoint + this.dimx * i].style.backgroundColor = this.color;
					}
				}
			}
		} }, { key: "setLettersOnAField", value: function setLettersOnAField()
		{var _this = this;
			this.lettersOrder.forEach(function (v) {
				_this.outputLetter(v.enterPoint, _this.letters[v.letter], _this.counter);
			});
		} }, { key: "setLeftBorder", value: function setLeftBorder()
		{
			for (var i = 0; i < this.dimy; i++) {
				if (this.inPoint > this.dimx * i && this.inPoint < this.dimx * (i + 1)) {
					this.leftBorder = this.dimx * i;
				}
			}
		} }, { key: "init", value: function init()
		{
			this.setContainerProperties();
			this.createCells();
			this.drawCells();
			this.setLeftBorder();
			this.setLettersOnAField();
			this.animateLetters = this.animateLetters.bind(this);
			this.stop = this.stop.bind(this);
			this.animateLetters();
		} }, { key: "clearField", value: function clearField()
		{
			this.cells.forEach(function (v) {return v.style.backgroundColor = "transparent";});
		} }, { key: "stop", value: function stop()
		{
			this.container.innerHTML = "";
			window.cancelAnimationFrame(this.stopRAF);
		} }, { key: "animateLetters", value: function animateLetters()
		{
			this.clearField();
			this.setLettersOnAField();
			this.counter += 1;
			this.stopRAF = window.requestAnimationFrame(this.animateLetters);
		} }]);return Preloader;}();



var config = {
	container: ".preloader",
	dimX: 45,
	dimY: 13,
	cellSize: 8,
	lettersColor: 'red' };


var preloader = new Preloader(config);

preloader.init();