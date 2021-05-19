<?php

namespace Cttd\RedisDemo;

class Article extends RedisConnection
{
    const ONE_WEEK_IN_SECONDS = 7 * 86400;
    const VOTE_SCORE = 432;
    const ARTICLES_PER_PAGE = 25;

    /**
     * Người dùng vote cho bài viết nào đó.
     */
    public function voteActicle(string $user, string $article): void
    {
        // Thời gian tạo của bài viết
        $time = $this->redis->zscore('time:', $article);

        // Nếu thời gian tạo đã cũ hơn 1 tuần thì dừng lại
        $cutoff = time() - static::ONE_WEEK_IN_SECONDS;

        if ($time < $cutoff) {
            return;
        }

        $arr = explode(':', $article);
        $articleId = array_pop($arr);

        // Thêm người dùng vào danh sách vote cho bài viết đó
        // Nếu người dùng đã vote thì hàm sadd trả về 0 (số phần tử được thêm vào)
        if ($this->redis->sadd('voted:' . $articleId, $user)) {
            $this->redis->zincrby('score:', static::VOTE_SCORE, $article);
            $this->redis->hincrby($article, 'votes', 1);
        }
    }

    /**
     * Thêm mới một bài viết.
     */
    public function postArticle(string $user, string $title, string $link): string
    {
        // Tạo ID tự tăng mới
        $articleId = $this->redis->incr('article:');

        // Đánh dấu người dùng đã vote cho bài viết này
        $voted = 'voted:' . $articleId;
        $this->redis->sadd($voted, $user);

        // Mỗi bài viết chỉ được vote trong thời gian một tuần
        $this->redis->expire($voted, static::ONE_WEEK_IN_SECONDS);

        // Thêm mới bài viết
        $now = time();
        $article = 'article:' . $articleId;
        $this->redis->hmset($article, [
            'title' => $title,
            'link' => $link,
            'poster' => $user,
            'time' => $now,
            'votes' => 1,
            'id' => $articleId
        ]);

        // Thêm vào zset score và time
        $this->redis->zadd('score:', $now + static::VOTE_SCORE, $article);
        $this->redis->zadd('time:', $now, $article);

        return $articleId;
    }

    /**
     * Lấy danh sách bài viết.
     */
    public function getArticles(int $page = 1, $order = 'score:'): array
    {
        $start = ($page - 1) * static::ARTICLES_PER_PAGE;
        $end = $start + static::ARTICLES_PER_PAGE - 1;
        $ids = $this->redis->zrevrange($order, $start, $end);
        $articles = [];
        foreach ($ids as $id) {
            $articleData = $this->redis->hgetall($id);
            $articles[] = $articleData;
        }
        return $articles;
    }
}
