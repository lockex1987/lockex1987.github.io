/*
Hồ sơ phá án của vnexpress (https://vnexpress.net/phap-luat/ho-so-pha-an)
*/
import GetLinksUtils from '../utils.js';

new Vue({
    el: '#app',

    data() {
        return {
            // Từ trang
            fromPage: 2,
            // Đến trang
            toPage: 39
        };
    },

    methods: {
        /**
 * Lấy danh sách truyện khi phân trang.
 * @param {Integer} page Chỉ số trang
 * @returns Danh sách truyện trong trang đó
 */
        async crawlVnexpressHosophaan(page) {
            const url = 'https://vnexpress.net/ajax/listcategory/category_id/1003426/page/' + page;
            const resp = await fetch(url);
            const json = await resp.json();
            const html = json.html;
            // console.log(html);
            // Lấy hàm parseDocumentFromString từ utils.js
            const doc = GetLinksUtils.parseDocumentFromString(html);

            const articles = [...doc.querySelectorAll('article')];
            const stories = articles.map(a => {
                try {
                    const originalLink = a.querySelector('.title_news a').href;
                    const title = a.querySelector('.title_news a').textContent.trim();
                    const location = a.querySelector('.location-stamp')?.textContent?.trim();
                    const description = a.querySelector('.short_intro a').textContent.trim();
                    const thumbnail = a.querySelector('.thumb_art img')?.src;
                    return {
                        originalLink,
                        title,
                        location,
                        description,
                        thumbnail
                    };
                } catch (ex) {
                    console.log(ex.message);
                    console.log(a.innerHTML);
                    return null;
                }
            });
            // console.log(stories);
            return stories;
        },


        /**
         * Lấy danh sách truyện từ nhiều trang.
         */
        async crawlMultiplePages() {
            const promises = [];
            for (let page = parseInt(this.fromPage); page <= parseInt(this.toPage); page++) {
                promises.push(this.crawlVnexpressHosophaan(page));
            }
            const results = await Promise.all(promises);
            const stories = results.flat();
            const text = '[\n' + stories.map(s => JSON.stringify(s)).join(',\n') + '\n]\n';
            // console.log(text);
            CommonUtils.saveTextAsFile(text, 'ho so pha an.json');
        }
    }
});
