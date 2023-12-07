<?php
	include 'connect.php';

	// проверяем существуют ли данные
	if (isset($_POST['login'], $_POST['password'], $_POST['password_confirm']))
	{
		$login = $_POST['login'];
		$password = $_POST['password'];
		$password_confirm = $_POST['password_confirm'];
	}

	else
	{
		pg_close($conn);
		exit;
	}

	// валидация
	if ($login === '' || $password === '' || $password_confirm === '')
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

	if ($password !== $password_confirm)
	{
		$response = [
    		"status" => false,
    		"type" => 3,
    		"message" => 'passwords do not match'
    	];

    	echo json_encode($response);
 		pg_close($conn);
 		exit;
	}

	// проверяем существует ли пользователь
	$sql = "SELECT user_name FROM users WHERE user_name = '$login'";
	$result = pg_query($conn, $sql);
	if (pg_num_rows($result) == 1)
	{
		$response = [
    		"status" => false,
    		"type" => 3,
    		"message" => 'user is already exist'
    	];

    	echo json_encode($response);
    	pg_close($conn);
		exit;
	}

	// если пройдена валидация, то вносим пользователя в бд
	$hash_string = hash($hash_algo, $password);
	$sql = "INSERT INTO users (user_name, user_pass, reg_time, user_level, user_status) VALUES ('$login', '$hash_string', NOW(), 0, 0)";
	$result = pg_query($conn, $sql);
	
 	$response = [
    	"status" => true,
    	"message" => 'register success'
   	];
    	
    echo json_encode($response);
   	pg_close($conn);
	exit;
?>