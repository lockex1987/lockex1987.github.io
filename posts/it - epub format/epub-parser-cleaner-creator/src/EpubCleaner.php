<?php

namespace Cttd\Epub;

use SimpleXMLElement;
use DOMXPath;

class EpubCleaner extends EpubFile
{

    /**
     * Khởi tạo.
     * @param string $filePath
     * @param string|null $imageWebRoot
     * @param string|null $linkWebRoot
     */
    public function __construct(string $filePath, ?string $imageWebRoot = null, ?string $linkWebRoot = null)
    {
        parent::__construct($filePath, $imageWebRoot, $linkWebRoot);
        $this->clean();
    }

    /**
     * Clean file opf.
     */
    public function clean(): void
    {
        $rootPath = 'D:/new/tu binh phong - robert van gulik/';
        $filePath = $rootPath . 'OEBPS/content.opf';
        $data = file_get_contents($filePath);
        if (!str_starts_with($data, '<?xml')) {
            $data = '<?xml version="1.0" encoding="utf-8"?>' . "\n" . $data;
        }
        $xml = new SimpleXMLElement($data);
        $this->cleanMetadata($xml);
        $this->sortManifest($xml);

        // Xóa sử dụng unset kiểu thuộc tính thế này thì được
        // Yêu cầu biết cấu trúc của XML, các tag là cố định, không có namespace phức tạp
        // unset($xml->metadata);
        // unset($xml->spine);
        // unset($xml->guide);

        // Xóa bằng dom_import_simplexml
        /*
        // [$theNodeToBeDeleted] = $xml->xpath('//spine');
        $theNodeToBeDeleted = $xml->spine;
        $oNode = dom_import_simplexml($theNodeToBeDeleted);
        $oNode->parentNode->removeChild($oNode);
        */


        $output = $xml->asXML();
        // Xóa các dòng trắng
        $output = preg_replace("/\r?\n(\s+\r?\n)+/s", "\n", $output);
        $output = str_replace(' prefix="calibre: https://calibre-ebook.com"', '', $output);
        echo $output . PHP_EOL;
        // file_put_contents($filePath, $output);
    }

    private function cleanMetadata(SimpleXMLElement $xml): void
    {
        // $children = $xml->xpath('//metadata/*');
        // $children = $xml->manifest->item;
        $allDcElements = $xml->metadata->children('dc', true);
        $deleteDcElements = [];
        foreach ($allDcElements as $e) {
            $name = $e->getName();
            // echo $name . PHP_EOL;
            if (!in_array($name, ['title', 'author', 'creator', 'identifier', 'language', 'publisher'])) {
                $deleteDcElements[] = $e;
            }
        }
        $this->removeElements($deleteDcElements);
        $this->removeElements($xml->metadata->children('opf', true));
        $this->removeElements($xml->metadata->children());
    }

    /**
     * Xóa danh sách element hoặc mảng.
     */
    private function removeElements(SimpleXMLElement|array $elements): void
    {
        if (empty($elements)) {
            return;
        }

        // Dùng foreach không unset được
        // Bị lỗi PHP Fatal error:  Uncaught Error: SimpleXMLElement is not properly initialized
        foreach ($elements as $e) {
            // echo $e->getName() . PHP_EOL;
        // unset($e[0]);
        }

        // Chúng ta phải xóa từ cuối mảng
        // Nếu xóa từ đầu mảng thì có thể làm sai lệch mảng khi đang duyệt
        // for ($i = 0; $i < count($elements); $i++) {
        for ($i = count($elements) - 1; $i >= 0; $i--) {
            $e = $elements[$i];
            // echo $e->getName() . PHP_EOL;

            // Xóa node bằng hàm unset
            // There are two occurrences of [0] because:
            // - xpath() returns an array, even if only one element matches.
            //   So [0] is used to get the first item in that array,
            //   which is the element we want to delete.
            // - The SimpleXMLElement returned from $node[0] represents a collection of <event> elements
            //   (but if you access elements/attributes on it then the values from the first in the collection is used).
            //   So, we use [0] to get at the actual SimpleXMLElement that we want to delete,
            //   which is the first in this magical collection.
            // unset($elements[0][0]);
            unset($e[0]);
        }
    }

    // https://www.php.net/manual/en/simplexml.examples-basic.php
    // SimpleXML viết code ngắn hơn DOM
    private function sortManifest(SimpleXMLElement $xml): void
    {
        foreach ($xml->manifest->item as $item) {
            // echo $item->getName() . PHP_EOL;
            $attrs = $item->attributes();
            $newAttrs = [];
            // Không được unset trong foreach
            foreach ($attrs as $key => $value) {
                // echo $key . '="' . $value . '"' . PHP_EOL;
                // $newAttrs[$key] = clone $value;
                $newAttrs[$key] = (string) $value;
                // unset($item[$key]); // bị lỗi
            }
            foreach ($newAttrs as $key => $value) {
                unset($item[$key]);
            }
            uksort($newAttrs, function ($a, $b) {
                $map = [
                'media-type' => 1,
                'href' => 2,
                'id' => 3,
                'properties' => 4
            ];
                return $map[$a] - $map[$b];
            });
            foreach ($newAttrs as $key => $value) {
                // echo $key . '="' . $value . '"' . PHP_EOL;
                $item->addAttribute($key, $value);
            }
        }
    }

    private function processPictures(): void
    {
        // Xử lý các thẻ img
        // Chuyển thành thẻ figure(img, figcaption)
        // Bỏ aside và note
        $rootPath = 'D:/new/tu binh phong - robert van gulik/OEBPS/Text/';
        $files = array_diff(scandir($rootPath), ['.', '..']);
        // var_dump($files);

        foreach ($files as $file) {
            $path = $rootPath . $file;
            $doc = DomUtils::loadHTML($path);

            $xpath = new DOMXPath($doc);
            $images = $doc->getElementsByTagName('img');
            $hasChange = false;
            foreach ($images as $img) {
                // echo $img->getAttribute('src') . PHP_EOL;
                $asideTag = $img->parentNode;
                $nodeName = $asideTag->nodeName;
                if ($nodeName == 'aside') {
                    $pTag = $asideTag->getElementsByTagName('p')[0];
                    // echo $pTag->nodeValue . PHP_EOL;
                    $id = $asideTag->getAttribute('id');
                    // echo $id . PHP_EOL;

                    $aTag = $xpath->query("//a[@href='#$id']")[0];
                    // echo $doc->saveXML($aTag) . PHP_EOL;
                    $aTag->parentNode->removeChild($aTag);

                    // Tạo thẻ div wrapper
                    $figure = $doc->createElement('figure');
                    $figcaption = $doc->createElement('figcaption');
                    $figcaption->nodeValue = $pTag->nodeValue;
                    $figure->appendChild($img->cloneNode());
                    $figure->appendChild($figcaption);

            
                    // Thay thế ảnh với thẻ div
                    $asideTag->parentNode->replaceChild($figure, $asideTag);
                    echo $doc->saveXML($figure) . PHP_EOL;
                    $hasChange = true;
                }
            }

            if ($hasChange) {
                // Các thuộc tính của thẻ SVG bị chuyển thành chữ thường
                // Chỗ thẻ style bị thêm CDATA nên bị vỡ giao diện
                // Bỏ thẻ style, cảnh báo
                $output = $doc->saveXML($doc->documentElement);
                // echo $output;

                file_put_contents($path, $output);
            }
        }
    }
}
