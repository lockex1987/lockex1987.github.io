const center = [-33.8650, 151.2094];

const map = L.map(document.querySelector('#mapid'), {
    attributionControl: false,
    center: center,
    zoom: 6
});

const tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

L.tileLayer(tileLayerUrl)
    .addTo(map);

/*
L.marker(center)
    .addTo(map);
*/



/*
const MyCustomMarker = L.Icon.extend({
    options: {
        shadowUrl: null,
        iconAnchor: new L.Point(12, 12),
        iconSize: new L.Point(24, 24),
        iconUrl: 'link/to/image.png'
    }
});
*/

const editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

const drawPluginOptions = {
    position: 'topright',
    draw: {
        polygon: {
            // Restricts shapes to simple polygons
            allowIntersection: false,
            drawError: {
                // Color the shape will turn when intersects
                color: '#e1e100',
                // Message that will show when intersect
                message: '<strong>Oh snap!<strong> you can\'t draw that!'
            },
            shapeOptions: {
                color: '#97009c'
            }
        },
        // Disable toolbar item by setting it to false
        // Turns off this drawing tool
        polyline: false,
        /*
        polyline: {
            shapeOptions: {
                color: '#f357a1',
                weight: 10
            }
        },
        */
        circle: false,
        rectangle: false,
        /*
        rectangle: {
            shapeOptions: {
                clickable: false
            }
        },
        */
        marker: false,
        /*
        marker: {
            icon: new MyCustomMarker()
        }
        */
        circlemarker: false
    },
    edit: {
        featureGroup: editableLayers, // REQUIRED!!
        remove: true
    }
};

// Initialise the draw control and pass it the FeatureGroup of editable layers
const drawControl = new L.Control.Draw(drawPluginOptions);
map.addControl(drawControl);



map.on(L.Draw.Event.CREATED, function (evt) {
    const type = evt.layerType;
    const layer = evt.layer;

    if (type === 'marker') {
        // layer.bindPopup('A popup!');
    }

    editableLayers.addLayer(layer);
});
