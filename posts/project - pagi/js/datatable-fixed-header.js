import serverData from '../data/mock_data.js';

new Vue({
    el: '#app',

    data() {
        return {
            items: serverData.slice(0, 10)
        };
    }
});
