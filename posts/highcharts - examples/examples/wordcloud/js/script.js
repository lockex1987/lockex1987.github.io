let text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum erat ac justo sollicitudin, quis lacinia ligula fringilla. Pellentesque hendrerit, nisi vitae posuere condimentum, lectus urna accumsan libero, rutrum commodo mi lacus pretium erat. Phasellus pretium ultrices mi sed semper. Praesent ut tristique magna. Donec nisl tellus, sagittis ut tempus sit amet, consectetur eget erat. Sed ornare gravida lacinia. Curabitur iaculis metus purus, eget pretium est laoreet ut. Quisque tristique augue ac eros malesuada, vitae facilisis mauris sollicitudin. Mauris ac molestie nulla, vitae facilisis quam. Curabitur placerat ornare sem, in mattis purus posuere eget. Praesent non condimentum odio. Nunc aliquet, odio nec auctor congue, sapien justo dictum massa, nec fermentum massa sapien non tellus. Praesent luctus eros et nunc pretium hendrerit. In consequat et eros nec interdum. Ut neque dui, maximus id elit ac, consequat pretium tellus. Nullam vel accumsan lorem.';

let lines = text.split(/[,\. ]+/g);

let data = Highcharts.reduce(lines, (arr, word) => {
    let obj = Highcharts.find(arr, (obj) => {
        return obj.name === word;
    });
    if (obj) {
        obj.weight += 1;
    } else {
        obj = {
            name: word,
            weight: 1
        };
        arr.push(obj);
    }
    return arr;
}, []);

Highcharts.chart('container1', {
    series: [
        {
            type: 'wordcloud',
            data: data,
            name: 'Occurrences'
        }
    ],
    title: {
        text: 'Wordcloud of Lorem Ipsum'
    }
});

/*
Highcharts.setOptions({   
    colors: ['#3caac8']
});
*/

/**
 * Just a simple lineral scale function
 */
var makeScale = function (domain, range) {
    var minDomain = domain[0];
    var maxDomain = domain[1];
    var rangeStart = range[0];
    var rangeEnd = range[1];

    return (value) => {
        return rangeStart + (rangeEnd - rangeStart) * ((value - minDomain) / (maxDomain - minDomain));
    }
};

/**
 * Find min and max weight using reduce on data array
 */
var minWeight = data.reduce((min, word) =>
    (word.weight < min ? word.weight : min),
    data[0].weight
);

var maxWeight = data.reduce((max, word) =>
    (word.weight > max ? word.weight : max),
    data[0].weight
);

var scale = makeScale([minWeight, maxWeight], [0.3, 1]);

/**
 * creating a new, scaled data array
 */
var scaledData = data.map(word =>
    ({
        name: word.name,
        weight: word.weight,
        color: `rgba(60,170,200,${scale(word.weight)})`
    })
);

Highcharts.chart('container2', {
    series: [
        {
            type: 'wordcloud',
            data: scaledData,
            //data: data,
            rotation: {
                from: 0,
                to: 0,
            },
            minFontSize: 7,
            style: {
                fontFamily: 'Arial',
            },
            name: 'Occurrences'
        }
    ],
    title: {
        text: 'Wordcloud of Lorem Ipsum'
    }
});
