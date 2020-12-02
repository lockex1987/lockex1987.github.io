(function() {
	var type = document.getElementById("type");
	var input = document.getElementById("input");
	var instructions = document.getElementById("instructions");

	var options = [
			[
				'youtube',
				'Youtube Video',
				'Enter Youtube URLs (eg: <code>https://www.youtube.com/watch?v=IULwA0UNJP8</code>)<br />Each URL is on one line',
				'getlink'
			],
			[
				'detective-conan',
				'Detective Conan (kenhsinhvien)',
				'Each line has chapter number and URL (separated by a comma)<br />For example:<br /><code>966, http://kenhsinhvien.vn/topic/conan-chap-966-tieng-viet.500206/</code>',
				'download'
			],
			/*
			 * [ 'idol', 'Idol', '1. Idol\'s name<br />2. From album<br />3.
			 * To album', 'download' ],
			 */
			[
				'get-truyen-tranh-vang',
				'Get Truyen tranh vang',
				'1. URL<br />2. Number of pages',
				'getlink'
			],
			[
				'download-truyen-tranh-vang',
				'Download Truyen tranh vang',
				'Each line contains the order number and the URL (separated by a comma)',
				'download'
			],
			[
				'download-truyen-doc-info',
				'Download truyendoc.info',
				'Each line contains the order number and the URL (separated by a comma)',
				'download'
			],
			[
				'read-comic-online',
				'Read Comic Online',
				'Each line contains the order number and the URL (separated by a comma).<br />Otherwise, you must enter the cookie value.',
				'download'
			],
			[
				'download-batch-images',
				'Download Batch Images',
				'Each line contains the a URL of an image.',
				'download'
			],
			[
				'download-up-truyen',
				'Download Uptruyen',
				'Each line contains the order number and the URL (separated by a comma)',
				'download'
			]
		];

	function changeType() {
		var idx = type.selectedIndex;
		var opt = options[idx];
		var instructionText = opt[2];
		var action = opt[3];

		instructions.innerHTML = instructionText;
		if (action === 'getlink') {
			$('#btnGetLink').show();
			$('#btnDownload').hide();
		} else {
			$('#btnGetLink').hide();
			$('#btnDownload').show();
		}
	}

	/**
	 * Hiển thị loading, khóa màn hình.
	 */
	function tctInitProgress() {
		$("#processingContainer").show();
	}

	/**
	 * Ẩn hiển thị loading, mở màn hình.
	 */
	function tctResetProgress() {
		$("#processingContainer").hide();
	}

//	for (var i = 0; i < options.length; i++) {
//		type.options[i] = new Option(options[i][1], options[i][0]);
//	}
//	type.selectedIndex = 0;
	changeType();
	type.onchange = changeType;

	$('#btnGetLink').on('click', function() {
		tctInitProgress();

		$.ajax({
			type : 'POST',
			url : 'public/download/getlink',
			data : $('#frm').serialize(),
			cache : false,
			success : function(html) {
				tctResetProgress();
				$('#result').html(html);
			}
		});
	});

	$('#btnDownload').on('click', function() {
		tctInitProgress();

		$.ajax({
			type : 'POST',
			url : 'public/download/download',
			data : $('#frm').serialize(),
			cache : false,
			success : function(html) {
				tctResetProgress();
				$('#result').html(html);
			}
		});
	});
})();
