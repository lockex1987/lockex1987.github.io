import serverData from '../data/mock_data.js';

new Vue({
    el: '#app',

    data() {
        return {
            items: serverData.slice(0, 10).map(e => ({
                ...e,
                isShowDetail: false
            }))
        };
    },

    methods: {
        /**
         * Thêm sự kiện click vào mũi tên để expand dòng nào đó.
         */
        toggleShowDetail(dataEle) {
            dataEle.isShowDetail = !dataEle.isShowDetail;
        }
    }
});
