// функция вывода темы
function clickHandle (topic_id, topic_subject, user, topic_content, add_time, topic_status) {

  if (topic_status == 1)
  {
    $('.recent-topics-form').remove();
    $('.admin_panel').hide();
    const mes = document.createElement('p');
    mes.className = "mes";
    mes.innerHTML = "This discussion has been banned by administrator :(";
    mes.style.width = '500px';
    mes.style.height = '30px';
    mes.style.display = 'none';
    mes.style.border = "3px solid #ccc";
    mes.style.marginLeft = '615px';
    mes.style.textAlign = 'center';
    mes.style.lineHeight = '30px';
    mes.style.borderRadius = "5px";
    mes.style.background = '#f5f5f5c7';
    document.body.appendChild(mes);
    $('.mes').slideToggle(350);
  }

  else
  {
    // вывод выбранной темы
    const form = document.createElement('form');
    const div_l = document.createElement('div');
    const div_r = document.createElement('div');
    const div_u = document.createElement('div');
    const div_ul = document.createElement('div');

    const form1 = document.createElement('div');
    const button = document.createElement('button');
    const textarea = document.createElement('textarea');

    form.className = "topic-form";
    div_l.className = "recent-topics-divl";
    div_r.className = "recent-topics-divr";
    div_u.className = "recent-topics-divu";
    div_ul.className = "recent-topics-divul";

    form1.className = "post-form";
    button.className = "send-btn";
    textarea.setAttribute('id', 'post');

    div_r.innerHTML = user;
    div_ul.innerHTML = add_time;
    div_l.innerHTML = topic_subject;
    div_u.innerHTML = topic_content;

    button.innerHTML = "send";
    textarea.placeholder = "your text...";

    form.appendChild(div_l);
    form.appendChild(div_r);
    form.appendChild(div_u);
    form.appendChild(div_ul);

    form1.appendChild(button);
    form1.appendChild(textarea);

    document.body.appendChild(form); 
    document.body.appendChild(form1); 

    $('.recent-topics-form').remove();
    $('.admin_panel').hide();
    $('.topic-form').slideToggle(350);
    $('.post-form').slideToggle(350);

    // выводим комментарии к теме
    show_comm (topic_id);

    // добавление комментария к теме
    $('.send-btn').click(function(e) {
      var post_content = $('textarea[id="post"]').val();
      var post_topic = topic_id;
      $.ajax({
        url: '../php/insert_post.php',
        type: 'POST',
        dataType: 'json',
        data: {
          'post_content': post_content,
          'post_topic': post_topic
        },
        success: function(data) {
          if (data.status)
          {
            textarea.value = "";
            $('.comm-form').remove();
            $('.cont-for-comms').remove();
            show_comm (topic_id);
          }
        }
      });
    });
  }
}

// функция вывода комментариев
function show_comm (topic_id) {
  $.ajax({
    url: '../php/recent_posts_sel.php',
    type: 'POST',
    dataType: 'json',
    data: {
      'topic_id': topic_id
    },
    success: function(data) {
      if (data.post_content != '')
      {
        const cont = document.createElement('div');
        cont.className = "cont-for-comms";
        for (var i = 0; i < data.length; i++)
        {
          // создаем формы для комментариев
          const form = document.createElement('form');
          const div_l = document.createElement('div');
          const div_r = document.createElement('div');
          const div_u = document.createElement('div');

          form.className = "comm-form";
          div_l.className = "recent-topics-divl";
          div_r.className = "recent-topics-divr";
          div_u.className = "recent-topics-divu_old";

          div_l.innerHTML = data[i].user;
          div_r.innerHTML = data[i].add_time;
          div_u.innerHTML = data[i].post_content;

          form.appendChild(div_l);
          form.appendChild(div_r);
          form.appendChild(div_u); 
          cont.appendChild(form);
        }
        document.body.appendChild(cont);
        $('.comm-form').slideToggle(350); 
      }
    }
  });
}


//---ОБРАБОТКА ПОЛЬЗОВАТЕЛЬСКИХ СЦЕНАРИЕВ---//

// обработка сценарися "recent"
$('.recent').click(function(e) {

  //------------------------------//
  $('.mes').remove();
  $('.msg-form').hide();
  $('.ask-form').hide();
  $('.about-form').hide();
  $('.admin_panel').hide();
  $('.user_info').remove();
  $('.comm-form').remove();
  $('.post-form').remove();
  $('.topic-form').remove();
  $('.cont-for-comms').remove();
  $('.recent-topics-form').remove();
  //------------------------------//
  
  $.ajax({
    url: '../php/recent_topics_sel.php',
    type : 'POST',
    dataType: 'json',
    success: function(data) {

      // выводим все темы
      for (var i = 0; i < data.length; i++) {

        const form = document.createElement('form');
        const div_l = document.createElement('div');
        const div_r = document.createElement('div');
        const div_u = document.createElement('div');
        const div_ur = document.createElement('div');
        const btn = document.createElement('button');
       
        form.className = "recent-topics-form";
        div_l.className = "recent-topics-divl";
        div_r.className = "recent-topics-divr";
        div_u.className = "recent-topics-divu";
        div_ur.className = "recent-topics-divur"
        btn.setAttribute('id', 'watch' + i);
      
        btn.style.fontSize = '17px';
        btn.style.textAlign = 'center';
        btn.style.verticalAlign = 'middle'; 
        btn.style.background = 'rgb(39,160,210)';
        btn.style.color = '#fff';
        btn.style.border = 'none';
        btn.style.padding = '10px 20px';
        btn.style.cursor = 'pointer';
        btn.style.borderRadius = '3px';
        btn.style.width = '100px';
        btn.style.display = 'inline';
        btn.style.height = '33px';
        btn.style.lineHeight = '0px';

        div_l.innerHTML = data[i].topic_subject;
        div_r.innerHTML = data[i].user;
        div_u.innerHTML = data[i].topic_content;
        btn.innerHTML = "watch";
        div_ur.innerHTML = data[i].add_time;

        form.appendChild(div_l);
        form.appendChild(div_r);
        form.appendChild(div_u);
        form.appendChild(btn);
        form.appendChild(div_ur);
        document.body.appendChild(form);

        let topic_id = data[i].topic_id; 
        let topic_subject = data[i].topic_subject; 
        let user = data[i].user;
        let topic_content = data[i].topic_content; 
        let add_time = data[i].add_time;
        let topic_status = data[i].topic_status;

        $('#watch' + i).one('click', function(e) {
          e.preventDefault();
          clickHandle (topic_id, topic_subject, user, topic_content, add_time, topic_status);
        });
      }

      $('.recent-topics-form').slideToggle(350);
    } 
  });
});

// обработка сценария "my questions"
$('.my-questions').click(function(e) {

  //------------------------------//
  $('.mes').remove();
  $('.msg-form').hide();
  $('.ask-form').hide();
  $('.about-form').hide();
  $('.admin_panel').hide();
  $('.user_info').remove();
  $('.comm-form').remove();
  $('.post-form').remove();
  $('.topic-form').remove();
  $('.cont-for-comms').remove();
  $('.recent-topics-form').remove();
  //------------------------------//

  $.ajax({
    url: '../php/my_topics.php',
    type: 'POST',
    dataType: 'json',
    success: function (data) {

        if (data.length == 0)
        {
          const mes = document.createElement('p');
          mes.className = "mes";
          mes.innerHTML = "you got no avalible questions yet.";
          mes.style.width = '400px';
          mes.style.height = '30px';
          mes.style.display = 'none';
          mes.style.border = "3px solid #ccc";
          mes.style.marginLeft = '670px';
          mes.style.textAlign = 'center';
          mes.style.lineHeight = '30px';
          mes.style.borderRadius = "5px";
          mes.style.background = '#f5f5f5c7';
          document.body.appendChild(mes);
          $('.mes').slideToggle(350);
        }

        else
        {
          // выводим все темы
          for (var i = 0; i < data.length; i++) {
          const form = document.createElement('form');
          const div_l = document.createElement('div');
          const div_r = document.createElement('div');
          const div_u = document.createElement('div');
          const div_ur = document.createElement('div');
          const btn = document.createElement('button');
       
          form.className = "recent-topics-form";
          div_l.className = "recent-topics-divl";
          div_r.className = "recent-topics-divr";
          div_u.className = "recent-topics-divu";
          div_ur.className = "recent-topics-divur"
          btn.setAttribute('id', 'watch' + i);
      
          btn.style.fontSize = '17px';
          btn.style.textAlign = 'center';
          btn.style.verticalAlign = 'middle'; 
          btn.style.background = 'rgb(39,160,210)';
          btn.style.color = '#fff';
          btn.style.border = 'none';
          btn.style.padding = '10px 20px';
          btn.style.cursor = 'pointer';
          btn.style.borderRadius = '3px';
          btn.style.width = '100px';
          btn.style.display = 'inline';
          btn.style.height = '33px';
          btn.style.lineHeight = '0px';

          div_l.innerHTML = data[i].topic_subject;
          div_r.innerHTML = data[i].user;
          div_u.innerHTML = data[i].topic_content;
          btn.innerHTML = "watch";
          div_ur.innerHTML = data[i].add_time;

          form.appendChild(div_l);
          form.appendChild(div_r);
          form.appendChild(div_u);
          form.appendChild(btn);
          form.appendChild(div_ur);
          document.body.appendChild(form);

          let topic_id = data[i].topic_id; 
          let topic_subject = data[i].topic_subject; 
          let user = data[i].user;
          let topic_content = data[i].topic_content; 
          let add_time = data[i].add_time;
          let topic_status = data[i].topic_status;

          $('#watch' + i).one('click', function(e) {
            e.preventDefault();
            clickHandle (topic_id, topic_subject, user, topic_content, add_time, topic_status);
          });
        }

        $('.recent-topics-form').slideToggle(350);
      }
    }
  });
});

// обработка сценария "new question"
$('.new-question').click(function (e) {

  //------------------------------//
  $('.mes').remove();
  $('.msg-form').hide();
  $('.about-form').hide();
  $('.admin_panel').hide();
  $('.user_info').remove();
  $('.comm-form').remove();
  $('.post-form').remove();
  $('.topic-form').remove();
  $('.cont-for-comms').remove();
  $('.recent-topics-form').remove();
  //------------------------------//

  // выводим форму
  $('.err_msg').text("");
  $('.ask-form').slideToggle(300);
});

// добавление новой темы 
$('.ask-button').click(function(e) {

  e.preventDefault();
  var topic = $('textarea[name="topic"]').val();
  var question = $('textarea[name="question"]').val();

  $.ajax({
    url: '../php/insert_topic.php',
    type: 'POST',
    dataType: 'json',
    data: {
      'topic': topic,
      'content': question
    },
    success: function (data) {
      if(data.status)
      {
        document.getElementById("topic").value = "";
        document.getElementById("question").value = "";
        $('.ask-form').slideToggle(350);
        $('.msg-form').slideToggle(350);
      }

      else
      {
        $('.err_msg').text(data.message);
        document.getElementById("topic").value = "";
        document.getElementById("question").value = "";
      }
    }
  });
});


// обработка кнопки "about"
$('.about').click(function(e) {

  //------------------------------//
  $('.mes').remove();
  $('.msg-form').hide();
  $('.ask-form').hide();
  $('.admin_panel').hide();
  $('.user_info').remove();
  $('.comm-form').remove();
  $('.post-form').remove();
  $('.topic-form').remove();
  $('.cont-for-comms').remove();
  $('.recent-topics-form').remove();
  //------------------------------//

  $('.about-form').slideToggle(300);
});

// обработка кнопки "log out"
$('.log-out').click(function(e) {

	$.ajax({
    url: '../php/destroy_session.php',
    type: 'POST',
    dataType: 'json',
    success: function (data) {
      if (data.status)
      {
        document.location.href = '../index.html';
      }  
    }
  });
});
