import App from './components/App.js';
import store from './store/index.js';

// Khởi tạo uncompress
loadArchiveFormats(['rar', 'zip'], () => {
    console.log('Completed');
});

new Vue({
    el: '#app',

    store,

    ...App
});
