const MIN_VALUE = 400;
const MAX_VALUE = 600;

function getRandomInteger() {
    return MIN_VALUE + Math.round(Math.random() * (MAX_VALUE - MIN_VALUE));
}


function generateData() {
    const continents = [
        'Africa',
        'America',
        'Asia',
        'Europe',
        'Oceania'
    ];
    const arr = continents.map(name => ({
        name,
        y: getRandomInteger()
    }));
    console.log(arr);
    return arr;
}


const chart = Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Test'
    },
    xAxis: {
        type: 'category'
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
        },
        series: {
            animation: false,
            groupPadding: 0,
            pointPadding: 0.1,
            borderWidth: 0
        }
    },
    exporting: false,
    credits: false,
    legend: false,
    series: [{
        // Mỗi bar có một màu
        colorByPoint: true,
        // Phải thêm thuộc tính này
        dataSorting: {
            enabled: true,
            matchByName: true
        },
        type: 'bar',
        dataLabels: [
            {
                enabled: true
            }
        ],
        // -----------------
        name: 'Series 1',
        data: generateData()
    }]
});


document.getElementById('button').addEventListener('click', () => {
    const newData = generateData();
    chart.series[0].update({
        data: newData
    });
});
