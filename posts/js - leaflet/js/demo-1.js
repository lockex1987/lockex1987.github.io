/*
const defaultCoord = [21.0819, 105.6363]; // tọa độ Hà Nội
const zoomLevel = 9;
const containerId = 'mapid';
const map = L.map(containerId)
    .setView(defaultCoord, zoomLevel);
*/


const map = L.map('mapid', {
    // Để ko hiện watermark nữa, nếu bị liên hệ đòi thì nhớ open nha
    attributionControl: false,
    center: [21.0819, 105.6363],
    zoom: 9
});

// URL rút gọn là http://{s}.tile.osm.org/{z}/{x}/{y}.png
const tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

L.tileLayer(tileLayerUrl, {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
})
    .addTo(map);
