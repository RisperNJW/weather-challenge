// Function to handle displaying weather information  
function weatherInfo(response) {  
  let cityElement = document.querySelector("#city");  
  let temperatureElement = document.querySelector("#weather-temp");   
  let currentTemperature = response.data.temperature.current;  

  let timeElement = document.querySelector("#time");  
  let date = new Date(response.data.time * 1000);  

  let descriptionElement = document.querySelector("#weather-condition");  
  let humidityElement = document.querySelector("#humidity");  
  let windElement = document.querySelector("#wind-speed");  
  let iconElement = document.querySelector("#icon");  

  cityElement.innerHTML = response.data.city;  
  timeElement.innerHTML = formatDate(date);  
  descriptionElement.innerHTML = response.data.condition.description;  
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;  
  windElement.innerHTML = `${response.data.wind.speed} km/h`;  
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon" width="60px" alt="Weather icon"/>`;  
  temperatureElement.innerHTML = Math.round(currentTemperature);  

  // Call function to get forecast for the current city  
  getForecast(response.data.city);  
}  

// Function to format the date  
function formatDate(date) {  
  let minutes = date.getMinutes();  
  let hours = date.getHours();  
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];  
  let day = days[date.getDay()];  

  if (minutes < 10) {  
    minutes = `0${minutes}`;  
  }  

  return `${day} ${hours}:${minutes}`;  
}  

// Function to search for a city  
function searchCity(city) {  
  let apiKey = "bf11bc5b77a4aff33da0d1bateado3ab";  
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;  
  
  // Make API call and process the response  
  axios.get(apiUrl)  
    .then(weatherInfo)  
    .catch((error) => {  
      console.error("Error fetching weather data:", error);  
      alert("City not found. Please try again."); // User feedback
    });  
}  

// Function to handle form submission  
function searchSubmit(event) {  
  event.preventDefault();  
  let searchInput = document.querySelector("#search-form");  
  let city = searchInput.value;  
  console.log("Search Input Value:", city);  
  searchCity(city); 
}  

function formatDay(timestamp) {  
  let date = new Date(timestamp * 1000);  
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];  
  return days[date.getDay()];  
}  

function getForecast(city) {  
  let apiKey = "bf11bc5b77a4aff33da0d1bateado3ab";   
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;  
  
  axios.get(apiUrl)  
    .then(displayForecast)  
    .catch((error) => {  
      console.error("Error fetching forecast data:", error);  
      alert("Could not retrieve forecast data. Please try again."); // User feedback
    });  
}  

function displayForecast(response) {  
  let forecastElement = document.querySelector("#forecast");  
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {  
    if (index < 5) { 
      let maxTemperature = Math.round(day.temperature.maximum);  
      let minTemperature = Math.round(day.temperature.minimum);  
      let icon = day.condition.icon_url;  

      forecastHtml += `<div class="daily-forecast">${formatDay(day.time)}: <img src="${icon}" alt="Weather icon" width="36"> ${maxTemperature}℃ ${minTemperature}℃</div>`;  
    }  
  });  

  forecastElement.innerHTML = forecastHtml;  
}  

let searchFormElement = document.querySelector("#search-bar");  
searchFormElement.addEventListener("submit", searchSubmit);  

searchCity("Nairobi");