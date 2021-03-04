<?php


// https://github.com/phpredis/phpredis/
class FileNode
{
    private const NODELIST_KEY = 'nodelist';
    private const KEY_PREFIX = 'filenode:';
    private const CHILDREN_PREFIX = 'children:';

    private Redis $redis;

    private function connectRedis(): void
    {
        $this->redis = new Redis();
        $this->redis->connect('127.0.0.1', 6379);
        // $count = $this->redis->dbsize();
        // echo 'Redis has ' . $count . ' keys' . PHP_EOL;
    }

    private function closeRedis(): void
    {
        $this->redis->close();
    }

    private function insertIntoRedis(
        string $path,
        int $size,
        bool $isFile,
        ?array $children,
        string $parent
    ): void {
        if (!$isFile && count($children) > 0) {
            $this->redis->lpush(self::CHILDREN_PREFIX . $path, ...$children);
        }

        $this->redis->lpush(self::NODELIST_KEY, $path);

        $redisKey = self::KEY_PREFIX . $path;
        $data = [
            'path' => $path,
            'size' => $size,
            'isFile' => $isFile ? 1 : 0,
            'parent' => $parent
        ];
        $this->redis->hmset($redisKey, $data);
    }

    private function traverseFolder(string $folderPath, string $parent): void
    {
        $folderSize = 0;
        $children = [];

        $arr = scandir($folderPath);
        foreach ($arr as $f) {
            if (!in_array($f, ['.', '..'])) {
                $path = $folderPath . '/' . $f;
                $children[] = $path;
                if (is_dir($path)) {
                    $this->traverseFolder($path, $folderPath);
                } else {
                    $fileSize = filesize($path);
                    $this->insertIntoRedis(
                        $path,
                        $fileSize,
                        true,
                        null,
                        $folderPath
                    );
                    $folderSize += $fileSize;
                }
            }
        }

        $this->insertIntoRedis(
            $folderPath,
            $folderSize,
            false,
            $children,
            $parent
        );
    }

    public function scanFolder($rootFolder): void
    {
        $this->connectRedis();
        $this->traverseFolder($rootFolder, '');
        $this->closeRedis();
    }

    public function listRedis(): void
    {
        $this->connectRedis();
        $paths = $this->redis->lrange(self::NODELIST_KEY, 0, -1);
        // var_dump($paths);
        foreach ($paths as $p) {
            $redisKey = self::KEY_PREFIX . $p;
            $f = $this->redis->hgetall($redisKey);
            if ($f['isFile'] == '0') {
                $children = $this->redis->lrange(self::CHILDREN_PREFIX . $f['path'], 0, -1);
                // var_dump($children);
            }
        }
        $this->closeRedis();
    }
}


$fileNode = new FileNode();
$rootFolder = $argv[1];
$fileNode->scanFolder($rootFolder);
$fileNode->listRedis();
