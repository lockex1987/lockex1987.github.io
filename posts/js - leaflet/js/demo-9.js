const center = [-33.865, 151.2094];

const map = L.map(document.querySelector('#mapid'), {
    attributionControl: false,
    center: center,
    zoom: 6
});

const tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const osm = L.tileLayer(tileLayerUrl)
    .addTo(map);

const drawnItems = L.featureGroup()
    .addTo(map);

L.control
    .layers(
        {
            osm: osm,
            google: L.tileLayer(
                'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
                {
                    attribution: 'google'
                }
            )
        },
        {
            drawlayer: drawnItems
        },
        {
            position: 'topleft',
            collapsed: false
        }
    )
    .addTo(map);

map.addControl(
    new L.Control.Draw({
        edit: {
            featureGroup: drawnItems,
            poly: {
                allowIntersection: false
            }
        },
        draw: {
            polygon: {
                allowIntersection: false,
                showArea: true
            }
        }
    })
);

map.on(L.Draw.Event.CREATED, function (event) {
    const layer = event.layer;
    console.log(layer);
    drawnItems.addLayer(layer);
});
