function getUrls() {
	// Nhập mảng URL vào textarea
	let urls = [];
	let arr = document.querySelector('#linksInput').value.split('\n');
	arr.forEach(s => {
		s = s.trim();
		if (s) {
			urls.push(s);
		}
	});
	return urls;
}

// Click nút 'Start download'
document.querySelector('#startButton').addEventListener('click', () => {
	let urls = getUrls();

	// Thông báo cho background danh sách URL
	chrome.runtime.sendMessage({
		message: 'addAndStart',
		urls: urls
	});
});

// Click nút 'Thêm vào danh sách'
document.querySelector('#addButton').addEventListener('click', () => {
	let urls = getUrls();

	// Thông báo cho background danh sách URL
	chrome.runtime.sendMessage({
		message: 'addToQueue',
		urls: urls
	});
});


// Click nút 'Clear'
document.querySelector('#clearDownload').addEventListener('click', () => {
	// Thông báo clear cho background
	chrome.runtime.sendMessage({
		message: 'clearDownloads'
	});
});

// Lấy thông tin thống kê từ background
chrome.runtime.sendMessage({
	message: 'getStats'
});

// Lắng nghe thông báo từ background
// Hiển thị danh sách các URL đang download
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  	if (request.message == 'stats') {
		//console.log(request.queue);
		let text = '';
		request.queue.forEach(s => text += s + '\n');
		document.querySelector('#linksInput').value = text;
  	}
});
