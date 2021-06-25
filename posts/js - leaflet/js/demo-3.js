const defaultCoord = [21.0819, 105.6363]; // tọa độ Hà Nội
const zoomLevel = 9;
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


const marker = L.marker([21.0819, 105.6363])
    .addTo(map);

const popup = L.popup({
    className: 'map-popup-content'
});
const popupHtml = `
    <div class='left'>
        <img src='images/avatar.jpg' />
    </div>
    <div class='right'>
        <b>Đây có gì hot?</b>
        <br />
        Một Popup có 1 cô gái tên là Lailah
    </div>
    <div class='clearfix'></div>`;
popup.setContent(popupHtml);
marker.bindPopup(popup);
marker.bindTooltip('Xin chào');
