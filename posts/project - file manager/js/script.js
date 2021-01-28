import App from './App.js';

try {
    new Vue({
        el: '#app',
        ...App
    });
} catch (ex) {
    alert(ex);
}
