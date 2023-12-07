<?php
	session_start();
	include 'connect.php';

	// проверяем существуют ли данные
	if (isset($_POST['topic'], $_POST['content']))
	{
		$topic = $_POST['topic'];
		$content = $_POST['content'];
		$user_id = $_SESSION['user_id'];
	}

	else
	{
		echo 'data does not exist';
		pg_close($conn);
		exit;
	}

	// валидация 
	if ($topic === '' || $content === '')
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

	// заносим новую тему в бд
	$sql = "INSERT INTO topics (topic_subject, add_time, created_by, topic_content, topic_status) VALUES ('$topic', NOW(), '$user_id', '$content', 0)";
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
    		"message" => 'new topic has been insert'
    	];

    	echo json_encode($response);
 		pg_close($conn);
 		exit;
	}
?>