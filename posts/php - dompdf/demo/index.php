<?php
namespace Cttd\Demo;

require 'vendor/autoload.php';

use Dompdf\Dompdf;


class DompdfDemo
{

    public function __construct()
	{
	}

    public function simpleStream()
    {
        // instantiate and use the dompdf class
        $dompdf = new Dompdf();

        // Load HTML content
        $dompdf->loadHtml('<h1>hello world (CTTD)</h1>');

        // (Optional) Setup the paper size and orientation
        $dompdf->setPaper('A4', 'landscape');

        // Render the HTML as PDF
        $dompdf->render();

        // Output the generated PDF to Browser
        $dompdf->stream('ten-file');
    }

    public function processWithFiles($templateFile, $outputFile)
    {
        $dompdf = new Dompdf();
        //$dompdf->loadHtmlFile($templateFile);
        $html = file_get_contents($templateFile);
        $dompdf->loadHtml($html);
        $dompdf->render();
        $dompdf->output();
        $output = $dompdf->output();
        file_put_contents($outputFile, $output);
    }
}

$demo = new DompdfDemo();
//$demo->simpleStream();
//$demo->processWithFiles('template/template-1.html', 'output/output-1.pdf');
$demo->processWithFiles('template/template-2.html', 'output/output-2.pdf');

?>
