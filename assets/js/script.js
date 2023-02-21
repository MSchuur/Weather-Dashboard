// Varibles requied for the app
var searchCityEl = document.getElementById('user-form');
var cityInputEl = document.getElementById('citySearch');

// Search for a city and get the lat and long
 function formCityHandler() {
   
    console.log('submit requested')
    var cityname = cityInputEl.value.trim();

    if (cityname) {
        getLatAndLong(cityname);
    }
    else {
        alert('The city name you entered is not valid. Please try again');
    }
}

getLatAndLong = function(city) {
    var geoApiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid={46d9562c80440e2c512be53d86040084}';

    fetch(geoApiUrl)
        .then(function (response) {
            return response.jason();
        })
        .then(function (data) {
            console.log(data);
        });
}


searchCityEl.addEventListener("submit", function(event) {
    event.preventDefault();
    formCityHandler()
})