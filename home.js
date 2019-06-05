// Credentials for accessing the API
const API_KEY = "AIzaSyAV8GnDX1WTfuAoIv-gW3KUuVIxhpTnShM";

// Information for building a request
var latitude = 39.754694; 
var longitude = -104.990697;
var map;
var service;
var infowindow;

var bars = [];
var chosen;

function initMap() {
  var rino = new google.maps.LatLng(latitude, longitude);
  var denver = "denver";

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById('map'), {
    center: rino, 
    zoom: 14
  });

  var request = {
    location: rino,
    radius: '2500',
    type: ['bar'],
  };

  service = new google.maps.places.PlacesService(map);
  
  service.nearbySearch(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
        bars.push(results[i]);
      }

      map.setCenter(rino);
      populateCards(results);
    }
  });
}


function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(/*place.name*/"<h3>" + place.name + "</h3><img src=" + place.photos[0].getUrl({maxWidth:400, maxHeight:400}) + ">");
    infowindow.open(map, this);
  });
}

function populateCards(results) {
  $("#app").html(function(){
    content = ""
    for(var i = 0; i < 16; i++) {
      content += "<div class='card' id='card" + i + "'><h3>" + bars[i].name + "</h3><div class='cleanimage'><img src=" + bars[i].photos[0].getUrl({maxWidth:400, maxHeight:300}) + "></div></div>";
    }
    return content;
  });
}

function roll() {
  chosen = bars[Math.floor(Math.random()*bars.length)];
  console.log(chosen);

  $("#chosen").html("<p color='#ddd'>You're going to:</p><h1>" + chosen.name + "</h1>");
}

