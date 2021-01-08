import serverData from './mock_data.js';

new Vue({
    el: '#vueDemo',

    data() {
        return {
            items: [],
            summary: {}
        };
    },

    mounted() {
        new Datatable({
            table: this.$refs.myTable,
            data: serverData,
            searchableProps: [
                'country'
            ],
            // Chú ý: với Vue thì phải viêt kiểu hai chấm như dưới,
            // nếu không đối tượng this sẽ sai
            bindItemsCallback: (items) => {
                this.items = items;
            }
        });

        this.summary = {
            totalPopulation: 1234567890
        };
    },

    methods: {
        formatThousandsVue: CommonUtils.formatThousands,

        normalizeDateVue: CommonUtils.normalizeDate
    }
});
