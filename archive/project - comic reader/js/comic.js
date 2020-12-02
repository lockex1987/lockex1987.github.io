// Danh sách truyện
var comicList = [
	{ "title": "Trạng Quỷnh", "id": "trang-quynh" },
	{ "title": "Tantei Gakuen Q", "id": "tantei-gakuen-q" }
];

// Đối tượng truyện hiện tại
var currentComic;

// Danh sách các chương
var chapterList;

// Index của chương hiện tại
var curChapIdx = -1;

// Danh sách ảnh của chương hiện tại
var links;

/**
 * Hàm khởi tạo.
 */
function init() {
	// Hiển thị danh sách truyện
	var ul = "";
	for (var i = 0; i < comicList.length; i++) {
		ul += "<li><a href='' onclick='gotoComic(" + i + "); return false;'>" + comicList[i].title + "</a></li>";
	}
	$("#comicList").html(ul);
}

/**
 * Chuyển đến chương đang đọc.
 */
function gotoCurrentSavedChapter() {
	viewChapter(curChapIdx);
}

/**
 * Chuyển đến chương tiếp.
 */
function gotoNextSavedChapter() {
	viewChapter(curChapIdx + 1);
}

/**
 * Chuyển đến chương trước.
 */
function gotoPreviousSavedChapter() {
	viewChapter(curChapIdx - 1);
}

/**
 * Hiển thị các thông tin đã lưu ở localStorage.
 */
function bindSavedInfo() {
	var chapter = localStorage.getItem(currentComic.id + "-chapter");
	if (chapter != undefined && chapter != null && chapter != "-1") {
		// Hiển thị
		$("#savedInfo").show();

		// Trong trường hợp lưu ở localStorage thì là kiểu String
		// Cần chuyển về kiểu số để tính toán cho đúng
		curChapIdx = parseInt(chapter);

		// Chương hiện tại
		$("#savedInfo p:nth-child(1) a").text(chapterList[curChapIdx].title);

		// Chương tiếp theo
		if (curChapIdx == chapterList.length - 1) {
			$("#savedInfo p:nth-child(2)").hide();
		} else {
			$("#savedInfo p:nth-child(2)").show()
					.find("a").text(chapterList[curChapIdx + 1].title);
		}

		// Chương trước
		if (curChapIdx == 0) {
			$("#savedInfo p:nth-child(3)").hide();
		} else {
			$("#savedInfo p:nth-child(3)").show()
					.find("a").text(chapterList[curChapIdx - 1].title);
		}
	} else {
		// Ẩn
		$("#savedInfo").hide();
	}
}

/**
 * Hiển thị chương nào đó.
 * @param idx Chỉ số index của chương
 */
function viewChapter(idx) {
	// Ẩn hiện
	$("#comicInfo").hide();
	$("#chapterViewer").show();

	// Lưu lịch sử đọc
	localStorage.setItem(currentComic.id + "-chapter", idx);
	bindSavedInfo();
	
	// Xóa những ảnh đã hiển thị cũ
	$("#viewer").empty();

	// Nếu là chuyển sang chương khác thì mới load lại
	curChapIdx = idx;
	$("#chapterViewer h3").html("&larr; " + chapterList[curChapIdx].title);
	getImages();
}

/**
 * Lấy danh sách ảnh của chương hiện tại.
 */
function getImages() {
	$.getJSON("data/" + currentComic.id + "/" + chapterList[curChapIdx].jsonFile, function(data) {
		// Cập nhật danh sách ảnh
		links = data;		

		// Load các ảnh mới
		loadImage(0, curChapIdx);
	});
}

/**
 * Load ảnh của chapter.
 * @param index Index của ảnh
 * @param chap Index của chương (có thể có trường hợp chưa load xong chương này người dùng đã chuyển sang chương khác)
 */
function loadImage(index, chap) {
	if (index < links.length && chap == curChapIdx) {
		// Tạo đối tượng ảnh
		// Sau khi load xong thì load ảnh tiếp theo
		var img = new Image();
		var nextIndex = index + 1;
		img.onload = function() {
			loadImage(nextIndex, chap);
		};
		img.src = links[index];

		// Thêm vào vùng hiển thị
		$("#viewer").append($("<div></div>").append(img));
	}
}

/**
 * Quay về trang danh sách chương.
 */
function backToInfo() {
	$("#comicInfo").show();
	$("#chapterViewer").hide();
}

/**
 * Quay về trang danh sách truyện
 */
function backToComicList() {
	$("#homePage").show();
	$("#comicInfo").hide();
}

/**
 * Chuyển đến truyện nào đó
 * @param idx Index của truyện
 */
function gotoComic(idx) {
	// Ẩn hiện thẻ div
	$("#homePage").hide();
	$("#comicInfo").show();

	// Cập nhật biến toàn cục truyện hiện tại
	currentComic = comicList[idx];

	// Cập nhật lại tên
	$("#comicInfo h3").html('&larr; ' + currentComic.title);

	// Lấy danh sách chương của truyện
	$.getJSON("data/" + currentComic.id + "/chapters.json", function(data) {
		// Cập nhật biến toàn cục
		chapterList = data;

		// Bind ra để người dùng chọn
		var ul = "";
		for (var i = 0; i < chapterList.length; i++) {
			ul += "<li><a href='' onclick='viewChapter(" + i + "); return false;'>" + chapterList[i].title + "</a></li>";
		}
		$("#chapterList").html(ul);

		// Hiển thị chương đang đọc, chương trước, chương tiếp
		bindSavedInfo();
	});
}

init();

