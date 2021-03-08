<?php

/**
 * Đối tượng file index.html.
 */
class IndexFile
{
    /**
     * Khởi tạo.
     * @param string $indexFilePath Đường dẫn đến file index.html
     * @param string $adjustPath Đường dẫn thư mục gốc của web
     */
    public function __construct(string $indexFilePath, string $adjustPath)
    {
        // Đường dẫn file index.html
        $this->indexFilePath = $indexFilePath;

        // Đường dẫn thư mục gốc của web
        $this->adjustPath = $adjustPath;

        // Tiêu đề
        $this->title = '';

        // Mô tả
        $this->description = '';

        // Ngày xuất bản
        $this->date = null;

        // Nội dung
        $this->content = '';

        // Có tồn tại file index.html
        $this->existsIndexFile = true;

        // Đối tượng document để xử lý DOM như trên trình duyệt
        $this->document = null; // DomDocument

        // Có cần ghi lại hay không
        // Thiếu thẻ meta viewport, thiếu favicon, thiếu description
        $this->needRewrite = false;
    }

    /**
     * Xử lý.
     */
    public function process(): void
    {
        // Nếu file không tồn tại thì tạo file
        if (!file_exists($this->indexFilePath)) {
            echo 'File không tồn tại: ' . $this->indexFilePath . PHP_EOL;
            $this->existsIndexFile = false;
            $this->createDefaultIndexFile();
            return;
        }

        // Parse HTML
        $dom = new DOMDocument('1.0', 'UTF-8');
        $html = file_get_contents($this->indexFilePath);

        // Ẩn các thông báo lỗi thẻ HTML5 không hợp lệ
        libxml_use_internal_errors(true);
        $dom->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'), LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        $this->document = $dom;

        // Lấy tiêu đề, mô tả, ngày xuất bản
        $this->title = $this->getTitle();
        $this->description = $this->getDescriptionFromDoc();
        $this->date = $this->getDateFromDoc();
        $this->content = $this->getContent();

        $this->checkDescription();
        $this->checkMetaViewport();
        $this->checkFavicon();

        if ($this->needRewrite) {
            $this->rewrite();
        }
    }

    /**
     * Lấy tiêu đề.
     */
    private function getTitle(): string
    {
        $titleNodes = (new DOMXPath($this->document))->query('//title');
        if ($titleNodes->count() == 0) {
            return '';
        }
        return $titleNodes[0]->textContent;
    }

    /**
     * Nếu không có file index.html thì tự thêm file index luôn, về sau chỉ việc sửa.
     */
    private function createDefaultIndexFile(): void
    {
        $source = $this->adjustPath . 'template/index.html';
        copy($source, $this->indexFilePath);
    }

    /**
     * Lấy thông tin mô tả.
     * Lấy từ trường meta description.
     * @return string Nội dung mô tả
     */
    private function getDescriptionFromDoc(): ?string
    {
        return $this->getMetaTagContent('description');
    }

    /**
     * Lấy thông tin ngày xuất bản.
     * Lấy từ trường meta date.
     * @return string Nội dung ngày xuất bản
     */
    private function getDateFromDoc(): ?string
    {
        return $this->getMetaTagContent('date');
    }

    /**
     * Lấy nội dung bài viết.
     */
    private function getContent(): string
    {
        // Sử dụng innerText, không sử dụng textContent
        // innerText bỏ qua các dấu cách ở hai đầu, bỏ qua các thẻ script và style,
        // có áp dụng CSS (ví dụ text-transform: uppercase)
        // jsdom không hỗ trợ innerText :()
        return (new DOMXPath($this->document))->query('//body')[0]->textContent;
    }

    /**
     * Lấy nội dung thẻ meta.
     * @param string $metaTagName Tên thẻ meta
     * @return string Nội dung
     */
    private function getMetaTagContent(string $metaTagName): ?string
    {
        $metaTag = (new DOMXPath($this->document))->query('//meta[@name="' . $metaTagName . '"]');
        return $metaTag->count() ? $metaTag[0]->getAttribute('content') : null;
    }

    /**
     * Kiểm tra xem đã có mô tả bài viết chưa.
     */
    private function checkDescription(): void
    {
        $metaTag = (new DOMXPath($this->document))->query('//meta[@name="description"]');
        if ($metaTag->count() == 0) {
            echo 'Thiếu description ' . $this->indexFilePath . PHP_EOL;
            $newTag = $this->document->createElement('meta');
            $newTag->setAttribute('name', 'description');
            $newTag->setAttribute('content', $this->title);
            $this->insertAdjacentHTML($newTag);
            $this->needRewrite = true;
        }
    }

    /**
     * Kiểm tra đã có thẻ viewport để responsive chưa.
     */
    private function checkMetaViewport(): void
    {
        $metaTag = (new DOMXPath($this->document))->query('//meta[@name="viewport"]');
        if ($metaTag->count() == 0) {
            echo 'Thiếu viewport ' . $this->indexFilePath . PHP_EOL;
            $newTag = $this->document->createElement('meta');
            $newTag->setAttribute('name', 'viewport');
            $newTag->setAttribute('content', 'width=device-width, initial-scale=1.0');
            $this->insertAdjacentHTML($newTag);
            $this->needRewrite = true;
        }
    }

    /**
     * Kiểm tra đã có icon favicon chưa.
     */
    private function checkFavicon(): void
    {
        $linkTag = (new DOMXPath($this->document))->query('//link[@rel="icon"]');
        if ($linkTag->count() == 0) {
            echo 'Thiếu favicon ' . $this->indexFilePath . PHP_EOL;
            $newTag = $this->document->createElement('link');
            $newTag->setAttribute('rel', 'icon');
            $newTag->setAttribute('href', '../../images/favicon.png');
            $this->insertAdjacentHTML($newTag);
            $this->needRewrite = true;
        }
    }


    /**
     * Thêm một phần tử mới.
     */
    private function insertAdjacentHTML($newTag): void
    {
        $head = (new DOMXPath($this->document))->query('//head')[0];
        $head->appendChild($newTag);
    }

    /**
     * Ghi đè lại file.
     */
    private function rewrite(): void
    {
        echo 'Ghi lại file ' . $this->indexFilePath . PHP_EOL;

        // Chỉ nhận dạng <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">,
        // không nhận dạng <meta charset="UTF-8">
        $charsetTags = (new DOMXPath($this->document))->query('//meta[@charset]');
        if ($charsetTags->count() > 0) {
            foreach ($charsetTags as $tag) {
                $tag->parentNode->removeChild($tag);
            }
        }
        
        /*
        $contentTypeTags = (new DOMXPath($this->document))->query('//meta[@http-equiv="Content-Type"]');
        if ($contentTypeTags->count() == 0) {
            $metaTag = $this->document->createElement('link');
            $metaTag->setAttribute('http-equiv', 'Content-Type');
            $metaTag->setAttribute('content', 'text/html; charset=UTF-8');
            $this->insertAdjacentHTML($metaTag);
        }
        */

        // Thêm cái này thì output sẽ là UTF-8, không phải HTML entity
        $this->document->encoding = 'UTF-8';

        $this->document->saveHTMLFile($this->indexFilePath);
    }
}
