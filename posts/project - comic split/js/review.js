new Vue({
    el: '#app',

    data() {
        return {
            // Danh sách ảnh
            images: null,

            // Chỉ số của ảnh hiện tại
            currentImageIndex: 0,

            // Danh sách panel của ảnh hiện tạ, mỗi panel gồm nhiều điểm (thường là 4 điểm của hình chữ nhật).
            panels: null,

            // Chỉ số của panel hiện tại
            currentPanelIndex: 0,

            // Đối tượng canvas
            canvas: null,

            // Đối tượng context của canvas để vẽ
            context: null,

            // Đối tượng ảnh
            imageObj: null
        };
    },

    async mounted() {
        this.canvas = document.querySelector('#myCanvas');
        this.context = this.canvas.getContext('2d');
        this.addCanvasListener();
        await this.getImages();
        // Có cần chờ cho this.panels nhận?
        this.$nextTick(() => {
            this.displayImage();
        });

        this.addShortcutsListener();
    },

    watch: {
        /**
         * Khi cập nhật panels thì cập nhật lại chỗ mảng images gốc.
         */
        panels() {
            this.images[this.currentImageIndex].panels = this.panels;
        }
    },

    methods: {
        /**
         * Lấy danh sách ảnh.
         */
        async getImages() {
            const url = 'data/panels.json';
            const data = await fetch(url).then(resp => resp.json());
            this.images = data;
        },

        /**
         * Vẽ đa giác.
         */
        drawPolygon(points) {
            if (points.length <= 1) {
                return;
            }

            this.context.fillStyle = 'rgba(100, 100, 100, 0.5)';
            this.context.strokeStyle = '#df4b26';
            this.context.lineWidth = 1;

            this.context.beginPath();
            this.context.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
                this.context.lineTo(points[i].x, points[i].y);
            }
            this.context.closePath();
            this.context.fill();
            this.context.stroke();
        },

        /**
         * Vẽ các điểm.
         */
        drawPoints(points) {
            this.context.strokeStyle = '#df4b26';
            this.context.lineJoin = 'round';
            this.context.lineWidth = 5;

            for (let i = 0; i < points.length; i++) {
                this.context.beginPath();
                this.context.arc(points[i].x, points[i].y, 3, 0, 2 * Math.PI, false);
                this.context.fillStyle = '#ffffff';
                this.context.fill();
                this.context.lineWidth = 5;
                this.context.stroke();
            }
        },

        /**
         * Vẽ lại.
         */
        redraw() {
            this.context.drawImage(this.imageObj, 0, 0);
            // console.log(this.panels);
            this.panels.forEach((points, idx) => {
                if (idx == this.currentPanelIndex) {
                    this.drawPolygon(points);
                    this.drawPoints(points);
                }
            });
        },

        addCanvasListener() {
            // Khi click thì thêm điểm
            this.canvas.addEventListener('mouseup', (evt) => {
                // console.log(this.panels, this.currentPanelIndex);
                this.panels[this.currentPanelIndex].push({
                    x: evt.offsetX,
                    y: evt.offsetY
                });
                this.redraw();
            });
        },

        displayImage() {
            this.panels = this.images[this.currentImageIndex].panels;
            if (this.panels.length == 0) {
                this.panels = [
                    []
                ];
            }

            this.currentPanelIndex = 0;

            this.imageObj = new Image();
            this.imageObj.addEventListener('load', () => {
                // console.log('Loaded');
                this.canvas.width = this.imageObj.width;
                this.canvas.height = this.imageObj.height;
                this.redraw();
            });
            this.imageObj.src = 'data-files/' + this.images[this.currentImageIndex].filename;

            // TODO: drag điểm
        },

        /**
         * Hiển thị ảnh trước.
         */
        previousImage() {
            this.gotoImage(this.currentImageIndex - 1);
        },

        /**
         * Hiển thị ảnh sau.
         */
        nextImage() {
            this.gotoImage(this.currentImageIndex + 1);
        },

        /**
         * Hiển thị một ảnh nào đó.
         * @param {Integer} idx Chỉ số ảnh
         */
        gotoImage(idx) {
            if (idx < 0 || idx >= this.images.length) {
                return;
            }

            this.currentImageIndex = idx;

            this.$nextTick(() => {
                this.displayImage();
            });
        },

        /**
         * Xóa điểm cuối cùng.
         */
        deleteLastPoint() {
            const points = this.panels[this.currentPanelIndex];
            if (points.length >= 1) {
                points.pop();
            }
            // console.log(this.clicks);
            this.redraw();
        },

        /**
         * Hiển thị panel trước.
         */
        previousPanel() {
            this.gotoPanel(this.currentPanelIndex - 1);
        },

        /**
         * Hiển thị panel sau.
         */
        nextPanel() {
            this.gotoPanel(this.currentPanelIndex + 1);
        },

        /**
         * Hiển thị một panel nào đó.
         * @param {Integer} idx Chỉ số panel
         */
        gotoPanel(idx) {
            if (idx < 0 || idx >= this.panels.length) {
                return;
            }

            this.currentPanelIndex = idx;

            this.redraw();
        },

        /**
         * Xóa panel.
         */
        deletePanel() {
            if (this.panels.length == 0) {
                return;
            }

            const idx = this.currentPanelIndex;
            if (idx == this.panels.length - 1) {
                this.currentPanelIndex--;
            }

            this.panels.splice(idx, 1);

            this.redraw();
        },

        /**
         * Thêm panel.
         */
        newPanel() {
            const idx = this.currentPanelIndex;
            const newPanel = [];
            if (idx == 0) {
                this.panels.splice(idx + 1, 0, newPanel);
            } else {
                this.panels.splice(idx + 1, 0, newPanel);
            }
            this.currentPanelIndex++;
            this.redraw();
        },

        /**
         * Lưu lại.
         */
        saveInfo() {
            /*
            const arr = this.images.map((img, idx) => {
                return {
                    filename: img.filename,
                    panels: 
                }
            });
            */
            const text = JSON.stringify(this.images, null, 2);
            console.log(text);
            // CommonUtils.saveTextAsFile(text, 'panels.json');
        },

        addShortcutsListener() {
            document.addEventListener('keydown', (evt) => {
                evt.preventDefault();

                const key = evt.key;
                // console.log(key);
                if (key == 'ArrowRight' || key == 'ArrowDown') {
                    this.nextPanel();
                }
                if (key == 'ArrowLeft' || key == 'ArrowUp') {
                    this.previousPanel();
                }
                if (key == 'PageDown') {
                    this.nextImage();
                }
                if (key == 'PageUp') {
                    this.previousImage();
                }
            });
        }
    }
});
