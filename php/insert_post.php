<?php
	session_start();
	include 'connect.php';

	$post_content = $_POST['post_content'];
	$post_topic = $_POST['post_topic'];
	$user_id = $_SESSION['user_id'];
	
	if ($post_content === '')
	{
		$response = [
    		"status" => false,
    		"type" => 1,
    		"message" => 'fill all the gaps!!!'
    	];

    	echo json_encode($response);
 		pg_close($conn);
 		exit;
	}

	$sql = "INSERT INTO posts (post_topic, post_content, add_time, created_by) 
	VALUES ('$post_topic', '$post_content', NOW(), '$user_id')";

	$result = pg_query($conn, $sql);
	if ($result === false)
	{
		$response = [
    		"status" => false,
    		"type" => 4,
    		"message" => 'insert failed'
    	];

    	echo json_encode($response);
 		pg_close($conn);
 		exit;
	}

	else
	{
		$response = [
    		"status" => true,
    		"message" => 'insert success'
    	];

    	echo json_encode($response);
 		pg_close($conn);
 		exit;
	}
?>