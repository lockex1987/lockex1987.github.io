/*
Thứ tự các vụ án
    https://www.bookseriesinorder.com/judge-dee-mysteries/
*/

new Vue({
    el: '#app',

    data() {
        return {
            novels: []
        };
    },

    mounted() {
        this.getNovels();
    },

    methods: {
        async getNovels() {
            const data = await fetch('data/novels.json').then(resp => resp.json());
            this.novels = data;
        }
    }
});
