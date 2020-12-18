<?php
include 'db-connection.php';

// http://localhost:8080/view.php?id=2
if(!empty($_GET['id'])){
    // Get image data from database
    //$result = $db->query(" SELECT image FROM images WHERE id = {$_GET['id']} ");
	$result = $db->query(" SELECT image_bin FROM image WHERE id = {$_GET['id']} ");
    
    if ($result->num_rows > 0) {
        $imgData = $result->fetch_assoc();
        header("Content-type: image/jpg"); 
        //echo $imgData['image'];
		echo $imgData['image_bin'];
    } else {
        echo 'Image not found...';
    }
}
?>