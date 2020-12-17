const template = `
<div v-show="screen == 'issue-list'"
        class="p-3">
    <div @click="returnHomeScreen()"
            class="mb-3 font-size-3 text-success"
            v-if="comic">
        &larr;
        {{comic.name}}
    </div>

    <div>
        <div v-if="currentIssue"
                class="mb-3">
            Bạn đang đọc
            <a href="#"
                    @click.prevent="viewIssue(currentIssue)">
                {{currentIssue.name}}
            </a>
        </div>

        <div v-if="nextIssue"
                class="mb-3">
            Đọc tập tiếp
            <a href="#"
                    @click.prevent="viewIssue(nextIssue)">
                {{nextIssue.name}}
            </a>
            
        </div>

        <div v-if="previousIssue"
                class="mb-3">
            Đọc tập trước
            <a href="#"
                    @click.prevent="viewIssue(previousIssue)">
                {{previousIssue.name}}
            </a>
        </div>
    </div>

    <div>
        <div v-for="issue in issueList">
            <a href=""
                    @click.prevent="viewIssue(issue)">
                {{issue.name}}
            </a>
        </div>
    </div>
</div>`;

export default {
    template,

    data() {
        return {
            // Danh sách các tập truyện
            issueList: [],

            // Trạng thái ẩn hiện các link
            previousIssue: null,
            currentIssue: null,
            nextIssue: null
        };
    },

    computed: {
        ...Vuex.mapState({
            screen: state => state.layout.screen,
            comic: state => state.comic.comic,
            issue: state => state.comic.issue
        })
    },

    watch: {
        comic() {
            // Lấy danh sách các tập
            if (this.comic.id) {
                this.getIssueList();
            }
        }
    },

    methods: {
        /**
         * Lấy danh sách các tập truyện.
         */
        async getIssueList() {
            // Đường dẫn đến file JSON chứa các trang của tập truyện
            const url = `data/${this.comic.id}/issue-list.json`;

            // Đọc file JSON và hiển thị ảnh các trang
            const issueList = await fetch(url).then(res => res.json());
            this.issueList = issueList;

            this.bindSavedInfo();
        },

        /**
         * Tên để lưu vào localStorage.
         */
        getLocalStorageName() {
            return this.comic.id + '-issue';
        },

        /**
         * Click vào một link tập truyện nào đó.
         */
        viewIssue(issue) {
            // Đổi sang màn hình viewer
            this.$store.commit('layout/setScreen', 'comic-viewer');

            // Hiển thị các ảnh của tập truyện
            this.$store.commit('comic/setIssue', issue);

            // Lưu lại index của tập đang đọc
            const issueIndex = this.issueList.indexOf(issue);
            localStorage.setItem(this.getLocalStorageName(), issueIndex);

            // Hiển thị lại thông tin bookmark
            this.bindSavedInfo();
        },

        /**
         * Chuyển về trang chủ.
         */
        returnHomeScreen() {
            this.$store.commit('layout/setScreen', 'comic-list');
        },

        /**
         * Hiển thị các thông tin đã lưu ở localStorage.
         */
        bindSavedInfo() {
            const savedIndex = localStorage.getItem(this.getLocalStorageName());

            if (savedIndex !== undefined && savedIndex !== null && savedIndex !== '-1') {
                const idx = parseInt(savedIndex);

                this.currentIssue = this.issueList[idx];
                this.nextIssue = (idx < this.issueList.length - 1) ? this.issueList[idx + 1] : null;
                this.previousIssue = (idx > 0) ? this.issueList[idx - 1] : null;
            } else {
                this.currentIssue = null;
                this.previousIssue = null;
                this.nextIssue = null;
            }
        }
    }
};
