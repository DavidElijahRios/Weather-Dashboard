// Variables
var Btn = document.querySelector(".searchbtn");
var stateBoxEl = document.querySelector(".state-box")

//function for api fetch current weather 
// TODO: Maybe need a prevent default for function to clear
async function currentWeather(location) {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f1a4bc7f4aa2985eed033f1669d8e977&units=imperial`;
    var response = await fetch(url)
    var data = await response.json();
    console.log (data)
    // posting what the city that the user inputted
    var h2El = document.createElement('h2')
    h2El.innerHTML = `${data.name}`
    stateBoxEl.appendChild(h2El)

    // posting temp, wind, humidity
    var tempEl = document.createElement('p');
    tempEl.innerHTML = `Temp: ${data.main.temp}°F`
    stateBoxEl.appendChild(tempEl)

    // posting wind
    var windEl = document.createElement('p')
    windEl.innerHTML =`Wind: ${data.wind.speed} MPH`
    stateBoxEl.appendChild(windEl)

    // posting Humidity
    var humidityEl = document.createElement('p')
    humidityEl.innerHTML = `Humidity: ${data.main.humidity} %`
    stateBoxEl.appendChild(humidityEl)
   // need a function to clear old results on page and put new results in place of it
   Btn.addEventListener('click', function () {
    stateBoxEl.innerHTML = '';
})
}
//use one call api for UV index


// function to initiate user search
function searchBtn() {
  var userInput = document.querySelector(".user-input").value
  console.log(userInput)
  currentWeather(userInput)
}

Btn.addEventListener("click", searchBtn);
