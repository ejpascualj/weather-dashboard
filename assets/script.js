//  VARIABLES
// Search City Form
var CityInput = document.querySelector("#CityInput");
var SubmitButton = document.querySelector("#SubmitButton");
var SearchHistory = JSON.parse(localStorage.getItem("search")) || [];
// Search History
var SearchHistoryDiv = document.querySelector("#SearchHistory");
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
    
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + City + "&appid=4160ec3520c203fccfead3fd09fe42ff")
        .then(function (response) {
            return response.json();
        }).then(function (data) {
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
            return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=4160ec3520c203fccfead3fd09fe42ff")
        }).then(function (response02) {
            return response02.json();
        }).then(function (data02) {
            console.log(data02)
            UVindexEl.textContent = data02.current.uvi;
            //if statements with bootstrap to change color based on value
            //5-day forecast
            for (var i = 1; i < 6; i++) {
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
    // AddCityButton(City)
}

// 3. Function to populate Search History Buttons with latest searches (unshift 0th element, pop 7th element)
function AddCityButton(City) {
    var NewCityButton = document.createElement("button");
    NewCityButton.textContent = City;
    NewCityButton.classList = "CityButton"
    SearchHistoryDiv.prepend(NewCityButton);
}

// 4. Store and Load Search History from Local Storage
function LocalStorageStore(){
    var City = CityInput.value.trim().toUpperCase();
    SearchHistory.push(City)
    localStorage.setItem("search", JSON.stringify(SearchHistory));
    // var SearchHistory = JSON.parse(localStorage.getItem("Cities"));
    // SearchHistory.push(City);
    CityInput.value="";
    // function to clear fetched weather data
    ClearData();
}

function LocalStorageLoad(){
    if (localStorage.getItem("search")){
        var StoredCities = JSON.parse(localStorage.getItem("search"))
        console.log(StoredCities);
        for (var i =0; i<StoredCities.length; i++){
            AddCityButton(StoredCities[i]);
        }
    }
    
    var CityButtons = document.getElementsByClassName("CityButton");
    console.log(CityButtons)
    for (i=0; i<CityButtons.length; i++){
        CityButtons[i].addEventListener("click",function(){
            City03 = this.innerText
            console.log(City03)
            FetchWeather(City03);
            ClearData();
        })
    }
}

function ClearData(){
    ForecastContainerEl.innerHTML = "";
}

// // 0. Auxiliary Function to trigger all functions
// function Search(event){
//     event.preventDefault();
//     var City = CityInput.value.trim().toUpperCase();
//     FetchWeather(City);
//     AddCityButton(City);
//     LocalStorageStore();
// }

// EVENT LISTENERS
SubmitButton.addEventListener("click", function(event){
    event.preventDefault();
    var City = CityInput.value.trim().toUpperCase();
    FetchWeather(City);
    AddCityButton(City);
    LocalStorageStore();
});

LocalStorageLoad();