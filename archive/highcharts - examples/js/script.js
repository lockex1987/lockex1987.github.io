/*

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
	console.log(obj);
	data.push(obj);
});

*/
const App = {
    data() {
        return {
            demos: DATA,
            searchText: ''
        };
    },

    computed: {
        filteredDemos() {
            const s = this.searchText.toLowerCase();
            console.log(s);
            return this.demos.filter(demo => demo.title.toLowerCase().includes(s));
        }
    }
};


new Vue({
    el: '#app',
    ...App
});
