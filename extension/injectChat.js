
var body = document.getElementsByTagName('body')[0];
var html = document.getElementsByTagName('html')[0];

if(document.getElementById('chatboxFrame')){
  body.removeChild(permachatIframe);
  html.style.marginBottom = '0px';
} else {
  var permachatIframe = document.createElement('iframe');
  permachatIframe.id = 'chatboxFrame';
  permachatIframe.setAttribute('src','http://localhost:3000/room/dumb');
  permachatIframe.setAttribute('style','margin: 0px; border: 0px; position: fixed; display: block; border: none; z-index: 9999999; bottom: 0; left: 0; width: 100%; height: 200px;');
  html.style.marginBottom = '200px';// this doesn't seem to work all the time -- see w3schools
  body.appendChild(permachatIframe);
};
