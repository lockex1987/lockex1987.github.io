const map = L.map(document.querySelector('#mapid'), {
    attributionControl: false,
    center: [16.073393070451104, 108.21673488616943],
    zoom: 6
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    .addTo(map);


function setDrawLocalVietnamese() {
    // Lấy cấu hình ngôn ngữ hiện tại
    // console.log(JSON.stringify(L.drawLocal, null, 4));

    // Sửa cấu hình ngôn ngữ thành tiếng Việt
    L.drawLocal = {
        draw: {
            toolbar: {
                actions: {
                    title: 'Hủy vẽ',
                    text: 'Hủy'
                },
                finish: {
                    title: 'Kết thúc vẽ',
                    text: 'Kết thúc'
                },
                undo: {
                    title: 'Xóa điểm cuối cùng được vẽ',
                    text: 'Xóa điểm cuối cùng'
                },
                buttons: {
                    polyline: 'Draw a polyline',
                    polygon: 'Vẽ một đa giác',
                    rectangle: 'Draw a rectangle',
                    circle: 'Vẽ một hình tròn',
                    marker: 'Draw a marker',
                    circlemarker: 'Draw a circlemarker'
                }
            },

            handlers: {
                circle: {
                    tooltip: {
                        start: 'Click và drag để vẽ hình tròn.'
                    },
                    radius: 'Bán kính'
                },
                circlemarker: {
                    tooltip: {
                        start: 'Click map to place circle marker.'
                    }
                },
                marker: {
                    tooltip: {
                        start: 'Click map to place marker.'
                    }
                },
                polygon: {
                    tooltip: {
                        start: 'Click để bắt đầu vẽ hình.',
                        cont: 'Click để tiếp tục vẽ hình.',
                        end: 'Click điểm đầu tiên để đóng hình này.'
                    }
                },
                polyline: {
                    error: '<strong>Error:</strong> shape edges cannot cross!',
                    tooltip: {
                        start: 'Click to start drawing line.',
                        cont: 'Click to continue drawing line.',
                        end: 'Click last point to finish line.'
                    }
                },
                rectangle: {
                    tooltip: {
                        start: 'Click and drag to draw rectangle.'
                    }
                },
                simpleshape: {
                    tooltip: {
                        end: 'Release mouse to finish drawing.'
                    }
                }
            }
        },

        edit: {
            toolbar: {
                actions: {
                    save: {
                        title: 'Lưu các thay đổi',
                        text: 'Lưu'
                    },
                    cancel: {
                        title: 'Hủy việc chỉnh sửa, bỏ qua tất cả thay đổi',
                        text: 'Hủy'
                    },
                    clearAll: {
                        title: 'Clear tất cả layer',
                        text: 'Clear tất cả'
                    }
                },
                buttons: {
                    edit: 'Edit layers',
                    editDisabled: 'No layers to edit',
                    remove: 'Xóa layer',
                    removeDisabled: 'Không có layer nào'
                }
            },

            handlers: {
                edit: {
                    tooltip: {
                        text: 'Drag handles or markers to edit features.',
                        subtext: 'Click cancel to undo changes.'
                    }
                },
                remove: {
                    tooltip: {
                        text: 'Click vào một layer nào đó để xóa.'
                    }
                }
            }
        }
    };
}

setDrawLocalVietnamese();


// Layer chứa các hình được vẽ
const editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);


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

// Cấu hình thanh điều khiển vẽ
const drawControl = new L.Control.Draw({
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
        featureGroup: editableLayers,
        remove: true,
        edit: false
    }
});

// Thanh điều khiển chỉ cho phép vẽ
const drawControlDrawOnly = new L.Control.Draw({
    draw: {
        polyline: false
    },
    edit: {
        featureGroup: editableLayers,
        edit: false,
        remove: false
    }
});

// Thanh điều khiển chỉ cho phép xóa
const drawControlRemoveOnly = new L.Control.Draw({
    draw: false,
    edit: {
        featureGroup: editableLayers,
        edit: false
    }
});

// Thêm thanh điều khiển vào bản đồ
// map.addControl(drawControl);
drawControlDrawOnly.addTo(map);

// Bắt sự kiện vẽ mới
map.on(L.Draw.Event.CREATED, (evt) => {
    const type = evt.layerType;
    const layer = evt.layer;

    // console.log(type);
    // console.log(layer);

    if (type == 'circle') {
        // Circle sẽ gồm _latlng và _mRadius (tính theo mét)
        // console.log(layer._latlng);
        // console.log(layer._mRadius);
        // console.log(layer.getRadius());
        // console.log(layer.getLatLng());
        const latlng = layer.getLatLng();
        console.log(latlng.lat);
        console.log(latlng.lng);
    } else if (type == 'polygon') {
        // Polygon chứa mảng _latlngs
        // console.log(layer._latlngs);
        // console.log(layer.getLatLngs());
        // console.log(layer.getLatLngs().length);
        // Mảng một phần tử
        layer.getLatLngs()[0].forEach(latlng => {
            // console.log(latlng);
            console.log(latlng.lat);
            console.log(latlng.lng);
        });
    } else if (type === 'marker') {
        layer.bindPopup('A popup!');
    }

    editableLayers.addLayer(layer);

    checkDrawControl();
});


map.on('draw:edited', function (evt) {
    const layers = evt.layers;
    layers.eachLayer(function (layer) {
        console.log(layer);
    });
});


// Bắt sự kiện xóa hình vẽ
map.on(L.Draw.Event.DELETED, (evt) => {
    checkDrawControl();
});


function checkDrawControl() {
    // map.addControl(drawControl);
    if (editableLayers.getLayers().length === 0) {
        drawControlRemoveOnly.remove(map);
        drawControlDrawOnly.addTo(map);
    } else {
        drawControlDrawOnly.remove(map);
        drawControlRemoveOnly.addTo(map);
    }
}

/**
 * Hiển thị dữ liệu cũ để chỉnh sửa.
 */
function addLayer() {
    const coords = [
        { lat: -31.87755764334002, lng: 146.34887695312503 },
        { lat: -30.486550842588485, lng: 148.48022460937503 },
        { lat: -32.37996146435729, lng: 152.06176757812503 },
        { lat: -34.542762387234845, lng: 149.51293945312503 },
        { lat: -34.198173096277245, lng: 147.18383789062503 }
    ];
    const arr = coords.map(e => [e.lat, e.lng]);
    const polygon = L.polygon(arr);
    editableLayers.addLayer(polygon);
}

/**
 * Lấy danh sách dữ liệu hiện tại, lưu vào DB.
 */
function getLayers() {
    editableLayers.eachLayer(layer => {
        // console.log(layer);
        console.log(layer._latlngs);
    });
    // console.log(editableLayers.getLayers());
}
