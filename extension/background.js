
function setIcon(path) {
  chrome.browserAction.setIcon({"path":path})
};

function onClick(tab) {

};

chrome.browserAction.onClicked.addListener(onClick)
