<?php
	include 'connect.php';

	if (isset($_POST['topic_id']))
	{
		$topic_id = $_POST['topic_id'];
	}

	$sql = "UPDATE topics SET topic_status = 0 WHERE topic_id = '$topic_id'";
	$result = pg_query($conn, $sql);
	if ($result === false)
	{
		$response = [
    		"status" => false,
    		"type" => 11,
    		"message" => 'topic unlock failed'
    	];

    	echo json_encode($response);
		pg_close($conn);
		exit;
	}

	$response = [
   		"status" => true,
   		"message" => 'topic has been unlocked'
    ];

    echo json_encode($response);
	pg_close($conn);
?>