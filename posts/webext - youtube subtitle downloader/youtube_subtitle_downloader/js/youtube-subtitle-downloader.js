/**
 * Các hàm xử lý chính.
 */
import {
    getQueryString,
    updateAjax,
    saveTextAsFile,
    unescapeHTML
} from './common.js';

import {
    buildGui,
    notifyNotFound,
    canInsert
} from './gui.js';

import { convertFromTimedToSrtFormat } from './timed-to-srt-converter.js';


// The ID of the video
let videoId;

// Địa chỉ URL hiện tại
let currentLocation = '';


/**
 * Hàm này sẽ được gọi định kỳ.
 */
function checkSubtitle() {
    if (currentLocation != location.href) {
        const queryString = getQueryString();
        videoId = extractVideoId(queryString);
        if (videoId) {
            console.log('videoId: ' + videoId);

            // Nếu là địa chỉ có video
            if (canInsert()) {
                // Nếu có thể thêm
                currentLocation = location.href;
                getSubtitleList(videoId);
            } else {
                console.log('Cannot insert (yet)');
            }
        } else {
            // Nếu là địa chỉ mà không phải là xem, không có video thì dừng luôn
            currentLocation = location.href;
        }
    }

    // Gọi định kỳ tiếp
    setTimeout(checkSubtitle, 500);
}


/**
 * Initialize.
 */
function init() {
    setTimeout(checkSubtitle, 0);
}


/**
 * Get the video ID.
 * Video ID is provided by 'v' parameter
 * @param {String} queryString Xâu query của URL
 */
function extractVideoId(queryString) {
    const a = queryString.split('&');
    for (let i = 0; i < a.length; i++) {
        const temp = a[i].split('=');
        if (temp[0] === 'v') {
            return temp[1];
        }
    }
    return '';
}


/**
 * After have ID of the video, we will get the list of available subtitle.
 * We do this by get XML data from a particular URL with the ID of the video.
 * @param {String} videoId Video ID
 */
function getSubtitleList(videoId) {
    const url = 'https://www.youtube.com/api/timedtext?type=list&v=' + videoId;
    updateAjax(url, buildSubtitleList);
}


/**
 * Build a select box to choose subtitle language.
 * The XML looks like this:
 *     <transcript_list docid="6824816026201807091">
 *         <track id="2" name="French (fr)" lang_code="fr" lang_original="Français" lang_translated="French"/>
 *         <track id="0" name="German (de)" lang_code="de" lang_original="Deutsch" lang_translated="German"/>
 *         <track id="3" name="Italian (it)" lang_code="it" lang_original="Italiano" lang_translated="Italian"/>
 *         <track id="4" name="Japanese" lang_code="ja" lang_original="日本語" lang_translated="Japanese"/>
 *         <track id="1" name="Spanish (es)" lang_code="es" lang_original="Español" lang_translated="Spanish"/>
 *     </transcript_list>
 * @param {String} xml XML trả về.
 */
function buildSubtitleList(xml) {
    let languages = null;
    if (xml) {
        languages = parseLanguageXml(xml);
    }
    if (languages != null && languages.length > 0) {
        buildGui(languages);
    } else {
        notifyNotFound();
    }
}


/**
 * Get the URL of an subtitle file.
 * This is often changed.
 * @param {String} videoId ID của video
 * @param {String} langCode Mã ngôn ngữ
 * @param {String} langName Tên ngôn ngữ
 */
function getCaptionFileURL(videoId, langCode, langName) {
    return (
        'https://www.youtube.com/api/timedtext' +
        '?type=track' +
        '&v=' + videoId +
        '&lang=' + langCode +
        '&name=' + unescapeHTML(langName)
    );
}

/**
 * Download the caption file.
 * @param {String} langCode Mã ngôn ngữ
 * @param {String} langName Tên ngôn ngữ
 */
function downloadCaptionFile(langCode, langName) {
    const url = getCaptionFileURL(videoId, langCode, langName);
    updateAjax(url, (xml) => {
        const content = convertFromTimedToSrtFormat(xml);
        const fileName = document.title.replace(/ - YouTube/gi, '') + '.' + langCode + '.srt';
        saveTextAsFile(content, fileName);
    });
}


/**
 * Parse the XML of the language list to an array.
 * @param {String} xml Mã XML trả về
 */
function parseLanguageXml(xml) {
    /*
    const languages = [];
    const regex = /<track [^<]*name="([^<]*)" [^<]*lang_code="([^"]+)" [^<]*lang_translated="([^"]+)"/g;
    let arr;
    while ((arr = regex.exec(xml)) != null) {
        languages.push({
            langName: arr[1],
            langCode: arr[2],
            displayName: arr[3]
        });
    }
    */

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');
    const arr = [...xmlDoc.getElementsByTagName('track')];
    const languages = arr.map(track => {
        const langName = track.getAttribute('name');
        const langCode = track.getAttribute('lang_code');
        const displayName = track.getAttribute('lang_translated');
        // console.log(langName, langCode, displayName);
        return {
            langName,
            langCode,
            displayName
        };
    });

    return languages;
}


export {
    init,
    downloadCaptionFile
};
