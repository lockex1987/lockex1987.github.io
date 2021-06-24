const defaultCoord = [21.0819, 105.6363];
const zoomLevel = 9;
const containerId = 'mapid';
const map = L.map(containerId)
    .setView(defaultCoord, zoomLevel);

const tileLayerUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

L.tileLayer(tileLayerUrl, {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    attributionControl: false
})
    .addTo(map);

const popup = L.popup();

function onMapClick(evt) {
    popup.setLatLng(evt.latlng)
        .setContent('You clicked the map at ' + evt.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);
