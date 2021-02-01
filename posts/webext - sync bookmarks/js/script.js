// const mlab = new Mlab('lockex1987', 'bookmarks', 'lNqkzI-WP6v_uw-xx9RvM_XUROvjaa0s');
const bookmarks = new Bookmarks();
const gui = new Gui();


/**
 * Hiển thị danh sách bookmark ở trình duyệt hiện tại.
 */
function dumpLocalBookmarks() {
    bookmarks.getBrowserBookmarks((bookmarkTreeNodes) => {
        gui.showBookmarks(bookmarkTreeNodes, 'From local');
    });
}


/**
 * Hiển thị danh sách bookmarks ở cloud.
 */
async function dumpCloudBookmarks() {
    /*
    mlab.listDocuments((bookmarkTreeNodes) => {
        gui.showBookmarks(bookmarkTreeNodes, 'From cloud');
    });
    */

    const bookmarkTreeNodes = await fetch('../../data/bookmarks-data.json').then(resp => resp.json());
    gui.showBookmarks(bookmarkTreeNodes, 'From cloud');
}


/**
 * Đẩy dữ liệu danh sách bookmarks từ trình duyệt lên cloud.
 */
function pushBookmarksToCloud() {
    /*
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
    */

    bookmarks.getBrowserBookmarks((bookmarkTreeNodes) => {
        CommonUtils.saveTextAsFile(JSON.stringify(bookmarkTreeNodes), 'bookmarks-data.json');
    });
}


/**
 * Thêm các bookmark vào trình duyệt từ danh sách trên cloud.
 */
async function addBookmarkFromCloud() {
    /*
    mlab.listDocuments((bookmarkTreeNodes) => {
        bookmarks.getBookmarksBarId((bookmarksBarId) => {
            bookmarks.addBookmarks(bookmarkTreeNodes, bookmarksBarId);
        });
    });
    */

    const bookmarkTreeNodes = await fetch('https://lockex1987.github.io/data/bookmarks-data.json').then(resp => resp.json());
    bookmarks.getBookmarksBarId((bookmarksBarId) => {
        bookmarks.addBookmarks(bookmarkTreeNodes, bookmarksBarId);
    });
}


/**
 * Hàm khởi tạo.
 */
document.addEventListener('DOMContentLoaded', () => {
    // console.log(window.location.protocol);
    if (!window.location.protocol.startsWith('http')) {
        // Nếu là môi trường web extension
        document.querySelector('#dumpLocalBtn').addEventListener('click', dumpLocalBookmarks);
        document.querySelector('#dumpCloudBtn').addEventListener('click', dumpCloudBookmarks);
        document.querySelector('#pushCloudBtn').addEventListener('click', pushBookmarksToCloud);
        document.querySelector('#addBookmarkBtn').addEventListener('click', addBookmarkFromCloud);

        document.querySelector('#buttons').style.display = '';

        dumpLocalBookmarks();
    } else {
        // Nếu là trang web bình thường
        dumpCloudBookmarks();
    }
});
