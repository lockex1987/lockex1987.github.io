import ComicList from './ComicList.js';
import ComicViewer from './ComicViewer.js';

const template = `
<div>
    <comic-list />
    <comic-viewer />
</div>`;


/**
 * Tính năng:
    Full screen
    Thêm tính năng kính lúp
 */
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
