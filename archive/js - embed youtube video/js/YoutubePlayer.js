const template = `
<div>
    <div class="embed-responsive embed-responsive-16by9 mb-3 position-relative cursor-pointer"
            v-show="!isLoaded"
            @click="startPlay()">
        <img class="embed-responsive-item"
            :src="thumbnailUrl"/>

        <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%"
                class="position-absolute "
                style="top: 50%; left: 50%; width: 70px; transform: translate(-50%, -50%);">
            <path class="ytp-large-play-button-bg"
                d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                fill="#FF0000" fill-opacity="0.8"></path>
            <path d="M 45,24 27,14 27,34" fill="#fff"></path>
        </svg>
    </div>
    
    <div v-show="isLoaded">
        <div class="embed-responsive embed-responsive-16by9">
            <div :id="'youtubePlayer' + this.id"
                    class="embed-responsive-item"></div>
        </div>

        <div class="text-info">
            {{currentTime}} / {{duration}}
        </div>

        <div class="mt-3 mb-3">
            <button class="btn btn-primary" @click="seekVideo()">
                Seek
            </button>
        </div>
    </div>
</div>
`;


export default {
    template,

    props: [
        'id'
    ],

    data() {
        return {
            player: null,
            isLoaded: false,
            currentTime: null,
            duration: null,
            timeUpdateInterval: null
        };
    },

    computed: {
        thumbnailUrl() {
            // Server: i, i3,...
            // Image: maxresdefault.jpg, sddefault.jpg, hqdefault.jpg,...
            return `https://i.ytimg.com/vi/${this.id}/maxresdefault.jpg`;
        }
    },

    mounted() {

    },

    beforeDestroy() {
        console.log('Clear interval');
        clearInterval(this.timeUpdateInterval);
    },

    methods: {
        startPlay() {
            this.isLoaded = true;

            this.player = new YT.Player('youtubePlayer' + this.id, {
                videoId: this.id,
                host: 'https://www.youtube.com',
                playerVars: {
                    origin: window.location.href, // để dùng API yêu cầu cái này
                    enablejsapi: 1, // để dùng API yêu cầu cái này
                    autoplay: 1, // chạy luôn
                    fs: 0, // ẩn nút fullsceen
                },
                events: {
                    onReady: this.initialize
                }
            });
        },

        initialize() {
            this.updateTimerDisplay();

            clearInterval(this.timeUpdateInterval);

            this.timeUpdateInterval = setInterval(this.updateTimerDisplay, 200);
        },

        updateTimerDisplay() {
            this.currentTime = this.player.getCurrentTime();
            this.duration = this.player.getDuration();
        },

        seekVideo() {
            this.player.seekTo(10);
        }
    }
};
