// Varibles requied for the app
var searchCityEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#cityname');
var cityListEl = document.querySelector('#storedCities');
var currentWeatherEl = document.querySelector('#currentWeather');
var forecastWeatherEl = document.querySelector('#forecastWeather');
var forecastContainer = document.querySelector('#forecastWeather');
var h3El = document.querySelector('#five-day-forecast');

// Render city names if any form local storage into buttons
var renderCities = function (city) {
    cityListEl.innerHTML = '';
    var cities = JSON.parse(localStorage.getItem('index')) || [];
    for(var i= cities.length-1; i >=0; i--) {
        var cityEl = document.createElement('button');
        cityEl.classList.add('w-100', 'btn', 'btn-primary', 'mb-2')
        cityEl.innerText = cities[i];
        cityListEl.appendChild(cityEl);
    }
}

// Store city names into local storage
var storeCities = function(city) {
    var cities = JSON.parse(localStorage.getItem('index')) || [];
    
    for (var i = 0; i < cities.length; i ++ ) {
        if (cities[i] === city) {
            return
        }
    }
    if (cities.length >= 5){
        cities.shift();
    }
    cities.push(city);
    localStorage.setItem('index', JSON.stringify(cities));
};

// On the submit from the search city form checks to see if a name is submitted
var formCityHandler = function(event) {
  
    event.preventDefault();
    currentWeatherEl.innerHTML = '';
    forecastWeatherEl.innerHTML = '';
    var cityname = cityInputEl.value.trim();
    cityname = cityname.charAt(0).toUpperCase() + cityname.slice(1);
    
    if (cityname) {
        cityInputEl.value = '';
        getCurrentTemp(cityname);
        getFiveDayForecast(cityname);
    } else {
        alert('The city name you entered is not valid. Please try again');
    }
}

// Takes the checked inputted city name and uses it to get the data for the current day from the Openweather API
var getCurrentTemp = function(city) {
    var curApiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=46d9562c80440e2c512be53d86040084';
    
    fetch(curApiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                displayCurrentWeather(data);
                storeCities(city);
                renderCities(city);  
                });
            } else {
                alert('Error: ' + response.statusText);
                return;
            }
        })
        .catch(function (error) {
            alert('Unable to connect to OpenWeather');
        });
};

// Renders data and creates the elements to display the current day information
function displayCurrentWeather(weather) {

    var currentContainer = document.querySelector('#currentWeather');
    currentContainer.classList.add('border', 'border-2', 'border-dark', 'rounded');
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
// Takes the checked inputted city name and uses it to get the data for the five day forecast from the Openweather API
var getFiveDayForecast = function(city) {
    
    var forecastApiUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric&appid=46d9562c80440e2c512be53d86040084';

    fetch(forecastApiUrl)
        .then(function (response) {

            if (response.ok) {
                response.json().then(function (data) {
                console.log(data);
                displayForecastWeather(data);  
                });
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
        
        // Display the H3 title on the page
        h3El.classList.remove('hide');
        
        // Create cards to take the elements of the 5 day forecast
        var cardNew = document.createElement('div');
        cardNew.classList = 'col-12 col-md-2 bg-light  rounded-2';
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

// Will olad the recently visited city once the page loads
renderCities();

// Listens the the submission of a name from the form
searchCityEl.addEventListener("submit", formCityHandler);

// Gives the name from the Recently Visited Cites list once clicked
cityListEl.addEventListener('click', function(event) {
    var element =event.target;
    element = element.innerHTML;
    forecastWeatherEl.innerHTML = '';
    currentWeatherEl.innerHTML = '';
    getCurrentTemp(element);
    getFiveDayForecast(element);
});