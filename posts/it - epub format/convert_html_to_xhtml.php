<?php

// https://en.wikipedia.org/wiki/XHTML
// http://www.w3.org/People/Raggett/tidy/
// http://tidy.sourceforge.net/libintro.html
// https://www.php.net/tidy
function convertHtmlToXhtml(string $htmlCode): string
{
    $tidy = new Tidy();
    // http://tidy.sourceforge.net/docs/quickref.html
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
        echo 'There are no errors.';
    }

    return tidy_get_output($tidy);
}


// $htmlCode = 'syntax <strong>error</small> <myowntag>my text</myowntag>';
$htmlCode = file_get_contents('boilerplate/text/10.html');
$xhtml = convertHtmlToXhtml($htmlCode);
// echo $xhtml . PHP_EOL;
