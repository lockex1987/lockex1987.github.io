/*
  See "Stuff for <head>" for the Material Design Lite and Hammer inclusion.
*/

var swipeActions = ["swipeLeft", "swipeRight"];

function findRealTarget(target) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = swipeActions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var rule = _step.value;

      if (target.classList.contains(rule)) {
        return target;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (target.parentElement) {
    return findRealTarget(target.parentElement);
  }
  return target;
}

function remove(target, direction) {
  var offset = 0;

  if (direction === Hammer.DIRECTION_LEFT) {
    offset = 0 - document.body.offsetWidth - target.offsetWidth;
  } else {
    offset = document.body.offsetWidth + target.offsetWidth;
  }

  target.classList.add("removing");
  target.style.transform = "translateX(" + offset + "px)";
}

function onSwipe(ev) {
  var target = findRealTarget(ev.target);
  var isRemoving = target.classList.contains("removing");

  var types = {};
  var offset = 0;
  var opacity = 1;

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = swipeActions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var action = _step2.value;

      types[action] = target.classList.contains(action);
    }

    // disable browser scrolling
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  ev.preventDefault();

  if (!isRemoving) {
    switch (ev.type) {
      case 'panright':
      case 'panleft':
        offset = ev.distance;
        target.classList.remove("returning");

        if (types.swipeLeft && ev.offsetDirection === Hammer.DIRECTION_LEFT) {
          opacity = 1 - offset / target.offsetWidth + .25;
          offset = 0 - offset;
          target.style.transform = "translateX(" + offset + "px)";
          target.style.opacity = opacity;
        } else if (types.swipeRight && ev.offsetDirection === Hammer.DIRECTION_RIGHT) {
          opacity = 1 - offset / target.offsetWidth + .25;
          target.style.transform = "translateX(" + offset + "px)";
          target.style.opacity = opacity;
        } else {
          target.style.transform = "translateX(0px)";
          target.style.opacity = 1;
        }
        break;

      case 'swipeleft':
        if (types.swipeLeft) {
          remove(target, ev.offsetDirection);
        }
        break;
      case 'swiperight':
        if (types.swipeRight) {
          remove(target, ev.offsetDirection);
        }
        break;

      case 'pancancel':
      case 'panend':
        if (ev.distance > target.offsetWidth * .75) {
          remove(target, ev.offsetDirection);
        } else {
          target.classList.add("returning");
          target.style.transform = "translateX(0px)";
          target.style.opacity = 1;
        }
        break;
    }
  }
}

var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
  for (var _iterator3 = swipeActions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
    var action = _step3.value;

    document.querySelectorAll("." + action).forEach(function (element) {
      var swipeHandler = new Hammer(element, {});
      swipeHandler.on('panend pancancel panleft panright swipeleft swiperight', onSwipe);
    });
  }
} catch (err) {
  _didIteratorError3 = true;
  _iteratorError3 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion3 && _iterator3.return) {
      _iterator3.return();
    }
  } finally {
    if (_didIteratorError3) {
      throw _iteratorError3;
    }
  }
}