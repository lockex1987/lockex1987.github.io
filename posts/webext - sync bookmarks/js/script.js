var mlab = new Mlab('lockex1987', 'bookmarks', 'lNqkzI-WP6v_uw-xx9RvM_XUROvjaa0s');
var bookmarks = new Bookmarks();
var gui = new Gui();

function dumpLocalBookmarks() {
	bookmarks.getBrowserBookmarks((bookmarkTreeNodes) => {
		gui.showBookmarks(bookmarkTreeNodes, 'From local');
	});
}

function dumpCloudBookmarks() {
	mlab.listDocuments((bookmarkTreeNodes) => {
		gui.showBookmarks(bookmarkTreeNodes, 'From cloud');
	});
}

function pushBookmarksToCloud() {
	// Xóa dữ liệu cũ
	mlab.deleteAllDocument((resp) => {
		// Lấy dữ liệu local hiện tại
		bookmarks.getBrowserBookmarks((bookmarkTreeNodes) => {
			// Thêm dữ liệu mới
			mlab.insertDocument(bookmarkTreeNodes, (resp) => {
				noti.success('Đã đẩy các bookmark lên cloud thành công');
			});
		});
	});
}

/**
 * Thêm các bookmark vào trình duyệt từ danh sách trên cloud.
 */
function addBookmarkFromCloud() {
	mlab.listDocuments((bookmarkTreeNodes) => {
		bookmarks.getBookmarksBarId((bookmarksBarId) => {
			bookmarks.addBookmarks(bookmarkTreeNodes, bookmarksBarId);
		});
	});
}

document.addEventListener('DOMContentLoaded', () => {
	//console.log(window.location.protocol);
	if (!window.location.protocol.startsWith('http')) {
		// Nếu là môi trường web extension
		document.querySelector('#dumpLocalBtn').addEventListener('click', dumpLocalBookmarks);
		document.querySelector('#dumpCloudBtn').addEventListener('click', dumpCloudBookmarks);
		document.querySelector('#pushCloudBtn').addEventListener('click', pushBookmarksToCloud);
		document.querySelector('#addBookmarkBtn').addEventListener('click', addBookmarkFromCloud);

		document.querySelector('#buttons').style.display = '';
	} else {
		// Nếu là trang web bình thường
	}

	dumpCloudBookmarks();
});
