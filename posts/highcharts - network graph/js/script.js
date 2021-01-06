import data from './data1.js';

// Add the nodes option through an event call. We want to start with the parent
// item and apply separate colors to each child element, then the same color to
// grandchildren.
function doSomething() {
    Highcharts.addEvent(
        Highcharts.Series,
        'afterSetOptions',
        function (e) {
            const colors = Highcharts.getOptions().colors;
            let i = 0;
            const nodes = {};

            if (this instanceof Highcharts.seriesTypes.networkgraph && e.options.id === 'react-tree') {
                e.options.data.forEach(function (link) {
                    const root = 'React ecosystem';
                    if (link[0] === root) {
                        nodes[root] = {
                            id: root,
                            marker: {
                                radius: 20
                            }
                        };
                        nodes[link[1]] = {
                            id: link[1],
                            marker: {
                                radius: 10
                            },
                            color: colors[i++]
                        };
                    } else if (nodes[link[0]] && nodes[link[0]].color) {
                        nodes[link[1]] = {
                            id: link[1],
                            color: nodes[link[0]].color
                        };
                    }
                });

                e.options.nodes = Object.keys(nodes).map(function (id) {
                    return nodes[id];
                });
            }
        }
    );
}

doSomething();

Highcharts.chart('container', {
    chart: {
        type: 'networkgraph',
        height: '100%'
    },
    title: {
        text: 'React ecosystem'
    },
    plotOptions: {
        networkgraph: {
            keys: [
                'from',
                'to'
            ],
            layoutAlgorithm: {
                friction: -0.9
            }
        }
    },
    series: [{
        dataLabels: {
            enabled: true,
            linkFormat: ''
        },
        id: 'react-tree',
        data: data
    }]
});
