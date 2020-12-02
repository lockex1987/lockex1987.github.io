// Khi click nút Edit thì ẩn nút này
// và hiện nút Save
// Chuyển trạng thái thành có thể edit
$('.edit').click(function() {
  $(this).hide();
  $('.box').addClass('editable');
  $('.text').attr('contenteditable', 'true');  
  $('.save').show();

  // Focus để sửa được luôn
  $('.text').focus();
});

// Khi click nút Save thì ẩn nút này
// và hiện nút Edit
// Chuyển trạng thái thành không thể edit
$('.save').click(function(){
  $(this).hide();
  $('.box').removeClass('editable');
  $('.text').removeAttr('contenteditable');
  $('.edit').show();
});