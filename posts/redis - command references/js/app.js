// Based on https://redis.io/commands
$(function() {
	var filter = $('.command-reference-filter');
	var commands = $("#commands ul li");

	filter.change(function() {
		filterCommandReference();
	});

	function filterCommandReference() {
		var group = filter.val();
		if (group.length == 0) {
			commands.show();
		} else {
			commands.filter("[data-group='" + group + "']").show();
			commands.filter("[data-group!='" + group + "']").hide();
		}
	}
	
	filterCommandReference();

	$("#commands ul li a").attr({
		"href": function(i, origValue) {
			return 'https://redis.io' + origValue;
		},
		"target": "_blank"
	});

	$('.js-command-reference-search').on('input', function() {
		var val = $(this).val().toLowerCase().replace(/[^a-z0-9 ]/g, '');
		if (val === '') {
			commands.show();
		} else {
			commands.hide();
			commands.filter('[data-name*="' + val + '"]').show();
		}
	});
});
