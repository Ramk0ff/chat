(function(){
  $(document).ready(function () {
    var socket = io.connect();
    var messageForm = $('#send-message');
    var messageBox = $('#message');
    var chat = $('#chat');
    var nickForm = $('#setNick');
    var nickBox = $('#nickname');
    var nickError = $('#nickError');
    var users = $('#users');

    nickForm.submit(function (e) {
      e.preventDefault();
      socket.emit('new user', nickBox.val(), function (data) {
        if (data) {
          $('#nickWrap').hide();
          $('#contentWrap').show();
        } else {
          nickError.html('That username is already taken! Try again.');
        }
      });
      nickBox.val('');
    });

    socket.on('usernames', function (data) {
      var html = '';
      for (i = 0; i < data.length; i++) {
        html += '<li>' + data[i] + '</li><br/>';
      }
      users.html(html);
    })

    messageForm.submit(function (e) {
      e.preventDefault();
      socket.emit('send message', messageBox.val(), function (data) {
        chat.append('<span class="error">' + data + '</span><br/>');
      });
      messageBox.val('');
    });

    socket.on('new message', function (data) {
      chat.append('<li><span class="msg"><b>' + data.nick + ': </b>' + data.msg + '</span><br/></li>');
    })

    socket.on('whisper', function (data) {
      chat.append('<li><span class="whisper"><b>' + data.nick + ': </b>' + data.msg + '</span><br/></li>');
    })
  });

})();
