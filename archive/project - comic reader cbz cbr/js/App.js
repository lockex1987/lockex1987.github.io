const template = `
<div>
    <div class="p-2" v-show="!showViewer">
        <div>
            <input type="file"
                    accept=".cbr,.cbz"
                    @change="handleChooseFile($event)">
        </div>
    </div>

    <viewer
            :images="images"
            :total-page="totalPage"
            ref="viewer"
            v-show="showViewer"
            @close="showViewer = false"/>
</div>
`;


import Viewer from './Viewer.js';

export default {
    template,

    el: '#app',

    components: {
        Viewer
    },

    data() {
        return {
            images: [],
            totalPage: 0,
            showViewer: false
        };
    },

    mounted() {
        // this.toggleFullScreen();
    },

    methods: {
        toggleFullScreen() {
            if (!document.fullscreenElement) {
                try {
                    // $refs.viewer
                    this.$el.requestFullscreen();
                    alert(2);
                } catch (ex) {
                    alert(ex);
                }
            } else {
                document.exitFullscreen();
            }
        },

        handleChooseFile(evt) {
            const files = evt.target.files;
            if (files.length) {
                this.handleFile(files[0]);
                evt.target.value = '';
            }
        },

        handleFile(file) {
            archiveOpenFile(file, null, (archive, err) => {
                if (!archive) {
                    alert(err);
                    return;
                }

                console.info('Uncompressing ' + file.name + ' (' + archive.archive_type + ') ...');

                // Chỉ lọc ra file ảnh
                const arr = archive.entries.filter(e => e.is_file); //  && CommonUtils.isImageFile(e.name)

                // Hiển thị viewer
                this.showViewer = true;

                // Reset thông tin
                this.images = [];
                this.$refs.viewer.resetCurPanel();
                this.totalPage = arr.length;

                // Đọc từng file ảnh một
                // Hiển thị ảnh đầu tiên nhanh nhất có thể
                let idx = 0;
                const readImage = () => {
                    arr[idx].readData(data => {
                        const url = URL.createObjectURL(new Blob([data]));
                        this.images.push(url);
                        console.log(`${idx + 1} / ${arr.length}`);

                        idx++;
                        if (idx < arr.length) {
                            readImage();
                        }
                    });
                };

                readImage();
            });
        },

        
    }
};
