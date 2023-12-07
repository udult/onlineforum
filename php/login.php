<?php
	include 'connect.php';

	// проверка существуют ли данные
	if (isset($_POST['password']) && isset($_POST['login']))
	{
		$login = $_POST['login'];
		$password = $_POST['password'];
	}

	else
	{
		pg_close($conn);
		exit;
	}
	
	// валидация
	if ($login === '' || $password === '')
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

	// авторизация
	$hash_string = hash($hash_algo, $password);
	$sql = "SELECT user_id, user_name, user_level, user_status 
	FROM users WHERE user_name = '$login' AND user_pass = '$hash_string'";

	$result = pg_query($conn, $sql);
	if (pg_num_rows($result) == 1)
	{
		session_start();
		$_SESSION['user_id'] = pg_fetch_result($result, 0, 0);
    	$_SESSION['user_name'] = pg_fetch_result($result, 0, 1);
    	$_SESSION['user_level'] = pg_fetch_result($result, 0, 2);
    	$_SESSION['user_status'] = pg_fetch_result($result, 0, 3);

    	$response = [
    		"user_level" => pg_fetch_result($result, 0, 2),
    		"status" => true,
    		"message" => 'authorization success'
    	];

    	echo json_encode($response);
 		pg_close($conn);
 		exit;
	}

	else 
	{
		$response = [
    		"status" => false,
    		"type" => 2,
    		"message" => 'Wrong password or username'
    	];

    	echo json_encode($response);
 		pg_close($conn);
 		exit;
	}
?>