function downloadBlob(blob, fileName) {
    let link = window.URL.createObjectURL(blob);

    // Tạo một thẻ a tạm và giả lập thao tác click vào thẻ đó
    let a = document.createElement('a');
    a.download = fileName;
    a.innerHTML = 'Download file';
    a.href = link;
    a.style.display = 'none';
    a.onclick = function (evt) {
        // Remove the a tag
        document.body.removeChild(evt.target);
    };

    // Gắn nó vào DOM và thực hiện thao tác click
    document.body.appendChild(a);
    a.click();
}

function demoExport() {
    let workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet('My Sheet');
    worksheet.columns = [
        { header: 'Id', key: 'id', width: 10 },
        { header: 'Name', key: 'name', width: 32 },
        { header: 'D.O.B.', key: 'DOB', width: 10 }
    ];

    // Add a couple of Rows by key-value, after the last current row, using the column keys
    worksheet.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });
    worksheet.addRow({ id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7) });

    // Add a row by contiguous Array (assign to columns A, B & C)
    worksheet.addRow([3, 'Sam', new Date()]);

    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
    });

    // write to a new buffer
    workbook.xlsx.writeBuffer()
        .then((buffer) => {
            let blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            //saveAs(blob, 'fileName.xlsx');
            downloadBlob(blob, 'exceljs is cool.xlsx');
        });
}

document.querySelector('#buttonExport').addEventListener('click', () => {
    demoExport();
});

function demoImport(arrayBuffer) {
    let workbook = new ExcelJS.Workbook();
    workbook.xlsx.load(arrayBuffer)
        .then((workbook) => {
            let result = '';
            workbook.worksheets.forEach((worksheet) => {

            });

            // Đọc sheet đầu tiên
            let worksheet = workbook.worksheets[0];

            worksheet.eachRow((row, rowNumber) => {
                // Dữ liệu bắt đầu từ phần tử thứ nhất
                //console.log(row.values.splice(0, 1));
                result += rowNumber + ': ' + row.values.slice(1).join(', ') + '\n';
            });

            document.querySelector('#importResult').innerHTML = result;
        });
}


let input = document.querySelector('#inputExcel');

input.addEventListener('change', (evt) => {
    let reader = new FileReader();
    reader.addEventListener('load', () => {
        let arrayBuffer = reader.result;
        demoImport(arrayBuffer);
    });
    reader.readAsArrayBuffer(evt.target.files[0]);
});

