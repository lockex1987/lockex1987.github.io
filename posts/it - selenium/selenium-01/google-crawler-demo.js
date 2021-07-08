const { GoogleCrawler } = require('./src/google-crawler.js');

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}


async function crawlGoogle() {
    const keyword = 'jav';
    const startPage = 0;
    const endPage = 1;
    const searchType = 'all'; // all, video, image

    const gCrawler = new GoogleCrawler();
    await gCrawler.initDriver();

    const result = [];

    for (let page = startPage; page < endPage; page++) {
        // Lấy kết quả từ trang thứ j
        // Mỗi trang lấy 10 kết quả
        const domains = await gCrawler.searchByKey(keyword, page * 10, searchType);

        // Nếu đã xong thì bỏ qua
        if (domains.length == 0) {
            break;
        }

        // Thêm các URL mới
        for (let i = 0; i < domains.length; i++) {
            const domain = domains[i];
            console.log(domain);

            if (!result.includes(domain)) {
                result.push(domain);
                // TODO: Lưu vào DB
                await sleep(100);
            }
        }

        // Tạm nghỉ tầm 7.5 giây thì sang trang khác
        await sleep(7.5 * 1000);
    }

    await gCrawler.finish();
}

crawlGoogle();
