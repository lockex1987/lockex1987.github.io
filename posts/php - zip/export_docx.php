<?php

function exportDocx()
{
}

// Đường dẫn đến file chứa nội dung
const MAIN_DOCUMENT_PATH = "word/document.xml";

// Tạo file mới từ template
$templatePath = 'template.docx';
$outputPath = 'output.docx';
copy($templatePath, $outputPath);

// Mở file mới và cập nhật
$zip = new ZipArchive();
$zip->open($outputPath);
$template = $zip->getFromName(MAIN_DOCUMENT_PATH);
$newContent = str_replace('[MY_NAME]', 'Nguyễn Văn Huyên', $template);
$zip->deleteName(MAIN_DOCUMENT_PATH);
$zip->addFromString(MAIN_DOCUMENT_PATH, $newContent);
$zip->close();

echo date('h:i:s') . "\n";

// Sleep for 5 seconds
sleep(5);

// start again
echo "Finish\n";
