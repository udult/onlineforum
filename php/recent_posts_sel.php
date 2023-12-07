<?php
	include 'connect.php';

	$post_topic = $_POST['topic_id'];

	$sql = "SELECT * FROM posts WHERE post_topic = '$post_topic'";
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
		$user_id = pg_fetch_result($result_1, $i, 4);
		$sql = "SELECT user_name FROM users WHERE user_id = '$user_id'";
		$result_2 = pg_query($conn, $sql);

		 $arr[$i] = [
 			"post_id" => pg_fetch_result($result_1, $i, 0),
 			"post_topic" => pg_fetch_result($result_1, $i, 1),
 			"post_content" => pg_fetch_result($result_1, $i, 2),
 			"add_time" => pg_fetch_result($result_1, $i, 3),
 			"created_by" => pg_fetch_result($result_1, $i, 4),
 			"user" => pg_fetch_result($result_2, 0, 0)
 		];
	}
	 
	echo json_encode($arr);
	pg_close($conn);
?>