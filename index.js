let now = new Date();
let current = document.querySelector(".currentDate");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let minutes = now.getMinutes();
let hours = now.getHours();
let day = days[now.getDay()];

current.innerHTML = `${day} ${hours}:${minutes}`;

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function search(city) {
  let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
  let units = "metric";

  let endPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${endPoint}&q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function retrievePosition(position) {
  let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let form = document.querySelector(".search-form");
form.addEventListener("submit", searchSubmit);

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getCurrentLocation);

search("New York");
