// https://truyenhay24h.com/tieu-ngao-giang-ho.html

/**
 * Lấy danh sách chương.
 */
function getChaptersTruyenhay24h() {
    return getChaptersFromCssSelector('.chapname a');
}

/**
 * Xử lý từng chương.
 * @param {String} chapterUrl URL của chương
 * @param {String} chapterNo Số thứ tự chương (thư mục lưu)
 * @param {Function} callbackFunc Hàm callback sau khi thực hiện xong
 */
async function processChapterTruyenhay24h(chapterUrl, chapterNo, callbackFunc) {
    const blackList = [
        'EarthDay%5B1%5D.jpg',
        'Credit.jpg',
        'Click-Like.jpg',
        'Tuyen-Dung.jpg'
    ];

    const htmlCode = await fetch(chapterUrl).then(response => response.text());

    // function LImg(){ GI2017(223,1,'704e3e90ef85886816f4e6dd52c8367e','0','TIẾU NGẠO GIANG HỒ-Chương 1');}
    const regex = /GI2017\((\d+),([^,]+),'([^']+)','([^']+)','([^']+)'\);/g;
    const result = regex.exec(htmlCode);
    if (!result) {
        writeLog('Không tìm thấy hàm LImg');
    } else {
        const pid = result[1];
        const chapter = result[2];
        const cc18 = result[3];

        const name = '';
        const s = '0';
        // writeLog(pid, chapter, cc18);
        const url = 'https://truyenhay24h.com/TH24Service.asmx/GetChapterImages';

        const requestConfig = {
            method: 'POST',
            body: JSON.stringify({
                ChapNumber: chapter,
                PID: pid,
                cc18: cc18,
                name: name,
                s: s
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        };
        const data = await fetch(url, requestConfig).then(response => response.json());

        // console.log(data);
        const images = [];
        data.d.forEach(d => {
            // d = d.replace(/\s+/gi, '');
            // Tham khảo hàm GTI
            d = d.substring(0, d.length - 5);
            if (!d.startsWith('http')) {
                d = 'http://truyenhay24h.com' + d;
            }

            if (!isExtraImage(d, blackList)) {
                const fileExtension = getImageExtension(d);
                images.push({
                    url: d,
                    // name: createLocalFileName(chapterNo, images.length, fileExtension)
                    name: `${chapterNo}/${paddingZero(images.length + 1)}.${fileExtension}`
                });
            }
        });

        callbackFunc(images);
    }
}

export {
    getChaptersTruyenhay24h,
    processChapterTruyenhay24h
};
