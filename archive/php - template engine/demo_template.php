<?php
include './Template.php';

$template = new Template('./views');
echo $template->render('profile', ['name' => 'Nguyễn Anh Tuấn']);
