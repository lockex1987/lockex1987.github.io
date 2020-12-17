var c = document.getElementById("canvas");
var size = 500;
c.width = size;
c.height = size;
var ctx = c.getContext("2d");

ctx.translate(size / 2, 100);

var deg = Math.PI / 180;
var dAngle = new Vector3(0, 0.5 * deg, 0);

var vertices = [];
var indices = [];

var radius = 50
var height = 250;
var widthSegments = 20;
var heightSegments = 20;
for (var y = 0; y < heightSegments; y++) {
  for (var x = 0; x < widthSegments; x++) {
    var angle = 2 * Math.PI / widthSegments * x;
    var xx = Math.cos(angle) * radius;
    var yy = height / heightSegments * (y - heightSegments / 2);
    var zz = Math.sin(angle) * radius;
    vertices.push(new Vector3(yy, xx, zz));
  }
}

for (var x = 0; x < widthSegments - 1; x++) {
  for (var y = 0; y < heightSegments - 1; y++) {
    indices.push(
      x + y * widthSegments, 
      x + (y + 1) * widthSegments, 
      x + 1 + y * widthSegments,
      x + 1 + y * widthSegments,
      x + (y + 1) * widthSegments, 
      x + 1 + (y + 1) * widthSegments
    );
  }
}

for (var y = 0; y < heightSegments - 1; y++) {
  var ind =  (y + 1) * widthSegments - 1;
  var x = widthSegments - 1;
  indices.push(
      x + y * widthSegments, 
      x + (y + 1) * widthSegments, 
      y * widthSegments,
      y * widthSegments,
      x + (y + 1) * widthSegments, 
      (y + 1) * widthSegments
    );
}

var perspFactor = 300;

function loop() {
  update();
  render();
  window.requestAnimationFrame(loop);
}

function update() {
  var rotX = Matrix3.rotate(dAngle.x, 1, 0, 0);
  var rotY = Matrix3.rotate(dAngle.y, 0, 1, 0);
  var rotZ = Matrix3.rotate(dAngle.z, 0, 0, 1);
  var rot = rotZ.multiplyMatrix(rotY.multiplyMatrix(rotX));
  for (var i = 0; i < vertices.length; i++) {
    vertices[i] = rot.multiplyVector(vertices[i]);
  }
}
function render() {
  ctx.clearRect(-size / 2, -size / 2, size, size);
  for (var i = 0; i < indices.length; i += 3) {
    ctx.fillStyle = "hsl(0, 0%, 60%)";
    ctx.strokeStyle = "hsl(0, 0%, 60%)";
    ctx.beginPath();
    var v1 = vertices[indices[i]];
    var proj1 = (v1.z + perspFactor) / perspFactor;
    var v2 = vertices[indices[i + 1]];
    var proj2 = (v2.z + perspFactor) / perspFactor;
    var v3 = vertices[indices[i + 2]];
    var proj3 = (v3.z + perspFactor) / perspFactor;
    ctx.lineTo(v1.x / proj1, v1.y / proj1);
    ctx.lineTo(v2.x / proj2, v2.y / proj2);
    ctx.lineTo(v3.x / proj3, v3.y / proj3);
    ctx.closePath();
    //ctx.fill();
    ctx.stroke();
  }
}

loop();