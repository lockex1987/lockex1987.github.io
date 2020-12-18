// Kich thuoc
const VIDEO_WIDTH = 480;
const VIDEO_HEIGHT = 360;

// Lay ra cac doi tuong
var video = document.getElementById('monitor');
var canvas = document.getElementById('photo');
var gallery = document.getElementById('gallery');

// Con tro den effect va mang effect
var idx = 0;
var filters = [
  'grayscale',
  'sepia',
  'blur',
  'brightness',
  'contrast',
  'hue-rotate',
  'hue-rotate2',
  'hue-rotate3',
  'saturate',
  'invert',
  ''
];

canvas.width = VIDEO_WIDTH;
canvas.height = VIDEO_HEIGHT;

video.width = VIDEO_WIDTH;
video.height = VIDEO_HEIGHT;

// Chuyen hieu ung
function changeFilter(el) {
	el.className = '';
	var effect = filters[idx++ % filters.length];
	if (effect) {
		el.classList.add(effect);
	}
}

// Ham nay se duoc thuc hien khi ket noi webcam thanh cong
function gotStream(stream) {
	video.src = window.URL.createObjectURL(stream);
	/*
	video.onloadedmetadata = function() {
		
	};
	*/
	document.getElementById('app').hidden = false;
}

// Ham nay se duoc thuc hien khi khong ket noi duoc webcam
function noStream(e) {
  var msg = 'No camera available.';
  if (e.code == 1) {
    msg = 'User denied access to use camera.';
  }
	alert(msg);
}

// Chup anh
function capture() {
	var ctx = canvas.getContext('2d');
	ctx.drawImage(video, 0, 0);
	
	var img = document.createElement('img');
	img.src = canvas.toDataURL('image/webp');
	gallery.appendChild(img);
}

// Khi nhan Capture thi thuc hien ham nay
function init(el) {
	if (hasGetUserMedia()) {
		// Chuyen text va ham cua nut Capture thanh Snapshot
		el.onclick = capture;
		el.textContent = 'Snapshot';

		var constrains = { video: { width: VIDEO_WIDTH, height: VIDEO_HEIGHT } };

		// Ket noi web cam
		navigator.getUserMedia(constrains, gotStream, noStream);
	}
}