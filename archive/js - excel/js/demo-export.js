function demoExport() {
    let wb = XLSX.utils.book_new();

    wb.Props = {
        Title: 'SheetJS Tutorial',
        Subject: 'Test',
        Author: 'Red Stapler',
        CreatedDate: new Date(2017, 12, 19)
    };

    wb.SheetNames.push('Test Sheet');

    // Array of array
    let ws_data = [
        ['hello', 'world']
    ];
    let ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets['Test Sheet'] = ws;

    XLSX.writeFile(wb, 'test 1b.xlsx');
}

document.querySelector('#buttonExport').addEventListener('click', () => {
    demoExport();
});
