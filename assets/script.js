//  VARIABLES
// Search City Form
var CityInput = document.querySelector("#CityInput");
var SubmitButton = document.querySelector("#SubmitButton");
// Search History
var City00Button = document.querySelector("#city00");
var City01Button = document.querySelector("#city01");
var City02Button = document.querySelector("#city02");
var City03Button = document.querySelector("#city03");
var City04Button = document.querySelector("#city04");
var City05Button = document.querySelector("#city05");
var City06Button = document.querySelector("#city06");
var City07Button = document.querySelector("#city07");
// Current Weather
// Title
var CurrentCityEl = document.querySelector("#CurrentCity");
var CityNameEl = document.querySelector("#CityName");
var DateEl = document.querySelector("#Date");
var IconEl = document.querySelector("#Icon");
// Weather conditions
var TempEl = document.querySelector("#Temp");
var WindEl = document.querySelector("#Wind");
var HumidityEl = document.querySelector("#Humidity");
var UVindexEl = document.querySelector("#UVindex");
// 5-day Forecast
var ForecastEl = document.querySelector("#FiveDayForecast");
var ForecastContainerEl = document.querySelector("#FiveDayForecastContainer");
var ForecastDay0El = document.querySelector("#ForecastDay0");
var ForecastDay1El = document.querySelector("#ForecastDay1");
var ForecastDay2El = document.querySelector("#ForecastDay2");
var ForecastDay3El = document.querySelector("#ForecastDay3");
var ForecastDay4El = document.querySelector("#ForecastDay4");

// FUNCTIONS
// 1. Function that fetches weather API based on city
function FetchWeather(City) {
    var City = CityInput.value.trim().toUpperCase()
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + City + "&appid=4160ec3520c203fccfead3fd09fe42ff")
    .then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data);
        // Populate Title Data
        CityNameEl.textContent = City;
        DateEl.textContent = data.dt;
        IconEl.textContent = data.weather[0].icon;
        // Populate Current Weather Data
        TempEl.textContent = data.main.temp;
        WindEl.textContent = data.wind.speed;
        HumidityEl.textContent = data.main.humidity;
        // Store latitude and longitude data
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        //fetch UV index
        return fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ lon +"&appid=4160ec3520c203fccfead3fd09fe42ff")
    }).then(function(response02){
        return response02.json();
    }).then(function(data02){
        console.log(data02)
        UVindexEl.textContent = data02.current.uvi;
        //if statements with bootstrap to change color based on value
        //5-day forecast
        for (var i=1; i<6; i++){
            //select variables to be displayed
            var ForecastDate = data02.daily[i].dt;
            var ForecastIcon = data02.daily[i].weather[0].icon;
            var ForecastTemp = data02.daily[i].temp.max;
            var ForecastWind = data02.daily[i].wind_speed;
            var ForecastHumidity = data02.daily[i].humidity;
            // create a new element within Forecast container
            var ForecastList = document.createElement("ul");
            ForecastContainerEl.appendChild(ForecastList);

            var ForecastDateEl = document.createElement("li");
            ForecastDateEl.textContent = ForecastDate
            ForecastList.appendChild(ForecastDateEl)

            var ForecastIconEl = document.createElement("li");
            ForecastIconEl.textContent = ForecastIcon
            ForecastList.appendChild(ForecastIconEl)

            var ForecastTempEl = document.createElement("li");
            ForecastTempEl.textContent = ForecastTemp
            ForecastList.appendChild(ForecastTempEl)

            var ForecastWindEl = document.createElement("li");
            ForecastWindEl.textContent = ForecastWind
            ForecastList.appendChild(ForecastWindEl)

            var ForecastHumidityEl = document.createElement("li");
            ForecastHumidityEl.textContent = ForecastHumidity
            ForecastList.appendChild(ForecastHumidityEl)  
        }
    })
}


// 2. Function that listens to search submit button and calls weather function (1)

// 3. Function to populate Search History Buttons with latest searches (unshift 0th element, pop 7th element)

// 4. Store and Load Search History from Local Storage

// EVENT LISTENERS
SubmitButton.addEventListener("click", FetchWeather);