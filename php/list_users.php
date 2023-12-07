<?php
	include 'connect.php';

	$sql = "SELECT user_id, user_name, reg_time, user_level, user_status FROM users 
	WHERE user_level = 0 AND user_status = 0 ORDER BY reg_time DESC";
	$result = pg_query($conn, $sql);
	if ($result === false)
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
	for ($i = 0; $i < pg_num_rows($result); $i++) 
	{ 
		$arr[$i] = [
 			"user_id" => pg_fetch_result($result, $i, 0),
 			"user_name" => pg_fetch_result($result, $i, 1),
 			"reg_time" => pg_fetch_result($result, $i, 2),
 			"user_level" => pg_fetch_result($result, $i, 3),
 			"user_status" => pg_fetch_result($result, $i, 4),
 		];
	}
	 
	echo json_encode($arr);
	pg_close($conn);
?>