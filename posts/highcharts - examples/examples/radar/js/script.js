const MOCK_DATA = [
    { name: 'Atobe Keigo', power: 3.5, speed: 3, technique: 4, stamina: 5, mental: 3, image: 'atobe-keigo.jpg' },
    { name: 'Irie Kanata', power: 1, speed: 5, technique: 5, stamina: 2, mental: 5, image: 'irie-kanata.png' },
    { name: 'Liliadent Krauser', power: 5, speed: 3, technique: 3, stamina: 2, mental: 2, image: 'liliadent-krauser.png' },
    { name: 'Nakagauchi Sotomichi', power: 4, speed: 2.5, technique: 5, stamina: 5, mental: 3, image: 'nakagauchi-sotomichi.jpg' },
    { name: 'Shiraishi Kuranosuke', power: 3.5, speed: 3.5, technique: 3.5, stamina: 3.5, mental: 3.5, image: 'shiraishi-kuranosuke.jpg' },
    { name: 'Tezuka Kunimitsu', power: 3.5, speed: 3, technique: 5, stamina: 3, mental: 4.5, image: 'tezuka-kunimitsu.jpg' },
    { name: 'Yamato Yuudai', power: 2, speed: 2, technique: 2, stamina: 2, mental: 2, image: 'yamato-yuudai.jpg' }
];


new Vue({
    el: '#app',

    data() {
        return {
            // Danh sách nhân vật
            characters: MOCK_DATA,

            // Nhân vật hiện tại đang được chọn
            currentCharacter: null,

            // Đối tượng biểu đồ
            theChart: null
        };
    },

    mounted() {
        this.currentCharacter = this.characters[0];
        this.drawLinePolarChart();
    },

    methods: {
        changeCharacter(player) {
            this.currentCharacter = player;

            this.updateChart();
        },

        drawLinePolarChart() {
            const categories = [
                'Power',
                'Speed',
                'Technique',
                'Stamina',
                'Mental'
            ];
            const data = [
                this.currentCharacter.power,
                this.currentCharacter.speed,
                this.currentCharacter.technique,
                this.currentCharacter.stamina,
                this.currentCharacter.mental
            ];
            this.theChart = Highcharts.chart(this.$refs.chartContainer, {
                chart: {
                    // Radar (spider) chart là line area chart với polar bằng true?
                    polar: true,
                    type: 'area'
                },
                title: {
                    text: null
                },
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: false
                },
                xAxis: {
                    categories: categories,
                    tickmarkPlacement: 'on',
                    lineWidth: 0
                },
                yAxis: {
                    gridLineInterpolation: 'polygon',
                    lineWidth: 0,
                    // Phải có min và max để giữ nguyên các trục khi dữ liệu thay đổi
                    // Nếu không, các trục sẽ thay đổi cho phù hợp dữ liệu của từng nhân vật
                    min: 0,
                    max: 5,
                    // Ẩn label
                    labels: {
                        enabled: false
                    }
                },
                series: [
                    {
                        name: 'Character Statistic',
                        data: data,
                        pointPlacement: 'on',
                        // TODO: Màu viền, màu ở bên trong area, màu của vòng tròn điểm
                        // backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        // borderColor: 'rgba(255, 99, 132, 1)',
                        // pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                        // color: 'rgba(255, 99, 132, 0.3)'
                    }
                ]
            });

            // TODO: Sửa lại tooltip cho đúng
        },

        updateChart() {
            const newData = [
                this.currentCharacter.power,
                this.currentCharacter.speed,
                this.currentCharacter.technique,
                this.currentCharacter.stamina,
                this.currentCharacter.mental
            ];

            this.theChart.series[0].update({
                data: newData
            });
        }
    }
});
