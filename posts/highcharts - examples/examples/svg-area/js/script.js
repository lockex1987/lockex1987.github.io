// Vẫn sử dụng Highchart để có các tính năng như Tooltip
new Vue({
    el: '#app',

    data() {
        return {
            pointSelected: {},
            points: [],
            data: [],
            WIDTH: 500,
            HEIGHT: 100,
            pathD1: '',
            pathD2: '',
            deltaX: null,
            deltaY: null
        };
    },

    async mounted() {
        this.data = await this.getDownloads();
        const { min, max } = this.findMinMax(this.data);
        // Tính khoảng cách theo trục X giữa 2 điểm
        this.deltaX = this.WIDTH / (this.data.length - 1);
        // ở đây chiều cao chart của mình là 100px mình muốn tuần có
        // lượt download lớn nhất ở tọa độ Y 0 tuần có lượt download thấp nhất ở tọa độ Y 60
        // nên mình tính deltaY theo từng lượt download như trên
        this.deltaY = 60 / (max - min);

        for (const [index, value] of this.data.entries()) {
            this.points.push({
                x: index * this.deltaX,
                // tất cả +8 để cho đẹp chút thôi
                y: (max - value.downloads) * this.deltaY + 8,
                downloads: value.downloads,
                label: value.label
            });
        }

        // Bắt đầu di chuyển bút vẽ đến tọa độ
        let pathD = `M ${this.points[0].x} ${this.points[0].y} `;
        for (const point of this.points) {
            // Vẽ đường thẳng tới tọa độ
            pathD += `L ${point.x} ${point.y} `;
        }
        this.pathD1 = pathD;

        // Di chuyển đến các góc của hình chữ nhất và đóng hình
        this.pathD2 = `${pathD} L ${this.WIDTH} ${this.HEIGHT} L 0 ${this.HEIGHT} Z`;

        // Chọn điểm mặc định
        this.handleMouseOut();
    },

    methods: {
        async getDownloads() {
            const data = await fetch('data/downloads.json').then(resp => resp.json());
            return data;
        },

        findMinMax(data) {
            let min = Number.MAX_VALUE;
            let max = Number.MIN_VALUE;
            data.forEach(d => {
                if (d.downloads < min) {
                    min = d.downloads;
                }
                if (d.downloads > max) {
                    max = d.downloads;
                }
            });
            return {
                min,
                max
            };
        },

        handleMouseMove(evt) {
            const index = Math.round(evt.offsetX / this.deltaX);
            console.log(evt);
            console.log(this.deltaX);
            console.log(index);
            this.setPointSelected(this.points[index]);
        },

        handleMouseOut() {
            const defaultPoint = {
                x: -1000,
                y: -1000,
                downloads: this.data[this.data.length - 1].downloads,
                label: 'Weekly Downloads'
            };
            this.setPointSelected(defaultPoint);
        },

        setPointSelected(point) {
            // Intl.NumberFormat().format()
            this.pointSelected = point;
        }
    }
});
