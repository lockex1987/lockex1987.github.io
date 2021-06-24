const defaultCoord = [21.0819, 105.6363]; // tọa độ Hà Nội
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


const marker = L.marker([21.0819, 105.6363])
    .addTo(map);

const popup = L.popup();
popup.setContent('<b>Popup</b><br>Hello World');
marker.bindPopup(popup);
marker.bindTooltip('Xin chào');

marker.openPopup();
