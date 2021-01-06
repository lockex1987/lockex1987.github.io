/**
 * Lấy dữ liệu từng năm.
 */
function getData(data) {
    return data.map((country, i) => ({
        name: country[0],
        y: country[1],
        color: countries[i].color
    }));
}


// Vẽ đồ thị
// Vẽ cho năm 2016
const chart = Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Summer Olympics 2016 - Top 5 countries by Gold medals'
    },
    subtitle: {
        text: 'Comparing to results from Summer Olympics 2012 - Source: <a href="https://en.wikipedia.org/wiki/2016_Summer_Olympics_medal_table">Wikipedia</a>'
    },
    plotOptions: {
        series: {
            grouping: false,
            borderWidth: 0
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        shared: true,
        headerFormat: '<span style="font-size: 15px">{point.point.name}</span><br/>',
        pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y} medals</b><br/>'
    },
    xAxis: {
        type: 'category',
        max: 4,
        labels: {
            useHTML: true,
            animate: true,
            formatter: function () {
                const value = this.value;
                let output;
                countries.forEach((country) => {
                    if (country.name === value) {
                        output = country.flag;
                    }
                });
                return '<span><img src="https://image.flaticon.com/icons/svg/197/' + output + '.svg" style="width: 40px; height: 40px;"/><br></span>';
            }
        }
    },
    yAxis: [{
        title: {
            text: 'Gold medals'
        },
        showFirstLabel: false
    }],
    series: [
        {
            color: 'rgb(158, 159, 163)',
            pointPlacement: -0.2,
            linkedTo: 'main',
            data: dataPrev[2016].slice(),
            name: '2012'
        },
        {
            name: '2016',
            id: 'main',
            dataSorting: {
                enabled: true,
                matchByName: true
            },
            dataLabels: [{
                enabled: true,
                inside: true,
                style: {
                    fontSize: '16px'
                }
            }],
            data: getData(data[2016]).slice()
        }
    ],
    credits: {
        enabled: false
    }
});

// Click vào các năm thì cập nhật biểu đồ
const years = [2016, 2012, 2008, 2004, 2000];
years.forEach((year) => {
    const btn = document.getElementById(year);
    btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-group button.active').forEach((active) => {
            active.classList.remove('active');
        });
        btn.classList.add('active');

        chart.update(
            {
                title: {
                    text: 'Summer Olympics ' + year + ' - Top 5 countries by Gold medals'
                },
                subtitle: {
                    text: 'Comparing to results from Summer Olympics ' + (year - 4) + ' - Source: <a href="https://en.wikipedia.org/wiki/' + (year) + '_Summer_Olympics_medal_table">Wikipedia</a>'
                },
                series: [
                    {
                        name: year - 4,
                        data: dataPrev[year].slice()
                    },
                    {
                        name: year,
                        data: getData(data[year]).slice()
                    }
                ]
            },
            true,
            false,
            {
                duration: 800
            }
        );
    });
});
