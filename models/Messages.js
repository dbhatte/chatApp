var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
  message: String,
  username: String
});

var Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
