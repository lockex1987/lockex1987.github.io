<?php

/**
 * Duyệt các dòng của bảng.
 * Sử dụng phương thức getElementsByTagName.
 */
function traverseRows(DOMDocument $doc): void
{
    $tables = $doc->getElementsByTagName('table');
    $rows = $tables->item(0)->getElementsByTagName('tr');
    $rowCount = $rows->length - 1; // trừ dòng header
    echo 'Số hàng của bảng là ' . $rowCount;
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
function updateAttribute(DOMDocument $doc): void
{
    $images = $doc->getElementsByTagName('img');
    foreach ($images as $image) {
        $image->setAttribute('src', 'http://example.com/' . $image->getAttribute('src'));
    }
    echo $doc->saveHTML();
    echo PHP_EOL;
}


/**
 * Lấy các đường dẫn.
 * Sử dụng phương thức getElementsByTagName và getAttribute.
 */
function getAllLinks(DOMDocument $doc): void
{
    $links = $doc->getElementsByTagName('a');
    foreach ($links as $link) {
        $url = $link->getAttribute('href');
        echo $url . PHP_EOL;
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
function getByXpath(DOMDocument $doc): void
{
    // Trả về danh sách các link mà có thuộc tính rel bằng nofollow
    $xpath = new DOMXPath($doc);
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
function getById(DOMDocument $doc): void
{
    $testVietnamese = $doc->getElementById('testVietnamese');
    if ($testVietnamese) {
        echo $testVietnamese->nodeValue;
        echo PHP_EOL;
    }
}


/**
 * Tạo các ảnh thành responsive.
 * Sử dụng các phương thức như createElement(), cloneNode(), replaceChild(), appendChild(), saveHTML().
 */
function makeResposiveImages(DOMDocument $doc): string
{
    // Tạo thẻ div wrapper
    $div = $doc->createElement('div');
    $div->setAttribute('class', 'responsive-img');

    // Lấy tất cả ảnh
    $images = $doc->getElementsByTagName('img');

    // Duyệt danh sách ảnh
    foreach ($images as $image) {
        // Clone thẻ div
        $newDivClone = $div->cloneNode();

        // Thay thế ảnh với thẻ div
        $image->parentNode->replaceChild($newDivClone, $image);

        // Thêm ảnh vào thẻ div
        $newDivClone->appendChild($image);
    }

    $html = $doc->saveHTML();
    return $html;
}


/**
 * Thêm một phần tử mới.
 */
function insertNewElement(DomDocument $doc): void
{
    $ps = $doc->getElementsByTagName('p');
    $firstPara = $ps->item(0);

    $htmlToAdd = '<div><a hreh="#"><img src="image.jpeg"/></a></div>';
    $domToAdd = new DOMDocument();
    // @$domToAdd->loadHTML($htmlToAdd);
    // it loads the content without adding enclosing html/body tags and also the doctype declaration
    // LIBXML_HTML_NOIMPLIED (int)
    //     Sets HTML_PARSE_NOIMPLIED flag, không tự động thêm các phần tử html/body....
    // LIBXML_HTML_NODEFDTD (int)
    //     Sets HTML_PARSE_NODEFDTD flag, ngăn không thêm DOCTYPE mặc định khi không có.
    @$domToAdd->loadHTML($htmlToAdd, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);

    $newElement = $domToAdd->documentElement;

    $importedElement = $doc->importNode($newElement, true);

    $firstPara->parentNode->insertBefore($importedElement, $firstPara->nextSibling);

    // TODO: Bị lẫn thẻ HTML
    // <html><body><div><a hreh="#"><img src="image.jpeg"></a></div></body></html>
    // TODO: Tiếng Việt đang hiển thị xấu
    // Ti&#7871;ng Vi&#7879;t: Nguy&#7877;n V&#259;n Huy&ecirc;n, Cao Th&#7883; Th&ugrave;y D&#432;&#417;ng, Nguy&#7877;n Anh Tu&#7845;n &lt; &gt;
    $output = @$doc->saveHTML();
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

    $doc = new DomDocument();
    @$doc->loadHTML($html);
    $documentElement = $doc->documentElement;
    echo $doc->saveHTML();

    $xpath = new DOMXpath($doc);
    $elems = $xpath->query("//div[@class='del']");

    foreach ($elems as $elem) {
        $elem->parentNode->removeChild($elem);
    }
    echo PHP_EOL . '------- after deletion --------' . PHP_EOL;
    echo $doc->saveHTML();
}


/**
 * Lấy tiêu đề.
 */
function getTitle(DomDocument $doc): void
{
    $xpath = new DOMXPath($doc);
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
    $doc = new DOMDocument();
    // $doc = new DOMDocument('1.0', 'UTF-8');

    // Việc parse có thể có cảnh báo (warning), như tên tag không hợp lệ, không có thẻ đóng,...
    // Để không hiển thị các warning, thêm ký tự @ ở phía trước
    // Thêm cả hàm mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8') để hỗ trợ Unicode (tiếng Việt)
    // $doc->loadHTML($html);
    @$doc->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'));
    // $doc->loadHTMLFile('path/to/htmlfile.html');

    // Có xóa các khoảng trắng thừa
    // Loại bỏ khoảng trắng
    $doc->preserveWhiteSpace = false;

    // traverseRows($doc);
    // updateAttribute($doc);
    // getAllLinks($doc);
    // getByXpath($doc);
    // getById($doc);
    // echo makeResposiveImages($doc) . PHP_EOL;
    // insertNewElement($doc);
    // deleteElement();
    // getTitle($doc);
}

main();
