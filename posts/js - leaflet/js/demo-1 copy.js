// const defaultCoord = [10.7743, 106.6669]; // coord mặc định, 9 giữa HCMC
const defaultCoord = [21.0819, 105.6363]; // coord mặc định, Hà Nội
const zoomLevel = 8;
const mymap = L.map('mapid').setView(defaultCoord, zoomLevel);

const token = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

// const tileLayerUrl = 'https://tiles-cdn-1.busmap.vn/hydda/full/{z}/{x}/{y}.png';

// "https://tiles-cdn-1.busmap.vn/thailand/{z}/{x}/{y}.png"
// "https://tiles-cdn-1.busmap.vn/hydda/full/{z}/{x}/{y}.png"

// const tileLayerUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + token;

const tileLayerUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';


// const tileLayerUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

L.tileLayer(tileLayerUrl, {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    attributionControl: false,
    // id: 'mapbox/streets-v11',
    // tileSize: 512,
    // zoomOffset: -1
}).addTo(map);

// L.marker([10.7743, 106.6669]).addTo(mapObj);

/*
L.marker([51.5, -0.09])
    .addTo(mymap)
    .bindPopup('<b>Hello world!</b><br />I am a popup.')
    .openPopup();

L.circle([51.508, -0.11], 500, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
})
    .addTo(mymap)
    .bindPopup('I am a circle.');

L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
])
    .addTo(mymap)
    .bindPopup('I am a polygon.');


const popup = L.popup();

function onMapClick(evt) {
    popup
        .setLatLng(evt.latlng)
        .setContent('You clicked the map at ' + evt.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);
*/
