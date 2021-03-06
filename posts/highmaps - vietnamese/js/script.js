// Prepare demo data
// Data is joined to map using value of 'hc-key' property by default.
// See API docs for 'joinBy' for more info on linking data and map.
const data = [
    ['vn-yenbai', 30],
    ['vn-phutho', 20],
    ['vn-culaocham', 30],
    ['vn-quangninh', 30],
    ['vn-khanhhoa', 30],
    ['vn-tiengiang', 30],
    ['vn-br-vt', 30],
    ['vn-binhthuan', 30],
    ['vn-hochiminh', 30],
    ['vn-bentre', 30],
    ['vn-soctrang', 30],
    ['vn-laichau', 30],
    ['vn-sonla', 30],
    ['vn-thainguyen', 30],
    ['vn-hanoi', 30],
    ['vn-haiduong', 30],
    ['vn-bacninh', 30],
    ['vn-hungyen', 30],
    ['vn-vinhphuc', 30],
    ['vn-ninhbinh', 30],
    ['vn-hanam', 30],
    ['vn-hoabinh', 30],
    ['vn-bacgiang', 30],
    ['vn-thaibinh', 30],
    ['vn-lamdong', 30],
    ['vn-binhphuoc', 30],
    ['vn-tayninh', 30],
    ['vn-phuyen', 30],
    ['vn-binhdinh', 30],
    ['vn-haiphong', 30],
    ['vn-gialai', 30],
    ['vn-quangngai', 30],
    ['vn-dongnai', 30],
    ['vn-dongthap', 30],
    ['vn-cantho', 30],
    ['vn-longan', 30],
    ['vn-haugiang', 30],
    ['vn-baclieu', 30],
    ['vn-vinhlong', 30],
    ['vn-hagiang', 30],
    ['vn-namdinh', 30],
    ['vn-dienbien', 30],
    ['vn-langson', 30],
    ['vn-thanhhoa', 30],
    ['vn-backan', 30],
    ['vn-tuyenquang', 30],
    ['vn-hatinh', 30],
    ['vn-nghean', 30],
    ['vn-quangbinh', 30],
    ['vn-daklak', 30],
    ['vn-ninhthuan', 30],
    ['vn-daknong', 30],
    ['vn-kontum', 30],
    ['vn-quangnam', 30],
    ['vn-quangtri', 30],
    ['vn-hue', 30],
    ['vn-kiengiang', 30],
    ['vn-danang', 30],
    ['vn-angiang', 30],
    ['vn-camau', 30],
    ['vn-travinh', 30],
    ['vn-caobang', 30],
    ['vn-laocai', 30],
    ['vn-binhduong', 30]
];

const pointer = [
    {
        abbrev: 'BT',
        name: 'Bến Tre',
        lon: '106.496',
        lat: '10.171',
        z: 31275
    },
    {
        abbrev: 'HN',
        name: 'Hà Nội',
        lon: '105.872',
        lat: '21.1306',
        z: 31275
    }
];

// Create the chart
const map = Highcharts.mapChart('container', {
    chart: {
        map: 'countries/vn/vn-all',
        height: 800,
        // width: 800,
        // backgroundColor: '#235bb0'
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    credits: {
        enabled: false
    },
    mapNavigation: {
        enabled: true
    },
    plotOptions: {
        mappoint: {
            marker: {
                radius: 6
            }
        }
    },
    series: [
        {
            data: data,
            name: 'Các tỉnh/thành phố',
            color: '#002864',
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                useHTML: true,
                className: 'map-name',
                style: {
                    color: 'contrast',
                    fontSize: '8px',
                    fontWeight: '100',
                    textOutline: '0px contrast'
                }
            },
            showInLegend: false
        },
        {
            type: 'mappoint',
            dataLabels: {
                enabled: false,
                format: '{point.name}'
            },
            name: 'Tỉnh',
            data: pointer,
            color: '#00CE7D',
            dashStyle: 'none',
            className: 'pointer',
            showInLegend: false,
            tooltip: {
                pointFormat: '{point.z}'
            }
        }
    ]
});

Highcharts.each(map.series[1].points, function (point) {
    console.log(point.name);
});
