<?php
	include 'connect.php';

	if (isset($_POST['user_id'], $_POST['user_name']))
	{
		$user_id = $_POST['user_id'];
		$user_name = $_POST['user_name'];
	}

	$sql = "UPDATE users SET user_status = 0 WHERE user_id = '$user_id' AND user_name = '$user_name'";
	$result = pg_query($conn, $sql);
	if ($result === false)
	{
		$response = [
    		"status" => false,
    		"type" => 10,
    		"message" => 'unban failed'
    	];

    	echo json_encode($response);
		pg_close($conn);
		exit;
	}

	$response = [
   		"status" => true,
   		"message" => 'user has been unbanned'
    ];

    echo json_encode($response);
	pg_close($conn);
?>