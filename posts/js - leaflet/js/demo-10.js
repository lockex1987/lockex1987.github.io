const map = L.map(document.querySelector('#mapid'), {
    attributionControl: false,
    center: [-33.865, 151.2094],
    zoom: 6,
    contextmenu: true,
    contextmenuWidth: 140,
    contextmenuItems: [
        {
            text: 'Center map here',
            callback: centerMap
        },
        {
            text: 'Add marker here',
            callback: addMarker
        }
    ]
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    .addTo(map);

function centerMap(evt) {
    map.panTo(evt.latlng);
}

function addMarker(evt) {
    L.marker(evt.latlng)
        .addTo(map);
}
