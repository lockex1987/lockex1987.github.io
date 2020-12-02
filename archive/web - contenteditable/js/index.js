$('.edit').click(function(){
  $(this).hide();
  $('.box').addClass('editable');
  $('.text').attr('contenteditable', 'true');  
  $('.save').show();
});

$('.save').click(function(){
  $(this).hide();
  $('.box').removeClass('editable');
  $('.text').removeAttr('contenteditable');
  $('.edit').show();
});