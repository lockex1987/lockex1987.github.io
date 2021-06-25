const map = L.map(document.querySelector('#mapid'), {
    attributionControl: false,
    center: [16.0669077, 108.2137987],
    zoom: 9
});

const tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

L.tileLayer(tileLayerUrl)
    .addTo(map);

const latlngs = [
    [16.06214517239666, 108.20812225341798],
    [16.06445460023069, 108.23043823242189],
    [16.056948861781635, 108.21962356567384]
];
const polygon = L.polygon(latlngs, {
    color: 'red'
})
    .addTo(map);


// Zoom the map to the polygon
// map.fitBounds(polygon.getBounds());
map.fitBounds(latlngs);
