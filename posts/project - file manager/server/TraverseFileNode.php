<?php


// https://github.com/phpredis/phpredis/
// Nên dùng phpredis extension thay cho thư viện Predis
class TraverseFileNode
{
    public const NODELIST_KEY = 'nodelist';
    public const KEY_PREFIX = 'filenode:';
    public const CHILDREN_PREFIX = 'children:';

    // Ignore các file và folder con trong các thư mục vendor, .git, node_modules,...
    public const IGNORE_FOLDERS = [
        'vendor',
        '.git',
        'node_modules'
    ];

    // string
    private $rootFolder;

    // Redis
    private $redis;

    /**
     * Thêm dữ liệu vào Redis.
     */
    private function insertIntoRedis(
        string $path,
        int $size,
        bool $isFile,
        ?array $children,
        string $parent
    ): void {
        if (!$isFile && count($children) > 0) {
            foreach ($children as $child) {
                $this->redis->zadd(self::CHILDREN_PREFIX . $path, $child['size'], $child['path']);
            }
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

    private function traverseFolder(string $folderPath, string $parent): int
    {
        $folderSize = 0;
        $children = [];

        $arr = scandir($this->rootFolder . $folderPath);
        foreach ($arr as $f) {
            if (!in_array($f, ['.', '..'])) {
                $path = $folderPath . $f;
                
                if (is_dir($this->rootFolder . $path)) {
                    $subFolderSize = $this->traverseFolder($path . '/', $folderPath);
                    $folderSize += $subFolderSize;

                    $children[] = [
                        'path' => $path . '/',
                        'size' => $subFolderSize
                    ];
                } else {
                    $fileSize = filesize($this->rootFolder . $path);
                    $folderSize += $fileSize;

                    $children[] = [
                        'path' => $path,
                        'size' => $fileSize
                    ];
                    
                    // TODO: ignore các file và folder con trong các thư mục vendor, .git, node_modules
                    $this->insertIntoRedis(
                        $path,
                        $fileSize,
                        true,
                        null,
                        $folderPath
                    );   
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

        return $folderSize;
    }

    public function scanFolder(string $rootFolder): void
    {
        $timeStart = microtime(true); 
        $this->redis = RedisConnection::connectRedis();
        $this->rootFolder = rtrim($rootFolder, '/');
        $this->traverseFolder('/', '');
        $this->redis->close();
        $timeEnd = microtime(true);
        $executionTime = $timeEnd - $timeStart;
        echo 'Kết thúc sau ' . $executionTime . ' giây' . PHP_EOL;
    }
}
