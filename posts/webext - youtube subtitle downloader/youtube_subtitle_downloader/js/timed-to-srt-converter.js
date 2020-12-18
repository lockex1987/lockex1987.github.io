/**
 * Convert from YouTube timed format to popular SRT format.
 */
var converter = (function () {

	/**
	 * Convert from YouTube closed caption format to srt format.
	 * @param {String} xml Mã XML
	 */
    function convertFromTimedToSrtFormat(xml) {
        // Ví dụ 1 dòng dữ liệu:
        //   <text start="9720" dur="2680">Lately, I&#39;ve been, I&#39;ve been thinking</p>
        // Đầu tiên là thời gian bắt đầu
        // Tiếp theo là độ dài
        // Tiếp theo là xâu nội dung
        let regex = /<text start="([\d\.]+)" dur="([\d\.]+)">([^<]*)/g;
        let arr;
        let content = '';
        let count = 1;

        while ((arr = regex.exec(xml)) != null) {
            let startTime = parseFloat(arr[1]);
            let endTime = startTime + parseFloat(arr[2]);
            let line = arr[3]
                .replace(/\\n/g, "\n")
                .replace(/\\"/g, '"')
                .trim();
            content +=
                count + "\n" +
                formatTime(startTime) + ' --> ' + formatTime(endTime) + "\n" +
                line + "\n\n";
            count++;
        }
        return unescapeHTML(content);
    }

	/**
	 * Format the time (that is in second) to the hh:mm:ss,SSS.
	 * @param {Float} timeInSec Thời gian theo giây
	 */
    function formatTime(timeInSec) {
        let SSS = Math.floor(timeInSec * 1000) % 1000;
        timeInSec = Math.floor(timeInSec);
        let hh = Math.floor(timeInSec / 3600);
        let mm = Math.floor((timeInSec - hh * 3600) / 60);
        let ss = timeInSec - hh * 3600 - mm * 60;
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

    return {
        convertFromTimedToSrtFormat
    };
})();
