
async function exportScreenshot() {
    const domObj = document.querySelector('#capture');
    const fileName = 'export.png';

    // exportScreenshotHtml2canvas(domObj, fileName);
    exportScreenshotDomtoimage(domObj, fileName);
    // exportScreenshotRasterizehtml(domObj, fileName);
}

async function exportScreenshotHtml2canvas(domObj, fileName) {
    const canvas = await html2canvas(domObj);

    // document.body.appendChild(canvas);

    canvas.toBlob((blob) => {
        CommonUtils.downloadBlob(blob, fileName);
    });
}

async function exportScreenshotDomtoimage(domObj, fileName) {
    const blob = await domtoimage.toBlob(domObj);
    CommonUtils.downloadBlob(blob, fileName);
}

function exportScreenshotRasterizehtml(domObj, fileName) {
    const canvas = document.getElementById('theCanvas');
    console.log(canvas);
    rasterizeHTML.drawDocument(domObj, canvas).then((renderResult) => {
        console.log(renderResult);
        // const ctx = canvas.getContext('2d');
        // ctx.drawImage(renderResult.image, -8, -8);

        canvas.toBlob((blob) => {
            CommonUtils.downloadBlob(blob, fileName);
        });
    });
}

function rasterizeHtmlDemo() {
    const canvas = document.getElementById('theCanvas');
    const html = `<div style="font-size: 20px;">
                Some <span style="color: green">HTML</span>
                with an image
                <img src="images/ghostscript_tiger_2x.png">
            </div>`;
    rasterizeHTML.drawHTML(html, canvas);
}

function init() {
    document.querySelector('#exportButton').addEventListener('click', exportScreenshot);
    rasterizeHtmlDemo();
}

init();
