// Varibles requied for the app
var searchCityEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#cityname');



var currentCity;

// Search for a city and get the lat and long
var formCityHandler = function (event) {
  event.preventDefault();
  var cityname = cityInputEl.value.trim();
    
  if (cityname) {
    getCurrentTemp(cityname);
    getFiveDayForecast(cityname);
  }
  else {
    alert('The city name you entered is not valid. Please try again');
  }
}

var getCurrentTemp = function(city) {
    var curApiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=46d9562c80440e2c512be53d86040084';
    
    fetch(curApiUrl)
        .then(function (response) {
          if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
              console.log(data);
              displayCurrentWeather(data);  
            });
        } else {
            alert('Error: ' + response.statusText);
        }
        })
        .catch(function (error) {
            alert('Unable to connect to OpenWeather');
        });
      
};

function displayCurrentWeather(weather) {

    var currentContainer = document.querySelector('#currentWeather');
    console.log(weather);
    var dt = weather.dt;
    var day = new Date(dt*1000);
    
    var currentIcon = document.createElement('span');
    if (weather.weather[0].id >= '200' && weather.weather[0].id <= '299') {
        currentIcon.innerHTML = "<i class='fas fa-poo-storm'></i>";
    } else if (weather.weather[0].id >= '300' && weather.weather[0].id <= '399') {
        currentIcon.innerHTML = "<i class='fas fa-cloud-rain'></i>";
    } else if (weather.weather[0].id >= '500' && weather.weather[0].id <= '599') {
        currentIcon.innerHTML = "<i class='fas fa-cloud-shower-heavy'></i>";
    } else if (weather.weather[0].id >= '600' && weather.weather[0].id <= '699') {
        currentIcon.innerHTML = "<i class='fas fa-snowflake'></i>";
    } else if (weather.weather[0].id >= '700' && weather.weather[0].id <= '799') {
        currentIcon.innerHTML = "<i class='fas fa-smog'></i>";
    } else if (weather.weather[0].id == '800') {
        currentIcon.innerHTML = "<i class='fas fa-sun'></i>";
    } else if (weather.weather[0].id >= '801' && weather.weather[0].id <= '810' ) {
        currentIcon.innerHTML = "<i class='fas fa-cloud'></i>";
    } 
    console.log(weather.weather[0].id);

    var cityName = document.createElement('h3');
    cityName.textContent = weather.name + ' (' + day.toDateString() + ') ';
    cityName.setAttribute('class', 'mb-2');
    currentContainer.append(cityName);
    currentContainer.append(currentIcon);

    var currentTemp = document.createElement('h5');
    currentTemp.textContent = 'Temp: ' + weather.main.temp + '°C';
    currentTemp.setAttribute('class', 'mb-4');
    currentContainer.append(currentTemp);

    var currentWind = document.createElement('h5');
    currentWind.textContent = 'Wind: ' + weather.wind.speed + ' KPH';
    currentWind.setAttribute('class', 'mb-4');
    currentContainer.append(currentWind);

    var currentHumidity = document.createElement('h5');
    currentHumidity.textContent = 'Humidity: ' + weather.main.humidity + ' %';
    currentHumidity.setAttribute('class', 'mb-4');
    currentContainer.append(currentHumidity);

    
}

function getFiveDayForecast(city) {
    var geoApiUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=46d9562c80440e2c512be53d86040084';

    fetch(geoApiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
}


searchCityEl.addEventListener("submit", formCityHandler);