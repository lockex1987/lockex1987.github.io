<?php
$key = $_POST["password"];
$plaintext = $_POST["text"];
$cipher = "AES-256-CBC";
$ivlen = openssl_cipher_iv_length($cipher);
$iv = openssl_random_pseudo_bytes($ivlen);
$ciphertext_raw = openssl_encrypt($plaintext, $cipher, $key, $options=OPENSSL_RAW_DATA, $iv);
$hmac = hash_hmac('sha256', $ciphertext_raw, $key, $as_binary=true);
$ciphertext = base64_encode( $iv.$hmac.$ciphertext_raw );
$filename = bin2hex(openssl_random_pseudo_bytes(16));

$myfile = fopen("data/".$filename.".txt", "w") or die("Unable to open file!");
fwrite($myfile, $ciphertext);
fclose($myfile);
$link = 'https://'.$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF'])."/aes-decrypt.php?f=".$filename;

if ($_POST["remember"] == 1) {
  session_start();
  setcookie("key",$key, time() + (86400 * 30 * 30 * 365),"/");
}
 ?>

 <!doctype html>
 <html lang="en">
   <head>
     <meta charset="utf-8">
     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
     <meta name="description" content="">
     <meta name="author" content="">
     <title>Basic Cryptographic Tool</title>
     <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
     <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
   </head>
   <body>

     <header>
       <div class="navbar navbar-dark bg-dark box-shadow">
         <div class="container d-flex justify-content-between">
           <a href="#" class="navbar-brand d-flex align-items-center">
             <strong>Basic Cryptographic Tool</strong>
           </a>
         </div>
       </div>
     </header>

     <main role="main" style="margin-top:100px;">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <p>
              Your encrypted data is visible here:<br />
              <a href="<?php echo $link;?>"><?php echo $link;?></a>
            </p>
          </div>
        </div>
      </div>
     </main>
   </body>
   </html>