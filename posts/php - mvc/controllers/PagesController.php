<?php

require_once('controllers/BaseController.php');

class PagesController extends BaseController
{
    public function __construct()
    {
        $this->folder = 'pages';
    }

    public function home()
    {
        $data = array(
            'name' => 'Sang Beo',
            'age' => 22
        );
        $this->render('home', $data);
    }

    public function error()
    {
        $this->render('error');
    }
}
