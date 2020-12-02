(function() {

  "use strict";

  var wrap = document.getElementById("wrap");
  var p = document.getElementById("p");
  var pX = document.getElementById("pX");
  var pY = document.getElementById("pY");
  var pVal;
  var xVal;
  var yVal;

  p.addEventListener( "input", function() {
    pVal = p.value + "px";
    wrap.style.perspective = pVal;
  });

  pX.addEventListener( "input", function() {
    xVal = pX.value + "px";
    yVal = pY.value + "px";
    wrap.style.perspectiveOrigin = xVal + " " + yVal;
  });

  pY.addEventListener( "input", function() {
    xVal = pX.value + "px";
    yVal = pY.value + "px";
    wrap.style.perspectiveOrigin = xVal + " " + yVal;
  });

})();