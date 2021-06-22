// Format lại cho đẹp:
//     JSON.stringify(Highcharts.maps['custom/world'], null, 2)

// https://code.highcharts.com/mapdata/custom/world.js

// Chỉ giữ lại các trường cần thiết
// Ở từng features, bỏ các trường:
//     "type", "id"
// giữ trường "properties" và "geometry"
// trường "properties" bỏ các trường con, chỉ giữ các trường:
//     "hc-middle-x", "hc-middle-y", "name"
JSON.stringify(
    Highcharts.maps['custom/world'].features.map(e => {
        const props = e.properties;
        return {
            properties: {
                name: props.name,
                'hc-middle-x': props['hc-middle-x'],
                'hc-middle-y': props['hc-middle-y']
            },
            geometry: e.geometry
        };
    })
)


Highcharts.maps['custom/world'].features.forEach(e => {
    // e.id = e.properties.name;
    // e.code = e.properties.name;
});

/*
data.forEach(e => {
    e.id = e.name;
});
*/




/*
const point = mapChart.get('Vietnam');
point.zoomTo = function () {
    var b = this.series;
    b.xAxis.setExtremes(this._minX, this._maxX, !1);
    b.yAxis.setExtremes(this._minY, this._maxY, !1);
    b.chart.redraw();
};
point.zoomTo();
*/

// mapChart.mapZoom(5);
