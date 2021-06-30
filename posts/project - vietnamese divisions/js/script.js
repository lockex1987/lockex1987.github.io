async function getProvinceList() {
    const data = await fetch('data/provinceList.json').then(resp => resp.json());
    return data;
}


function initVue(provinceList) {
    new Vue({
        el: '#app',

        data() {
            return {
                provinceList,
                map: null
            };
        },

        mounted() {
            this.initMap();
            this.addMarkers();
        },

        methods: {
            initMap() {
                this.map = L.map(this.$refs.mapContainer, {
                    attributionControl: false,
                    center: [21.0819, 105.6363],
                    zoom: 8
                });

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
                    .addTo(this.map);
            },

            addMarkers() {
                this.provinceList.forEach(province => {
                    const latlng = L.latLng(province.lat, province.lng);
                    const marker = L.marker(latlng)
                        .addTo(this.map)
                        .bindPopup(province.name);
                    province.latlng = latlng;
                    province.marker = marker;
                });
            },

            chooseProvince(province) {
                this.map.panTo(province.latlng);
                province.marker.openPopup();
            }
        }
    });
}


async function main() {
    const provinceList = await getProvinceList();
    initVue(provinceList);
}

main();

