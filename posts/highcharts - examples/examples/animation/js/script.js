/**
 * Easing function from https://github.com/danro/easing-js/blob/master/easing.js
 */
 function easeOutBounce(pos) {
    if ((pos) < (1 / 2.75)) {
        return (7.5625 * pos * pos);
    }
    if (pos < (2 / 2.75)) {
        return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
    }
    if (pos < (2.5 / 2.75)) {
        return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
    }
    return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
}

Math.easeOutBounce = easeOutBounce;


const MIN_VALUE = 100;
const MAX_VALUE = 150;

function generateData() {
    // 12 tháng
    const length = 12;
    const newData = new Array(length).fill(1).map(n => MIN_VALUE + Math.round(Math.random() * (MAX_VALUE - MIN_VALUE)));
    return newData;
}


const chart = Highcharts.chart('container', {
    chart: {
        // Updating with no animation
        // animation: false

        // With a longer duration
        /*
        animation: {
            duration: 1000
        }
        */

        // With a jQuery UI easing
        animation: {
            duration: 1500,
            easing: 'easeOutBounce'
        }
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
        min: MIN_VALUE,
        max: MAX_VALUE
    },
    series: [{
        data: generateData()
    }]
});


document.getElementById('update').addEventListener('click', () => {
    chart.series[0].update({
        data: generateData()
    });
});


Highcharts.chart('container2', {
    chart: {
        type: 'column'
    },
    xAxis: {
        categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    },
    series: [{
        data: [29.9, 71.5, 106.4, 129.2, 111],
        animation: {
            duration: 2000,
            // Uses Math.easeOutBounce
            easing: 'easeOutBounce'
        }
    }, {
        data: [29.9, 71.5, 106.4, 129.2, 111],
        animation: {
            duration: 1500,
            // Uses simple function
            easing: easeOutBounce
        }
    }]
});
