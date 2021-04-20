<?php

namespace Cttd\Epub;

use SimpleXMLElement;
use ZipArchive;

class EpubFile
{
    /**
     * Đường dẫn file epub.
     */
    protected string $filePath;

    /**
     * Đối tượng file ZIP.
     */
    protected ZipArchive $zip;

    /**
     * Đường dẫn file content.opf.
     */
    protected string $opfFile;

    /**
     * Đường dẫn thư mục OEBPS.
     */
    protected string $oebpsFolder;

    /**
     * Root của đường dẫn ảnh.
     */
    protected null|string $imageWebRoot = null;

    /**
     * Root của đường dẫn thẻ A.
     */
    protected null|string $linkWebRoot = null;

    /**
     * Khởi tạo.
     * @param string $filePath
     * @param string|null $imageWebRoot
     * @param string|null $linkWebRoot
     */
    public function __construct(string $filePath, ?string $imageWebRoot = null, ?string $linkWebRoot = null)
    {
        $this->filePath = $filePath;
        $this->imageWebRoot = $imageWebRoot;
        $this->linkWebRoot  = $linkWebRoot;
        
        $this->open();
        $this->fileCheck();
        $this->_getOpfFile();
        $this->_getOebpsFolder();
    }

    /**
     * Mở file ZIP.
     */
    private function open(): void
    {
        $this->zip = new ZipArchive();
        $zipStatus = $this->zip->open($this->filePath);
        if ($zipStatus !== true) {
            throw new \Exception('Failed opening ebook: ' . @$this->zip->getStatusString(), $zipStatus);
        }
    }

    /**
     * Check file is validated.
     *
     */
    private function fileCheck()
    {
        $mimetype = $this->zip->getFromName('mimetype');
        if (strtolower($mimetype) !== 'application/epub+zip') {
            throw new \Exception('The epub file is not valid');
        }
    }

    /**
     * Lấy đường dẫn đến file opf (thường tên là content.opf) từ file META-INF/container.xml.
     * Thiết lập thuộc tính opfFile.
     */
    private function _getOpfFile(): void
    {
        $content = $this->zip->getFromName('META-INF/container.xml');
        $xml = new SimpleXMLElement($content);
        $attrs = $xml->rootfiles->rootfile->attributes();
        $this->opfFile = (string) $attrs->{'full-path'};
    }

    /**
     * Lấy luôn thư mục chứa file opf (thường là OEBPS).
     * Thiết lập thuộc tính oebpsFolder.
     */
    private function _getOebpsFolder(): void
    {
        // Set also the dir to the OPF (and ePub files)
        $arr = explode('/', $this->opfFile);
        unset($arr[(count($arr) - 1)]); // remove the last part (it's the .opf file itself)
        $this->oebpsFolder = implode('/', $arr);
    }
}