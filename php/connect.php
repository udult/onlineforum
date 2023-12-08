<?php
	$port = 5432;
	$host = 'localhost';
	$pg_user = 'postgres';
	$data_base = '*********';
	$pg_password = '********';
	$hash_algo = 'sha256';

	$conn = pg_connect("host=$host port=$port dbname=$data_base user=$pg_user password=$pg_password");
 	if ($conn === false) 
 	{
  		echo 'Connection failed';
  		exit;
 	} 
?>
