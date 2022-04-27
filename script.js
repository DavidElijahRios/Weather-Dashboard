var Btn = document.querySelector(".searchbtn")

//function for api fetch current weather
function currentWeather(location) {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f1a4bc7f4aa2985eed033f1669d8e977`
    fetch(url)
    .then(function(response) {
        console.log("this is response", response)
        return response.json()
    })
    .then(function(data) {
        console.log("this is data", data)
    })
}
// function to initiate user search
function searchBtn() {
  var userInput = document.querySelector(".user-input").value
  console.log(userInput)
  currentWeather(userInput)
}
Btn.addEventListener("click", searchBtn);

//use one call api for UV index