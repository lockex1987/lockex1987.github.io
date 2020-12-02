let input = document.querySelector('#inputExcel');

input.addEventListener('change', (evt) => {
    let reader = new FileReader();
    reader.readAsArrayBuffer(evt.target.files[0]);
    reader.addEventListener('load', () => {
        let data = new Uint8Array(reader.result);
        let wb = XLSX.read(data, { type: 'array' });
        let wbout = XLSX.write(wb, {
            sheet: 'Sheet JS',
            type: 'binary',
            bookType: 'html'
        });

        document.querySelector('#importResult').innerHTML = wbout;
        //input.value = '';
    });
});
