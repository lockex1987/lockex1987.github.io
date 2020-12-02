<?php
echo '<p>Danh sách post:</p>';
echo '<ul>';
foreach ($posts as $post) {
    // echo '<li><a href="#">' . $post->title . '</a></li>';
    echo '<li><a href="demo.php?controller=Posts&action=showPost&id=' . $post->id . '">' . $post->title . '</a></li>';
}
echo '</ul>';
