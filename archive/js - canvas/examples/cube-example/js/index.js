var c = document.getElementById("canvas");
var size = 500;
c.width = size;
c.height = size;
var ctx = c.getContext("2d");

ctx.translate(size / 2, 50);

var deg = Math.PI / 180;
var dAngle = new Vector3(0.2 * deg, 0.5 * deg, 0);

var width = 100;
var height = 100;
var depth = 100;

var vertices = [
  // First layer
  new Vector3(0, 0, 0),              // A
  new Vector3(width, 0, 0),          // B
  new Vector3(width, 0, depth),      // C
  new Vector3(0, 0, depth),          // D
  
  // Second layer
  new Vector3(0, height, 0),         // E
  new Vector3(width, height, 0),     // F
  new Vector3(width, height, depth), // G
  new Vector3(0, height, depth)      // H
];

var indices = [
    0, 3, 1, 1, 3, 2,
    7, 4, 6, 6, 4, 5,
    4, 0, 5, 5, 0, 1, 
    5, 1, 6, 6, 1, 2, 
    6, 2, 7, 7, 2, 3, 
    7, 3, 4, 4, 3, 0
];

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
    ctx.stroke();
  }
}

loop();