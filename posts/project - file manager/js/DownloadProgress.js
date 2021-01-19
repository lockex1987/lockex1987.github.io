/*

Khi mở file trên ipad, thấy nó đơ đơ, chả biết có đang chạy không.

Hiển thị trạng thái khi download file to.

Để test, có thể cấu hình giới hạn nginx như sau:

    server {
        limit_rate 100k;
    }

*/

const template = `
    <div class="text-center">
        <div v-show="remainTime">
            <div class="progress" style="height: 3px;">
                <div class="progress-bar h-100"
                        :style="{ 'width': percent + '%' }"></div>
            </div>

            <div class="mt-1 d-flex justify-content-between text-muted font-size-0.75">
                <div>
                    {{kbps}}B/s
                </div>

                <div>
                    {{remainTime}}
                </div>
            </div>
        </div>
    </div>`;


export default {
    template,

    props: [
        'url',
        'fileName'
    ],

    data() {
        return {
            percent: 0,
            kbps: 0,
            remainTime: '',
            startTime: null
        };
    },

    mounted() {
        try {
            // alert(2);
            this.startTime = new Date().getTime();
            this.download();
            // alert(3);
        } catch (ex) {
            alert(ex);
        }
    },

    methods: {
        /**
         * Download file.
         */
        download() {
            try {
                const request = new XMLHttpRequest();

                request.addEventListener('readystatechange', () => {
                    if (request.readyState == 2) {
                        // Cập nhật startTime ở đây?
                    } else if (request.readyState == 4) {
                        // alert(4);
                        CommonUtils.downloadBlob(request.response, this.fileName);
                    }
                });

                request.addEventListener('progress', this.updateProgress);

                request.responseType = 'blob';
                request.open('get', this.url);
                request.send();
            } catch (ex) {
                alert(ex);
            }
        },

        /**
         * Cap nhat trang thai download.
         * @param {Event} evt Doi tuong Event
         */
        updateProgress(evt) {
            try {
                this.percent = (evt.loaded / evt.total) * 100;

                const duration = (new Date().getTime() - this.startTime) / 1000;
                const bps = evt.loaded / duration;
                this.kbps = CommonUtils.prettifyNumber(bps / 8, 0);

                const time = (evt.total - evt.loaded) / bps;
                const seconds = Math.round(time % 60);
                const minutes = Math.round(time / 60);

                this.remainTime = (minutes > 0 ? minutes + ' phút ' : '') +
                        (CommonUtils.paddingTwoZero(seconds) + ' giây');
            } catch (ex) {
                alert(ex);
            }
        }
    }
};
