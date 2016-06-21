function findCoordinates(){
  var zipCode = document.getElementById('zip-input').value;
  var key = 'AIzaSyDDFi8e76ybDrfKQpnop4cSYWfXlh_ouP4';
  var query = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + zipCode + '&key=' + key;

  var xhr = new XMLHttpRequest();
  xhr.open('GET', query);
  xhr.send(null);

  xhr.onreadystatechange = function() {
    var DONE = 4;
    if (xhr.readyState === DONE) {
      if (xhr.status === 200) {
        console.log(jsonResponse);
        var jsonResponse = JSON.parse(xhr.responseText);
        var latitude = jsonResponse.results[0].geometry.location.lat;
        var longitude = jsonResponse.results[0].geometry.location.lng;
        var script = document.createElement('script');
        script.src = 'https://api.forecast.io/forecast/6942987057d91c10a7960fdcf9b0d96e/' + latitude + ',' + longitude + '?callback=createForecastTables'

        document.head.appendChild(script);
        createForecastTables();

      } else {
        console.log('Error: ' + xhr.status);
      }
    }
  }
}

function createForecastTables(data) {
  weekly(data);
  hourly(data);
}

  function weekly(myData) {
    var weeklyForecast = ['<caption>Weekly Forecast</caption>', '<tr><td>Day</td><td>Temp (hi/low)</td><td>Feels like (hi/low)</td><td>Summary</td></tr>'];
    for (var i = 0; i < 7; i++) {
      var date = new Date(myData.daily.data[i].time*1000);
      var newLine = "<tr><td>" + date.toString().substring(0, 10) + "</td>";
      newLine += "<td>" + myData.daily.data[i].temperatureMax  + " / " +  myData.daily.data[i].temperatureMin + "</td>";
      newLine += "<td>" + myData.daily.data[i].apparentTemperatureMax + " / " + myData.daily.data[i].apparentTemperatureMin + "</td>";
      newLine += "<td>" + myData.daily.data[i].summary + "</td></tr>";
      weeklyForecast.push(newLine);
    }
    var HTMLstring = weeklyForecast.join('')
    document.getElementById('week').innerHTML = HTMLstring;
  }

  function hourly(myData) {
    var hourlyForecast = ['<caption>Next 12 Hours</caption>', '<tr><td>Time</td><td>Temp</td><td>Feels like</td><td>Summary</td></tr>'];
    for (var i = 0; i < 13; i++) {
      var date = new Date(myData.hourly.data[i].time*1000);
      var time = formatTime(date);
      var newLine = "<tr><td>" + time + "</td>";
      newLine += "<td>" + myData.hourly.data[i].temperature + "</td>";
      newLine += "<td>" + myData.hourly.data[i].apparentTemperature + "</td>";
      newLine += "<td>" + myData.hourly.data[i].summary + "</td></tr>";
      hourlyForecast.push(newLine);
    }
    var HTMLstring = hourlyForecast.join('')
    console.log(HTMLstring)
    document.getElementById('today').innerHTML = HTMLstring;
  }

  function formatTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
