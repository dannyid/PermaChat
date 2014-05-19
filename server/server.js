
var appPort =  process.env.PORT || 3000;

var express = require('express'), 
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", { layout: false });
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.send('ok');
  console.log('someone connected on the front end')
})

app.get('/:room', function(req, res) {
  res.render('chat.jade');
  console.log('someone just connected to the room: ' + req.params.room);
})

server.listen(appPort);

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

// do this when a new connection is made to the site
io.sockets.on('connection', function (socket) {
  console.log(socket.name + " has connected")
  var roomId = "";

  socket.on('join', function(roomName){
    socket.join(roomName);
    console.log(socket.name + ' has joined room: ' + roomName)
  });

	socket.on('setNick', function (data) {
		socket.set('nick', data);
	});

	socket.on('message', function (message) {
		socket.get('nick', function (error, name) {
			var data = { 'message' : message, nick : name };
			socket.broadcast.to(roomId).emit('message', data);
			console.log("user: " + name + "\n" + "sent this: " + message + "\n" + 'to room: "' + roomId + '"\n');
		})
	});
});
