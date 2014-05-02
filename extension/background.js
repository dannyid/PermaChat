
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
