new Vue({
    el: '#app',

    data() {
        const peopleCodes = people.map(p => p.code);
        return {
            // Danh sách mã người
            peopleCodes: peopleCodes,
            // Người đầu tiên
            you: peopleCodes[0],
            // Người thứ hai (để tìm tên mối quan hệ)
            relative: peopleCodes[1],
            // Tên mối quan hệ giữa người thứ nhất và người thứ hai
            linkType: '',
            // Người hiện tại được chọn
            personObj: {}
        };
    },

    mounted() {
        this.changed();
        this.initChart();

        /**
         * Khi click vào người nào đó thì hiển thị chi tiết.
         */
        document.querySelector('#treeContainer .tree').addEventListener('click', (evt) => {
            const target = evt.target;
            const person = target.closest('.person');
            if (person) {
                const personCode = person.id.replace('person-', '');
                this.viewPersonByCode(personCode);
            }
        });
    },

    methods: {
        /**
         * Khi thay đổi thì tính toán lại mối quan hệ.
         */
        changed() {
            this.linkType = calculateRelation(this.you, this.relative);
            this.highlightSelected();
        },

        /**
         * Đổi chỗ người thứ nhất và người thứ hai.
         */
        swap() {
            const temp = this.you;
            this.you = this.relative;
            this.relative = temp;
            this.changed();
        },

        /**
         * Highlight người thứ nhất và người thứ hai.
         */
        highlightSelected() {
            document.querySelectorAll('.graph .person')
                .forEach(div => div.classList.remove('selected'));
            this.highlightDiv(this.you);
            this.highlightDiv(this.relative);
        },

        /**
         * Highlight người theo mã.
         * @param {String} personCode Mã của người
         */
        highlightDiv(personCode) {
            const personDiv = document.querySelector('.graph .p-' + personCode);
            if (personDiv) {
                personDiv.classList.add('selected');
            }
        },

        /**
         * Khởi tạo biểu đồ dùng thư viện dTree.
         */
        initChart() {
            // Vẽ biểu đồ
            const dTreeData = [
                personMap.ONGNGOAI
            ];

            const options = {
                target: '#graph',
                width: 1600,
                height: 600,
                callbacks: {
                    nodeClick: (name, extra) => {
                        const personCode = extra.code;
                        this.viewPersonByCode(personCode);
                    }
                },
                nodeWidth: 100
            };

            dTree.init(dTreeData, options);
        },

        /**
         * Hiển thị chi tiết thông tin của một người theo mã.
         * @param {String} personCode Mã người
         */
        viewPersonByCode(personCode) {
            this.personObj = personMap[personCode];
        },

        /**
         * Đóng popup chi tiết thông tin một người.
         */
        closePopup() {
            this.personObj = {};
        }
    }
});
