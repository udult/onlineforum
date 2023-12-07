<?php 
	// проверяем авторизирован ли пользователь
	session_start();
	if (isset($_SESSION['user_id'], $_SESSION['user_name'], $_SESSION['user_level']) === false)
	{
		echo 'you have logged out';
		exit;
	}	

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

<!---------------------------ADMINISTRATORS PAGE---------------------------->

<body>
	<!--menu-->
	<div class="sidebar">
		<a class="logo">LENINA PARKET ONLINEFORUM</a>
		<li><a class="recent">RECENT</a></li>
        <li><a class="new-question">NEW QUESTION</a></li>
        <li><a class="my-questions">MY QUESTIONS</a></li>
		<li><a class="admin_panel-btn">ADMIN PANEL</a></li>
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

    	<h2>Admin panel</h2>
    	<p class="description">
    	If you see this, it means that you are running as administrator. You have access to information about all existing users and topics. Abilities of your panel:<br>
    	<strong> - users availble:</strong> all existing users who are not banned. Here you can ban users (bad behavior for example). Also you can see ID, register date, level (0 - user, 1 - admin) and status (0 - availeble, 1 - banned) of user.<br> 
    	<strong> - users banned:</strong> all existing users who are banned by you. Here you can ban users.<br>
    	<strong> - topics:</strong> all existing topics. You can block or unlock discussions. Here you can see an ID of topic, user who created it, subject, realese time and status (0 - availible, 1 - blocked).<br></p>
    </form>

    <div class="admin_panel">
    	<div>
   			<h3 class="">You running as administrator | level: 0 - user, 1 - admin | status: 0 - avalible, 1 - banned</h3>
   			<li><a class="list-users">users availble</a></li>
   			<li><a class="list-topics">topics</a></li>
   			<li><a class="list-users-banned">users banned</a></li>
   		</div>
   		<div id="ad_pan">
   			
   		</div>
   	</div>
</body>
</html>

<script src="../js/jquery-3.7.1.js"></script>
<script src="../js/session.js"></script>
<script src="../js/admin_session.js"></script>