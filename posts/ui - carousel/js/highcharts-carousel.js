new Vue({
    el: '#app',

    data() {
        const number = 8;
        const list = [];
        for (let i = 0; i < number; i++) {
            const id = i + 1;
            list.push({
                id
            });
        }

        return {
            list
        };
    },

    mounted() {
        this.$nextTick(() => {
            this.list.forEach(e => {
                this.drawChart(e.id);
            });
        });
    },

    methods: {
        drawChart(id) {
            const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const data = categories.map(c => Math.floor((Math.random() * 10) + 1));
            Highcharts.chart('lineChart' + id, {
                chart: {
                    type: 'spline',
                    backgroundColor: 'transparent'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: null
                },
                legend: {
                    enabled: false
                },
                yAxis: {
                    visible: false
                },
                xAxis: {
                    categories: categories,
                    visible: true
                },
                series: [
                    {
                        name: 'Số tin',
                        data: data
                    }
                ]
            });
        }
    }
});
