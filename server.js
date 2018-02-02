var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use(express.static('./public'));


app.get('/',function(req,res){
  res.sendFile(__dirname+'/main.js'); 
});

server.listen(8081,function(){ // Listens to port 8081
  console.log('Listening on '+server.address().port);
});