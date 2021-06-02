function textWithSmilies(text) { // Function that change the textarea content in a string including smilies icons
	// Create 2 array: 1 containing the smiley BBCode, the second containing a part of their file name
	var findSmiliesShortcuts = [/:smile:/g, /:sad:/g, /:arrow:/g, /:cool:/g, /:cry:/g, /:grin:/g, /:confused:/g, /:bigeyes:/g, /:evil:/g, /:exclaim:/g, /:geek:/g, /:idea:/g, /:lol:/g, /:mad:/g, /:green:/g, /:neutral:/g, /:question:/g, /:happy:/g, /:redface:/g, /:rolleyes:/g, /:surprised:/g, /:devil:/g, /:wink:/g];
	var replaceSmiliesImg = ['smile', 'sad', 'arrow', 'cool', 'cry', 'grin', 'confused', 'bigeyes', 'evil', 'exclaim', 'geek', 'idea', 'lol', 'mad', 'green', 'neutral', 'question', 'happy', 'redface', 'rolleyes', 'surprised', 'devil', 'wink'];
	
	for (i = 0; i < findSmiliesShortcuts.length; i++) {
		text = text.replace(findSmiliesShortcuts[i], '<img src="images/smilies/icon_' + replaceSmiliesImg[i] + '.gif" alt="" />'); // Replace all smilies BBCode by their image
	}
	text = text.replace(/\n/g, '<br />'); // Replace new lines by <br />
	return text;
}

$(function() {
	// This function allow to insert text or smiley in the textarea where the cursor is
	jQuery.fn.extend({
	insertAtCaret: function(myValue) {
	  return this.each(function(i) {
		if (document.selection) {
		  //For browsers like Internet Explorer
		  this.focus();
		  sel = document.selection.createRange();
		  sel.text = myValue;
		  this.focus();
		}
		else if (this.selectionStart || this.selectionStart == '0') {
		  //For browsers like Firefox and Webkit based
		  var startPos = this.selectionStart;
		  var endPos = this.selectionEnd;
		  var scrollTop = this.scrollTop;
		  this.value = this.value.substring(0, startPos)+myValue+this.value.substring(endPos,this.value.length);
		  this.focus();
		  this.selectionStart = startPos + myValue.length;
		  this.selectionEnd = startPos + myValue.length;
		  this.scrollTop = scrollTop;
		} else {
		  this.value += myValue;
		  this.focus();
		}
	  })
	}
	});

	$('#myTextarea').val(''); // We first empty the textarea
	
	$('#myForm #clear').click(function() { // Clear everything when click on the "Clear" button
		$('#myTextarea').val('');
		$('#output').text('');
		$('#submitOutput').text('');
	});
	
	$('#myForm #submit').click(function() { // When click on "Submit" button
		$('#submitOutput').html('<div class="well well-sm">' + textWithSmilies($('#myTextarea').val()) + '</div>'); // Add the textarea content in the <div="submitOutput"> markup
	});

	$('img#addSmiley').on('click', function() { // When click on a smiley
		smiley = $(this).attr('alt'); // We take it's attribute alt which contains the unique smiley BBCode choosen
		$('#myTextarea').insertAtCaret(smiley); // Call the function "insertAtCaret" and insert the smiley BBCode in the textarea where the cursor is
		
		var text = textWithSmilies($('#myTextarea').val()); // Call function "textWithSmilies" and change smilies BBCode by their icon
		$('#output').html(text); // Display in div=output markup
				
		return false;
	});
	
	$('#myTextarea').keyup(function(){ // When keyup in the textarea (when you pull up the key)
		var text = textWithSmilies($(this).val()); // Call function "textWithSmilies" and change smilies BBCode by their icon
		$('#output').html(text); // Display in div=output markup
	});
});
