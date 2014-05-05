
var body = document.getElementsByTagName('body')[0];
var html = document.getElementsByTagName('html')[0];

if(document.getElementById('permachatDiv')){
  body.removeChild(permachatDiv);
  html.style.marginBottom = '0px';
} else {
  var permachatDiv = document.createElement('div');
  permachatDiv.id = 'permachatDiv';
  permachatDiv.setAttribute('style','position:fixed; display:block; background-color:grey; width:100%; height:250px; bottom:0; left:0; z-index:99999999;');
  html.style.marginBottom = '250px';// this doesn't seem to work all the time -- see w3schools
  body.appendChild(permachatDiv);
};
