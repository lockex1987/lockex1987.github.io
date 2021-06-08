const categories = ['Những chú sư tử châu Phi', 'Báo châu Mỹ', 'Voi và hổ châu Á', 'Sói châu Âu', 'Chuột túi, gấu koala châu Đại Dương'];
const series = [
    {
        name: 'Số lượng',
        data: [107, 31, 635, 203, 29]
    }
];

Highcharts.chart('container1', {
    chart: {
        type: 'bar'
    },
    title: {
        text: null
    },
    subtitle: {
        text: null
    },
    credits: {
        enabled: false
    },
    legend: {
        enabled: false
    },
    yAxis: {
        visible: false
    },
    xAxis: {
        categories: categories
    },
    series: series
});

Highcharts.chart('container2', {
    chart: {
        type: 'bar'
    },
    title: {
        text: null
    },
    subtitle: {
        text: null
    },
    credits: {
        enabled: false
    },
    legend: {
        enabled: false
    },
    yAxis: {
        visible: false
    },
    xAxis: {
        categories: categories,

        // Cấu hình ở đây
        labels: {
            x: 10,
            y: -25,
            align: 'left',
            style: {
                // Use whiteSpace: 'nowrap' to prevent wrapping of category labels
                whiteSpace: 'nowrap'
                // Use textOverflow: 'none' to prevent ellipsis (dots).
            }
        }
    },
    series: series
});
