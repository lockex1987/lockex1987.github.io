const TEMPLATE = `
<div>
    <img v-for="s in images"
        :src="'media/' + s"
        class="d-block h-auto mb-2 mx-auto mt-0"/>
</div>`;


const App = {
    template: TEMPLATE,

    data() {
        return {
            // Danh sách ảnh
            images: []
        };
    },

    mounted() {
        this.getImages();
    },

    methods: {
        /**
         * Lấy danh sách ảnh.
         */
        async getImages() {
            const url = 'data/tintin.json';
            const data = await fetch(url).then(resp => resp.json());
            this.images = data;
        }
    }
};


new Vue({
    el: '#app',

    components: {
        App
    }
});
