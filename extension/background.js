
var socket = io.connect('http://localhost:3000/');

socket.on("connect", function(data) {
  function onClick(tab) {
    var parser = document.createElement('a')
    parser.href = tab.url;
 
    // room name = url of current page -- needs parsing work
    var roomName = parser.hostname + parser.pathname;

    // join chatroom: roomName
    socket.emit("join", roomName);

    // on browserAction click, inject chatbox js and css
    chrome.tabs.executeScript(tab.id, {'file': 'injectChat.js'}, function(data){console.log('chatbox injected with js')})
//    chrome.tabs.executeScript(tab.id, {'file': 'injectChat.css'}, function(data){console.log('chatbox css injected')})
  };

  chrome.browserAction.onClicked.addListener(onClick);
});
