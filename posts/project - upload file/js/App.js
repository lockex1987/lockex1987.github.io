const template = `
    <section class="my-5">
        <div class="mb-3 font-weight-500 text-danger">List</div>
        
        <div v-if="files">
            <div class="text-danger mb-3" v-if="files.length == 0">
                Không có file nào
            </div>

            <div v-else>
                <table class="table">
                    <tbody>
                        <tr>
                            <td>
                                <a href="javascript:;" @click="gotoParentFolder()" class="text-decoration-none">
                                    ..
                                </a>
                            </td>
                            <td>
                            </td>
                        </tr>

                        <tr v-for="f in files">
                            <td>
                                <a href="javascript:;" @click="handleClick(f)" class="text-decoration-none">
                                    {{f.name}}
                                </a>

                                <download-progress
                                        :url="f.url"
                                        :file-name="f.name"
                                        v-if="f.download"/>
                            </td>
                            <td class="text-right text-muted font-size-0.875">
                                {{f.size}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
`;


import DownloadProgress from './DownloadProgress.js';

export default {
    template,

    components: {
        DownloadProgress
    },

    data() {
        return {
            files: null,
            folder: '/'
        };
    },

    mounted() {
        this.getUploadedFiles();

        // Thêm subscriber uploadFinish
        /*
        PubSub.subscribe('uploadFinish', () => {
            this.getUploadedFiles();
        });
        */
    },

    methods: {
        /**
         * Lấy danh sách file.
         */
        async getUploadedFiles() {
            const url = 'server/list_files.php?folder=' + encodeURIComponent(this.folder);
            const data = await fetch(url).then(response => response.json());

            this.files = data.map(f => ({
                name: f.name,
                url: f.url,
                isDir: f.isDir,
                size: f.isDir ? '' : CommonUtils.prettifyNumber(f.size, 0) + 'B', // 
                download: false
            }));
        },

        handleClick(f) {
            if (f.isDir) {
                this.openFolder(f);
            } else {
                f.download = true;
            }
        },

        openFolder(f) {
            this.folder = this.folder + f.name + '/';
            this.getUploadedFiles();
        },

        gotoParentFolder() {
            const a = this.folder.split('/');
            const b = a.slice(0, a.length - 2);
            this.folder = b.join('/') + '/';
            this.getUploadedFiles();
        }
    }
};
