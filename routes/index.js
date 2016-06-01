var express = require('express');
var router = express.Router();

var Message = require('../models/Messages');

//var Message = mongoose.model('Message');

router.get('/', function(req, res, next) {
  Message.find(function(err, messages){
    if(err){ return next(err); }

    res.json(messages);
  });
});


router.post('/', function(req, res, next) {
  console.log(req.body);
  var message = new Message(req.body);

  message.save(function(err, message){
    if(err){ return next(err); }

    res.json(message);
  });
});

module.exports = router;
