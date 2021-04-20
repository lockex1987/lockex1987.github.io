<?php

namespace Cttd\Epub;

use DOMDocument;

class DomUtils
{
    public static function loadHTML(string $indexFilePath): DOMDocument
    {
        $htmlCode = file_get_contents($indexFilePath);
        $normalizedHtml = mb_convert_encoding($htmlCode, 'HTML-ENTITIES', 'UTF-8');
        $normalizedHtml = str_replace("\r\n", "\n", $normalizedHtml);
        $normalizedHtml = str_replace('&nbsp;', ' ', $normalizedHtml);
        $normalizedHtml = str_replace('<meta name="charset" content="UTF-8"/>', '<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>', $normalizedHtml);
        $doc = new DOMDocument();
        @$doc->loadHTML($normalizedHtml, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        return $doc;
    }
}
