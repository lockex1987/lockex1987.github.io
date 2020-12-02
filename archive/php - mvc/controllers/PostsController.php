<?php
require_once('controllers/BaseController.php');
require_once('models/Post.php');

class PostsController extends BaseController
{
    public function __construct()
    {
        $this->folder = 'posts';
    }

    public function index()
    {
        $posts = Post::all();
        $data = array('posts' => $posts);
        $this->render('index', $data);
    }

    public function showPost()
    {
        $post = Post::find($_GET['id']);
        $data = array('post' => $post);
        $this->render('show', $data);
    }
}
