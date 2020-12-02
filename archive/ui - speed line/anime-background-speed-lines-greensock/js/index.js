var AnimeLines = function() {
  var 
    lineField,
    height,
    width,
    mainTimeline,
    textSplit,
    button;
  
  var _init = function() {
    lineField     = document.getElementById('lineField');
    height        = window.innerHeight;
    width         = window.innerWidth;
    mainTimeline  = new TimelineMax();
    text          = document.getElementById('text'); 
    button        = document.getElementById('reset');
    
    _addEventHandlers();
    _setMainTimeline();
  }
  
  var _addEventHandlers = function() {
    button.addEventListener('click', _play, false);
    window.addEventListener('resize', _resize, false);
  }
  
  var _play = function() {
    mainTimeline.restart();    
  }
  
  var _resize = function() {
    width = window.innerWidth;
    height = window.innerHeight;
  }
  
  var _createLinesTl = function() {
    var tl = new TimelineMax();
    for(var i = 0; i < 500; i++ ) {
      var line = document.createElement('div');
      var lineNumber = Math.floor((Math.random() * 5) + 1);
      line.className = 'line line--'+lineNumber;
      lineField.appendChild(line);
      TweenLite.set(line, {y:Math.random()*height, x: width});
      tl.to(line, Math.random() * 1, {x:-width* Math.floor((Math.random() * 4) + 1), opacity:0, ease:Power1.easeIn}, Math.random()*5);      
    }    
    return tl;
  }
  
  var _createText = function() {
    var tl = new TimelineLite({delay:2});
    var textSplit = new SplitText(text);
    tl
      .set(text, {opacity: 1, transformPerspective: 200, rotationY: -10})
      .staggerFromTo(
        textSplit.chars, 
        0.9, {
          opacity:0, 
          scale:2, 
          x:300, 
          y:-150, 
          transformPerspective: 200,
          ease:Back.easeOut
        },{
          opacity:1, 
          scale:1,
          x:0,
          y:0,
          ease:Back.easeOut
        }, 
        0.05
      )
      .to(text, 0.3, {x:width, rotateX: 100, ease:Power2.easeIn })
      .staggerTo(textSplit.chars, 0.5, {x:-width, scale:0, rotationY:-20, y:-500}, 0.03)
    
    return tl;
  }
  
  var _setMainTimeline = function() {    
    mainTimeline
      .from(lineField, 0.2, {autoAlpha:0})
      .add(_createLinesTl(), 'field1')
      .add(_createText(), 'field1')   
      .to(lineField, 0.5, {autoAlpha:0}, '-=0.3')
      .to(button, 0.5, {autoAlpha:1}, '-=0.3')
  }
  
  return {
    init: _init
  }
  
}();

AnimeLines.init();