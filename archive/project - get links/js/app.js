/**
 * Manga downloader (download được mangakakalot):
 *     https://chrome.google.com/webstore/detail/manga-downloader/fojcpnmhelbpakmgaakfhjlmjokocgjg/related?hl=en
 */

import { WEBSITE_LIST } from './websites.js';
import GetLinksUtils from './utils.js';

const modules = {};

/**
 * Import động.
 */
function loadModules() {
    WEBSITE_LIST.forEach(async (website) => {
        modules[website.code] = await import('./album/' + website.code + '.js');
    });
}

loadModules();

new Vue({
    el: '#app',

    data() {
        return {
            // Danh sách các website hỗ trợ
            websiteList: WEBSITE_LIST,
            // Website đang được chọn
            currentWebsite: null,
            // Danh sách hành động
            actionList: [
                'getChapters',
                'getImages',
                'getImagesMultiple'
            ],
            // Các hành động của website
            currentAction: '',
            // Địa chỉ URL
            postUrl: '',
            // Danh sách các chương
            chapterLinks: ''
        };
    },

    methods: {
        /**
         * Người dùng chọn website nào đó.
         * @param {Object} website Website
         */
        chooseCurrentWebsite(website) {
            this.currentWebsite = website;
            const actions = this.currentWebsite.actions;
            if (actions.length == 1) {
                this.currentAction = actions[0];
            } else {
                this.currentAction = '';
            }
        },

        /**
         * Lấy tên của hành động để hiển thị cho người dùng.
         * @param {String} actionCode Mã hành động
         */
        getActionName(actionCode) {
            const map = new Map([
                ['getImages', 'Lấy link ảnh (từ một chương)'],
                ['getImagesMultiple', 'Lấy link ảnh (từ nhiều chương)'],
                ['getChapters', 'Lấy link chương']
            ]);
            return map.get(actionCode);
        },

        /**
         * Lấy các đường dẫn ảnh từ một chương.
         */
        async getImages() {
            const urlObject = new URL(this.postUrl);
            const hostname = urlObject.hostname;
            const websiteCode = this.getWebsiteCodeFromHostname(hostname);
            const functionName = 'getImages' + GetLinksUtils.capitalizeString(websiteCode);
            const theModule = modules[websiteCode];
            const fn = theModule?.['getFolder' + GetLinksUtils.capitalizeString(websiteCode)];
            if (!fn) {
                noti.error('Website không hỗ trợ');
                return;
            }
            const folder = fn(this.postUrl);
            const images = await theModule[functionName](this.postUrl, folder);
            const text = JSON.stringify(images);
            CommonUtils.saveTextAsFile(text, folder + '.json');
        },

        /**
         * Lấy các đường dẫn ảnh từ nhiều chương.
         */
        async getImagesMultiple() {
            const chapterLinks = JSON.parse('[' + this.chapterLinks + ']');
            GetLinksUtils.getAllDownloads(this.processChapterGeneral, chapterLinks);
        },

        /**
         * Xử lý lấy ảnh từng chương (tổng quát)
         * @param {String} chapterUrl URL của chương
         * @param {String} chapterNo Số thứ tự chương (thư mục lưu)
         * @param {Function} callbackFunc Hàm callback sau khi thực hiện xong
         */
        processChapterGeneral(chapterUrl, chapterNo, callbackFunc) {
            const urlObject = new URL(chapterUrl);
            const hostname = urlObject.hostname;
            const websiteCode = this.getWebsiteCodeFromHostname(hostname);
            const functionName = 'processChapter' + GetLinksUtils.capitalizeString(websiteCode);
            const fn = modules[websiteCode]?.[functionName];
            if (!fn) {
                noti.error('Website không hỗ trợ');
                return;
            }
            fn(chapterUrl, chapterNo, callbackFunc);
        },

        /**
         * Lấy danh sách các chương.
         */
        async getChapters() {
            const doc = await GetLinksUtils.getDocumentFromUrl(this.postUrl);
            const urlObject = new URL(this.postUrl);
            const hostname = urlObject.hostname;
            const websiteCode = this.getWebsiteCodeFromHostname(hostname);
            const functionName = 'getChapters' + GetLinksUtils.capitalizeString(websiteCode);
            const fn = modules[websiteCode]?.[functionName];
            if (!fn) {
                noti.error('Website không hỗ trợ');
                return;
            }
            const chapters = fn(doc);
            const text = chapters
                .map(c => `{ "url": "${c.url}", "title": "${c.title.replace(/"/g, '')}", "chapterNo": "${c.chapterNo}" }`)
                .join(',\n');
            CommonUtils.saveTextAsFile(text, 'chapter links.json');
        },

        /**
         * Lấy mã website từ tên host.
         * @param {String} hostname Tên host
         */
        getWebsiteCodeFromHostname(hostname) {
            const website = WEBSITE_LIST.find(w => hostname.includes(w.code));
            if (website) {
                return website.code;
            }
            return '';
        }
    }
});
