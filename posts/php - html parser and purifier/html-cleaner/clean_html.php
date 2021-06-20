<?php

function loadHtml(string $indexFilePath): DOMDocument
{
    $htmlCode = file_get_contents($indexFilePath);
    $normalizedHtml = mb_convert_encoding($htmlCode, 'HTML-ENTITIES', 'UTF-8');
    $normalizedHtml = str_replace("\r\n", "\n", $normalizedHtml);
    $normalizedHtml = str_replace('&nbsp;', ' ', $normalizedHtml);
    $doc = new DOMDocument();
    @$doc->loadHTML($normalizedHtml);
    return $doc;
}


function saveXhtml(string $indexFilePath, DOMDocument $doc): void
{
    // Output dạng XHTML
    // Chú ý bị thêm khai báo XML <?xml version="1.0" encoding="UTF-8" standalone="yes">
    // LIBXML_NOXMLDECL nghĩa là bỏ qua khai báo XML khi lưu, thêm ở hàm loadHTML
    // tuy nhiên đang có lỗi (https://bugs.php.net/bug.php?id=47137)
    // Để bỏ khai báo XML, chúng ta có thể replace ở output
    // hoặc chỉ lưu $doc->documentElement (nhưng sẽ bị mất DOCTYPE, phải thêm lại)
    $output = $doc->saveXML($doc->documentElement);
    $normalizedOutput = str_replace('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>', '', $output);
    $normalizedOutput = '<!DOCTYPE html>' . $normalizedOutput;

    $outputFilePath = str_replace('.html', '.cleaned.html', $indexFilePath);
    file_put_contents($outputFilePath, $normalizedOutput);
}


/**
 * Xóa các thuộc tính (ví dụ style).
 * Sử dụng phương thức removeAttribute(), getAttribute(), hasAttribute().
 */
function removeAttributes(DOMDocument $doc): void
{
    $attributes = [
        'style',
        'class',
        'id',
        // 'name',
        'ng-if',
        'ng-click',
        'ng-non-bindable',
        'spellcheck',
        'border',
        'cellpadding',
        'cellspacing',
        'data-lazy-type',
        'data-lazy-src',
        'data-lazy-srcset',
        'data-lazy-sizes',
        'data-file',
        'data-filename',
        'data-reactid',
        // 'rel',
        'height',
        'width',
        'alt',
        'scope',
        'srcset'
    ];

    $xpath = new DOMXPath($doc);

    foreach ($attributes as $attr) {
        $nodes = $xpath->query("//*[@$attr]");
        foreach ($nodes as $node) {
            if ($node->hasAttribute($attr)) {
                // echo $node->getAttribute($attr) . PHP_EOL;
                $node->removeAttribute($attr);
            }
        }
    }
}


/**
 * Xóa các phần tử rỗng.
 * @param DOMNode node Node đang xử lý
 */
function removeEmptyNode(DOMNode $node, DOMDocument $doc): void {
    $nodeName = strtolower($node->nodeName);
    if (in_array($nodeName, ['#text', 'img', 'script'])) {
        return;
    }

    $content = trim($node->textContent);
    if (!$content) {
        $hasImage = $node->getElementsByTagName('img')->count() > 0;
        if (!$hasImage) {
            // echo 'Remove ' . $nodeName . PHP_EOL;
            $node->parentNode->removeChild($node);
            return;
        }
    }

    // Xử lý những thằng con
    $markToRemovedNodes = [];
    foreach ($node->childNodes as $childNode) {
        $markToRemovedNodes[] = $childNode;
    }

    foreach ($markToRemovedNodes as $childNode) {
        removeEmptyNode($childNode, $doc);
    }    
}

/**
 * Clean mã nguồn HTML.
 */
function cleanHtml(string $indexFilePath): void
{
    $doc = loadHtml($indexFilePath);
    removeAttributes($doc);

    // replaceItalicWithEm();
    // removeNoHrefLink();

    // unwrapDiv();
    // unwrapSpan();
    // removeThemeColorMetaTag();

    // wrapTextNode();

    // Phải hỏi hàm này nhiều lần (có thể do quá nhiều node)
    $body = $doc->getElementsByTagName('body')->item(0);
    // for ($i = 0; $i < 5; $i++) {
        // echo $i . PHP_EOL;
        removeEmptyNode($body, $doc);
    // }
    saveXhtml($indexFilePath, $doc);
}


if (count($argv) < 2) {
    echo 'Bạn phải nhập đường dẫn file index' . PHP_EOL;
} else {
    $indexFilePath = $argv[1];
    cleanHtml($indexFilePath);
}
