const template = `
<div>
    <div class="mt-3" v-if="item.name">
        <div class="font-size-0.875">
            Hồi {{item.idx + 1}}
        </div>
        <div class="font-weight-700">
            {{item.name}}
        </div>
    </div>

    <div class="my-3">
        <audio ref="myAudio" id="myAudio" :src="item.audio"></audio>
    </div>
</div>
`;


export default {
    template,

    props: {
        item: {
			type: Object
		}
    },

    data() {
        return {
            firstPlay: false
        };
    },

    mounted() {
        createMediaPlayer(document.querySelector('#myAudio'));
    },

    watch: {
        item(newValue, oldValue) {
			console.log(newValue, this.firstPlay);
            if (newValue.audio) {
                if (!this.firstPlay) {
                    this.firstPlay = true;
                } else {
					// Chờ thuộc tính src thay đổi
					this.$nextTick(() => {
						this.playMedia();
					});
                }
            }
        }
    },

    methods: {
        playMedia() {
			this.$refs.myAudio.currentTime = 0;
			this.$refs.myAudio.play();
        }
    }
};
