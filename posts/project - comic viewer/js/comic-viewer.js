/**
 * Mục tiêu: Viết ứng dụng xem ảnh, cbr, cbz như Comix.
 * Cross platform.
 * Dùng Node viết bằng JS cho sướng. Không học thêm Python.
 * Tên eComix (e là Electron).
 */
import ComicViewer from './components/ComicViewer.js';

// const remote = require('electron').remote;
// const prop1 = remote.getGlobal('sharedObject').prop1;
// console.log(prop1);
/*
import { ipcRenderer } from 'electron';
// Async message handler
ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg);
});
// Async message sender
ipcRenderer.send('asynchronous-message', 'async ping');
*/

// Khởi tạo uncompress
/*
loadArchiveFormats(['rar', 'zip'], () => {
    console.log('Completed');
});
*/

new Vue({
    el: '#app',

    ...ComicViewer
});
