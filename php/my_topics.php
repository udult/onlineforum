<?php
	session_start();
	include 'connect.php';

	$user_id = $_SESSION['user_id'];

	$sql = "SELECT * FROM topics WHERE created_by = '$user_id' ORDER BY add_time DESC";
	$result_1 = pg_query($conn, $sql);
	if ($result_1 === false)
	{
		$response = [
    		"status" => false,
    		"type" => 6,
    		"message" => 'select failed'
    	];

    	echo json_encode($response);
		pg_close($conn);
		exit;
	}

	$arr = [];
 	for ($i = 0; $i < pg_num_rows($result_1); $i++) 
 	{ 
 		$arr[$i] = [
 			"topic_id" => pg_fetch_result($result_1, $i, 0),
 			"topic_subject" => pg_fetch_result($result_1, $i, 1),
 			"add_time" => pg_fetch_result($result_1, $i, 2),
 			"topic_content" => pg_fetch_result($result_1, $i, 4),
 			"topic_status" => pg_fetch_result($result_1, $i, 5),
 			"user" => $_SESSION['user_name']
 		];
 	}

 	echo json_encode($arr);
	pg_close($conn);
?>