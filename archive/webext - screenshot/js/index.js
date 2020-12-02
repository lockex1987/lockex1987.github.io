function duplicateScreenshot() {
    html2canvas(document.querySelector("#capture"))
            .then(canvas => {
                document.body.appendChild(canvas);
            });
}

function exportScreenshot() {
    html2canvas(document.querySelector('#capture'))
            .then((canvas) => {
                saveCanvas(canvas, 'export.png');
            });
}

function saveCanvas(canvas, fileName) {
    var uri = canvas.toDataURL();
    saveAs(uri, fileName);
}

function saveAs(uri, fileName) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        link.href = uri;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        window.open(uri);
    }
}

function init() {
    document.querySelector('#exportButton').addEventListener('click', exportScreenshot);
    duplicateScreenshot();
}

init();
