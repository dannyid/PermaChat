
var appPort =  process.env.PORT || 3000;

var express = require('express'), 
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

app.get('/', function(req, res){
  res.send('ok');
  console.log('someone connected on the front end')
})

server.listen(appPort);

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

// do this when a new connection is made to the site
io.sockets.on('connection', function (socket) {
  console.log(socket.name + " has connected")

  socket.on('join', function(roomName){
    socket.join(roomName);
    console.log(socket.name + ' has joined room: ' + roomName)
  });

	socket.on('setPseudo', function (data) {
		socket.set('pseudo', data);
	});

	socket.on('message', function (message) {
		socket.get('pseudo', function (error, name) {
			var data = { 'message' : message, pseudo : name };
			socket.broadcast.to(roomId).emit('message', data);
			console.log("user: " + name + "\n" + "sent this: " + message + "\n" + 'to room: "' + roomId + '"\n');
		})
	});
});
