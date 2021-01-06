import DATA from './data.js';

/**
 * Lấy dữ liệu từ https://www.highcharts.com/demo.
 */
function crawData() {
    const data = [];
    const demos = document.querySelectorAll('#demos a');
    demos.forEach(demo => {
        const url = demo.href;
        const image = demo.querySelector('img').src;
        const title = demo.querySelector('h3').textContent.trim();
        const obj = {
            title,
            url,
            image
        };
        data.push(obj);
    });
    console.log(data);
}

const App = {
    data() {
        return {
            demos: DATA.map(e => ({
                ...e,
                url: e.url.replace('https://www.highcharts.com/demo/', 'examples/')
            })),
            searchText: ''
        };
    },

    computed: {
        filteredDemos() {
            const s = this.searchText.toLowerCase();
            return this.demos.filter(demo => demo.title.toLowerCase().includes(s));
        }
    }
};


new Vue({
    el: '#app',
    ...App
});
