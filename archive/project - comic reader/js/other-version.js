// Thẻ select chương hiện tại
var currentChapter = $("#currentChapter");

// Đang load đến trang thứ mấy
var loadProgress = document.getElementById("loadProgress");

// Đang đọc đến trang thứ mấy
var readProgress = document.getElementById("readProgress");

// Danh sách ảnh của chương hiện tại
var links;

// Chỉ số của ảnh hiện tại
var current = 0;

// Danh sách các ảnh
var images;

// Danh sách các chapter
var chapterList;

// Index của chapter hiện tại
var curIdx = -1;

// Đối tượng carousel
var owl = $(".owl-carousel").owlCarousel({ items: 1, autoHeight:true });

/**
 * Hàm khởi tạo.
 */
function init() {
	// Lấy danh sách chapter và bind ra để người dùng chọn
	$.getJSON("data/trang-quynh/chapters.json", function(data) {
		// Cập nhật biến toàn cục
		chapterList = data;

		// Bind thẻ ul và select
		var select = "";
		var ul = "";
		for (var i = 0; i < chapterList.length; i++) {
			var title = chapterList[i].title;
			ul += "<li><a href='' onclick='viewChapter(" + i + "); return false;'>" + title + "</a></li>";
			select += "<option value='" + i + "'>" + title + "</option>";
		}

		$("#list").html(ul);
		currentChapter.html(select);
	});

	// Cập nhật tiến độ đọc
	owl.on('changed.owl.carousel', function(event) {
		current = event.item.index;
		readProgress.value = current + 1;
	});
}

/**
 * Hiển thị chapter nào đó
 * @param idx Chỉ số index của chapter
 */
function viewChapter(idx) {
	// Ẩn hiện
	$("#comicInfo").hide();
	$("#chapterViewer").show();

	// Nếu là chuyển sang chương khác thì mới load lại
	if (curIdx != idx) {
		curIdx = idx;
		getImages();
	}
}

/**
 * Lấy danh sách ảnh của chương hiện tại.
 */
function getImages() {
	// Cập nhật lại thẻ select
	currentChapter.val(curIdx);

	// Load ảnh của chapter
	$.getJSON("data/trang-quynh/" + chapterList[curIdx].jsonFile, function(data) {
		// Xóa các ảnh cũ
		if (images) {
			for (var i = 0; i < images.length; i++) {
				owl.trigger('remove.owl.carousel', i).trigger('refresh.owl.carousel');
			}
		}
	
		links = data;
		current = 0;
		images = [];
	
		// Cập nhật lại trạng thái đọc và load
		loadProgress.style.display = "";
		loadProgress.max = links.length;
		readProgress.max = links.length;
		readProgress.value = 1;
	
		loadImage(0, curIdx);
	});
}

/**
 * Load lần lượt các ảnh của chương.
 * @param index Index ảnh
 * @param chap Index của chương
 */
function loadImage(index, chap) {
	if (index < links.length) {
		if (chap == curIdx) {
			var img = new Image();
			var nextIndex = index + 1;
			img.onload = function() {
				loadProgress.value = nextIndex;
				loadImage(nextIndex, chap);
			};
			img.src = links[index];

			// Thêm vào danh sách ảnh
			images.push(img);

			// Thêm vào vùng hiển thị			
			owl.trigger('add.owl.carousel', img).trigger('refresh.owl.carousel');
		}
	} else {
		// Đã load xong
		loadProgress.style.display = "none";
	}
}

/**
 * Chuyển ảnh trước hoặc ảnh sau.
 * @param offset -1 là ảnh trước, 1 là ảnh sau
 */
function changeImage(offset) {
	if (offset == 1) {
		owl.trigger('next.owl.carousel');
		return;
	}

	if (offset == -1) {
		owl.trigger('prev.owl.carousel');
		return;
	}
	
	if (current + offset == -1) {
		noti.info("This is the first page");
	} else if (current + offset == images.length) {
		noti.info("This is the last page");
	} else {
		// Ẩn ảnh cũ
		images[current].style.display = "none";

		// Cập nhật lại chỉ số
		current += offset;

		// Hiển thị ảnh mới
		images[current].style.display = "";

		// Cập nhật lại progress đọc
		readProgress.value = current + 1;
	}
}

/**
 * Quay về trang danh sách.
 */
function backToInfo() {
	$("#comicInfo").show();
	$("#chapterViewer").hide();
}

/**
 * Chuyển đến chapter trước.
 */
function previousChapter() {
	if (curIdx == 0) {
		noti.info("This is the first chapter");
	} else {
		gotoChapter(curIdx - 1);
	}
}

/**
 * Chuyển đến trang sau.
 */
function nextChapter() {
	if (curIdx == chapterList.length - 1) {
		noti.info("This is the last chapter");
	} else {
		gotoChapter(curIdx + 1);
	}
}

/**
 * Chuyển đến một trang nào đó
 */
function changeChapter() {
	gotoChapter(currentChapter.val());
}

/**
 * Chuyển đến một chapter nào đó.
 * @param idx Chỉ số
 */
function gotoChapter(idx) {
	curIdx = idx;
	getImages();
}

init();
