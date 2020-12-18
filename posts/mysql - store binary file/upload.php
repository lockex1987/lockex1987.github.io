<?php
include 'db-connection.php';

if (isset($_POST["submit"])) {
    $check = getimagesize($_FILES["image"]["tmp_name"]);
    if ($check !== false) {
        $image = $_FILES['image']['tmp_name'];
        $imgContent = addslashes(file_get_contents($image));

        // Insert image content into database
        $insert = $db->query("INSERT into images (image) VALUES ('$imgContent')");
        if ($insert) {
            echo "File uploaded successfully.";
        } else {
            echo "File upload failed, please try again.";
        } 
    } else {
        echo "Please select an image file to upload.";
    }
}
?>