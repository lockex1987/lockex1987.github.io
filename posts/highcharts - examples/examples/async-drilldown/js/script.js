Highcharts.chart('container', {
    chart: {
        type: 'column',
        events: {
            drilldown: function (evt) {
                // !evt.seriesOptions
                if (true) {
                    const chart = this;

                    const drilldowns = {
                        Animals: {
                            name: 'Animals',
                            data: [
                                ['Cows', 2],
                                ['Sheep', 3]
                            ]
                        },
                        Fruits: {
                            name: 'Fruits',
                            data: [
                                ['Apples', 5],
                                ['Oranges', 7],
                                ['Bananas', 2]
                            ]
                        },
                        Cars: {
                            name: 'Cars',
                            data: [
                                ['Toyota', 1],
                                ['Volkswagen', 2],
                                ['Opel', 5]
                            ]
                        }
                    };

                    const series = drilldowns[evt.point.name];

                    // Show the loading label
                    chart.showLoading('Simulating Ajax ...');

                    setTimeout(function () {
                        chart.hideLoading();

                        // Quan trọng là hàm này
                        chart.addSeriesAsDrilldown(evt.point, series);
                    }, 1000);
                }
            }
        }
    },

    title: {
        text: 'Async drilldown'
    },

    xAxis: {
        type: 'category'
    },

    legend: {
        enabled: false
    },

    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true
            }
        }
    },

    series: [{
        name: 'Things',
        colorByPoint: true,
        data: [
            {
                name: 'Animals',
                y: 5,
                // Đánh dấu là có drilldown
                drilldown: true
            },
            {
                name: 'Fruits',
                y: 2,
                drilldown: true
            },
            {
                name: 'Cars',
                y: 4,
                drilldown: true
            }
        ]
    }],

    // Không cần thuộc tính này nữa
    drilldown: {
        series: []
    }
});
