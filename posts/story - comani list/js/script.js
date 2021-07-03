new Vue({
    el: '#app',

    data() {
        return {
            logo: '',
            sections: [],
            items: [],
            // link: 'ultimates.json'
            link: 'infinity.json'
        };
    },

    mounted() {
        this.getData();
    },

    methods: {
        async getData() {
            const data = await fetch('data/' + this.link).then(resp => resp.json());
            // this.logo = data.logo;
            // this.sections = data.sections;
            this.items = data;
        }
    }
});
