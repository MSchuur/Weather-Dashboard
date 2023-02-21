// Varibles requied for the app
var searchCityEl = document.getElementById('user-form');
var cityInputEl = document.getElementById('cityname');

// Search for a city and get the lat and long
 function formCityHandler() {
   
    var cityname = cityInputEl.value.trim();
    
    if (cityname) {
        getCurrentTemp(cityname);
        getFiveDayForecast(cityname);
    }
    else {
        alert('The city name you entered is not valid. Please try again');
    }
}

function getCurrentTemp(city) {
    var curApiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=46d9562c80440e2c512be53d86040084';
    
    fetch(curApiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
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


searchCityEl.addEventListener("submit", function(event) {
    event.preventDefault();
    formCityHandler()
})