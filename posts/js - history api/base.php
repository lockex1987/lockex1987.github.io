<?php

if (isset($_GET["view_as"]) && $_GET["view_as"] == "json") {
    // Nếu gọi AJAX
    echo json_encode(array("page" => $page_title, "content" => $page_content));
} else {
    // Nếu hiển thị full page
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8"/>
    <title><?php echo $page_title; ?></title>
  </head>
  <body>
    <p id="navigator">
      [ <a class="ajax-nav" href="first_page.php">Trang 1</a>
      | <a class="ajax-nav" href="second_page.php">Trang 2</a>
      | <a class="ajax-nav" href="third_page.php">Trang 3</a> ]
    </p>

    <div id="ajax-content">
        <?php echo $page_content; ?>
    </div>

    <p>Dòng này chỉ xuất hiện khi được load toàn bộ từ <strong><?php echo $page_url; ?></strong>.</p>

    <script src="app.js"></script>
  </body>
</html>
<?php
}
?>