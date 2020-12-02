var autoAdjustHeight = true;

// update on click
$('nav a').on('mousedown', function(e){
  e.preventDefault();
  var goTo = $(this).parent().index();  
  swipegoryUpdate(goTo);
});

// update on touch
$("ul.panes").swipe({
  swipeStatus:function(event, phase, direction, distance, duration, fingerCount) {    
    var translateString = 'translate3d(0px, 0px, 0px)';
    var transitionDuration = $('nav li.cur').css('transitionDuration');
    var speed = transitionDuration;    
    
    if(phase == 'move') {
      speed = '0ms';      
      if(direction == 'left') {
        translateString = 'translate3d(-' + distance + 'px, 0px, 0px)';
        $('.panes li.cur').css('marginLeft', '-'+ distance +'px');
      }
      else if(direction == 'right') {
        translateString = 'translate3d(' + distance + 'px, 0px, 0px)';
        $('.panes li.cur').css('marginLeft', distance +'px');
      }
      $('nav li.cur').css({ 
        transitionDuration: speed,
        transform: translateString
      });
      
    }
    else if (phase == 'end') {
      // reset transform3D    
      var marginLeft = $('nav li.cur').css('marginLeft');
      $('nav li.cur').attr('style', '').css('marginLeft', marginLeft);
      $('.panes li.cur').attr('style', '');
    }
  },
  swipeLeft:function(event, direction, distance, duration, fingerCount) {
    //This only fires when the user swipes left
    var goTo = $('nav li.cur').index();
    goTo++;
    swipegoryUpdate(goTo); 
  },
  swipeRight:function(event, direction, distance, duration, fingerCount) {
    //This only fires when the user swipes left
    var goTo = $('nav li.cur').index();
    goTo--;
    swipegoryUpdate(goTo); 
  },
  threshold: 50,
  triggerOnTouchEnd: false,
  allowPageScroll: "vertical",
  excludedElements: "button, input, select, textarea, .noSwipe"
});

// update on load
$(window).load(function() {
  swipegoryUpdate(0);  
});

function swipegoryUpdate(goTo) {
  var listItems = $('nav li');
  var panes = $('.panes');
  var prev = goTo - 1;
  var next = goTo + 1;  
  if(goTo >= 0 && goTo < listItems.length) {   
    listItems.removeClass('prev').removeClass('cur').removeClass('next').removeClass('before').removeClass('after');
    $('li', panes).removeClass('prev').removeClass('cur').removeClass('next').removeClass('before').removeClass('after');

    listItems.each(function(i) {
      var li = $(this);
      var pane = $('li:eq('+i+')', panes);
      
      li.attr('style', '');

      if(i == prev) {
        li.addClass('prev');
        li.css('margin-left', '0');      
        pane.addClass('prev');
      }
      else if(i == next) {
        li.addClass('next');
        li.css('margin-left', '-' + li.outerWidth() + 'px');
        pane.addClass('next');
      }
      else if(i < goTo) {
        li.addClass('before');
        li.css('margin-left', '-' + li.outerWidth() + 'px');
        pane.addClass('before');
      }
      else if(i == goTo) {
        li.addClass('cur');
        var marginLeft = li.outerWidth() / 2;
        
        li.css('margin-left', '-' + marginLeft + 'px');
        pane.addClass('cur');

        if(autoAdjustHeight == true) {
          $('.swipegory').css('height', pane.outerHeight() + li.outerHeight());
        }

      }
      else if(i > goTo) {
        li.addClass('after');
        li.css('margin-left', '0');
        pane.addClass('after');
      }
    });    
  }
}