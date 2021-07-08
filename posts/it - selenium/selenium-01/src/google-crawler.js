const { Builder, By } = require('selenium-webdriver');
const { cutOffDomain } = require('./domain-util.js');

class GoogleCrawler {
    constructor() {
        this.driver = null;
    }

    async initDriver() {
        this.driver = await new Builder()
            .forBrowser('chrome')
            .build();
        return this;
    }

    /**
     * Tìm kiếm Google.
     *
     * @param {String} keyword Từ khóa
     * @param {int} page Trang (sao lại nhân 10 nhỉ)
     * @param {String} searchType Loại tìm kiếm (tin tức, hình ảnh, video)
     * @return Danh sách các URL tìm kiếm được
     */
    async searchByKey(keyword, page, searchType) {
        keyword = encodeURIComponent(keyword);

        // Đường dẫn search Google
        let googleSearchUrl = 'https://www.google.com.vn/search?';
        if (searchType === 'video') {
            googleSearchUrl += 'tbm=vid&';
        } else if (searchType === 'image') {
            googleSearchUrl += 'tbm=isch&';
        }
        const url = googleSearchUrl + 'q=' + keyword + '&ie=utf-8&oe=utf-8' + '&start=' + page;
        console.log(url);

        await this.driver.get(url);

        const domains = await this.parserTabVideo();

        return domains;
    }

    async finish() {
        await this.driver.quit();
    }

    /**
     * Parser tab video (va tab all).
     *
     * @return Danh sách URL
     */
    async parserTabVideo() {
        const pages = [];

        // Lấy các kết quả trả về
        const eles = await this.driver.findElements(By.css('.g'));
        // console.log(eles);

        // eles.forEach(async (ele) => {});
        for (let i = 0; i < eles.length; i++) {
            const ele = eles[i];
            const aTag = await ele.findElement(By.css('a'));
            const temp = await aTag.getAttribute('href');
            if (temp) {
                const res = cutOffDomain(temp);
                if (!pages.includes(res)) {
                    pages.push(res);
                }
            }
        }

        return pages;
    }
}


exports.GoogleCrawler = GoogleCrawler;
