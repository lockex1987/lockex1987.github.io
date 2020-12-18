import ComicList from './ComicList.js';
import ComicViewer from './ComicViewer.js';

const template = `
<div>
    <comic-list />
    <comic-viewer />
</div>`;


export default {
    template,

    components: {
        ComicList,
        ComicViewer
    },

    mounted() {
        this.$store.commit('layout/setScreen', 'comic-list');
    }
};
