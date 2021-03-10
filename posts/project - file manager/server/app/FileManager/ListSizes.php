<?php

namespace Cttd\FileManager;


class ListSizes
{
    public function listRedis(): void
    {
        $this->redis = RedisConnection::connectRedis();
        $paths = $this->redis->lrange(TraverseFileNode::NODELIST_KEY, 0, -1);
        foreach ($paths as $p) {
            // echo $p . PHP_EOL;
        }
        $this->redis->close();
    }

    public function listFolder(string $rootPath): array
    {
        $arr = [];
        $this->redis = RedisConnection::connectRedis();
        $rootObject = $this->redis->hgetall(TraverseFileNode::KEY_PREFIX . $rootPath);
        $arr[] = $rootObject;
        // var_dump($rootObject);

        $ratio = 0.012;
        $minSize = intval($rootObject['size']) * $ratio;
        $this->traverseFolder($arr, $rootObject['path'], 1, $minSize);

        $this->redis->close();
        return $arr;
    }

    private function traverseFolder(array &$resultArr, string $folderPath, int $level, float $minSize): void
    {
        if ($level > 2) {
            return;
        }

        // Duyệt level 1
        $lv1Children = $this->redis->zrange(TraverseFileNode::CHILDREN_PREFIX . $folderPath, 0, -1, true);
        foreach ($lv1Children as $lv1Path => $lv1Size) {
            $lv1Object = $this->redis->hgetall(TraverseFileNode::KEY_PREFIX . $lv1Path);
            // echo $level . ', ' . $lv1Size . ', ' . $minSize . PHP_EOL;

            if ($level == 1 || $lv1Size >= $minSize) {
                $resultArr[] = $lv1Object;
                // echo $lv1Object['path'] . PHP_EOL;

                // Duyệt level 2
                if ($lv1Object['isFile'] == '0') {
                    $this->traverseFolder($resultArr, $lv1Object['path'], $level + 1, $minSize);
                }
            }
        }
    }
}
