const chart = Highcharts.chart('container', {
    title: {
        text: 'Chart.update'
    },
    subtitle: {
        text: 'Plain'
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    series: [
        {
            type: 'column',
            colorByPoint: true,
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
            showInLegend: false
        }
    ]
});


$('#plain').click(function () {
    chart.update({
        chart: {
            inverted: false,
            polar: false
        },
        subtitle: {
            text: 'Plain'
        }
    });
});

$('#inverted').click(function () {
    chart.update({
        chart: {
            inverted: true,
            polar: false
        },
        subtitle: {
            text: 'Inverted'
        }
    });
});

$('#polar').click(function () {
    chart.update({
        chart: {
            inverted: false,
            polar: true
        },
        subtitle: {
            text: 'Polar'
        }
    });
});

$('#updateData').on('click', () => {
    const length = chart.series[0].data.length;
    const newData = new Array(length).fill(1).map(n => 100 + Math.round(Math.random() * 50));
    chart.series[0].update({
        data: newData
    });
});
