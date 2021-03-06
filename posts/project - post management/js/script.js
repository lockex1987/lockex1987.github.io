/**
 * Gộp những thể loại có ít hơn 10 bài viết.
 */
function normalizeCategories(categories) {
    const normalized = [];
    const names = [];
    normalized.push({
        name: 'other',
        y: 0
    });
    categories.forEach(c => {
        if (c.y >= 10) {
            normalized.push(c);
        } else {
            normalized[0].y += c.y;
            if (names.indexOf(c.name) < 0) {
                names.push(c.name);
            }
        }
    });
    normalized[0].name = names.slice(0, 10).join(', ') + ',...';
    return normalized;
}


/**
 * Vẽ biểu đồ thể loại và số bài viết.
 */
function buildChart(data, chartDivId) {
    Highcharts.chart(chartDivId, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            backgroundColor: 'transparent',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: null
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: false
                },
                showInLegend: true,
                depth: 35
            }
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false,
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'vertical'
        },
        series: [{
            name: 'Số bài',
            colorByPoint: true,
            data: data // categories
        }]
    });
}


async function getCategories() {
    const allCategories = await fetch('data/category-data.json').then(resp => resp.json());
    const normalizedCategories = normalizeCategories(allCategories);
    buildChart(normalizedCategories, 'postChart');

    let total = 0;
    allCategories.forEach(category => {
        total += category.y;
    });

    new Vue({
        el: '#app',
        data() {
            return {
                categories: allCategories, // .sort((a, b) => a.y - b.y)
                total
            };
        }
    });
}


getCategories();
