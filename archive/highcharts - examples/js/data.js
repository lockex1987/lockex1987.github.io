const DATA = [
    {
        title: 'Basic line',
        url: 'https://www.highcharts.com/demo/line-basic',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/line-basic/thumbnail.png'
    },
    {
        title: 'Ajax loaded data, clickable points',
        url: 'https://www.highcharts.com/demo/line-ajax',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/line-ajax/thumbnail.png'
    },
    {
        title: 'With data labels',
        url: 'https://www.highcharts.com/demo/line-labels',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/line-labels/thumbnail.png'
    },
    {
        title: 'With annotations',
        url: 'https://www.highcharts.com/demo/annotations',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/annotations/thumbnail.png'
    },
    {
        title: 'Time series, zoomable',
        url: 'https://www.highcharts.com/demo/line-time-series',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/line-time-series/thumbnail.png'
    },
    {
        title: 'Spline with inverted axes',
        url: 'https://www.highcharts.com/demo/spline-inverted',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/spline-inverted/thumbnail.png'
    },
    {
        title: 'Spline with symbols',
        url: 'https://www.highcharts.com/demo/spline-symbols',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/spline-symbols/thumbnail.png'
    },
    {
        title: 'Spline with plot bands',
        url: 'https://www.highcharts.com/demo/spline-plot-bands',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/spline-plot-bands/thumbnail.png'
    },
    {
        title: 'Time data with irregular intervals',
        url: 'https://www.highcharts.com/demo/spline-irregular-time',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/spline-irregular-time/thumbnail.png'
    },
    {
        title: 'Logarithmic axis',
        url: 'https://www.highcharts.com/demo/line-log-axis',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/line-log-axis/thumbnail.png'
    },
    {
        title: 'Line chart with 500k points',
        url: 'https://www.highcharts.com/demo/line-boost',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/line-boost/thumbnail.png'
    },
    {
        title: 'Basic area',
        url: 'https://www.highcharts.com/demo/area-basic',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/area-basic/thumbnail.png'
    },
    {
        title: 'Area with negative values',
        url: 'https://www.highcharts.com/demo/area-negative',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/area-negative/thumbnail.png'
    },
    {
        title: 'Stacked area',
        url: 'https://www.highcharts.com/demo/area-stacked',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/area-stacked/thumbnail.png'
    },
    {
        title: 'Percentage area',
        url: 'https://www.highcharts.com/demo/area-stacked-percent',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/area-stacked-percent/thumbnail.png'
    },
    {
        title: 'Area with missing points',
        url: 'https://www.highcharts.com/demo/area-missing',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/area-missing/thumbnail.png'
    },
    {
        title: 'Inverted axes',
        url: 'https://www.highcharts.com/demo/area-inverted',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/area-inverted/thumbnail.png'
    },
    {
        title: 'Area-spline',
        url: 'https://www.highcharts.com/demo/areaspline',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/areaspline/thumbnail.png'
    },
    {
        title: 'Area range',
        url: 'https://www.highcharts.com/demo/arearange',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/arearange/thumbnail.png'
    },
    {
        title: 'Area range and line',
        url: 'https://www.highcharts.com/demo/arearange-line',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/arearange-line/thumbnail.png'
    },
    {
        title: 'Sparkline charts',
        url: 'https://www.highcharts.com/demo/sparkline',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/sparkline/thumbnail.png'
    },
    {
        title: 'Streamgraph',
        url: 'https://www.highcharts.com/demo/streamgraph',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/streamgraph/thumbnail.png'
    },
    {
        title: 'Basic bar',
        url: 'https://www.highcharts.com/demo/bar-basic',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/bar-basic/thumbnail.png'
    },
    {
        title: 'Stacked bar',
        url: 'https://www.highcharts.com/demo/bar-stacked',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/bar-stacked/thumbnail.png'
    },
    {
        title: 'Bar with negative stack',
        url: 'https://www.highcharts.com/demo/bar-negative-stack',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/bar-negative-stack/thumbnail.png'
    },
    {
        title: 'Basic column',
        url: 'https://www.highcharts.com/demo/column-basic',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/column-basic/thumbnail.png'
    },
    {
        title: 'Column comparison',
        url: 'https://www.highcharts.com/demo/column-comparison',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/column-comparison/thumbnail.png'
    },
    {
        title: 'Column with negative values',
        url: 'https://www.highcharts.com/demo/column-negative',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/column-negative/thumbnail.png'
    },
    {
        title: 'Stacked column',
        url: 'https://www.highcharts.com/demo/column-stacked',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/column-stacked/thumbnail.png'
    },
    {
        title: 'Stacked and grouped column',
        url: 'https://www.highcharts.com/demo/column-stacked-and-grouped',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/column-stacked-and-grouped/thumbnail.png'
    },
    {
        title: 'Stacked percentage column',
        url: 'https://www.highcharts.com/demo/column-stacked-percent',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/column-stacked-percent/thumbnail.png'
    },
    {
        title: 'Column with rotated labels',
        url: 'https://www.highcharts.com/demo/column-rotated-labels',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/column-rotated-labels/thumbnail.png'
    },
    {
        title: 'Column with drilldown',
        url: 'https://www.highcharts.com/demo/column-drilldown',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/column-drilldown/thumbnail.png'
    },
    {
        title: 'Fixed placement columns',
        url: 'https://www.highcharts.com/demo/column-placement',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/column-placement/thumbnail.png'
    },
    {
        title: 'Data defined in a HTML table',
        url: 'https://www.highcharts.com/demo/column-parsed',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/column-parsed/thumbnail.png'
    },
    {
        title: 'Column range',
        url: 'https://www.highcharts.com/demo/columnrange',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/columnrange/thumbnail.png'
    },
    {
        title: 'Pie chart',
        url: 'https://www.highcharts.com/demo/pie-basic',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/pie-basic/thumbnail.png'
    },
    {
        title: 'Pie with legend',
        url: 'https://www.highcharts.com/demo/pie-legend',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/pie-legend/thumbnail.png'
    },
    {
        title: 'Donut chart',
        url: 'https://www.highcharts.com/demo/pie-donut',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/pie-donut/thumbnail.png'
    },
    {
        title: 'Semi circle donut',
        url: 'https://www.highcharts.com/demo/pie-semi-circle',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/pie-semi-circle/thumbnail.png'
    },
    {
        title: 'Pie with drilldown',
        url: 'https://www.highcharts.com/demo/pie-drilldown',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/pie-drilldown/thumbnail.png'
    },
    {
        title: 'Pie with gradient fill',
        url: 'https://www.highcharts.com/demo/pie-gradient',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/pie-gradient/thumbnail.png'
    },
    {
        title: 'Pie with monochrome fill',
        url: 'https://www.highcharts.com/demo/pie-monochrome',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/pie-monochrome/thumbnail.png'
    },
    {
        title: 'Variable radius pie',
        url: 'https://www.highcharts.com/demo/variable-radius-pie',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/variable-radius-pie/thumbnail.png'
    },
    {
        title: 'Scatter plot',
        url: 'https://www.highcharts.com/demo/scatter',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/scatter/thumbnail.png'
    },
    {
        title: 'Scatter plot with 1 million points',
        url: 'https://www.highcharts.com/demo/scatter-boost',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/scatter-boost/thumbnail.png'
    },
    {
        title: 'Bubble chart',
        url: 'https://www.highcharts.com/demo/bubble',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/bubble/thumbnail.png'
    },
    {
        title: '3D bubbles',
        url: 'https://www.highcharts.com/demo/bubble-3d',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/bubble-3d/thumbnail.png'
    },
    {
        title: 'Packed bubble chart',
        url: 'https://www.highcharts.com/demo/packed-bubble',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/packed-bubble/thumbnail.png'
    },
    {
        title: 'Split Packed bubble chart',
        url: 'https://www.highcharts.com/demo/packed-bubble-split',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/packed-bubble-split/thumbnail.png'
    },
    {
        title: 'Synchronized charts',
        url: 'https://www.highcharts.com/demo/synchronized-charts',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/synchronized-charts/thumbnail.png'
    },
    {
        title: 'Column, line and pie',
        url: 'https://www.highcharts.com/demo/combo',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/combo/thumbnail.png'
    },
    {
        title: 'Dual axes, line and column',
        url: 'https://www.highcharts.com/demo/combo-dual-axes',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/combo-dual-axes/thumbnail.png'
    },
    {
        title: 'Multiple axes',
        url: 'https://www.highcharts.com/demo/combo-multi-axes',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/combo-multi-axes/thumbnail.png'
    },
    {
        title: 'Scatter with regression line',
        url: 'https://www.highcharts.com/demo/combo-regression',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/combo-regression/thumbnail.png'
    },
    {
        title: 'Meteogram',
        url: 'https://www.highcharts.com/demo/combo-meteogram',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/combo-meteogram/thumbnail.png'
    },
    {
        title: 'Advanced timeline',
        url: 'https://www.highcharts.com/demo/combo-timeline',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/combo-timeline/thumbnail.png'
    },
    {
        title: 'Styled mode column',
        url: 'https://www.highcharts.com/demo/styled-mode-column',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/styled-mode-column/thumbnail.png'
    },
    {
        title: 'Styled mode pie',
        url: 'https://www.highcharts.com/demo/styled-mode-pie',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/styled-mode-pie/thumbnail.png'
    },
    {
        title: 'Accessible line chart',
        url: 'https://www.highcharts.com/demo/accessible-line',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/accessible-line/thumbnail.png'
    },
    {
        title: 'Accessible pie chart',
        url: 'https://www.highcharts.com/demo/accessible-pie',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/accessible-pie/thumbnail.png'
    },
    {
        title: 'Advanced accessible chart',
        url: 'https://www.highcharts.com/demo/advanced-accessible',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/advanced-accessible/thumbnail.png'
    },
    {
        title: 'Sonification',
        url: 'https://www.highcharts.com/demo/sonification',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/sonification/thumbnail.png'
    },
    {
        title: 'Spline updating each second',
        url: 'https://www.highcharts.com/demo/dynamic-update',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/dynamic-update/thumbnail.png'
    },
    {
        title: 'Click to add a point',
        url: 'https://www.highcharts.com/demo/dynamic-click-to-add',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/dynamic-click-to-add/thumbnail.png'
    },
    {
        title: 'Master-detail chart',
        url: 'https://www.highcharts.com/demo/dynamic-master-detail',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/dynamic-master-detail/thumbnail.png'
    },
    {
        title: 'Update options after render',
        url: 'https://www.highcharts.com/demo/chart-update',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/chart-update/thumbnail.png'
    },
    {
        title: 'Responsive chart',
        url: 'https://www.highcharts.com/demo/responsive',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/responsive/thumbnail.png'
    },
    {
        title: 'Live data from dynamic CSV',
        url: 'https://www.highcharts.com/demo/live-data',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/live-data/thumbnail.png'
    },
    {
        title: '3D column',
        url: 'https://www.highcharts.com/demo/3d-column-interactive',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/3d-column-interactive/thumbnail.png'
    },
    {
        title: '3D column with null and 0 values',
        url: 'https://www.highcharts.com/demo/3d-column-null-values',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/3d-column-null-values/thumbnail.png'
    },
    {
        title: '3D cylinder',
        url: 'https://www.highcharts.com/demo/cylinder',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/cylinder/thumbnail.png'
    },
    {
        title: '3D funnel',
        url: 'https://www.highcharts.com/demo/funnel3d',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/funnel3d/thumbnail.png'
    },
    {
        title: '3D pyramid',
        url: 'https://www.highcharts.com/demo/pyramid3d',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/pyramid3d/thumbnail.png'
    },
    {
        title: '3D column with stacking and grouping',
        url: 'https://www.highcharts.com/demo/3d-column-stacking-grouping',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/3d-column-stacking-grouping/thumbnail.png'
    },
    {
        title: '3D pie',
        url: 'https://www.highcharts.com/demo/3d-pie',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/3d-pie/thumbnail.png'
    },
    {
        title: '3D donut',
        url: 'https://www.highcharts.com/demo/3d-pie-donut',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/3d-pie-donut/thumbnail.png'
    },
    {
        title: '3D scatter chart',
        url: 'https://www.highcharts.com/demo/3d-scatter-draggable',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/3d-scatter-draggable/thumbnail.png'
    },
    {
        title: 'Gauge series',
        url: 'https://www.highcharts.com/demo/gauge-speedometer',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/gauge-speedometer/thumbnail.png'
    },
    {
        title: 'Solid gauge',
        url: 'https://www.highcharts.com/demo/gauge-solid',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/gauge-solid/thumbnail.png'
    },
    {
        title: 'Activity gauge',
        url: 'https://www.highcharts.com/demo/gauge-activity',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/gauge-activity/thumbnail.png'
    },
    {
        title: 'Clock',
        url: 'https://www.highcharts.com/demo/gauge-clock',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/gauge-clock/thumbnail.png'
    },
    {
        title: 'Gauge with dual axes',
        url: 'https://www.highcharts.com/demo/gauge-dual',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/gauge-dual/thumbnail.png'
    },
    {
        title: 'VU meter',
        url: 'https://www.highcharts.com/demo/gauge-vu-meter',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/gauge-vu-meter/thumbnail.png'
    },
    {
        title: 'Bullet graph',
        url: 'https://www.highcharts.com/demo/bullet-graph',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/bullet-graph/thumbnail.png'
    },
    {
        title: 'Heat map',
        url: 'https://www.highcharts.com/demo/heatmap',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/heatmap/thumbnail.png'
    },
    {
        title: 'Large heat map',
        url: 'https://www.highcharts.com/demo/heatmap-canvas',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/heatmap-canvas/thumbnail.png'
    },
    {
        title: 'Tile map, honeycomb',
        url: 'https://www.highcharts.com/demo/honeycomb-usa',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/honeycomb-usa/thumbnail.png'
    },
    {
        title: 'Tree map with color axis',
        url: 'https://www.highcharts.com/demo/treemap-coloraxis',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/treemap-coloraxis/thumbnail.png'
    },
    {
        title: 'Tree map with levels',
        url: 'https://www.highcharts.com/demo/treemap-with-levels',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/treemap-with-levels/thumbnail.png'
    },
    {
        title: 'Large tree map',
        url: 'https://www.highcharts.com/demo/treemap-large-dataset',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/treemap-large-dataset/thumbnail.png'
    },
    {
        title: 'Polar (radar) chart',
        url: 'https://www.highcharts.com/demo/polar',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/polar/thumbnail.png'
    },
    {
        title: 'Spiderweb',
        url: 'https://www.highcharts.com/demo/polar-spider',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/polar-spider/thumbnail.png'
    },
    {
        title: 'Sunburst',
        url: 'https://www.highcharts.com/demo/sunburst',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/sunburst/thumbnail.png'
    },
    {
        title: 'Wind rose',
        url: 'https://www.highcharts.com/demo/polar-wind-rose',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/polar-wind-rose/thumbnail.png'
    },
    {
        title: 'Radial bar chart',
        url: 'https://www.highcharts.com/demo/polar-radial-bar',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/polar-radial-bar/thumbnail.png'
    },
    {
        title: 'Parallel coordinates',
        url: 'https://www.highcharts.com/demo/parallel-coordinates',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/parallel-coordinates/thumbnail.png'
    },
    {
        title: 'Wind barb',
        url: 'https://www.highcharts.com/demo/windbarb-series',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/windbarb-series/thumbnail.png'
    },
    {
        title: 'Vector plot',
        url: 'https://www.highcharts.com/demo/vector-plot',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/vector-plot/thumbnail.png'
    },
    {
        title: 'Box plot',
        url: 'https://www.highcharts.com/demo/box-plot',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/box-plot/thumbnail.png'
    },
    {
        title: 'Error bar',
        url: 'https://www.highcharts.com/demo/error-bar',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/error-bar/thumbnail.png'
    },
    {
        title: 'Waterfall',
        url: 'https://www.highcharts.com/demo/waterfall',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/waterfall/thumbnail.png'
    },
    {
        title: 'Variwide',
        url: 'https://www.highcharts.com/demo/variwide',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/variwide/thumbnail.png'
    },
    {
        title: 'Histogram',
        url: 'https://www.highcharts.com/demo/histogram',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/histogram/thumbnail.png'
    },
    {
        title: 'Bell curve',
        url: 'https://www.highcharts.com/demo/bellcurve',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/bellcurve/thumbnail.png'
    },
    {
        title: 'Funnel chart',
        url: 'https://www.highcharts.com/demo/funnel',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/funnel/thumbnail.png'
    },
    {
        title: 'Pyramid chart',
        url: 'https://www.highcharts.com/demo/pyramid',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/pyramid/thumbnail.png'
    },
    {
        title: 'Polygon series',
        url: 'https://www.highcharts.com/demo/polygon',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/polygon/thumbnail.png'
    },
    {
        title: 'Pareto chart',
        url: 'https://www.highcharts.com/demo/pareto',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/pareto/thumbnail.png'
    },
    {
        title: 'Sankey diagram',
        url: 'https://www.highcharts.com/demo/sankey-diagram',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/sankey-diagram/thumbnail.png'
    },
    {
        title: 'Dependency wheel',
        url: 'https://www.highcharts.com/demo/dependency-wheel',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/dependency-wheel/thumbnail.png'
    },
    {
        title: 'Organization chart',
        url: 'https://www.highcharts.com/demo/organization-chart',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/organization-chart/thumbnail.png'
    },
    {
        title: 'X-range series',
        url: 'https://www.highcharts.com/demo/x-range',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/x-range/thumbnail.png'
    },
    {
        title: 'Word cloud',
        url: 'https://www.highcharts.com/demo/wordcloud',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/wordcloud/thumbnail.png'
    },
    {
        title: 'Column pyramid chart',
        url: 'https://www.highcharts.com/demo/column-pyramid',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/column-pyramid/thumbnail.png'
    },
    {
        title: 'Timeline',
        url: 'https://www.highcharts.com/demo/timeline',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/timeline/thumbnail.png'
    },
    {
        title: 'Parliament (item) chart',
        url: 'https://www.highcharts.com/demo/parliament-chart',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/parliament-chart/thumbnail.png'
    },
    {
        title: 'Network graph (force directed graph)',
        url: 'https://www.highcharts.com/demo/network-graph',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/network-graph/thumbnail.png'
    },
    {
        title: 'General drawing',
        url: 'https://www.highcharts.com/demo/renderer',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/renderer/thumbnail.png'
    },
    {
        title: 'Venn diagram',
        url: 'https://www.highcharts.com/demo/venn-diagram',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/venn-diagram/thumbnail.png'
    },
    {
        title: 'Euler diagram',
        url: 'https://www.highcharts.com/demo/euler-diagram',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/euler-diagram/thumbnail.png'
    },
    {
        title: 'Dumbbell series',
        url: 'https://www.highcharts.com/demo/dumbbell',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/dumbbell/thumbnail.png'
    },
    {
        title: 'Lollipop series',
        url: 'https://www.highcharts.com/demo/lollipop',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/lollipop/thumbnail.png'
    },
    {
        title: 'Flame chart',
        url: 'https://www.highcharts.com/demo/flame',
        image: 'https://www.highcharts.com/demo/images/samples/highcharts/demo/flame/thumbnail.png'
    }
];
