var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var userArray = [];

var s = http.listen(3000, "localhost", function () {
    var host = s.address().address;
    var port = s.address().port;
    console.log('Group Poll app listening at http://%s:%s', host, port);
});

app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));


io.on('connection', function(socket){
  socket.broadcast.emit('hi');

  console.log('a user connected');

  socket.on('user connected', function(username){
    console.log('username on user status : ', username);
    userArray.push(username);
    socket.broadcast.emit('connected users list', userArray);
  });


  socket.on('chat message', function(msg){
  	io.emit('chat message', msg);
    console.log('message: ' + msg);
  });

  /*socket.on('disconnect', function(){
    console.log('user disconnected');
  });*/

});
