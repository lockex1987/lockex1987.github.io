Highcharts.chart('container', {
    chart: {
        polar: true,
        type: 'line'
    },
    title: {
        text: null
    },
    credits: {
        enabled: false
    },
    legend: {
        enabled: false
    },
    xAxis: {
        categories: [
            'Sales',
            'Marketing',
            'Development',
            'Customer Support',
            'Information Technology',
            'Administration'
        ],
        tickmarkPlacement: 'on',
        lineWidth: 0
    },
    yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0
    },
    series: [
        {
            name: 'Allocated Budget',
            data: [43000, 19000, 60000, 35000, 17000, 10000],
            pointPlacement: 'on',
            type: 'area', // area, column, column
        }
    ]
});