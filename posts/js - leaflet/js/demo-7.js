const map = L.map(document.querySelector('#mapid'), {
    attributionControl: false,
    center: [51.5, -0.09],
    zoom: 13
});

const tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

L.tileLayer(tileLayerUrl)
    .addTo(map);

/*
const greenIcon = L.icon({
    // Ảnh chính
    iconUrl: 'images/leaf-green.png',
    // Ảnh bóng
    shadowUrl: 'images/leaf-shadow.png',
    // Kích thước của icon
    iconSize: [38, 95],
    // Kích thước của bóng
    shadowSize: [50, 64],
    // Point of the icon which will correspond to marker's location
    iconAnchor: [22, 94],
    // The same for the shadow
    shadowAnchor: [4, 62],
    // Point from which the popup should open relative to the iconAnchor
    popupAnchor: [-3, -76]
});

L.marker([51.5, -0.09], { icon: greenIcon })
    .addTo(map);
*/


const LeafIcon = L.Icon.extend({
    options: {
        shadowUrl: 'images/leaf-shadow.png',
        iconSize: [38, 95],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor: [-3, -76]
    }
});

const greenIcon = new LeafIcon({ iconUrl: 'images/leaf-green.png' });
const redIcon = new LeafIcon({ iconUrl: 'images/leaf-red.png' });
const orangeIcon = new LeafIcon({ iconUrl: 'images/leaf-orange.png' });

L.marker([51.5, -0.09], { icon: greenIcon })
    .addTo(map)
    .bindPopup('I am a green leaf.');
L.marker([51.495, -0.083], { icon: redIcon })
    .addTo(map)
    .bindPopup('I am a red leaf.');
L.marker([51.49, -0.1], { icon: orangeIcon })
    .addTo(map)
    .bindPopup('I am an orange leaf.');
