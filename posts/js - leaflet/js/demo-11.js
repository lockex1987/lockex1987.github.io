const center = [16.073393070451104, 108.21673488616943];

const map = L.map(document.querySelector('#mapid'), {
    attributionControl: false,
    center: center,
    zoom: 6
});

// Phải đi với tọa độ thuộc Việt Nam, nếu không bị lỗi 403
const tileLayerUrl = 'https://tiles-cdn-1.busmap.vn/hydda/full/{z}/{x}/{y}.png';

L.tileLayer(tileLayerUrl)
    .addTo(map);
