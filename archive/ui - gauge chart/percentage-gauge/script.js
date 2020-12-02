$(function(){
  $('.text-box').keyup(function(){
    if ($('.text-box').val() == '') {
      $('.circle-inner, .gauge-copy').css({
        'transform' : 'rotate(-45deg)' 
      });
      $('.gauge-copy').css({
        'transform' : 'translate(-50%, -50%) rotate(0deg)'
      });
      $('.percentage').text('0 %');
    } else if($('.text-box').val() >= 0 && $('.text-box').val() <= 100) {
      var dVal = $(this).val();
      var newVal = dVal * 1.8 - 45;
      $('.circle-inner, .gauge-copy').css({
        'transform' : 'rotate(' + newVal + 'deg)' 
      });
      $('.gauge-copy').css({
        'transform' : 'translate(-50%, -50%) rotate(' + dVal * 1.8 + 'deg)'
      });
      $('.percentage').text(dVal + ' %');
    } else {
      $('.percentage').text('Invalid input value');
    }
  });
});