/**
 * Mục tiêu: Viết ứng dụng xem ảnh, cbr, cbz như Comix.
 * Cross platform.
 * Dùng Node viết bằng JS cho sướng. Không học thêm Python.
 * Tên eComix (e là Electron).
 */
import ComicViewer from './components/ComicViewer.js';

// Khởi tạo uncompress
loadArchiveFormats(['rar', 'zip'], () => {
    console.log('Completed');
});

new Vue({
    el: '#app',

    ...ComicViewer
});
