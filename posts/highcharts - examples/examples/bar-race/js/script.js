// Dữ liệu
let initialData;

// Đối tượng biểu đồ
let chart;

// Năm bắt đầu và năm kết thúc
const startYear = 1960;
const endYear = 2018;

// Nút play / pause
const btn = document.getElementById('play-pause-button');

// Chọn năm
const input = document.getElementById('play-range');


/**
 * Calculate the data output.
 * Lấy ra top các quốc gia có dân số lớn nhất trong 1 năm nào đó.
 */
function getData(year) {
    // Mảng của mảng 2 phần tử
    // Không dùng categories vì sẽ không có hiệu ứng di chuyển các bar, biến mất hoặc thêm vào bar
    const output = initialData.map(data => {
        return [
            data['Country Name'], // key
            data[year] // value
        ];
    }).sort((a, b) => b[1] - a[1]);

    // Có cả dữ liệu của cả thế giới, là phần tử đầu tiên có chỉ số 0
    // Tiếp theo là 10 quốc gia lớn nhất có chỉ số từ 1 đến 10
    return ([output[0], output.slice(1, 11)]);
}


/**
 * Responsive input.
 * @param {*} chart
 */
function calculateInputWidth(chart) {
    // where 10 is a padding
    input.style.width = chart.plotWidth - chart.legend.legendWidth + chart.plotLeft / 2 - 10 + 'px';
}

/**
 * Vẽ biểu đồ.
 */
function drawChart() {
    const dataOfYear = getData(startYear);
    const worldTotal = dataOfYear[0][1];
    const topCountries = dataOfYear[1];

    chart = Highcharts.chart('container', {
        chart: {
            animation: {
                duration: 500
            },
            events: {
                render() {
                    const chart = this;
                    calculateInputWidth(chart);
                }
            },
            marginRight: 50
        },
        plotOptions: {
            series: {
                animation: false,
                groupPadding: 0,
                pointPadding: 0.1,
                borderWidth: 0
            }
        },
        title: {
            useHTML: true,
            text: `World population - overall: <b>${worldTotal}</b>`
        },

        legend: {
            align: 'right',
            verticalAlign: 'bottom',
            itemStyle: {
                fontWeight: 'bold',
                fontSize: '50px'
            },
            symbolHeight: 0.001,
            symbolWidth: 0.001,
            symbolRadius: 0.001
        },

        xAxis: {
            type: 'category'
        },

        yAxis: [
            {
                opposite: true,
                title: {
                    text: 'Population per country'
                },
                tickAmount: 5
            }
        ],

        series: [
            {
                colorByPoint: true,
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
                name: startYear,
                data: topCountries
            }
        ]
    });
}


/**
 * Update the chart.
 * This happens either on updating (moving) the range input,
 * or from a timer when the timeline is playing.
 */
function update(increment) {
    if (increment) {
        input.value = parseInt(input.value) + increment;
    }
    if (input.value >= endYear) {
        // Auto-pause
        pause(btn);
    }

    chart.update({
        title: {
            useHTML: true,
            text: `<div>World population - overall: <b>${getData(input.value)[0][1]}</b></span></div>`
        }
    }, false, false, false);

    chart.series[0].update({
        name: input.value,
        data: getData(input.value)[1]
    });
}


/**
 * Play the timeline.
 */
function play(button) {
    button.title = 'pause';
    button.className = 'la la-pause';
    chart.sequenceTimer = setInterval(function () {
        update(1);
    }, 500);
}


/**
 * Pause the timeline, either when the range is ended, or when clicking the pause button.
 * Pausing stops the timer and resets the button to play mode.
 */
function pause(button) {
    button.title = 'play';
    button.className = 'la la-play';
    clearTimeout(chart.sequenceTimer);
    chart.sequenceTimer = undefined;
}


function addHandlers() {
    btn.addEventListener('click', function () {
        if (chart.sequenceTimer) {
            pause(this);
        } else {
            play(this);
        }
    });

    /**
     * Trigger the update on the range bar click.
     */
    input.addEventListener('click', function () {
        update();
    });
}


/**
 * Animate dataLabels functionality
 * https://api.highcharts.com/class-reference/Highcharts.SVGElement
 */
function customLabelsChangingEffect(H) {
    const FLOAT = /^-?\d+\.?\d*$/;

    // Add animated textSetter, just like fill / strokeSetters
    H.Fx.prototype.textSetter = function (proceed) {
        let startValue = this.start.replace(/ /g, '');
        let endValue = this.end.replace(/ /g, '');
        let currentValue = this.end.replace(/ /g, '');

        if ((startValue || '').match(FLOAT)) {
            startValue = parseInt(startValue, 10);
            endValue = parseInt(endValue, 10);

            // No support for float
            currentValue = Highcharts.numberFormat(
                Math.round(startValue + (endValue - startValue) * this.pos),
                0
            );
        }

        this.elem.endText = this.end;

        this.elem.attr(
            this.prop,
            currentValue,
            null,
            true
        );
    };

    // Add textGetter, not supported at all at this moment
    H.SVGElement.prototype.textGetter = function (hash, elem) {
        const ct = this.text.element.textContent || '';
        return this.endText ? this.endText : ct.substring(0, ct.length / 2);
    };

    // Temporary change label.attr() with label.animate()
    // In core it's simple change attr(...) => animate(...) for text prop
    H.wrap(H.Series.prototype, 'drawDataLabels', function (proceed) {
        const attr = H.SVGElement.prototype.attr;
        const chart = this.chart;

        if (chart.sequenceTimer) {
            this.points.forEach(point => {
                (point.dataLabels || []).forEach(label => {
                    label.attr = function (hash, val) {
                        if (hash && hash.text !== undefined) {
                            const text = hash.text;
                            delete hash.text;
                            this.attr(hash);
                            this.animate({
                                text: text
                            });
                            return this;
                        } else {
                            return attr.apply(this, arguments);
                        }
                    };
                });
            });
        }

        const ret = proceed.apply(this, Array.prototype.slice.call(arguments, 1));

        this.points.forEach(point => {
            (point.dataLabels || []).forEach(label => {
                label.attr = attr;
            });
        });

        return ret;
    });
}


async function init() {
    // Lấy dữ liệu và vẽ biểu đồ
    // Dữ liệu là danh sách các quốc gia
    // Mỗi quốc gia có các trường thông tin chung là:
    // - Country Code: "KAZ"
    // - Country Name: "Kazakhstan"
    // - Indicator Code: "SP.POP.TOTL"
    // - Indicator Name: "Population, total"
    // Ngoài ra còn có các trường có key là các năm (2016, 2017,...), value là dân số của quốc gia trong năm đó
    // Link gốc:
    //   https://api.npoint.io/d70fd8f47a70326609bb
    const data = await fetch('data/world-population.json').then(resp => resp.json());
    initialData = data;
    drawChart();
    addHandlers();
    customLabelsChangingEffect(Highcharts);
}


init();
