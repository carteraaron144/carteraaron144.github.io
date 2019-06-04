// Credentials for accessing the API
const CLIENT_ID = "vhJK3DiMOpY2XgX8KFHycA";
const API_KEY = "7KXGX_NFduAFWVvskI4xJO9gj64tNMAG_3pEMHVIRDzvG826fMzw8I5yNKjoYKKUECCBhERkTiilWMgq3mYUrpavQ4qfnUU9trzXKriWNtR7zviHwz4xpcJA35j2XHYx";
const proxyurl = "https://cors-anywhere.herokuapp.com/";

// Information for building a request
const HOST = "api.yelp.com";
const EVENTS_PATH = "/v3/events";
const SEARCH_PATH = "/v3/search";

var latitude = 39.770610; 
var longitude = -104.971276;
var type = "bar";

var queryBuilt = [
  //{ name: "long",   value: longitude },
  //{ name: "lat",    value: latitude  },
  { name: "location", value: "Denver" },
  { name: "search", value: type      }
];

var queryString = "?" + $.param(queryBuilt);

function requestBars(queryString) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      alert(this.responseText);
    }
  };

  var path = proxyurl + "https://" + HOST + SEARCH_PATH + queryString;

  console.log(path);

  xhttp.open("get", path, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send("Your JSON Data Here");
}

requestBars(queryString);

function populateCards() {
  $("#app").html(function(){
    content = ""
    for(var i = 0; i < 16; i++) {
      content += "<div class='card' id='card" + i + "'>" + "test" + "</div>";
    }
    return content;
  });
}

function roll() {
  
}

$(document).ready(populateCards());