/**
 * Xuất file ảnh.
 */
async function exportScreenshot() {
    const domObj = document.querySelector('#capture');
    const fileName = 'export.png';

    // exportScreenshotHtml2canvas(domObj, fileName);
    exportScreenshotDomtoimage(domObj, fileName);
    // exportScreenshotRasterizehtml(domObj, fileName);
}

/**
 * Xuất file ảnh với thư viện html2canvas.
 */
async function exportScreenshotHtml2canvas(domObj, fileName) {
    const canvas = await html2canvas(domObj);

    // document.body.appendChild(canvas);

    canvas.toBlob((blob) => {
        CommonUtils.downloadBlob(blob, fileName);
    });
}

/**
 * Xuất file ảnh với thư viện dom-to-image.
 */
async function exportScreenshotDomtoimage(domObj, fileName) {
    const blob = await domtoimage.toBlob(domObj);
    CommonUtils.downloadBlob(blob, fileName);
}

/**
 * Xuất file ảnh với thư viện rasterizeHTML.
 */
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

/**
 * Thư viện rasterizeHTML sẽ tốt nếu xuất từ mã HTML, không phải từ DOMNode.
 */
function rasterizeHtmlDemo() {
    const canvas = document.getElementById('theCanvas');
    const html = `<div style="font-size: 20px;">
                Some <span style="color: green">HTML</span>
                with an image
                <img src="images/ghostscript_tiger_2x.png">
            </div>`;
    rasterizeHTML.drawHTML(html, canvas);
}

/**
 * Loại bỏ các ký tự đặc biệt không hợp lệ ở XML.
 * Các ký tự không hợp lệ ở XML có thể gây ra lỗi xuất file với thư viện dom-to-image.
 */
function removeInvalidXmlCharacters(text) {
    // const NOT_SAFE_IN_XML_1_0 = /[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm;
    const NOT_SAFE_IN_XML_1_0 = /([^\x09\x0A\x0D\x20-\uD7FF\uE000-\uFFFD\u{10000}-\u{10FFFF}])/ug;
    return (text ?? '').replace(NOT_SAFE_IN_XML_1_0, '');
}

/**
 * Gán sự kiện click nút "Export".
 */
function init() {
    document.querySelector('#invalidXmlDiv').textContent = removeInvalidXmlCharacters('Ký tự đặc biệt (invalid XML character) ');
    document.querySelector('#exportButton').addEventListener('click', exportScreenshot);
    rasterizeHtmlDemo();
}

init();
