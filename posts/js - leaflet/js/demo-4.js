const defaultCoord = [16.0669077, 108.2137987];
const zoomLevel = 13;
const containerId = 'mapid';
const map = L.map(containerId)
    .setView(defaultCoord, zoomLevel);

const tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

L.tileLayer(tileLayerUrl, {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    attributionControl: false
})
    .addTo(map);

const circle = L.circle([16.067423825201075, 108.19593429565431], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
})
    .addTo(map);

const polygon = L.polygon([
    [16.06214517239666, 108.20812225341798],
    [16.06445460023069, 108.23043823242189],
    [16.056948861781635, 108.21962356567384]
])
    .addTo(map);

/*
const rectOptions = { color: 'Red', weight: 1 };
const rectangle = L.rectangle(latlngs, rectOptions);
*/

circle.bindPopup('I am a circle.');
polygon.bindPopup('I am a polygon.');
