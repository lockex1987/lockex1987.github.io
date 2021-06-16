#!/usr/bin/env php
<?php

requireAutoloader();

ini_set('display_errors', 'stderr');

// var_dump($argv);

foreach ($argv as $i => $arg) {
    if ($i === 0) {
        continue;
    }

    if (substr($arg, 0, 1) === '-') {
        switch ($arg) {
            case '-h':
            case '--help':
                echo getHelpText();
                exit(0);
            default:
                fail('Unknown option: ' . $arg);
        }
    } else {
        $src = $argv[1];
    }
}

if (isset($src)) {
    if (!file_exists($src)) {
        fail('File not found: ' . $src);
    }

    $html = file_get_contents($src);
} else {
    $stdin = fopen('php://stdin', 'r');
    stream_set_blocking($stdin, false);
    $html = stream_get_contents($stdin);
    fclose($stdin);

    if (empty($html)) {
        fail(getHelpText());
    }
}


$options = [
    'strip_tags' => true
];
$converter = new League\HTMLToMarkdown\HtmlConverter($options);
$markdown = $converter->convert($html);
echo $markdown;
file_put_contents('dist/index.md', $markdown);


/**
 * Get help and usage info
 *
 * @return string
 */
function getHelpText()
{
    return <<<HELP
        HTML To Markdown

        Usage: html-to-markdown [OPTIONS] [FILE]

            -h, --help  Shows help and usage information

            If no file is given, input will be read from STDIN

        Examples:

            Converting a file named document.html:

                html-to-markdown document.html

            Converting a file and saving its output:

                html-to-markdown document.html > output.md

            Converting from STDIN:

                echo -e '<h1>Hello World!</h1>' | html-to-markdown

            Converting from STDIN and saving the output:

                echo -e '<h1>Hello World!</h1>' | html-to-markdown > output.md
        HELP;
}


/**
 * @param string $message Error message
 */
function fail($message)
{
    fwrite(STDERR, $message . "\n");
    exit(1);
}


function requireAutoloader()
{
    $autoloadPaths = [
        // Local package usage
        __DIR__ . '/vendor/autoload.php'
    ];
    foreach ($autoloadPaths as $path) {
        if (file_exists($path)) {
            require_once $path;
            break;
        }
    }
}
