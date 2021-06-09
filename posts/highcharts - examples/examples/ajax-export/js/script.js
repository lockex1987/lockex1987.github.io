async function exportChart() {
    const exportUrl = 'https://export.highcharts.com/';
    const options = {
        title: {
            text: ''
        },
        credits: {
            text: 'Truyền thông chủ động'
        },
        chart: {
            type: 'column'
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar']
        },
        series: [{
            data: [29.9, 71.5, 106.4]
        }]
    };

    // Tham số async bằng true thì sẽ trả về đường dẫn ảnh
    // Request trả về đường dẫn ảnh, không phải dữ liệu binary của ảnh
    // Kể cả truyền async=false thì vẫn trả về đường dẫn ảnh
    // Để trả về binary thì không truyền tham số async
    const dataString = encodeURI('type=image/png&width=800&options=' + JSON.stringify(options));

    const data = await fetch(exportUrl, {
        method: 'POST',
        body: dataString,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
        // .then(resp => resp.text())
        .then(resp => resp.blob())
        ;

    const img = document.createElement('img');
    img.onload = (evt) => {
        URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(data);
    // img.src = exportUrl + data;

    document.querySelector('#theImage').appendChild(img);
}

document.querySelector('#theButton').addEventListener('click', exportChart);
