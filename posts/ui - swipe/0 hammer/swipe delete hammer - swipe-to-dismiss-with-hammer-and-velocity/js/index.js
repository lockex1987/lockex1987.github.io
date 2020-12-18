// Constants
var THRESH = 0.75;
var TIMING = 250;

// When the dom is loaded, set up hammer events.
document.addEventListener('DOMContentLoaded', function (f) {
  var lis = document.querySelectorAll('ul.swipe-list li');
  for (var i = 0; i < lis.length; i++) {
    var hammertime = new Hammer(lis[i]);
    hammertime.on('panleft panright', function (e) {
      return handlePan(e);
    });
    hammertime.on('panend', function (e) {
      return reset(e);
    });
  }
});

// pane{left,right} handler
function handlePan(e, model) {
  var el = e.target,
      dx = e.deltaX;

  if (doAction(dx, el)) {
    el.classList.add('action');
  } else {
    el.classList.remove('action');
  }
  Velocity(el, {
    translateX: dx
  }, 0);
}

// panend handler
function reset(e) {
  var el = e.target,
      dx = e.deltaX;
  // Should we remove the element?

  if (doAction(dx, el)) {
    Velocity(el, {
      translateX: dx * 2
    }, TIMING).then(function () {
      return Velocity(el, {
        height: 0
      }, TIMING);
    }).then(function () {
      el.parentNode.removeChild(el);
    });
  } else {
    Velocity(el, {
      translateX: 0
    }, TIMING);
  }
}

// Determines if an element will be dismissed
function doAction(dx, el) {
  return Math.abs(dx) >= THRESH * el.clientWidth;
}