function demoExportTable() {
    let wb = XLSX.utils.table_to_book(document.getElementById('dataTable'), { sheet: 'Sheet JS' });
    XLSX.writeFile(wb, 'test 2.xlsx');
}

document.querySelector('#buttonExportTable').addEventListener('click', () => {
    demoExportTable();
});
