const data = {
    categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
    y_values: [100, 200, 300, 400, 500],
    colors: ['#DC4D3A', '#E93D3F', '#83C6C7', '#46D388', '#D1D785']
};

const chart = Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Test'
    },
    xAxis: {
        categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: null
        }
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    exporting: false,
    credits: false,
    legend: false,
    series: [{
        name: 'Series 1',
        data: [100, 100, 100, 100, 100]
    }]
});


function rotate(array, times) {
    while (times--) {
        // Bỏ đầu, thêm vào cuối
        const temp = array.shift();
        array.push(temp);
    }
}


document.getElementById('button').addEventListener('click', function () {
    for (let i = 0; i < data.y_values.length; i++) {
        chart.series[0].data[i].update({
            y: data.y_values[i],
            color: data.colors[i]
        });
    }

    chart.xAxis[0].update({
        categories: data.categories
    });

    rotate(data.y_values, 1);
    rotate(data.categories, 1);
    rotate(data.colors, 1);
}, false);
