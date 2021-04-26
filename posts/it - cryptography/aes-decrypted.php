<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$key = $_POST["password"];
$filename = $_POST["f"];
$myfile = fopen(__DIR__ . '/data/'.$filename.".txt", "r") or die("Unable to open file!");
$ciphertext = fread($myfile,filesize(__DIR__ . '/data/'.$filename.".txt"));
fclose($myfile);

$c = base64_decode($ciphertext);
$cipher = "AES-256-CBC";
$ivlen = openssl_cipher_iv_length($cipher);
$iv = substr($c, 0, $ivlen);
$hmac = substr($c, $ivlen, $sha2len=32);
$ciphertext_raw = substr($c, $ivlen+$sha2len);
$original_plaintext = openssl_decrypt($ciphertext_raw, $cipher, $key, $options=OPENSSL_RAW_DATA, $iv);
$calcmac = hash_hmac('sha256', $ciphertext_raw, $key, $as_binary=true);
if (hash_equals($hmac, $calcmac))
{
  $output = $original_plaintext;
} else {
  $output = "Wrong password, sorry.";
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
              Your decrypted data:<br /><br />
              <?php echo nl2br($output);?>
            </p>
          </div>
        </div>
      </div>
     </main>
   </body>
   </html>