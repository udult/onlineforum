<?php
	include 'connect.php';

	$sql = "SELECT * FROM topics ORDER BY add_time DESC";
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
 		$user_id = pg_fetch_result($result_1, $i, 3);
 		$sql = "SELECT user_name FROM users WHERE user_id = '$user_id'";
		$result_2 = pg_query($conn, $sql);

 		$arr[$i] = [
 			"topic_id" => pg_fetch_result($result_1, $i, 0),
 			"topic_subject" => pg_fetch_result($result_1, $i, 1),
 			"add_time" => pg_fetch_result($result_1, $i, 2),
 			"created_by" => pg_fetch_result($result_1, $i, 3),
 			"topic_content" => pg_fetch_result($result_1, $i, 4),
 			"topic_status" => pg_fetch_result($result_1, $i, 5),
 			"user" => pg_fetch_result($result_2, 0, 0)
 		];
 	}

 	echo json_encode($arr);
	pg_close($conn);
?>