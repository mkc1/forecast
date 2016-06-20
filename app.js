
function findCoordinates(){
  var zipCode = document.getElementById('zip-input').value;
  var key = 'AIzaSyDDFi8e76ybDrfKQpnop4cSYWfXlh_ouP4';
  var query = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + zipCode + '&key=' + key;


  var xhr = new XMLHttpRequest();
  xhr.open('GET', query);
  xhr.send(null);


  xhr.onreadystatechange = function () {
    var DONE = 4; // readyState 4 means the request is done
    if (xhr.readyState === DONE) {
      if (xhr.status === 200) {
        var jsonResponse = JSON.parse(xhr.responseText);
        var latitude = jsonResponse.results[0].geometry.location.lat;
        var longitude = jsonResponse.results[0].geometry.location.lng
        console.log(latitude, longitude)
        makeCorsRequest()
      } else {
       
      console.log('Error: ' + xhr.status);
      }
    }
  }
}

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      // XHR for Chrome/Firefox/Opera/Safari.
      console.log('!!!!!');
      xhr.open(method, url, true);
      xhr.send(null);
    } else if (typeof XDomainRequest != "undefined") {
      console.log('undefined')
      // XDomainRequest for IE.
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      console.log('not supported')
      // CORS not supported.
      xhr = null;
    }
    console.log('here it is', xhr);
    return xhr;
}

function makeCorsRequest() {
  var key = '6942987057d91c10a7960fdcf9b0d96e';
  var query = 'https://api.forecast.io/forecast/6942987057d91c10a7960fdcf9b0d96e/37.8267,-122.423';

    var xhr = createCORSRequest('GET', query);
    if (!xhr) {
      alert('CORS not supported');
      return;
    }

    // Response handlers.
    xhr.onreadystatechange = function() {
      var text = xhr.responseText;
      var DONE = 4; // readyState 4 means the request is done
      if (xhr.readyState === DONE) {
        if (xhr.status === 200) {
          var jsonResponse = JSON.parse(xhr.responseText);
          console.log(jsonResponse);
        } else {
          console.log('Error: ' + xhr.status);
        }
      }
    }

    xhr.onerror = function() {
      alert('Woops, there was an error making the request.');
    };

}
