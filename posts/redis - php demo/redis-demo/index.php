<?php

require_once 'bootstrap.php';

use Cttd\RedisDemo\Article;

$demo = new Article();

$user = 'user:3';
// $articleId = $demo->postArticle($user, 'Go to statement considered harmful', 'https://goo.gl/kZUSu');

$articleId = 1;
$article = 'article:' . $articleId;
// $demo->voteActicle($user, $article);

$list = $demo->getArticles();
// var_dump($list);
