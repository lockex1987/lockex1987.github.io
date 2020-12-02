import App from './App.js';

/**
 * Sử dụng Vue dạng module
 * Thêm tính năng kính lúp
 * https://lockex1987.github.io/archive/project%20-%20comic%20reader/
 * https://github.com/lockex1987/lockex1987.github.io/tree/master/archive/project%20-%20comic%20reader/
 * https://lockex1987.github.io/archive/project%20-%20comic%20reader%20(half%20page)/
 * https://lockex1987.github.io/archive/project%20-%20comic%20split/
 */


// Khởi tạo uncompress
loadArchiveFormats(['rar', 'zip'], () => {
    
});

// Khởi tạo Vue
new Vue({
    ...App
});

