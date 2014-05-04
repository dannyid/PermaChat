
var socket = io.connect('http://localhost:3000/');

socket.on("connect", function(data) {

  function setIcon(path) {
    chrome.browserAction.setIcon({"path":path})
  };

  function onClick(tab) {
    console.log(tab);
    var parser = document.createElement('a')
    parser.href = tab.url;
  
    var roomName = parser.hostname + parser.pathname;

    // join chatroom: roomName
    socket.emit( "join", roomName);
  };

  chrome.browserAction.onClicked.addListener(onClick);
});
