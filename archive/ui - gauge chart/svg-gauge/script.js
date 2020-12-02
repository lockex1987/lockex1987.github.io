var containersRy = document.querySelector(".container");
var svg = document.querySelector(".typeRange");
var output = document.querySelector(".output");
var outline = document.querySelector(".outline");
var fill = document.querySelector(".fill");
var center = document.querySelector(".center");
var needle = document.querySelector(".needle");

var initialValue = document.querySelector(".initialValue");

var rad = Math.PI / 180;
var NS = "http:\/\/www.w3.org/2000/svg";

var W = parseInt(window.getComputedStyle(svg, null).getPropertyValue("width"));
var offset = 40;
var cx = ~~(W / 2);
var cy = 160;

var r1 = cx - offset;
var delta = ~~(r1 / 4);

var initVal = initialValue.value;

var isDragging = false;

var x1 = cx + r1,
  y1 = cy;
var r2 = r1 - delta;

var x2 = offset,
  y2 = cy;
var x3 = x1 - delta,
  y3 = cy;

function drawScale() {
  sr1 = r1 + 5;
  sr2 = r2 - 5;
  srT = r1 + 20;
  var scale = document.querySelector(".scale");
  clearRect(scale)
  var n = 0;
  for (var sa = -180; sa <= 0; sa += 18) {
    var sx1 = cx + sr1 * Math.cos(sa * rad);
    var sy1 = cy + sr1 * Math.sin(sa * rad);
    var sx2 = cx + sr2 * Math.cos(sa * rad);
    var sy2 = cy + sr2 * Math.sin(sa * rad);
    var sxT = cx + srT * Math.cos(sa * rad);
    var syT = cy + srT * Math.sin(sa * rad);

    var scaleLine = document.createElementNS(NS, "line");
    var scaleLineObj = {
      class: "scale",
      x1: sx1,
      y1: sy1,
      x2: sx2,
      y2: sy2
    };
    setSVGAttributes(scaleLine, scaleLineObj);

    scale.appendChild(scaleLine);

    var scaleText = document.createElementNS(NS, "text");
    var scaleTextObj = {
      class: "scale",
      x: sxT,
      y: syT,
    };
    setSVGAttributes(scaleText, scaleTextObj);
    scaleText.textContent = n * 10;
    scale.appendChild(scaleText);

    n++

  }

}

function drawInput(cx, cy, r1, offset, delta, a) {

  var d1 = getD1(cx, cy, r1, offset, delta);
  var d2 = getD2(cx, cy, r1, offset, delta, a);

  drawScale();

  outline.setAttributeNS(null, "d", d1);
  fill.setAttributeNS(null, "d", d2);

  drawNeedle(cx, cy, r1, a);
}

function updateInput(p, cx, cy, r1, offset, delta) {

  var x = p.x;
  var y = p.y;
  var lx = cx - x;
  var ly = cy - y;

  var a = Math.atan2(ly, lx) / rad - 180;

  drawInput(cx, cy, r1, offset, delta, a);
  output.innerHTML = Math.round((a + 180) / 1.8);
  initialValue.value = Math.round((a + 180) / 1.8);
}

function getD1(cx, cy, r1, offset, delta) {

  var x1 = cx + r1,
    y1 = cy;
  var x2 = offset,
    y2 = cy;
  var r2 = r1 - delta;
  var x3 = x1 - delta,
    y3 = cy;
  var d1 =
    "M " + x1 + ", " + y1 + " A" + r1 + "," + r1 + " 0 0 0 " + x2 + "," + y2 + " H" + (offset + delta) + " A" + r2 + "," + r2 + " 0 0 1 " + x3 + "," + y3 + " z";
  return d1;
}

function getD2(cx, cy, r1, offset, delta, a) {
  a *= rad;
  var r2 = r1 - delta;
  var x4 = cx + r1 * Math.cos(a);
  var y4 = cy + r1 * Math.sin(a);
  var x5 = cx + r2 * Math.cos(a);
  var y5 = cy + r2 * Math.sin(a);

  var d2 =
    "M " + x4 + ", " + y4 + " A" + r1 + "," + r1 + " 0 0 0 " + x2 + "," + y2 + " H" + (offset + delta) + " A" + r2 + "," + r2 + " 0 0 1 " + x5 + "," + y5 + " z";
  return d2;
}

function drawNeedle(cx, cy, r1, a) {

  var nx1 = cx + 5 * Math.cos((a - 90) * rad);
  var ny1 = cy + 5 * Math.sin((a - 90) * rad);

  var nx2 = cx + (r1 + 15) * Math.cos(a * rad);
  var ny2 = cy + (r1 + 15) * Math.sin(a * rad);

  var nx3 = cx + 5 * Math.cos((a + 90) * rad);
  var ny3 = cy + 5 * Math.sin((a + 90) * rad);

  var points = nx1 + "," + ny1 + " " + nx2 + "," + ny2 + " " + nx3 + "," + ny3;
  needle.setAttributeNS(null, "points", points);
}

// helpers
function oMousePos(elmt, evt) {
  var ClientRect = elmt.getBoundingClientRect();
  return { //obj
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.min(Math.round(evt.clientY - ClientRect.top), cy)
  }
}

function clearRect(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function setSVGAttributes(elmt, oAtt) {
  for (var prop in oAtt) {
    elmt.setAttributeNS(null, prop, oAtt[prop]);
  }
}

// events
window.addEventListener("load", function() {
  var pa = (initVal * 1.8) - 180;
  var p = {}
  p.x = cx + r1 * Math.cos(pa * rad);
  p.y = cy + r1 * Math.sin(pa * rad);
  updateInput(p, cx, cy, r1, offset, delta)
}, false);

initialValue.addEventListener("input", function() {
  var val = this.value;
  var newVal = (!isNaN(val) && val >= 0 && val <= 100) ? val : 18;
  var pa = (newVal * 1.8) - 180;
  var p = {}
  p.x = cx + r1 * Math.cos(pa * rad);
  p.y = cy + r1 * Math.sin(pa * rad);
  updateInput(p, cx, cy, r1, offset, delta)
}, false);

svg.addEventListener("mousedown", function(evt) {
  isDragging = true;
  this.classList.add("focusable");
  var mousePos = oMousePos(svg, evt);
  updateInput(mousePos, cx, cy, r1, offset, delta);
}, false);
svg.addEventListener("mouseup", function(evt) {
  isDragging = false;
  this.classList.remove("focusable");
}, false);
svg.addEventListener("mouseout", function(evt) {
  isDragging = false;
  this.classList.remove("focusable");
}, false);

svg.addEventListener("mousemove", function(evt) {
  if (isDragging) {
    var mousePos = oMousePos(svg, evt);
    updateInput(mousePos, cx, cy, r1, offset, delta);
  }
}, false);