
<<<<<<< HEAD
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

=======
function setIcon(path) {
  chrome.browserAction.setIcon({"path":path})
};

function onClick(tab) {
  var parser = document.createElement('a')
  parser.href = tab.url;
  
  var roomName = parser.hostname + parser.pathname;

  // open websocket and join chatroom: roomName
  //
};

chrome.browserAction.onClicked.addListener(onClick);
>>>>>>> 28e1428ec98158bf6d9371883d2e596105ac8713
