var path = require('path');
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

server.listen(3000);
console.log('Listening port: 3000');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
  app.use(express.static(path.join(__dirname, 'public')));
});

io.sockets.on('connection', function (socket) {
  console.log('user connected');
  socket.on('send message', function (data) {
    console.log('message: ' + data);
    io.sockets.emit('new message', data);
  })
  socket.on('disconnect', function () {
    console.log('user disconnected');
  })
});
