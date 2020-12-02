/**
* requestAnimationFrame polyfill
*/

(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame =
      window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }
  
  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                                 timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  
  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
}());



/**
* Carousel class
*/

function Carousel(el, opts) {
  
  var self = this;
  var $el = $(el);
  
  var $container = $("> ul", $el);
  var $panes = $("> ul > li", $el);
  
  // state
  
  var paneWidth = 0;
  var paneCount = $panes.length;
  var paneActiveIdx = 1;
  var paneActiveOffset = 0;
  
  // Add/remove event listeners, play nicely with others
  
  var startResizing = function () {
    setPaneDimensions();
    self.showPane(paneActiveIdx);
  };
  
  self.init = function() {
    $(window).on("load resize orientationchange", startResizing);
  };
  
  self.destroy = function() {
    $(window).off("load resize orientationchange", startResizing);
  };
  
  
  // set active pane
  self.showPane = function (idx, animated) {
    paneActiveIdx = Math.max(0, Math.min(idx, paneCount-1));
    
    var $wrapper = $("body");
    
    // todo: make safer
    var newCls = "show-" + paneActiveIdx;
    $wrapper.removeClass(function (idx, cls) {
      return (cls.match(/(^|\s)show-\S+/g) || []).join(' ');
    });
    $wrapper.addClass(newCls);
    
    paneActiveOffset = -(100 / paneCount) * paneActiveIdx;
    setContainerOffset(paneActiveOffset, animated);
  };
  
  self.throttledShowPane = _.debounce(function (idx, animated) {
    self.showPane(idx, animated);
  }, 100);
  
  // show next pane
  self.next = function () {
    self.throttledShowPane(paneActiveIdx + 1, true);
  };
  
  // show prev pane
  self.prev = function () {
    self.throttledShowPane(paneActiveIdx - 1, true);
  };  
  
  
  // set pane and container sizes
  function setPaneDimensions() {
    paneWidth = $el.width();
    
    _.map($panes, function (pane) {
      $(pane).width(paneWidth);
    });
    
    $container.width(paneWidth*paneCount);
  }
  
  // adjust container to active pane
  function setContainerOffset(percent, animated) {
    $container.removeClass("animate");
    
    if(animated) {
      $container.addClass("animate");
    }
    
    // todo: do better cross-browser support
    if (Modernizr.csstransforms3d) {
      $container.css("transform", "translate3d("+percent+"%,0,0) scale3d(1,1,1)");
    } else if (Modernizr.csstransforms) {
      $container.css("transform", "translate("+percent+"%,0)");
    } else {
      var px = ((paneWidth * paneCount) / 100) * percent;
      $container.css("left", px+"px");
    }
  }
  
  // dragging X direction
  function updateContainerOffsetX(deltaX, direction) {
    var dragOffset = ((100/paneWidth) * deltaX) / paneCount;
    
    var slowRight = paneActiveIdx == 0  && direction == Hammer.DIRECTION_RIGHT;
    var slowLeft = paneActiveIdx == paneCount-1 && direction == Hammer.DIRECTION_LEFT;
    if (slowLeft || slowRight) {
        dragOffset *= .4;
    }

    setContainerOffset(dragOffset + paneActiveOffset);
  }
  
  // set nearest pane on touch release
  function onPressRelease(deltaX, direction) {
    if(Math.abs(deltaX) > paneWidth / 2) {
      if(deltaX > 0) {
        self.prev();
      } else {
        self.next();
      }
    } else {
      self.throttledShowPane(paneActiveIdx, true);
    }
  }
  
  // hammer events
  function hammerTime(ev) {
    switch(ev.type) {
      case 'panmove': 
        updateContainerOffsetX(ev.deltaX, ev.direction);
        break;
      case 'swipeleft':
        self.next();
        break;
      case 'swiperight':
        self.prev();
        break;
    }
  }
  
  // initialize hammer
  
  var mc = new Hammer.Manager(el, {
    dragLockToAxis: true,
    dragBlockHorizontal: true
  });
  
  mc.add(new Hammer.Pan({ threshold: 10, pointers: 0 }));
  mc.add(new Hammer.Swipe().recognizeWith(mc.get('pan')));
  mc.on("swipeleft swiperight panstart panmove", hammerTime);
  mc.on("hammer.input", function (ev) {
    if (ev.isFinal) {
      onPressRelease(ev.deltaX, ev.direction);
    }
  });
  
}



/**
* Demo
*/

var container = document.getElementById("carousel");
var c = new Carousel(container);
c.init();

// Nav clicks
$('[data-nav=""]').on("click", function () { 
  var $self = $(this);
  c.throttledShowPane($self.data("show"), true);
});