/**
 * Convert from YouTube timed format to popular SRT format.
 */
import { unescapeHTML } from './common.js';


/**
 * Convert from YouTube closed caption format to srt format.
 * @param {String} xml Mã XML
 */
function convertFromTimedToSrtFormat(xml) {
    // console.log(xml);

    // Ví dụ 1 dòng dữ liệu:
    //   <text start="9720" dur="2680">Lately, I&#39;ve been, I&#39;ve been thinking</p>
    // Đầu tiên là thời gian bắt đầu
    // Tiếp theo là độ dài
    // Tiếp theo là xâu nội dung
    let content = '';
    let count = 1;

    /*
    const regex = /<text start="([\d.]+)" dur="([\d.]+)">([^<]*)/g;
    let arr;
    while ((arr = regex.exec(xml)) != null) {
        const startTime = parseFloat(arr[1]);
        const duration = parseFloat(arr[2]);
        const orginalText = arr[3];
    }
    */

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');
    const arr = [...xmlDoc.getElementsByTagName('text')];
    arr.forEach(text => {
        const startTime = parseFloat(text.getAttribute('start'));
        const duration = parseFloat(text.getAttribute('dur'));
        // Sửa dụng text.nodeValue sẽ ra null
        // Phải sử dụng text.textContent hoặc text.childNodes[0].nodeValue
        // Sử dụng text.textContent sẽ tự thay thế các ký tự như &quot;,
        // sử dụng text.childNodes[0].nodeValue thì không
        // const orginalText = text.textContent;
        const orginalText = text.childNodes[0].nodeValue;
        // console.log(startTime, duration, orginalText);

        const endTime = startTime + duration;
        const normalizedText = orginalText
            .replace(/\\n/g, '\n')
            .replace(/\\"/g, '"')
            .trim();
        content +=
            count + '\n' +
            formatTime(startTime) + ' --> ' + formatTime(endTime) + '\n' +
            normalizedText + '\n\n';
        count++;
    });

    return unescapeHTML(content);
}


/**
 * Format the time (that is in second) to the hh:mm:ss,SSS.
 * @param {Float} timeInSec Thời gian theo giây
 */
function formatTime(timeInSec) {
    const SSS = Math.floor(timeInSec * 1000) % 1000;
    timeInSec = Math.floor(timeInSec);
    const hh = Math.floor(timeInSec / 3600);
    const mm = Math.floor((timeInSec - hh * 3600) / 60);
    const ss = timeInSec - hh * 3600 - mm * 60;
    return (
        fillZero(hh, 2) + ':' +
        fillZero(mm, 2) + ':' +
        fillZero(ss, 2) + ',' +
        fillZero(SSS, 3)
    );
}


/**
 * Fill the zero (0) to the left (padding)
 * @param {Integer} num
 * @param {Integer} len
 */
function fillZero(num, len) {
    let result = '' + num;
    for (let i = result.length; i < len; i++) {
        result = '0' + result;
    }
    return result;
}


export {
    convertFromTimedToSrtFormat
};
