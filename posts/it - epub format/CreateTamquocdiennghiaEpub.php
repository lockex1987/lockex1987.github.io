<?php

class CreateTamquocdiennghiaEpub
{
	// Đường dẫn thư mục chứa các file
	private const ROOT_PATH = '/media/locke/data/literature/la quan trung - tam quoc dien nghia/part 1/';

	/**
	 * Xử lý một chương truyện.
	 */
	public function process(int $number): void
	{
		// Thêm các chữ số 0 ở đầu
		$fileName = str_pad($number, 3, '0', STR_PAD_LEFT);

		// Xóa các file ảnh cũ trong thư mục
		$this->deleteFilesInFolder(self::ROOT_PATH . 'temp/epub-template' . '/OEBPS/images/');

		$doc = $this->getJsoupDocument($fileName);

		// Xử lý các file ảnh trong nội dung
		$images = $doc->getElementsByTagName('img');
		$opfImages = '';
		foreach ($images as $e) {
			$src = $e->attr('src');

			// Copy vào thư mục
			$this->copyImage($src);

			// Tạo ánh xạ trong file content.opf
			$imageName = explode('/', $src)[1];
			$opfImages .= '<item media-type="image/jpeg" href="images/"' . $imageName . '" id="' . $imageName . '" />' . PHP_EOL;
		}

		$this->writeOpfFile($number, $opfImages);
		$this->writeCoverFile($doc);
		$this->writeContentFile($doc);
		$this->createEpubFile($fileName);
	}

	/**
	 * Xóa các file trong thư mục.
	 */
	private function deleteFilesInFolder(string $folderPath): void
	{
		$a = array_diff(scandir($folderPath), ['.', '..']);
		foreach ($a as $f) {
			$absPath = $folderPath . $f;
			$isDir = is_dir($absPath);
			if ($isDir) {
				// $result = self::deleteFilesInFolder($absPath . '/');
			} else {
				$result = unlink($absPath);
			}
			if (!$result) {
				echo 'Failed to delete ' . $absPath . PHP_EOL;
				// return false;
			}
		}
		// return rmdir($folder);
	}

	/**
	 * Parse file HTML, trả về đối tượng DOM Document.
	 */
	private function getJsoupDocument(string $fileName): DOMDocument
	{
		$filePath = self::ROOT_PATH . 'new-' . $fileName . '.html';
		$html = file_get_contents($filePath);
		$html = str_replace('<meta charset="UTF-8">', '<meta http-equiv="content-type" content="text/html; charset=UTF-8">', $html);
		$doc = new DOMDocument();
		@$doc->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'));
		return $doc;
	}

	/**
	 * Copy file ảnh.
	 */
	private function copyImage(string $src): void
	{
		$source = self::ROOT_PATH . $src;
		$dest = self::ROOT_PATH . 'temp/epub-template' . '/OEBPS/' . $src;
		copy($source, $dest);
	}

	/**
	 * Ghi file content.opf.
	 */
	private function writeOpfFile(int $number, string $opfImages): void
	{
		$title = 'Tam quốc diễn nghĩa - Hồi ' . $number;
		$template = <<<"XML"
            <?xml version="1.0" encoding="UTF-8"?>
            <package xmlns="http://www.idpf.org/2007/opf" unique-identifier="BookId" version="2.0">
                <metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">
                    <dc:title>[TITLE]</dc:title>
                    <dc:creator opf:role="aut">La Quán Trung</dc:creator>
                    <dc:language>vi-VN</dc:language>
                    <dc:publisher>lockex1987.github.io</dc:publisher>
                    <dc:description>Ebook miễn phí tại</dc:description>
                    <!--meta name="cover" content="chapter005.jpg"/-->
                </metadata>
                
                <manifest>
                    <item media-type="application/xhtml+xml" href="cover.html" id="cover.html" />
                    <item media-type="application/xhtml+xml" href="content.html" id="content.html" />

                    <item media-type="application/x-dtbncx+xml" href="toc.ncx" id="ncx" />
                    <item media-type="text/css" href="css/styles.css" id="styles.css" />
                
                    [OPF_IMAGES]
                </manifest>

                <spine toc="ncx">
                    <itemref idref="cover.html"/>
                    <itemref idref="content.html"/>
                </spine>

                <guide>
                    <reference href="cover.html" title="Cover" type="cover" />
                </guide>
            </package>
            XML;
		$text = str_replace(['[TITLE]', '[OPF_IMAGES]'], [$title, $opfImages], $template);
		$file = self::ROOT_PATH . 'temp/epub-template' . '/OEBPS/content.opf';
		$this->writeTextToFile($text, $file);
	}

	/**
	 * Ghi văn bản ra file.
	 */
	private function writeTextToFile(string $text, string $file): void
	{
		file_put_contents($file, $text);
	}

	/**
	 * Ghi file cover.xhtml.
	 */
	private function writeCoverFile(DOMDocument $doc): void
	{
		$chapterNumberNode = $doc->select('.chapter-number')->first();
		$chapterTitle1 = $chapterNumberNode->nextElementSibling();
		$chapterTitle2 = $chapterTitle1->nextElementSibling();
		$comment = $chapterNumberNode->previousElementSibling();
		$coverImage = $comment->previousElementSibling();

		$template = <<<"XML"
            <?xml version="1.0" encoding="utf-8"?>
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
                "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <title>Cover</title>
                <meta http-equiv="content-type" content="text/html; charset=utf-8" />
                <link rel="stylesheet" href="css/styles.css" />
            </head>

            <body>
                <div style="text-align: center; padding: 0pt; margin: 0pt;">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        height="100%"
                        preserveAspectRatio="xMidYMid meet"
                        version="1.1"
                        viewBox="0 0 711 1024"
                        width="100%"
                        xmlns:xlink="http://www.w3.org/1999/xlink">
                        <image width="711"
                            height="1024"
                            xlink:href="[IMAGE]" />
                    </svg>
                </div>

                <p class="chapter-number">[NUMBER]</p>
                <p class="chapter-title">[TITLE_1]</p>
                <p class="chapter-title">[TITLE_2]</p>
                <p class="comment">[COMMENT]</p>
            </body>
            </html>
            XML;
		$text = str_replace(
			[
				'[IMAGE]',
				'[NUMBER]',
				'[TITLE_1]',
				'[TITLE_2]',
				'[COMMENT]'
			],
			[
				$coverImage->select('img')->first()->attr('src'),
				$chapterNumberNode->text(),
				$chapterTitle1->text(),
				$chapterTitle2->text(),
				'(Ảnh: ' . $comment->text() . ')'
			],
			$template
		);
		$file = self::ROOT_PATH . 'temp/epub-template' . '/OEBPS/cover.html';
		$this->writeTextToFile($text, $file);

		$chapterNumberNode->remove();
		$chapterTitle1->remove();
		$chapterTitle2->remove();
		$comment->remove();
		$coverImage->remove();
	}

	/**
	 * Ghi file chứa nội dung.
	 */
	private function writeContentFile(DOMDocument $doc): void
	{
		// $doc->outputSettings()->syntax(Document.OutputSettings.Syntax.xml);
		$text = <<<"HTML"
            <?xml version="1.0" encoding="utf-8"?>
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
                "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
            <head>
                <title>Content</title>
                <meta http-equiv="content-type" content="text/html; charset=utf-8" />
                <link rel="stylesheet" href="css/styles.css" />
            </head>

            <body>
                $doc->select('article')->first()->html()
            </body>
            </html>
            HTML;
		$file = self::ROOT_PATH . 'temp/epub-template' . '/OEBPS/content.html';
		$this->writeTextToFile($text, $file);
	}

	/**
	 * Tạo file epub (file zip).
	 */
	private function createEpubFile(string $fileName): void
	{
		$sourceDir = self::ROOT_PATH . 'temp/epub-template';
		$archive = self::ROOT_PATH . $fileName . '.epub';
		new Zip($sourceDir, $archive);
	}
}
