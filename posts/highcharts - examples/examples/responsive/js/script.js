const chart = Highcharts.chart('container1', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Highcharts responsive chart'
    },
    subtitle: {
        text: 'Resize the frame or click buttons to change appearance'
    },
    legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical'
    },
    xAxis: {
        categories: ['Apples', 'Oranges', 'Bananas'],
        labels: {
            x: -10
        }
    },
    yAxis: {
        allowDecimals: false,
        title: {
            text: 'Amount'
        }
    },
    series: [{
        name: 'Christmas Eve',
        data: [1, 4, 3]
    }, {
        name: 'Christmas Day before dinner',
        data: [6, 4, 2]
    }, {
        name: 'Christmas Day after dinner',
        data: [8, 4, 3]
    }],

    // Thêm tùy chọn này
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal'
                },
                yAxis: {
                    labels: {
                        align: 'left',
                        x: 0,
                        y: -5
                    },
                    title: {
                        text: null
                    }
                },
                subtitle: {
                    text: null
                },
                credits: {
                    enabled: false
                }
            }
        }]
    }
});


document.querySelector('#small').addEventListener('click', () => {
    chart.setSize(400, 300);
});

document.querySelector('#large').addEventListener('click', () => {
    chart.setSize(600, 300);
});


Highcharts.chart('container2', {
    title: {
        text: 'Chart reflow is set to true'
    },
    subtitle: {
        text: 'When resizing the window or the frame, the chart should resize'
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    series: [
        {
            name: 'Series 1 name',
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        }
    ],
    credits: {
        enabled: false
    }
});
