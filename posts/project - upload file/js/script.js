import App from './App.js';

try {
    new Vue({
        el: '#app',
        ...App
    });
    // alert(1);
} catch (ex) {
    alert(ex);
}
