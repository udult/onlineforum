// обработка кнопки входа
$('.log-button').click(function(e) {

	e.preventDefault();
	let login = $('input[name="login"]').val();
  	let password = $('input[name="password"]').val();

  	$.ajax({
  		url: '../php/login.php',
  		type: 'POST',
  		dataType: 'json',
  		data: {
  			'login': login,
  			'password': password
  		},

  		success: function(data) {

  			if (data.status)
  			{
  				if (data.user_level == 0)
  				{
  			    	document.location.href = '../php/homepage.php';
        			document.getElementById("usr").value = "";
        			document.getElementById("pswd").value = "";
        		}

        		if (data.user_level == 1)
        		{
        			document.location.href = '../php/admin_session.php';
        			document.getElementById("usr").value = "";
        			document.getElementById("pswd").value = "";
        		}
  			}

  			else
  			{
  				$('.err_msg').text(data.message);   
        		document.getElementById("usr").value = "";
        		document.getElementById("pswd").value = "";
  			}
  		}
  	});
});

// обработка кнопки регистрации
$('.signup-button').click(function(e) {
	
	e.preventDefault();
	let login = $('input[name="login"]').val();
  	let password = $('input[name="password"]').val();
  	let password_confirm = $('input[name="password_confirm"]').val();

  	$.ajax({
  		url: '../php/register.php',
  		type: 'POST',
    	dataType: 'json',
    	data: {
      		'login': login,
      		'password': password,
      		'password_confirm': password_confirm
    	},

    	success: function(data) {

    		if (data.status)
    		{	
    			document.location.href = '../index.html';
        		document.getElementById("usr").value = "";
        		document.getElementById("pswd").value = "";
        		document.getElementById("pswd_conf").value = "";
    		}

    		else
    		{
    			$('.err_msg').text(data.message);   
        		document.getElementById("usr").value = "";
        		document.getElementById("pswd").value = "";
        		document.getElementById("pswd_conf").value = "";
    		}
    	}
  	});
});