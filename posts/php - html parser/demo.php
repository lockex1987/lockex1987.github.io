<?php

$html = <<<'HTML'
    <head>
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


// $html = '<html><body><foo></foo></body>';


$dom = new DOMDocument();

// Việc parse có thể có cảnh báo (warning), như tên tag không hợp lệ, không có thẻ đóng,...
// Để không hiển thị các warning, thêm ký tự @ ở phía trước
// $dom->loadHTML($html);
@ $dom->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'));

$dom->preserveWhiteSpace = false;


/*
$tables = $dom->getElementsByTagName('table');
$rows = $tables->item(0)->getElementsByTagName('tr');
foreach ($rows as $row) {
    $cols = $row->getElementsByTagName('td');
    echo 'Designation: ' . $cols->item(0)->nodeValue . "\n";
    echo 'Manager: ' . $cols->item(1)->nodeValue . "\n";
    echo 'Team: ' . $cols->item(2)->nodeValue . "\n";
    echo "\n";
}
*/


/*
$images = $dom->getElementsByTagName('img');
foreach ($images as $image) {
    $image->setAttribute('src', 'http://example.com/' . $image->getAttribute('src'));
}
echo $dom->saveHTML();
echo "\n";
*/


/*
$links = $dom->getElementsByTagName('a');
foreach ($links as $link) {
    echo $link->getAttribute('href');
    echo "\n";
}
*/


/*
// Returns a list of all links with rel=nofollow
$xpath = new DOMXPath($dom);
$links = $xpath->query("//a[@rel='nofollow']");
print_r($links);
foreach ($links as $link) {
    echo $link->getAttribute('href');
    echo "\n";
}
*/


/*
$testVietnamese = $dom->getElementById('testVietnamese');
if ($testVietnamese) {
    echo $testVietnamese->nodeValue;
    echo "\n";
}
*/


function makeResposiveImages($dom)
{
    // Create the div wrapper
    $div = $dom->createElement('div');
    $div->setAttribute('class', 'responsive-img');
	
    // Get all the images
    $images = $dom->getElementsByTagName('img');
 
    // Loop the images
    foreach ($images as $image) {
        // Clone our created div
        $new_div_clone = $div->cloneNode();
		
        // Replace image with wrapper div
        $image->parentNode->replaceChild($new_div_clone, $image);
		
        // Append image to wrapper div
        $new_div_clone->appendChild($image);
    }
	
    // Save the HTML
    $html = $dom->saveHTML();
    return $html;
}


function stripStyleTags($dom)
{
    $xpath = new DOMXPath($dom);

    // Find any element with the style attribute
    $nodes = $xpath->query('//*[@style]');

    foreach ($nodes as $node) {
        // Remove style attribute
        $node->removeAttribute('style');
    }
    $html = $dom->saveHTML();
    return $html;
}


// echo makeResposiveImages($dom) . "\n";
echo stripStyleTags($dom) . "\n";