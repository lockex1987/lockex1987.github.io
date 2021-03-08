<?php

/**
 * Duyệt các dòng của bảng.
 * Sử dụng phương thức getElementsByTagName.
 */
function traverseRows(DOMDocument $dom): void
{
    $tables = $dom->getElementsByTagName('table');
    $rows = $tables->item(0)->getElementsByTagName('tr');
    $rowCount = $rows->length - 1;
    echo 'No. of rows in the table is ' . $rowCount;
    foreach ($rows as $row) {
        $cols = $row->getElementsByTagName('td');
        echo 'Designation: ' . $cols->item(0)->nodeValue . PHP_EOL;
        echo 'Manager: ' . $cols->item(1)->nodeValue . PHP_EOL;
        echo 'Team: ' . $cols->item(2)->nodeValue . PHP_EOL;
        echo PHP_EOL;
    }
}


/**
 * Cập nhật thuộc tính của thẻ.
 * Sử dụng phương thức setAttribute và getAttribute.
 */
function updateAttribute(DOMDocument $dom): void
{
    $images = $dom->getElementsByTagName('img');
    foreach ($images as $image) {
        $image->setAttribute('src', 'http://example.com/' . $image->getAttribute('src'));
    }
    echo $dom->saveHTML();
    echo PHP_EOL;
}


/**
 * Lấy các đường dẫn.
 * Sử dụng phương thức getElementsByTagName và getAttribute.
 */
function getAllLinks(DOMDocument $dom): void
{
    $links = $dom->getElementsByTagName('a');
    foreach ($links as $link) {
        $url = $link->getAttribute('href');
        echo $url;
        $parsedUrl = parse_url($url);
        var_dump($parsedUrl);
        // if( isset($parsed_url['host']) && $parsed_url['host'] === 'wordpress.org' ) {
        echo PHP_EOL;
    }
}


/**
 * Select phần tử dựa vào XPath.
 * XPath tương tự CSS selector.
 */
function getByXpath(DOMDocument $dom): void
{
    // Returns a list of all links with rel=nofollow
    $xpath = new DOMXPath($dom);
    $links = $xpath->query("//a[@rel='nofollow']"); // "//table[contains(@class,'tablepress')]"
    $count = $links->length;
    print_r($links);
    foreach ($links as $link) {
        echo $link->getAttribute('href');
        echo PHP_EOL;
    }
}


/**
 * Select phần tử dựa vào ID.
 * Sử dụng phương thức getElementById().
 */
function getById(DOMDocument $dom): void
{
    $testVietnamese = $dom->getElementById('testVietnamese');
    if ($testVietnamese) {
        echo $testVietnamese->nodeValue;
        echo PHP_EOL;
    }
}


/**
 * Tạo các ảnh thành responsive.
 * Sử dụng các phương thức như createElement(), cloneNode(), replaceChild(), appendChild(), saveHTML().
 */
function makeResposiveImages(DOMDocument $dom): string
{
    // Create the div wrapper
    $div = $dom->createElement('div');
    $div->setAttribute('class', 'responsive-img');

    // Get all the images
    $images = $dom->getElementsByTagName('img');

    // Loop the images
    foreach ($images as $image) {
        // Clone our created div
        $newDivClone = $div->cloneNode();

        // Replace image with wrapper div
        $image->parentNode->replaceChild($newDivClone, $image);

        // Append image to wrapper div
        $newDivClone->appendChild($image);
    }

    // Save the HTML
    $html = $dom->saveHTML();
    return $html;
}


/**
 * Xóa các thẻ style.
 * Sử dụng phương thức removeAttribute(), getAttribute(), hasAttribute().
 */
function stripStyleTags(DOMDocument $dom): string
{
    $xpath = new DOMXPath($dom);

    // Find any element with the style attribute
    $nodes = $xpath->query('//*[@style]');

    $attr = 'style';
    foreach ($nodes as $node) {
        if ($node->hasAttribute($attr)) {
            echo $node->getAttribute($attr) . PHP_EOL;
            $node->removeAttribute($attr);
        }
    }
    $html = $dom->saveHTML();
    return $html;
}


/**
 * Thêm một phần tử mới.
 */
function insertNewElement(DomDocument $dom): void
{
    $ps = $dom->getElementsByTagName('p');
    $firstPara = $ps->item(0);

    $htmlToAdd = '<div><a hreh="#"><img src="image.jpeg"/></a></div>';
    $domToAdd = new DOMDocument();
    // @$domToAdd->loadHTML($htmlToAdd);
    // it loads the content without adding enclosing html/body tags and also the doctype declaration
    // LIBXML_HTML_NOIMPLIED (int)
    //     Sets HTML_PARSE_NOIMPLIED flag, which turns off the automatic adding of implied html/body... elements.
    // LIBXML_HTML_NODEFDTD (int)
    //     Sets HTML_PARSE_NODEFDTD flag, which prevents a default doctype being added when one is not found.
    @$domToAdd->loadHTML($htmlToAdd, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);

    $newElement = $domToAdd->documentElement;

    $importedElement = $dom->importNode($newElement, true);

    $firstPara->parentNode->insertBefore($importedElement, $firstPara->nextSibling);

    // TODO: Bị lẫn thẻ HTML
    // <html><body><div><a hreh="#"><img src="image.jpeg"></a></div></body></html>
    // TODO: Tiếng Việt đang hiển thị xấu
    // Ti&#7871;ng Vi&#7879;t: Nguy&#7877;n V&#259;n Huy&ecirc;n, Cao Th&#7883; Th&ugrave;y D&#432;&#417;ng, Nguy&#7877;n Anh Tu&#7845;n &lt; &gt;
    $output = @$dom->saveHTML();
    echo $output;
}


/**
 * Xóa phần tử.
 * Sử dụng phương thức removeChild ở đối tượng parentNode.
 */
function deleteElement(): void
{
    $html = <<<'HTML'
    <p>This is our first paragraph</p>
    <div class="del">Delete this</div>
    <p>This is our second paragraph</p>
    <p>This is our third paragraph</p>
    <div class="del">Delete this too</div>
    HTML;

    $dom = new DomDocument();
    @$dom->loadHTML($html);
    $documentElement = $dom->documentElement;
    echo $dom->saveHTML();

    $xpath = new DOMXpath($dom);
    $elems = $xpath->query("//div[@class='del']");

    foreach ($elems as $elem) {
        $elem->parentNode->removeChild($elem);
    }
    echo PHP_EOL . '------- after deletion --------' . PHP_EOL;
    echo $dom->saveHTML();
}


/**
 * Lấy tiêu đề.
 */
function getTitle(DomDocument $dom): void
{
    $xpath = new DOMXPath($dom);
    $titleNode = $xpath->query('//title');
    // var_dump($titleNode->item(0));
    // print_r($titleNode->item(0));
    echo $titleNode[0]->textContent . PHP_EOL;
}


function main(): void
{
    // Xâu HTML đầu vào
    // Phải có <meta content="text/html; charset=utf-8" http-equiv="Content-Type"> thì khi saveHtml mới có tiếng Việt đẹp
    $html = <<<'HTML'
    <!DOCTYPE html>
    <head>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
        <!--meta charset="utf-8" /-->
        <title>Tutorialspoint</title>
    </head>

    <body>
        <h2>Course details</h2>

        <table>
            <tbody>
                <tr>
                    <td>Android</td>
                    <td>Gopal</td>
                    <td>Sairam</td>
                </tr>

                <tr>
                    <td>Hadoop</td>
                    <td>Gopal</td>
                    <td>Satish</td>
                </tr>

                <tr>
                    <td>HTML</td>
                    <td>Gopal</td>
                    <td>Raju</td>
                </tr>

                <tr>
                    <td>Web technologies</td>
                    <td>Gopal</td>
                    <td>Javed</td>
                </tr>

                <tr>
                    <td>Graphic</td>
                    <td>Gopal</td>
                    <td>Satish</td>
                </tr>

                <tr>
                    <td>Writer</td>
                    <td>Kiran</td>
                    <td>Amith</td>
                </tr>

                <tr>
                    <td>Writer</td>
                    <td>Kiran</td>
                    <td>Vineeth      Space</td>
                </tr>
            </tbody>
        </table>

        <p>
            <a href="https://lockex1987.github.io" rel=nofollow>
                My website
            </a>
        </p>

        <p>
            <img src="xxx.jpg"/>
        </p>

        <p id="testVietnamese" style="font-weight: bold">
            Tiếng Việt: Nguyễn Văn Huyên, Cao Thị Thùy Dương, Nguyễn Anh Tuấn &lt; &gt;
        </p>
    </body>
    </html>
    HTML;

    // $html = file_get_contents('sample_2.html');


    // Khởi tạo đối tượng DOMDocument
    $dom = new DOMDocument();
    // $dom = new DOMDocument('1.0', 'UTF-8');

    // Việc parse có thể có cảnh báo (warning), như tên tag không hợp lệ, không có thẻ đóng,...
    // Để không hiển thị các warning, thêm ký tự @ ở phía trước
    // Thêm cả hàm mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8') để hỗ trợ Unicode (tiếng Việt)
    // $dom->loadHTML($html);
    @$dom->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'));
    // $dom->loadHTMLFile('path/to/htmlfile.html');

    // Có xóa các khoảng trắng thừa
    // Loại bỏ khoảng trắng
    $dom->preserveWhiteSpace = false;

    // traverseRows($dom);
    // updateAttribute($dom);
    // getAllLinks($dom);
    // getByXpath($dom);
    // getById($dom);
    // echo makeResposiveImages($dom) . PHP_EOL;
    echo stripStyleTags($dom) . PHP_EOL;
    // insertNewElement($dom);
    // deleteElement();
    // getTitle($dom);
}

main();
