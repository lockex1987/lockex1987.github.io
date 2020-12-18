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

var radius = 100;
var latitudeCount = 30;
var longitudeCount = 30;
for (var y = 0; y < longitudeCount; y++) {
  for (var x = 0; x < latitudeCount; x++) {
    var angleX = 2 * Math.PI / latitudeCount * x;
    var angleY = 2 * Math.PI / longitudeCount * y;
    var xx = radius * Math.sin(angleY) * Math.cos(angleX);
    var yy = radius * Math.sin(angleY) * Math.sin(angleX);
    var zz = radius * Math.cos(angleY);
    vertices.push(new Vector3(xx, yy, zz));
  }
}
// Create the quads between the vertices
for (var x = 0; x < latitudeCount; x++) {
  for (var y = 0; y < longitudeCount; y++) {
    var l = x;                         // left
    var r = (x + 1) % latitudeCount;   // right
    var t = y;                         // top
    var b = (y + 1) % longitudeCount;  // bottom
    indices.push(
      l + b * latitudeCount,
      r + b * latitudeCount,
      l + t * latitudeCount
    );
  }
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
    if (proj1 > 0 && proj2 > 0 && proj3 > 0) {
      ctx.lineTo(v1.x / proj1, v1.y / proj1);
      ctx.lineTo(v2.x / proj2, v2.y / proj2);
      ctx.lineTo(v3.x / proj3, v3.y / proj3);
      ctx.closePath();
      //ctx.fill();
      ctx.stroke();
    }
  }
}

loop();