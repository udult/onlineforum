// обработка сценария "admin panel"
$('.admin_panel-btn').click(function(e) {

  //------------------------------//
  $('.mes').remove();
  $('.msg-form').hide();
  $('.ask-form').hide();
  $('.about-form').hide();
  $('.comm-form').remove();
  $('.post-form').remove();
  $('.user_info').remove();
  $('.topic-form').remove();
  $('.cont-for-comms').remove();
  $('.recent-topics-form').remove();
  //------------------------------//
  $('.admin_panel').slideToggle(300);

});

$('.list-users').click(function(e) {

  $('.user_info').remove();
  $('.mes').remove();

  $.ajax({
    url: '../php/list_users.php',
    type: 'POST',
    dataType: 'json',
    success: function(data) {

      if (data.length == 0)
      {
        const cont = document.getElementById('ad_pan');
        const mes = document.createElement('p');
        mes.className = "mes";
        mes.innerHTML = "no availible users";
        mes.style.fontSize = '19px';
        mes.style.display = 'none';
        cont.appendChild(mes);
        $('.mes').slideToggle(350);
      }

      else 
      {
        for (var i = 0; i < data.length; i++) 
        {
          if ((data[i].user_level == 0) && (data[i].user_status == 0)) 
          {
            let user_id = data[i].user_id;
            let user_name = data[i].user_name;

            const cont = document.getElementById('ad_pan');
            const form = document.createElement('form');
            const div1 = document.createElement('div');
            const btn = document.createElement('button');
          
            btn.setAttribute('id', 'ban-usr' + i);
            form.className = "user_info";
            div1.className = "div1";

            div1.innerHTML = "ID: " + data[i].user_id + " / USERNAME: " + data[i].user_name + 
            " / REGISTERED: " + data[i].reg_time + " / level: " + data[i].user_level + " / status: " + data[i].user_status;
            btn.innerHTML = "ban";
        
            form.appendChild(div1);
            form.appendChild(btn);
            cont.appendChild(form);
  
            $('#ban-usr' + i).one('click', function(e) {
              e.preventDefault();
              ban_user (user_id, user_name);
              btn.remove();
              const mes = document.createElement('p');
              mes.innerHTML = "user has been banned";
              mes.style.paddingLeft = '10px';
              form.appendChild(mes);
            });
          }
        }
        $('.user_info').slideToggle(350);
      }
    }
  });
});

function ban_user (user_id, user_name) {
  $.ajax ({
    url: '../php/ban_user.php',
    type: 'POST',
    dataType: 'json',
    data: {
      'user_id': user_id,
      'user_name': user_name
    },
    success: function(data) {
      console.log(data);
    }
  });
}


$('.list-users-banned').click(function(e) {

  $('.user_info').remove();
  $('.mes').remove();

  $.ajax({
    url: '../php/banned_list_users.php',
    type: 'POST',
    dataType: 'json',
    success: function(data) {

      if (data.length == 0)
      {
        const cont = document.getElementById('ad_pan');
        const mes = document.createElement('p');
        mes.className = "mes";
        mes.innerHTML = "no banned users";
        mes.style.fontSize = '19px';
        mes.style.display = 'none';
        cont.appendChild(mes);
        $('.mes').slideToggle(350);
      }

      else 
      {
        for (var i = 0; i < data.length; i++) 
        {
          if ((data[i].user_level == 0) && (data[i].user_status == 1)) 
          {
            let user_id = data[i].user_id;
            let user_name = data[i].user_name;

            const cont = document.getElementById('ad_pan');
            const form = document.createElement('form');
            const div1 = document.createElement('div');
            const btn = document.createElement('button');
          
            btn.setAttribute('id', 'unban-usr' + i);
            form.className = "user_info";
            div1.className = "div1";

            div1.innerHTML = "ID: " + data[i].user_id + " / USERNAME: " + data[i].user_name + 
            " / REGISTERED: " + data[i].reg_time + " / level: " + data[i].user_level + " / status: " + data[i].user_status;
            btn.innerHTML = "unban";
        
            form.appendChild(div1);
            form.appendChild(btn);
            cont.appendChild(form);
  
            $('#unban-usr' + i).one('click', function(e) {
              e.preventDefault();
              unban_user (user_id, user_name);
              btn.remove();
              const mes = document.createElement('p');
              mes.innerHTML = "user has been unbanned";
              mes.style.paddingLeft = '10px';
              form.appendChild(mes);
            });
          }
        }
        $('.user_info').slideToggle(350);
      }
    }
  });
});

function unban_user (user_id, user_name) {
  $.ajax ({
    url: '../php/unban_user.php',
    type: 'POST',
    dataType: 'json',
    data: {
      'user_id': user_id,
      'user_name': user_name
    },
    success: function(data) {
      console.log(data);
    }
  });
}

$('.list-topics').click(function(e) {

  $('.user_info').remove();
  $('.mes').remove();

  $.ajax({
    url: '../php/recent_topics_sel.php',
    type: 'POST',
    dataType: 'json',
    success: function(data) {
      for (var i = 0; i < data.length; i++) 
      {
        if (data[i].topic_status == 0)
        {
          const cont = document.getElementById('ad_pan');
          const form = document.createElement('form');
          const div1 = document.createElement('div');
          const btn = document.createElement('button');
          const btn1 = document.createElement('button');
        
          btn.setAttribute('id', 'lock-topic' + i);
          btn1.setAttribute('id', 'watch' + i);
          form.className = "user_info";
          div1.className = "div1";

          div1.innerHTML = "ID: " + data[i].topic_id + " / CREATED BY: " + data[i].user + 
          " / SUBJECT: " + data[i].topic_subject + " / REALESE_TIME: " + data[i].add_time + " / status: " + data[i].topic_status;
          btn.innerHTML = "block discussion";
          btn1.innerHTML = "watch";
          btn1.style.background = 'rgb(39,160,210)';

          form.appendChild(div1);
          form.appendChild(btn);
          form.appendChild(btn1);
          cont.appendChild(form);

          let topic_id = data[i].topic_id;
          let topic_subject = data[i].topic_subject;
          let user = data[i].user;
          let topic_content = data[i].topic_content;
          let add_time = data[i].add_time;
          let topic_status = data[i].topic_status;

          $('#lock-topic' + i).one('click', function(e) {
            e.preventDefault();
            btn.remove();
            btn1.remove();
            block_topic(topic_id);
            const mes = document.createElement('p');
            mes.innerHTML = "topics has been blocked for discussion";
            mes.style.paddingLeft = '10px';
            form.appendChild(mes);
          });

          $('#watch' + i).one('click', function(e) {
            e.preventDefault();
            clickHandle (topic_id, topic_subject, user, topic_content, add_time, topic_status);
          });
        }

        else
        {
          const cont = document.getElementById('ad_pan');
          const form = document.createElement('form');
          const div1 = document.createElement('div');
          const btn = document.createElement('button');
          const btn1 = document.createElement('button');
        
          btn.setAttribute('id', 'unlock-topic' + i);
          form.className = "user_info";
          div1.className = "div1";

          div1.innerHTML = "ID: " + data[i].topic_id + " / CREATED BY: " + data[i].user + 
          " / SUBJECT: " + data[i].topic_subject + " / REALESE_TIME: " + data[i].add_time + " / status: " + data[i].topic_status;
          btn.innerHTML = "unlock discussion";

          form.appendChild(div1);
          form.appendChild(btn);
          cont.appendChild(form);

          let topic_id = data[i].topic_id;

          $('#unlock-topic' + i).one('click', function(e) {
            e.preventDefault();
            btn.remove();
            unlock_topic (topic_id);
            const mes = document.createElement('p');
            mes.innerHTML = "topics has been unlocked for discussion";
            mes.style.paddingLeft = '10px';
            form.appendChild(mes);
          });          
        }
      }
      $('.user_info').slideToggle(350);
    }
  });

});

function block_topic (topic_id) {
  $.ajax ({
    url: '../php/block_topic.php',
    type: 'POST',
    dataType: 'json',
    data: {
      'topic_id': topic_id,
    },
    success: function(data) {
      console.log(data);
    }
  });
}

function unlock_topic (topic_id) {
  $.ajax ({
    url: '../php/unlock_topic.php',
    type: 'POST',
    dataType: 'json',
    data: {
      'topic_id': topic_id,
    },
    success: function(data) {
      console.log(data);
    }
  });
}