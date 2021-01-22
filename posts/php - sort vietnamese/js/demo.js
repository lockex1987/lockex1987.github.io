const DEMO_LIST_TEMPLATE = `
    <div>
        <h3>
            {{title}}
        </h3>

        <ul>
            <li v-for="s in names">
                {{s}}
            </li>
        </ul>
    </div>`;


const DemoList = {
    template: DEMO_LIST_TEMPLATE,

    props: [
        'title',
        'names'
    ]
};


new Vue({
    el: '#app',

    components: {
        DemoList
    },

    data() {
        return {
            list: []
        };
    },

    mounted() {
        this.getList();
    },

    methods: {
        /**
         * Lấy dữ liệu từ PHP.
         */
        async getList() {
            const url = 'server/list.php';
            const data = await fetch(url).then(resp => resp.json());
            // console.log(data);

            this.list = [
                {
                    title: 'Sử dụng sort bình thường',
                    names: data.normal
                },
                {
                    title: 'Sử dụng sort theo locale',
                    names: data.locale
                }
            ];
        }
    }
});
