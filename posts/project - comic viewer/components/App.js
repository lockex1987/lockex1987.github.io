import ComicList from './ComicList.js';
import IssueList from './IssueList.js';
import ComicViewer from './ComicViewer.js';

const template = `
<div>
    <comic-list />
    <issue-list />
    <comic-viewer />
</div>`;


export default {
    template,

    components: {
        ComicList,
        IssueList,
        ComicViewer
    },

    mounted() {
        this.$store.commit('layout/setScreen', 'comic-list');
    }
};
