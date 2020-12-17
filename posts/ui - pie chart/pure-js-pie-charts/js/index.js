var canvas = document.getElementById("mycanvas");
var w = window.innerWidth;
var h = window.innerHeight;
/*
canvas.height = 1000;
canvas.width = 1400;
*/
canvas.height = h - 100;
canvas.width = w - 100;
var ctx = canvas.getContext('2d');

var poppable = true;

var slices = [];

function shadeColor(color, percent) {
  var f = parseInt(color.slice(1), 16),
    t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent,
    R = f >> 16,
    G = f >> 8 & 0x00FF,
    B = f & 0x0000FF;
  return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
}

function pieSlice(oX, oY, r, pos, len, col, data) {
  this.data = data
  this.originX = oX;
  this.originY = oY;
  this.radius = r;
  this.startingRadian = pos;
  this.length = len;
  this.color = col;
  this.highlightedColor = shadeColor(this.color, .6);
  this.highlighted = false;
  this.popped = false;
  this.animationFrame = 0;

  function setColor(c) {
    this.color = c;
  }
}

pieSlice.prototype.displayData = function() {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.originX - this.radius - 40, this.originY - this.radius - 35, 25, 25);
  ctx.fillStyle = "white";
  ctx.font = "15px Arial";
  ctx.fillText(this.data, this.originX - this.radius - 10, this.originY - this.radius - 18);
}

pieSlice.prototype.render = function() {
  if (!this.highlighted) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
  } else {
    if (!this.popped && poppable) {
      this.displayData();
    }
    // ctx.fillStyle = this.color;
    ctx.fillStyle = this.highlightedColor;
    ctx.strokeStyle = this.color;
  }
  ctx.beginPath();
  var xOffset = Math.cos(this.length / 2 + this.startingRadian) * this.animationFrame;
  var yOffset = Math.sin(this.length / 2 + this.startingRadian) * this.animationFrame;
  ctx.moveTo(this.originX + xOffset, this.originY + yOffset);
  var x = this.originX + xOffset + this.radius * Math.cos(this.startingRadian);
  var y = this.originY + yOffset + this.radius * Math.sin(this.startingRadian);
  ctx.lineTo(x, y);
  ctx.arc(this.originX + xOffset, this.originY + yOffset, this.radius, this.startingRadian, this.startingRadian + this.length);
  if (this.popped) {
    var fill = ctx.fillStyle;
    this.displayData();
    ctx.fillStyle = fill;
    if (this.animationFrame < 30) {
      this.animationFrame += 2;
    }
  } else {
    if (this.animationFrame > 0) {
      this.animationFrame -= 2;
    }
  }
  ctx.closePath();
  //ctx.stroke();
  //if (this.highlighted) {
  ctx.fill();
  // }
}

pieSlice.prototype.update = function() {

}

function pieChart(s) {
  this.slices = s;
}

pieChart.prototype.render = function() {
  this.slices.forEach(function(p) {
    p.render();
  });
};

pieChart.prototype.update = function() {
  this.slices.forEach(function(p) {
    p.update();
  });
}

//PIE ONE
var pie = new pieSlice(700, 170, 125, 0, Math.PI / 4, "#FFD1DC", 12);
var slice2 = new pieSlice(700, 170, 125, Math.PI / 4, Math.PI / 4, "#08E8DE");
var slice3 = new pieSlice(700, 170, 125, Math.PI / 2, Math.PI / 4, "#6699CC");
var slice4 = new pieSlice(700, 170, 125, 3 * Math.PI / 4, Math.PI, "#ADD8E6");
var slice5 = new pieSlice(700, 170, 125, 7 * Math.PI / 4, Math.PI / 4, "#B19CD9");
var slices1 = [pie, slice2, slice3, slice4, slice5];

var pink = new pieSlice(220, 170, 125, 0, Math.PI / 3, "#FF4B4B");
var orange = new pieSlice(220, 170, 125, Math.PI / 3, Math.PI / 3, "#FF931B");
var yellow = new pieSlice(220, 170, 125, 2 * Math.PI / 3, Math.PI / 3, "#FFE21B");
var green = new pieSlice(220, 170, 125, 3 * Math.PI / 3, Math.PI / 3, "#90E64E");
var blue = new pieSlice(220, 170, 125, 4 * Math.PI / 3, Math.PI / 3, "#6097D9");
var purple = new pieSlice(220, 170, 125, 5 * Math.PI / 3, Math.PI / 3, "#8365DD");

var redd = new pieSlice(1180, 170, 125, 0, 2 * Math.PI / 3, "#B3989B");
var orangee = new pieSlice(1180, 170, 125, 2 * Math.PI / 3, 1 * Math.PI / 8, "#C1AEE0");
var bluee = new pieSlice(1180, 170, 125, 19 * Math.PI / 24, 4 * Math.PI / 24, "#928CE9");
var greenn = new pieSlice(1180, 170, 125, 23 * Math.PI / 24, 3 * Math.PI / 8, "#676675");
var purplee = new pieSlice(1180, 170, 125, 4 * Math.PI / 3, 3 * Math.PI / 8, "#947D59");
var ceci = new pieSlice(1180, 170, 125, 41 * Math.PI / 24, 7 * Math.PI / 24, "#D994E0");

var slices3 = [redd, orangee, bluee, greenn, purplee, ceci];

var slices2 = [pink, orange, yellow, green, blue, purple];
var pie1 = new pieChart(slices1);
var pie2 = new pieChart(slices2);
var pie3 = new pieChart(slices3);

var update = function() {
  pie1.update();
}

var render = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pie1.render();
  pie2.render();
  pie3.render();
}

var step = function() {
  update();
  render();
  animate(step);
}

var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };

slices.push.apply(slices, slices1);
slices.push.apply(slices, slices2);
slices.push.apply(slices, slices3);

canvas.addEventListener("mousemove", function(e) {
  var x = e.clientX;
  var y = e.clientY;
  slices.forEach(function(slice) {
    ctx.beginPath();
    var xOffset = Math.cos(slice.length / 2 + slice.startingRadian) * slice.animationFrame;
    var yOffset = Math.sin(slice.length / 2 + slice.startingRadian) * slice.animationFrame;
    ctx.moveTo(slice.originX + xOffset, slice.originY + yOffset);
    var xx = slice.originX + xOffset + slice.radius * Math.cos(slice.startingRadian);
    var yy = slice.originY + yOffset + slice.radius * Math.sin(slice.startingRadian);
    ctx.lineTo(xx, yy);
    ctx.arc(slice.originX + xOffset, slice.originY + yOffset, slice.radius, slice.startingRadian, slice.startingRadian + slice.length);
    if (ctx.isPointInPath(x, y)) {
      slice.highlighted = true;
      slice.displayData();
    } else {
      slice.highlighted = false;
    }
    ctx.closePath();
  });
});

canvas.addEventListener("click", function(e) {
  var x = e.clientX;
  var y = e.clientY;
  slices.forEach(function(slice) {
    ctx.beginPath();
    var xOffset = Math.cos(slice.length / 2 + slice.startingRadian) * slice.animationFrame;
    var yOffset = Math.sin(slice.length / 2 + slice.startingRadian) * slice.animationFrame;
    ctx.moveTo(slice.originX + xOffset, slice.originY + yOffset);
    var xx = slice.originX + xOffset + slice.radius * Math.cos(slice.startingRadian);
    var yy = slice.originY + yOffset + slice.radius * Math.sin(slice.startingRadian);
    ctx.lineTo(xx, yy);
    ctx.arc(slice.originX + xOffset, slice.originY + yOffset, slice.radius, slice.startingRadian, slice.startingRadian + slice.length);
    if (ctx.isPointInPath(x, y)) {
      if (slice.popped) {
        slice.popped = false;
        poppable = true;
      } else {
        if (poppable) {
          slice.popped = true;
          poppable = false;
        }
      }
      slice.highlighted = false;
    }
    ctx.closePath();
  });
});

// start the loop
animate(step);