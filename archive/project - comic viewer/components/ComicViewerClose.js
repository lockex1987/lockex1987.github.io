const template = `
<span class="position-fixed top-right mt-2 mr-2 cursor-pointer font-weight-500 font-size-1.5 text-danger zindex-10"
        style="line-height: 1rem"
        @click="returnIssueListScreen()">
    &times;
</span>`;


export default {
    template,

    computed: {
        ...Vuex.mapState({
            viewZip: state => state.comic.viewZip
        })
    },

    methods: {
        /**
         * Chuyển về trang danh sách issue.
         */
        returnIssueListScreen() {
            const screen = this.viewZip ? 'comic-list' : 'issue-list';
            this.$store.commit('layout/setScreen', screen);
        }
    }
};
