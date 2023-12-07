<?php 
	// проверяем авторизирован ли пользователь
	session_start();
	if (isset($_SESSION['user_id'], $_SESSION['user_name'], $_SESSION['user_level']) === false)
	{
		echo 'you have logged out';
		exit;
	}	

	// проверяем забанен ли пользователь
	if ($_SESSION['user_status'] == 1)
	{
		echo 'you have been banned -_-';
		exit;
	}
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="../css/session.css">
	<title>onlineforum-lenina-parket</title>
</head>

<!---------------------------USERS HOMEPAGE---------------------------->

<body>
	<!--menu-->
	<div class="sidebar">
		<a class="logo">LENINA PARKET ONLINEFORUM</a>
		<li><a class="recent">RECENT</a></li>
        <li><a class="new-question">NEW QUESTION</a></li>
        <li><a class="my-questions">MY QUESTIONS</a></li>
        <li><a class="about">ABOUT</a></li>
        <li><a class="log-out">LOG OUT</a></li>
	</div>

	<!--new question form-->
	<form class="ask-form">
    	<textarea type="text" rows="1" name="topic" id="topic" placeholder="new topic..."></textarea>
    	<textarea type="text" name="question" id="question" placeholder="your question..."></textarea>
    	<div class="pod-form">
    		<button class="ask-button">ask</button>
    		<p class="err_msg"></p>
    	</div>
    </form>

    <form class="msg-form">
    	<p class="succ_msg">Your question has been successfully insert. Go to
    	<a class="my-questions"> your questions</a> to watch it</p>
    </form>

    <!--description form-->
    <form class="about-form">
    	<h2>Description</h2>
    	<p class="description">
    	This is the official page of the LENINA PARKET online forum. Here you can ask and discuss questions that interest you.
    	Be polite to other users and watch what you write. The forum is moderated by administrators who monitor the content of discussions and have the ability to ban users and block threads if a user behaves inappropriately or the topic contains obscene content. Our site stores all content you have ever created on it without the ability to delete it on behalf of the user</p>

    	<h2>User interface</h2>
    	<p class="description">
    	<strong>- RECENT:</strong> a list of all existing topics in chronological order.<br>
    	<strong>- NEW QUESTION:</strong> opens a window for creating a new topic. Click here if you want to ask someting.<br> 
    	<strong>- MY QUESTIONS:</strong> a list of all your topics in chronological order.<br>
    	<strong>- ABOUT:</strong> here you can read the descripton. You are literally here right now<br>
    	<strong>- LOG OUT:</strong> after pressing this button, you will have to log in again.</p>
    </form>
</body>
</html>

<script src="../js/jquery-3.7.1.js"></script>
<script src="../js/session.js"></script>