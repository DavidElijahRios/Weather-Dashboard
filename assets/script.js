// Variables
var Btn = document.querySelector(".searchbtn");
var stateBoxEl = document.querySelector(".state-box");
var forecast = document.querySelector(".five-day-forecast");

//function for api fetch current weather 
//TODO: Need to find a way to not display undefined and let user search again and run function again
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
   
// variables to store lat and lon coordinates to use in async function to get UV index
  var lon = data.coord.lon;
  var lat = data.coord.lat;
  uv();
  fiveDayForecast();
//   console.log(lon)
//   console.log(lat)
//use one call api for UV index
  async function uv() {
      var uvUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=f1a4bc7f4aa2985eed033f1669d8e977`
      var response2 = await fetch(uvUrl);
      var data2 = await response2.json();
    //   console.log(data2)

      var uvEl = document.createElement('p')
      uvEl.innerHTML = `UV Index: ${data2.current.uvi}`
      stateBoxEl.appendChild(uvEl)
  }
  // TODO: need function for 5 day - stuck on how to display date
async function fiveDayForecast() {
    var fiveDayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=f1a4bc7f4aa2985eed033f1669d8e977`
    var response3 = await fetch(fiveDayUrl);
    var data3 = await response3.json();
    console.log("****",data3)
    
    //Need to grab unix time and convert it to 00/00/0000 format
    var date = data3.daily
    for (let i = 0; i < 5 && i < date.length; i++) {
        var time = date[i];
        console.log(time)
        var unixTime = time.dt
        console.log(unixTime)
        var milliseconds = unixTime * 1000
        console.log(milliseconds)
        var dateObject = new Date(milliseconds)
        console.log(dateObject)
        var humanDateFormat = dateObject.toLocaleDateString()
        console.log(humanDateFormat)

    //now to append dates as a list on HTML
    var fiveDays = document.createElement('p')
    fiveDays.innerHTML = `${humanDateFormat}`
    forecast.appendChild(fiveDays)

    }
}
  // need a function to clear old results on page and put new results in place of it
  Btn.addEventListener('click', function () {
    stateBoxEl.innerHTML = '';
})
}




// function to initiate user search
function searchBtn() {
  var userInput = document.querySelector(".user-input").value
  console.log(userInput)
  currentWeather(userInput)
  
  //   need a conditional for when a city is inputted in search that does not exists
//   if (!userInput) {
//     stateBoxEl.innerHTML = '';
//       alert('invalid input please try again')
//   } 
}

Btn.addEventListener("click", searchBtn);
