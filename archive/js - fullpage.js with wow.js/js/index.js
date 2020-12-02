/*
Animated text using 
Animate.css https://daneden.github.io/animate.css/
Wow.js  http://mynameismatthieu.com/WOW/

View in live mode if on an iPad
*/

var animateCss = [
  "bounce", "flash", "pulse", "rubberBand", "shake", "swing", "tada", "wobble", "jello",
  
  "bounceIn", "bounceInDown", "bounceInLeft", "bounceInRight", "bounceInUp",
  "fadeIn", "fadeInDown", "fadeInDownBig", "fadeInLeft", "fadeInLeftBig", "fadeInRight", "fadeInRightBig", "fadeInUp", "fadeInUpBig", "flip", "flipInX", "flipInY",
  "lightSpeedIn", "rotateIn", "rotateInDownLeft", "rotateInDownRight", "rotateInUpLeft", "rotateInUpRight",
  "slideInUp", "slideInDown", "slideInLeft", "slideInRight",
  "zoomIn", "zoomInDown", "zoomInLeft", "zoomInRight", "zoomInUp",
  "rollIn"
];

var placeholder = $("#fullpage");
var colorCounter = 0;

for (i = 0; i < animateCss.length; i++) {
  var word = "<div class='word section'></div>";
  $(word).appendTo(placeholder);
  
  for (j = 0; j < animateCss[i].length; j++) {
    var letterDiv = "<div data-wow-delay='" + (j * 0.1).toFixed(2) + "s' class='letter wow " + animateCss[i] + " color" + colorCounter % 7 + "'>" + animateCss[i][j] + "</div>";
    $(letterDiv).appendTo($(".word").last());
    colorCounter++;
  }
}

var sections = document.querySelectorAll(".section");

$('#fullpage').fullpage({
  // https://github.com/alvarotrigo/fullPage.js/issues/249
  //autoScrolling: false,
  navigation: true,
  navigationPosition: 'right',
  afterRender: function() {
    new WOW().init();
  },
  afterLoad: function(anchorLink, index) {
    //console.log(index);
    sections[index - 1].querySelectorAll(".wow").forEach(function(e) {
      //console.log(e.textContent);
      e.style.removeProperty('visibility');
      e.style.removeProperty('animation-name');
      e.classList.add("animated");
    });
    //console.log("Remove " + index);
    //$('.toanimate').addClass('animated fadeInLeftBig');
  }
});

/*
new WOW({
  //offset: 200
}).init();
*/