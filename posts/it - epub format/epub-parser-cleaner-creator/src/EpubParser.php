<?php

namespace Cttd\Epub;

use SimpleXMLElement;

class EpubParser extends EpubFile
{
    /**
     * Danh sách các item manifest.
     */
    private array $manifest = [];

    

    /**
     * Chứa các metadata thuộc namespace dc.
     */
    private array $dcElements;

    /**
     * Chứa các itemref ở phần spine.
     */
    private array $spine;

    /**
     * Các phần tử mục lục.
     */
    private array $toc;

    /**
     * Khởi tạo.
     * @param string $filePath
     * @param string|null $imageWebRoot
     * @param string|null $linkWebRoot
     */
    public function __construct(string $filePath, ?string $imageWebRoot = null, ?string $linkWebRoot = null)
    {
        parent::__construct($filePath, $imageWebRoot, $linkWebRoot);
        $this->parse();
    }

    // -------------------------------------------- Các phương thức private --------------------------------------------

    /**
     * Parse epub file info.
     */
    private function parse(): void
    {
        $this->_getDcData();
        $this->_getManifest();
        $this->_getSpine();
        $this->_getTOC();

        $this->close();
    }

    /**
     * Đóng file ZIP.
     */
    private function close(): void
    {
        // $this->xml->formatOutput = true;
        // $zip->addFromString($this->meta, $this->xml->saveXML());
        // $zip->addFromString(ltrim($path, '/'), file_get_contents($this->imagetoadd));
        $this->zip->close();
    }

    /**
     * Read the metadata DC details (title, author, etc.) from the OPF file.
     * Thiết lập thuộc tính dcElements.
     */
    private function _getDcData(): void
    {
        $data = $this->zip->getFromName($this->opfFile);
        $xml = new SimpleXMLElement($data);
        $dcList = $xml->metadata->children('dc', true);
        $this->dcElements = [];
        foreach ($dcList as $key => $value) {
            if (!is_array($value) && !empty($value)) {
                $this->dcElements[$key] = (string) $value;
            }
        }
    }

    /**
     * Gets the manifest data from the OPF file.
     * Thiết lập thuộc tính manifest.
     */
    private function _getManifest(): void
    {
        $buf = $this->zip->getFromName($this->opfFile);
        $opfContents = new SimpleXMLElement($buf);
        foreach ($opfContents->manifest->item as $item) {
            $attr = $item->attributes();
            $id = (string) $attr->id;
            $this->manifest[$id]['href'] = Util::directoryConcat($this->oebpsFolder, urldecode((string) $attr->href));
            $this->manifest[$id]['media-type'] = (string) $attr->{'media-type'};
        }
    }

    /**
     * Get the spine data from the OPF file.
     * Thiết lập thuộc tính spine.
     */
    private function _getSpine(): void
    {
        $buf = $this->zip->getFromName($this->opfFile);
        $opfContents = new SimpleXMLElement($buf);
        foreach ($opfContents->spine->itemref as $item) {
            $attr = $item->attributes();
            $this->spine[] = (string) $attr->idref;
        }
    }

    /**
     * Build an array with the TOC.
     * Thiết lập thuộc tính toc.
     */
    private function _getTOC(): void
    {
        $tocFile = '';
        foreach ($this->manifest as $id => $attr) {
            if ($attr['media-type'] == 'application/x-dtbncx+xml') {
                $tocFile = $attr['href'];
                break;
            }
        }
        // var_dump($tocFile);

        $buf = $this->zip->getFromName($tocFile);
        $tocContents = new SimpleXMLElement($buf);

        $callback = function ($navPoints) use (&$callback) {
            $ret = [];
            foreach ($navPoints as $navPoint) {
                $attributes = $navPoint->attributes();
                // $payOrder = (string) $attributes['playOrder'];
                $src = Util::directoryConcat($this->oebpsFolder, (string) $navPoint->content->attributes());
                $explodeUrl = strpos($src, '#') ? explode('#', $src) : [$src, null];
                $current = [
                    'id' => (string) $attributes['id'],
                    'name' => (string) $navPoint->navLabel->text,
                    'file_name' => $explodeUrl[0],
                    'src'  => $src,
                    'page_id' => $explodeUrl[1]
                ];

                if (isset($navPoint->navPoint) && !empty($navPoint->navPoint)) {
                    $current['children'] = $callback($navPoint->navPoint);
                }
                $ret[] = $current;
            }
            return $ret;
        };

        $toc = $callback($tocContents->navMap->navPoint);

        $this->toc = $toc;
    }

    

    // ------------------------------------ Các phương thức public ------------------------------------

    /**
     * get ebook spine file id.
     * @return array
     */
    public function getSpine()
    {
        return $this->spine;
    }

    /**
     * Get the specified manifest item.
     * @param string $item The manifest ID
     * @return string|boolean|array String when manifest item exists, otherwise false
     */
    public function getManifest($item = null)
    {
        if (is_null($item)) {
            return $this->manifest;
        } elseif (is_string($item) && key_exists($item, $this->manifest)) {
            return $this->manifest[$item];
        } else {
            return false;
        }
    }

    /**
     * Get the specified DC item.
     * @param string|null $item The DC Item key
     * @return string|boolean|array String when DC item exists, otherwise false
     */
    public function getDcItem(?string $item = null)
    {
        if (is_null($item)) {
            return $this->dcElements;
        } elseif (is_string($item) && key_exists($item, $this->dcElements)) {
            return $this->dcElements[$item];
        } else {
            return false;
        }
    }

    /**
     * Set or get the book title
     *
     * @param string $title
     */
    public function getTitle($title = false)
    {
        return $this->getDcItem('title', $title);
    }

    /**
     * Set or get the book's language
     *
     * @param string $lang
     */
    public function getLanguage($lang = false)
    {
        return $this->getDcItem('language', $lang);
    }

    /**
     * Set or get the book' publisher info
     *
     * @param string $publisher
     */
    public function getPublisher($publisher = false)
    {
        return $this->getDcItem('publisher', $publisher);
    }

    /**
     * Get the specified manifest by type
     * @param string $pattern The manifest type
     * @return string|boolean|array String when manifest item exists, otherwise false
     */
    public function getManifestByType($pattern)
    {
        $isRegExp =  @preg_match($pattern, '') !== false;
        $ret = array_filter($this->manifest, function ($manifest) use ($pattern, $isRegExp) {
            if ($isRegExp) {
                return preg_match($pattern, $manifest['media-type']);
            }
            return $manifest['media-type'] === $pattern;
        });
        return (count($ret) == 0) ? false : $ret;
    }

    /**
     * Retrieve the ToC
     * @return array Array with ToC Data
     */
    public function getTOC()
    {
        return $this->toc;
    }

    /**
     * get the path relative the file root
     * @param $href string
     * @return string
     */
    private function getFileRealPath($href)
    {
        $oebpsFolder = $this->oebpsFolder;
        $href   = str_replace(array('/', '\\'), '/', $href);

        $path = [rtrim($oebpsFolder, '/'), ltrim($href, '/')];

        return implode('/', array_filter($path));
    }

    /**
     * Returns the OPF/Data dir
     * @return string The OPF/data dir
     */
    private function getoebpsFolder()
    {
        return $this->oebpsFolder;
    }

    /**
     * get chapter html text
     * @param $chapterId string chapterId
     * @return string
     *
     */
    public function getChapter($chapterId)
    {
        $result = $this->getChapterRaw($chapterId);
        $chapterHref = $this->getManifest($chapterId)['href'];

        // remove linebreaks (no multi line matches in JS regex!)
        $result = preg_replace('/\r?\n/', '\u0000', $result);

        // keep only <body> contents
        $match = [];
        preg_match('/<body[^>]*?>(.*)<\/body[^>]*?>/i', $result, $match);
        $result = trim($match[1]);

        // remove <script> blocks if any
        $result = preg_replace('/<script[^>]*?>(.*?)<\/script[^>]*?>/i', '', $result);

        // remove <style> blocks if any
        $result = preg_replace('/<style[^>]*?>(.*?)<\/style[^>]*?>/i', '', $result);

        // remove onEvent handlers
        $result = preg_replace_callback('/(\s)(on\w+)(\s*=\s*["\']?[^"\'\s>]*?["\'\s>])/', function ($matches) {
            return $matches[1] . 'skip-' . $matches[2] . $matches[3];
        }, $result);

        // replace images
        $result = preg_replace_callback('/(\s(?:xlink:href|src)\s*=\s*["\']?)([^"\'\s>]*?)(["\'\s>])/', function ($matches) use ($chapterHref) {
            $img = Util::directoryConcat($chapterHref, urldecode($matches[2]), true);

            $element = null;
            foreach ($this->manifest as $key => $value) {
                $mainestUrl = $value['href'];
                if ($mainestUrl === $img) {
                    $element = $value;
                    break;
                }
            }
            if (!is_null($element)) {
                return $matches[1] . $this->imageWebRoot . '/' . $img . $matches[3];
            }
            return '';
        }, $result);

        $result = preg_replace_callback('/(\shref\s*=\s*["\']?)([^"\'\s>]*?)(["\'\s>])/', function ($matches) use ($chapterHref) {
            $linkparts = isset($matches[2]) ? explode('#', Util::directoryConcat($chapterHref, urldecode($matches[2]), true)) : [];
            $link    = array_shift($linkparts) ?? '';
            $element   = null;

            if ($link) {
                foreach ($this->manifest as $key => $value) {
                    if (explode('#', $value['href'])[0] === $link) {
                        $element = $value;
                        break;
                    }
                }
            }

            if (count($linkparts)) {
                $link .= '#' . implode('#', $linkparts);
            }

            // include only images from manifest
            if ($element) {
                return $matches[1] . $this->linkWebRoot . '/' . $link . $matches[3];
            }
            return $matches[1] . $matches[2] . $matches[3];
        }, $result);

        return preg_replace('/\\\u0000/', '\n', $result);
    }

    /**
     * get chapter html text
     * @param $chapterId string chapterId
     * @return string
     *
     */
    public function getChapterRaw($chapterId)
    {
        if (isset($this->manifest[$chapterId])) {
            $chapter = $this->manifest[$chapterId];
            if (!($chapter['media-type'] == 'application/xhtml+xml' || $chapter['media-type'] == 'image/svg+xml')) {
                throw new \Exception('Invalid mime type for chapter');
            }
            $filePath = $chapter['href'];
            $this->open();
            $result = $this->zip->getFromName($filePath);
            $this->close();
            return $result;
        }
        throw new \Exception('File not found');
    }

    /**
     * @param $imageId
     * @return string
     *
     */
    public function getImage($imageId)
    {
        if (isset($this->manifest[$imageId])) {
            $image = $this->manifest[$imageId];
            if (substr(trim(strtolower($image['media-type'] ?? '')), 0, 6)  !=  'image/') {
                throw new \Exception('Invalid mime type for image');
            }
            $this->open();
            $result = $this->zip->getFromName($image['href']);
            $this->close();
            return $result;
        }
        throw new \Exception('file not found');
    }

    /**
     * @param $fileId string
     * @return string
     *
     */
    public function getFile($fileId)
    {
        if (isset($this->manifest[$fileId])) {
            $file = $this->manifest[$fileId];
            $this->open();
            try {
                $result = $this->zip->getFromName($file['href']);
                $this->close();
                return $result;
            } catch (\Exception $e) {
            }
        }
        throw new \Exception('file not found');
    }

    /**
     * @param string $path the epub file extract destination
     * @param null|array|string $fileType file mimetype will extract or except
     * @param bool $except
     *
     */
    public function extract($path, $fileType = null, $except = false)
    {
        if (!is_dir($path)) {
            throw new \Exception('invalid folder given!');
        }
        $this->open();

        $allMainfest = $this->manifest;
        $fileLimit = null;
        if (!is_null($fileType) && is_string($fileType)) {
            $mainfest = $this->getManifestByType($fileType);
            if ($mainfest !== false) {
                $fileLimit = array_column($mainfest, 'href');
            }
        } elseif (is_array($fileType)) {
            $fileLimit = $fileType;
        }

        if ($except === true && !is_null($fileLimit)) {
            $fileLimit = array_diff($allMainfest, $fileLimit);
        }

        if (is_null($fileLimit)) {
            $this->zip->extractTo($path);
        } else {
            $this->zip->extractTo($path, array_values($fileLimit));
        }

        $needReplacePath = array_values(array_column(array_filter($this->manifest, function ($item) {
            return $item['media-type'] === 'application/xhtml+xml';
        }), 'href'));


        if (!is_null($fileLimit)) {
            $needReplacePath = array_intersect($needReplacePath, $fileLimit);
        }

        foreach ($needReplacePath as $file) {
            $this->_replaceExtractFile(implode('/', [rtrim($path, '/'), $file]), $file);
        }

        $this->close();
    }


    /**
     * @param $realPath
     * @param $fileBasePath
     *
     */
    private function _replaceExtractFile($realPath, $fileBasePath)
    {
        if (file_exists($realPath) && is_file($realPath) && is_readable($realPath) && is_writable($realPath)) {
            $str = file_get_contents($realPath);

            // replace image url
            $str = preg_replace_callback('/(\s(?:xlink:href|src)\s*=\s*["\']?)([^"\'\s>]*?)(["\'\s>])/', function ($matches) use ($fileBasePath) {
                $img = Util::directoryConcat($fileBasePath, urldecode($matches[2]), true);

                $element = null;
                foreach ($this->manifest as $key => $value) {
                    $mainestUrl = $value['href'];
                    if ($mainestUrl === $img) {
                        $element = $value;
                        break;
                    }
                }
                if (!is_null($element)) {
                    return $matches[1] . $this->imageWebRoot . '/' . $img . $matches[3];
                }
                return '';
            }, $str);


            // replace link href
            $str = preg_replace_callback('/(\shref\s*=\s*["\']?)([^"\'\s>]*?)(["\'\s>])/', function ($matches) use ($fileBasePath) {
                $linkparts = isset($matches[2]) ? explode('#', Util::directoryConcat($fileBasePath, urldecode($matches[2]), true)) : [];
                $link    = array_shift($linkparts) ?? '';
                $element   = null;

                if ($link) {
                    foreach ($this->manifest as $key => $value) {
                        if (explode('#', $value['href'])[0] === $link) {
                            $element = $value;
                            break;
                        }
                    }
                }

                if (count($linkparts)) {
                    $link .= '#' . implode('#', $linkparts);
                }

                // include only images from manifest
                if ($element) {
                    return $matches[1] . $this->linkWebRoot . '/' . $link . $matches[3];
                }
                return $matches[1] . $matches[2] . $matches[3];
            }, $str);

            file_put_contents($realPath, $str);
        } else {
            throw new \Exception('change $realPath error');
        }
    }
}
