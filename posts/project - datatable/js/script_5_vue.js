new Vue({
    el: '#vueDemo',
    data: {
        items: [],
        summary: {}
    },

    mounted() {
        const datatable = new Datatable({
            table: this.$refs.myTable,
            data: serverData,
            searchableProps: ['country'],
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
