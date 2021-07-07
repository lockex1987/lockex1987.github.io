new Vue({
    el: '#app',

    data() {
        return {
            average: null,
            total: null,
            list: [
                { star: 5, num: 150 },
                { star: 4, num: 63 },
                { star: 3, num: 15 },
                { star: 2, num: 6 },
                { star: 1, num: 20 }
            ],
            backgroundColors: [
                'bg-danger',
                'bg-warning',
                'bg-info',
                'bg-primary',
                'bg-success'
            ]
        };
    },

    mounted() {
        this.calculateTotalAndAverage();
    },

    methods: {
        calculateTotalAndAverage() {
            let total = 0;
            this.list.forEach(e => {
                total += e.num;
            });
            this.total = total;

            this.list.forEach(e => {
                e.percent = (e.num * 100 / total).toFixed(2);
            });

            this.average = total / this.list.length;
        }
    }
});
