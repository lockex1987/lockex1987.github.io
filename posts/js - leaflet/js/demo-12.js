function createMap() {
    const map = L.map(document.querySelector('#mapid'), {
        attributionControl: false,
        center: [21.0819, 105.6363],
        zoom: 9
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
        .addTo(map);

    return map;
}

const map = createMap();

/**
 * Force vẽ lại bản đồ.
 * Khi ẩn hiện, bản đồ có thể không load hết mà chỉ load một vài tile
 * vì khi display: none, Leaflet không tính được kích thước.
 */
function forceRerenderMap() {
    map.invalidateSize();
}

function showMap() {
    const container = document.querySelector('#mapid');
    container.style.display = '';

    forceRerenderMap();
}
