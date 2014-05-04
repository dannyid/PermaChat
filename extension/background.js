
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

    var $chatDiv = $('<div id = chatDiv></div>');
    $chatDiv
      .css('position','absolute')
      .css('width', '100%')
      .css('bottom','0')
      .css('left','0')
      .css('z-index', '99999999')
      .css('hrigh','150px')
    $chatDiv.text('hello')
    $('body').append($chatDiv)
  };

  chrome.browserAction.onClicked.addListener(onClick);
});
