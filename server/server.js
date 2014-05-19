
var appPort =  process.env.PORT || 3000;

var express = require('express'), 
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

var router = express.Router();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', { layout: false });
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.send('ok');
  console.log('\nFrom Server: Someone just connected to homepage.\n')
})

app.get('/room/:roomId', function(req, res) {
  var roomId = req.params.roomId;
  res.render('chat.jade');
  console.log('\nFrom Server: Someone just visited this room URL: "'+roomId+'".\n');
})

server.listen(appPort);

io.configure(function() { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

// do this when a new connection is made to the site
io.sockets.on('connection', function(socket) {
  console.log('\nFrom Server: Someone has just connected to a socket.\n')
  var roomId = "";

  socket.on('join', function(roomName){
    socket.join(roomName);
    roomId = roomName;
    console.log('\nFrom Server: Someone has joined room: "'+roomId+'".\n');
  });

	socket.on('setNick', function(data) {
    socket.set('nick', data);
	});

	socket.on('message', function(messageObject) {
    socket.broadcast.to(roomId).emit('message', messageObject);
    console.log('\nFrom Server: \nUser: '+messageObject.nick+'\n' + 'sent this: "'+messageObject.message+'"\n' + 'to room: "'+roomId+'"\n');
	});
});
