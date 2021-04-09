<?php

// https://en.wikipedia.org/wiki/XHTML
// http://www.w3.org/People/Raggett/tidy/
// http://tidy.sourceforge.net/libintro.html
// http://tidy.sourceforge.net/docs/quickref.html
// https://www.php.net/tidy
function convertHtmlToXhtml(string $htmlCode): string
{
    $tidy = new Tidy();
    $options = [
        'indent' => true,
        'output-xhtml' => true,
        // 'output-xml' => true
        'show-body-only' => true
    ];
    $tidy->parseString($htmlCode, $options, 'utf8');
    $tidy->cleanRepair();

    
    if ($tidy->errorBuffer) {
        echo 'There are some errors!' . PHP_EOL;
        $errors = explode(PHP_EOL, $tidy->errorBuffer);

        foreach ($errors as $error) {
            echo $error . PHP_EOL;
        }
    } else {
        // echo 'There are no errors.';
    }

    return tidy_get_output($tidy);
}



/*
for ($i = 9; $i <= 99; $i++) {
    $htmlCode = file_get_contents('boilerplate/text/' . $i . '.html');
    echo $i . PHP_EOL;
}
*/

$htmlCode = <<<'HTML'
    syntax <strong>error</small> <myowntag>my text</myowntag>
    <select name="pet" size="3" multiple>
        <option selected>mouse</option>
        <option>bird</option>
        <option>cat</option>
    </select>
    HTML;
$xhtml = convertHtmlToXhtml($htmlCode);
echo PHP_EOL;
echo $xhtml . PHP_EOL;
