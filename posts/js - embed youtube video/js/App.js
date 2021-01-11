import YoutubePlayer from './YoutubePlayer.js';

const template = `
    <div>
        <youtube-player
                v-for="e in list"
                :key="e.id"
                :id="e.id"
                class="mb-3"/>

        <div class="mb-3">
            <button class="btn btn-primary" @click="addVideo()">
                Add
            </button>

            <button class="btn btn-danger" @click="removeVideo()">
                Remove
            </button>
        </div>
    </div>
`;

export default {
    template,

    components: {
        YoutubePlayer
    },

    data() {
        return {
            list: [
                { id: 'zpOULjyy-n8' },
                { id: 'eEJHCOA2p7w' }
            ]
        };
    },

    methods: {
        addVideo() {
            this.list.push({ id: 'M7lc1UVf-VE' });
        },

        removeVideo() {
            this.list.pop();
        }
    }
};
