//TweenLite.to('.one', 2, {width:100});


$(document).ready(function() {
    $('body').mousemove(function(event) {
        cx = Math.ceil($('body').width() / 2.0);
        cy = Math.ceil($('body').height() / 2.0);
        dx = event.pageX - cx;
        dy = event.pageY - cy;

        tiltx = (dy / cy);
        tilty = - (dx / cx);
        radius = Math.sqrt(Math.pow(tiltx,2) + Math.pow(tilty,2));
        degree = (radius * 20);
        TweenLite.set(".stage", {transform:'rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)'});
//        $('#picture').css('-webkit-transform','rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)');
    });
  
    $('.crate').on('click', function(){
      $('.stage').toggleClass('zoom');
      var door = $('.one');
      door.toggleClass('open');
      if (door.hasClass('open')) {
        $('#open')[0].play();
      } else {
        $('#close')[0].play();      
      }
      
    })
});