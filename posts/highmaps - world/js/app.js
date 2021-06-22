new Vue({
    el: '#app',

    data() {
        return {
            countries: [],
            selectedCode: '',
            map: null
        };
    },

    computed: {
        selectedCountry() {
            if (!this.selectedCode) {
                return null;
            }

            const obj = this.countries.find(country => country.alpha3Code == this.selectedCode);
            if (!obj) {
                return null;
            }

            return obj;
        }
    },

    async mounted() {
        await this.getCountries();

        const idx = Math.floor(Math.random() * this.countries.length);
        this.selectedCode = this.countries[idx].alpha3Code;

        const data = this.countries.map(country => ({
            name: Highcharts.normalizeCountryName(country.name),
            z: country.population,
            alpha3Code: country.alpha3Code
        }));

        // Dữ liệu bản đồ đang khác hoặc không có
        // Dữ liệu bản đồ đang không có:
        /*
        ABW: Aruba
        BMU: Bermuda
        CUW: Curacao
        CYM: Cayman Islands
        FRO: Faroe Islands
        GIB: Gibraltar
        HKG: Hong Kong
        IMN: Isle of Man
        MAC: Macao
        MAF: Saint Martin
        NCL: New Caledonia
        PSE: Palestinian Territory
        PYF: French Polynesia
        SXM: Sint Maarten
        TCA: Turks and Caicos Islands
        VGB: British Virgin Islands
        */
        data.map(e => {
            const obj = Highcharts.maps['custom/world'].features.find(x => x.properties['iso-a3'] == e.alpha3Code);
            if (!obj) {
                // console.log(e['name']);
            }
        });

        this.drawNormalMap();



        this.drawPopulationMap(data);
    },

    methods: {
        zoomToCountry() {
            // zoom to the country using "id" from data serie
            this.map.get(this.selectedCode).zoomTo();
        },

        async getCountries() {
            this.countries = await fetch('https://restcountries.eu/rest/v2/all').then(resp => resp.json());
        },

        // https://www.highcharts.com/maps/demo/all-maps#countries/cn/cn-all
        drawNormalMap() {
            const data = Highcharts.maps['custom/world'].features
                .map(x => ({
                    name: x.properties.name,
                    z: 1,
                    alpha3Code: x.properties['iso-a3'],
                    id: x.properties['iso-a3']
                }));

            this.map = Highcharts.mapChart(this.$refs.normalMapContainer, {
                chart: {
                    map: 'custom/world'
                },

                legend: {
                    enabled: false
                },

                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                    // enableDoubleClickZoomTo: true
                },

                series: [
                    {
                        name: 'Quốc gia',
                        color: '#E0E0E0',
                        // enableMouseTracking: false,
                        states: {
                            hover: {
                                color: '#a4edba'
                            }
                        },
                        allowPointSelect: true,
                        events: {
                            click(evt) {
                                // console.log(evt);
                                evt.point.zoomTo();
                            }
                        },
                        data: data,

                        // Join trường 'iso-a3' ở bản đồ gốc world.js
                        // với trường alpha3Code ở dữ liệu
                        joinBy: [
                            'iso-a3',
                            'alpha3Code'
                        ],

                        tooltip: {
                            headerFormat: '',
                            pointFormat: '{point.properties.name}'
                        }
                    }
                ]
            });
        },

        drawPopulationMap(data) {
            const mapChart = Highcharts.mapChart(this.$refs.bubbleMapContainer, {
                chart: {
                    map: 'custom/world'
                },

                legend: {
                    enabled: false
                },

                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                },

                series: [
                    {
                        name: 'Countries',
                        color: '#E0E0E0',
                        enableMouseTracking: false
                    },
                    {
                        type: 'mapbubble',
                        name: 'Dân số thế giới',

                        // Join trường 'iso-a3' ở bản đồ gốc world.js
                        // với trường alpha3Code ở dữ liệu
                        joinBy: [
                            'iso-a3',
                            'alpha3Code'
                        ],

                        /*
                        joinBy: [
                            'name'
                        ],
                        */

                        data: data,
                        minSize: 4,
                        maxSize: '12%',
                        tooltip: {
                            pointFormat: '{point.properties.name}: {point.z} thousands'
                        },
                        allowPointSelect: true,
                        events: {
                            click(evt) {
                                console.log(evt);
                                evt.point.zoomTo();
                            }
                        }
                    }
                ]
            });
        }
    }
});
