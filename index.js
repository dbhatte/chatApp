var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
var messages = require('./routes/index');

// default to a 'localhost' configuration:

var connection_string = '127.0.0.1:27017/chatapp';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
      process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
      process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
      process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
      process.env.OPENSHIFT_APP_NAME;
}

mongoose.connect('mongodb://' + connection_string);

app.use(bodyParser.json()); // for parsing application/json
app.use('/messages',  messages);

//app.use('/', router);
app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));


var userArray = [];
/*
var port = process.env.PORT || 3000;

var s = server.listen(port, function () {
    var host = s.address().address;
    var port = s.address().port;
    console.log('app listening at http://%s:%s', host, port);
});
*/

var port = process.env.OPENSHIFT_NODEJS_PORT || 3000
var ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
server.listen(port, ip_address, function () {
  console.log( "Listening on " + ip_address + ", port " + port )
});




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
