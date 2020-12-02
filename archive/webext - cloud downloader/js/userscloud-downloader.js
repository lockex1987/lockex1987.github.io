// Lấy tất cả các link ở mycomicposts.net như sau:
// var urls = ''; document.querySelectorAll('.post-content a').forEach(aTag => urls += aTag.href + '\n'); console.log(urls)

console.info('Usercloud downloader');

function checkDownload() {
	checkFormPage1();
	checkFormPage2();
	checkDownloadButton();
	// Để tạm dừng debug
	//alert(1);
}

function checkFormPage1() {
	// Nếu là trang chứa form 1 thì submit form
	var theForm = document.querySelector('#content form');
	if (theForm) {
		console.log('Trang chứa form 1');

		// Thêm param method_free: Free Download vào form
		var hiddenInput = document.createElement('input');
		hiddenInput.type = 'hidden';
		hiddenInput.name = 'method_free';
		hiddenInput.value = 'Free Download';
		theForm.appendChild(hiddenInput);
		
		theForm.submit();
	}
}

function checkFormPage2() {
	// Nếu là trang chứa form 2 thì submit form
	var frm = document.getElementsByName('F1');
	if (frm && frm.length > 0) {
		console.log('Trang chứa form 2');
		var theForm = frm[0];
		// Bỏ qua những event submit khác, submit bình thường
		theForm.onsubmit = null;
		theForm.submit();
	}
}

function checkDownloadButton() {
	// Nếu là trang chứa nút download thì download luôn
	var aTag = document.querySelector('a.btn-icon-stacked');
	if (aTag) {
		var link = aTag.href;
		if (link != 'https://userscloud.com/download_plan.html') {
			console.log(link);
			window.location = link;
		}
	}
}

checkDownload();