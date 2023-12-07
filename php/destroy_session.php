<?php
	session_start();
	unset($_SESSION['user_id']);
	unset($_SESSION['user_name']);
	unset($_SESSION['user_level']);

	$response = [
		"status" => true,
		"message" => 'you have logged out'
	];
	
	echo json_encode($response);
	session_destroy();
?>