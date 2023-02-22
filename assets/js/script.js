// Varibles requied for the app
var searchCityEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#cityname');


var lat = 0;
var lon = 0;


// Search for a city and get the lat and long
var formCityHandler = function(event) {
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

// Fetches the data for the current day from the Openweather API
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

// Renders data and creates the elements to display the current day information
function displayCurrentWeather(weather) {

    var currentContainer = document.querySelector('#currentWeather');
    var dt = weather.dt;
    var day = new Date(dt*1000);

    // Checks the icon id for the current day and renders the appropriate font awesome icon
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
    
    // Renders city name and date
    var cityName = document.createElement('h3');
    cityName.textContent = weather.name + ' (' + day.toDateString() + ') ';
    cityName.setAttribute('class', 'mb-2');
    currentContainer.append(cityName);
    
    // Renders weather icon
    currentContainer.append(currentIcon);

    // Render temperature 
    var currentTemp = document.createElement('h5');
    currentTemp.textContent = 'Temp: ' + weather.main.temp + '°C';
    currentTemp.setAttribute('class', 'mb-4');
    currentContainer.append(currentTemp);

    // Render wind
    var currentWind = document.createElement('h5');
    currentWind.textContent = 'Wind: ' + weather.wind.speed + ' KPH';
    currentWind.setAttribute('class', 'mb-4');
    currentContainer.append(currentWind);

    // Render humidity
    var currentHumidity = document.createElement('h5');
    currentHumidity.textContent = 'Humidity: ' + weather.main.humidity + ' %';
    currentHumidity.setAttribute('class', 'mb-4');
    currentContainer.append(currentHumidity);
}
// Fetches the data for the 5 day forecast from the Openweather API 
var getFiveDayForecast = function(city) {
    
    var forecastApiUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric&appid=46d9562c80440e2c512be53d86040084';

    fetch(forecastApiUrl)
        .then(function (response) {
          if (response.ok) {
            response.json().then(function (data) {
              console.log(data);
              displayForecastWeather(data);  
            });
        } else {
            alert('Error: ' + response.statusText);
        }
        })
        .catch(function (error) {
            alert('Unable to connect to OpenWeather');
        });
}

// Renders the data for the 5 day forecast
var displayForecastWeather = function(forecast) {

    // Loop through data for 5 day forecast to populate card
    for (var i = 7; i <= 39; i = i + 8) {
        
        // Create container for forecast cards
        var forecastContainer = document.querySelector('#forecastWeather');
        
        // Create cards to take the elements of the 5 day forecast
        var cardNew = document.createElement('div');
        cardNew.classList = 'col-12 col-md-2 bg-secondary card-style';
        forecastContainer.appendChild(cardNew);

        // Extract required data for date element of card
        var dt = forecast.list[i].dt;
        var day = new Date(dt*1000);

        // Create element and append to the card for the date
        var foreDate = document.createElement('p');
        foreDate.textContent = day.toLocaleDateString();
        foreDate.classList = 'text-center p';
        cardNew.appendChild(foreDate);

        // Create the Icon required for each card
        var forecastIcon = document.createElement('span');

        console.log(forecast.list[i].weather[0].id);
        if (forecast.list[i].weather[0].id >= '200' && forecast.list[i].weather[0].id <= '299') {
            forecastIcon.innerHTML = "<i class='fas fa-poo-storm'></i>";
        } else if (forecast.list[i].weather[0].id >= '300' && forecast.list[i].weather[0].id <= '399') {
            forecastIcon.innerHTML = "<i class='fas fa-cloud-rain'></i>";
        } else if (forecast.list[i].weather[0].id >= '500' && forecast.list[i].weather[0].id <= '599') {
            forecastIcon.innerHTML = "<i class='fas fa-cloud-shower-heavy'></i>";
        } else if (forecast.list[i].weather[0].id >= '600' && forecast.list[i].weather[0].id <= '699') {
            forecastIcon.innerHTML = "<i class='fas fa-snowflake'></i>";
        } else if (forecast.list[i].weather[0].id >= '700' && forecast.list[i].weather[0].id <= '799') {
            forecastIcon.innerHTML = "<i class='fas fa-smog'></i>";
        } else if (forecast.list[i].weather[0].id == '800') {
            forecastIcon.innerHTML = "<i class='fas fa-sun'></i>";
        } else if (forecast.list[i].weather[0].id >= '801' && forecast.list[i].weather[0].id <= '810' ) {
            forecastIcon.innerHTML = "<i class='fas fa-cloud'></i>";
        }

        // Create element and append to the card for the icon 
        cardNew.appendChild(forecastIcon);

        // Create element and append to the card for the temperature
        var forecastTemp = document.createElement('p');
        forecastTemp.textContent = 'Temp: ' + forecast.list[i].main.temp + '°C';
        forecastTemp.classList = 'p'
        cardNew.appendChild(forecastTemp);

        // Create element and append to the card for the wind
        var forecastWind = document.createElement('p');
        forecastWind.textContent = 'Wind:' + forecast.list[i].wind.speed + 'KPH';
        forecastWind.classList = 'p'
        cardNew.appendChild(forecastWind);

        // Create element and append to the card for the humidity
        var forecastHumidity = document.createElement('p');
        forecastHumidity.textContent = 'Humidity:' + forecast.list[i].main.humidity + '%';
        forecastHumidity.classList = 'p'
        cardNew.appendChild(forecastHumidity);
    }
}

searchCityEl.addEventListener("submit", formCityHandler);