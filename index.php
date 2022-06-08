<?php


if(isset($_POST)){
  $myfile = fopen("post.txt", "w") or die("Unable to open file!");
  $data='';
  foreach ($_POST as $key => $value) {
    $data.=$key.'
';
  }
  fwrite($myfile,$data);
  fclose($myfile);
// example.json is for the demo, it can be any of your source data
$get = file_get_contents('php://input');
$dump = print_r( $get, true );
$create_webhookfile = file_put_contents( 'webhook.log', $dump );
}
if(!isset($_GET)){
  $myfile = fopen("post.txt", "w") or die("Unable to open file!");
  $data='';
  foreach ($_GET as $key => $value) {
    $data=$value;
  }
  
  fwrite($myfile,'get');
  fclose($myfile);
}



?>