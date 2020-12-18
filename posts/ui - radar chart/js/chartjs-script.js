// Dữ liệu từ server
const data = [
    { name: 'Atobe Keigo', power: 3.5, speed: 3, technique: 4, stamina: 5, mental: 3, image: 'atobe-keigo.jpg' },
    { name: 'Irie Kanata', power: 1, speed: 5, technique: 5, stamina: 2, mental: 5, image: 'irie-kanata.png' },
    { name: 'Liliadent Krauser', power: 5, speed: 3, technique: 3, stamina: 2, mental: 2, image: 'liliadent-krauser.png' },
    { name: 'Nakagauchi Sotomichi', power: 4, speed: 2.5, technique: 5, stamina: 5, mental: 3, image: 'nakagauchi-sotomichi.jpg' },
    { name: 'Shiraishi Kuranosuke', power: 3.5, speed: 3.5, technique: 3.5, stamina: 3.5, mental: 3.5, image: 'shiraishi-kuranosuke.jpg' },
    { name: 'Tezuka Kunimitsu', power: 3.5, speed: 3, technique: 5, stamina: 3, mental: 4.5, image: 'tezuka-kunimitsu.jpg' },
    { name: 'Yamato Yuudai', power: 2, speed: 2, technique: 2, stamina: 2, mental: 2, image: 'yamato-yuudai.jpg' }
];

// Cấu hình biểu đồ
const config = {
    type: 'radar',
    data: {
        labels: ['Power', 'Speed', 'Technique', 'Stamina', 'Mental'],
        datasets: [
            {
                //label: 'Atobe Keigo',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                //data: [3.5, 3, 4, 5, 3]
            }
        ]
    },
    options: {
        legend: {
            position: 'top',
        },
        scale: {
            ticks: {
                max: 5,
                min: 0,
                stepSize: 1
            }
        }
    }
};

// Đối tượng biểu đồ
let myRadar;

/**
 * Hiển thị danh sách.
 */
function buildList() {
    var html = '<ul>';
    data.forEach((e, i) => {
        html += '<li><a href="" onclick="changePlayer(' + i + '); return false;">' + e.name + '</li>';
    });
    html += '</ul>';
    document.getElementById('list').innerHTML = html;
}

/**
 * Hàm khi click vào từng vận động viên.
 * @param {Integer} idx Chỉ số của vận động viên trong mảng dữ liệu
 */
function changePlayer(idx) {
    let player = data[idx];

    // Cập nhật biểu đồ
    let dataset = config.data.datasets[0];
    dataset.label = player.name;
    dataset.data = [player.power, player.speed, player.technique, player.stamina, player.mental];
    myRadar.update();

    // Cập nhật ảnh
    document.querySelector('#portrait').src = 'images/' + player.image;
}

/**
 * Khởi tạo.
 */
function init() {
    buildList();
    myRadar = new Chart('canvas', config);
    changePlayer(0);

    // Hàm changePlayer cần được chuyển thành global
    window.changePlayer = changePlayer;
}

init();
