var app = function(){
  var url = "https://api.spotify.com/v1/search?q=cats&type=album"
 makeRequest(url, requestComplete);
 var albums = getAlbums();
 populateList(albums)
}


var requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  localStorage.setItem('list', jsonString)
}

var getAlbums = function(){
  var jsonString= localStorage.getItem('list');
  return albums = JSON.parse(jsonString) || [];
}


var populateList = function(albums){
  var div = document.querySelector('#albums');
  console.log(albums.albums.items)
  albums.albums.items.forEach(function(album){
    
    var section = document.createElement('section');
    var a = document.createElement('a');
    a.innerText = album.name
    a.href= album.external_urls.spotify
    var ul = document.createElement('ul');
    var artistLi = document.createElement('li');
    artistLi.innerText = album.artists[0].name;

    var imageLi = document.createElement('li');
    var coverart  = document.createElement('img');
    coverart.src = album.images[2].url;
    coverart.width = 90;
    div.appendChild(section);
    section.appendChild(a);
    section.appendChild(ul);
    ul.appendChild(artistLi);
    ul.appendChild(imageLi);
    imageLi.appendChild(coverart); 
    })
}

var makeRequest = function(url, callback){
var request = new XMLHttpRequest();
request.open("GET" , url);
request.onload = callback;
request.send();
}

window.onload = app;