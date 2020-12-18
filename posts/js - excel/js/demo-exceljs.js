/**
 * Xuất báo cáo Excel.
 */
async function demoExport() {
    // Khởi tạo Workbook, Worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Báo cáo');

    // Cấu hình cột
    worksheet.columns = [
        { header: 'Id', key: 'id', width: 10 },
        { header: 'Name', key: 'name', width: 32 },
        { header: 'D.O.B.', key: 'dob', width: 15 }
    ];

    // Thêm dòng dữ liệu theo key
    worksheet.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });
    worksheet.addRow({ id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7) });

    // Thêm dòng dữ liệu theo mảng
    worksheet.addRow([3, 'Sam', new Date()]);

    // Format
    worksheet.getRow(1).eachCell((cell) => {
        cell.font = {
            bold: true
        };
    });

    // Lưu file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    CommonUtils.downloadBlob(blob, 'exceljs is cool.xlsx');
}


/**
 * Import file Excel.
 * @param {ArrayBuffer} arrayBuffer File Excel
 */
async function demoImport(arrayBuffer) {
    // Load từ buffer
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(arrayBuffer);
    
    let result = '';
    workbook.worksheets.forEach((worksheet) => {

    });

    // Đọc sheet đầu tiên
    const worksheet = workbook.worksheets[0];
    worksheet.eachRow((row, rowNumber) => {
        // Dữ liệu bắt đầu từ phần tử thứ nhất
        // console.log(row.values.splice(0, 1));
        result += rowNumber + ': ' + row.values.slice(1).join(', ') + '\n';
    });
    document.querySelector('#importResult').innerHTML = result;
}


function init() {
    document.querySelector('#buttonExport').addEventListener('click', demoExport);

    const input = document.querySelector('#inputExcel');
    input.addEventListener('change', (evt) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            const arrayBuffer = reader.result;
            demoImport(arrayBuffer);
        });
        reader.readAsArrayBuffer(evt.target.files[0]);
    });
}


init();
