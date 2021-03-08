import { JSDOM } from 'jsdom';
import fs from 'fs';


/**
 * Đối tượng file index.html.
 */
class IndexFile {
    /**
     * Khởi tạo.
     * @param indexFilePath Đường dẫn đến file index.html
     */
    constructor(indexFilePath, adjustPath) {
        // Đường dẫn file index.html
        this.indexFilePath = indexFilePath;

        // Đường dẫn thư mục gốc của web
        this.adjustPath = adjustPath;

        // Tiêu đề
        this.title = '';

        // Mô tả
        this.description = '';

        // Ngày xuất bản
        this.date = null;

        // Nội dung
        this.content = '';

        // Có tồn tại file index.html
        this.existsIndexFile = true;

        // Đối tượng document để xử lý DOM như trên trình duyệt
        this.document = null;

        // Có cần ghi lại hay không
        // Thiếu thẻ meta viewport, thiếu favicon, thiếu description
        this.needRewrite = false;
    }

    /**
     * Xử lý.
     */
    async process() {
        // Nếu file không tồn tại thì tạo file
        if (!fs.existsSync(this.indexFilePath)) {
            console.log('File không tồn tại: ' + this.indexFilePath);
            this.existsIndexFile = false;
            this.createDefaultIndexFile();
            return null;
        }

        // Parse HTML
        const dom = await JSDOM.fromFile(this.indexFilePath);
        // const { document } = (new JSDOM('<!DOCTYPE html><p>Hello world</p>')).window;
        const { document } = dom.window;
        this.document = document;

        // Lấy tiêu đề, mô tả, ngày xuất bản
        this.title = document.title;
        this.description = this.getDescriptionFromDoc();
        this.date = this.getDateFromDoc();
        this.content = this.getContent();

        this.checkDescription();
        this.checkMetaViewport();
        this.checkFavicon();

        if (this.needRewrite) {
            this.rewrite();
        }
    }

    /**
     * Nếu không có file index.html thì tự thêm file index luôn, về sau chỉ việc sửa.
     */
    createDefaultIndexFile() {
        const source = this.adjustPath + 'template/index.html';
        fs.copyFileSync(source, this.indexFilePath);
    }

    /**
     * Lấy thông tin mô tả.
     * Lấy từ trường meta description.
     * @return Nội dung mô tả
     */
    getDescriptionFromDoc() {
        return this.getMetaTagContent('description');
    }

    /**
     * Lấy thông tin ngày xuất bản.
     * Lấy từ trường meta date.
     * @return Nội dung ngày xuất bản
     */
    getDateFromDoc() {
        return this.getMetaTagContent('date');
    }

    /**
     * Lấy nội dung bài viết.
     */
    getContent() {
        // Sử dụng innerText, không sử dụng textContent
        // innerText bỏ qua các dấu cách ở hai đầu, bỏ qua các thẻ script và style,
        // có áp dụng CSS (ví dụ text-transform: uppercase)
        // jsdom không hỗ trợ innerText :()
        return this.document.body.textContent;
    }

    /**
     * Lấy nội dung thẻ meta.
     * @param metaTagName Tên thẻ meta
     * @return Nội dung
     */
    getMetaTagContent(metaTagName) {
        const metaTag = this.document.querySelector('meta[name=' + metaTagName + ']');
        return metaTag ? metaTag.content : null;
    }

    /**
     * Kiểm tra xem đã có mô tả bài viết chưa.
     */
    checkDescription() {
        const metaTag = this.document.querySelector('meta[name=description]');
        const description = metaTag ? metaTag.content : null;
        if (description == null) {
            console.log('Thiếu description ' + this.indexFilePath);
            this.document.head.insertAdjacentHTML('beforeend', '<meta name="description" content="' + this.title + '">');
            this.needRewrite = true;
        }
    }

    /**
     * Kiểm tra đã có thẻ viewport để responsive chưa.
     */
    checkMetaViewport() {
        const metaTag = this.document.querySelector('meta[name=viewport]');
        const viewport = metaTag ? metaTag.content : null;
        if (viewport == null) {
            console.log('Thiếu viewport ' + this.indexFilePath);
            this.document.head.insertAdjacentHTML('beforeend', '<meta name="viewport" content="width=device-width, initial-scale=1.0">');
            this.needRewrite = true;
        }
    }

    /**
     * Kiểm tra đã có icon favicon chưa.
     */
    checkFavicon() {
        const linkTag = this.document.querySelector('link[rel=icon]');
        const favicon = linkTag ? linkTag.href : null;
        if (favicon == null) {
            console.log('Thiếu favicon ' + this.indexFilePath);
            this.document.head.insertAdjacentHTML('beforeend', '<link rel="icon" href="../../images/favicon.png">');
            this.needRewrite = true;
        }
    }

    /**
     * Ghi đè lại file.
     */
    rewrite() {
        console.log('Ghi lại file ' + this.indexFilePath);
        const code = this.document.documentElement.outerHTML;
        fs.writeFileSync(this.indexFilePath, code);
    }
}


export const processIndexFile = async function (indexFilePath, adjustPath) {
    const obj = new IndexFile(indexFilePath, adjustPath);
    await obj.process();
    return {
        title: obj.title,
        description: obj.description,
        date: obj.date,
        content: obj.content
    };
};


// export default { processIndexFile };
