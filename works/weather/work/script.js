const API_KEY = "d888abc55a29978c02f8acb1e8ac169b";
const URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=d888abc55a29978c02f8acb1e8ac169b&q=`;

const q = document.getElementById("inputCity");
const button = document.querySelector("button");
const h1 = document.getElementById("city");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");
const errorMessage = document.createElement("p");
const timeElement = document.getElementById("current-time");
const tempMax = document.getElementById("temp-max");
const tempMin = document.getElementById("temp-min");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

setInterval(() => {
    timeElement.textContent = new Date().toLocaleTimeString('he-IL', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}, 1000);

async function getWeather(city) {
    try {
        const response = await fetch(URL + city);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather:", error);
        errorMessage.innerText = "Error fetching weather data";
    }
}

function displayWeather(weatherData) {
    if (weatherData.cod === 200) {
        errorMessage.innerText = "";
        h1.innerText = weatherData.name;
        temp.innerText = Math.round(weatherData.main.temp) + "°C";
        description.innerText = weatherData.weather[0].description;
        weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
        weatherIcon.alt = weatherData.name;

        tempMax.innerText = `Max: ${Math.round(weatherData.main.temp_max)}°C`;
        tempMin.innerText = `Min: ${Math.round(weatherData.main.temp_min)}°C`;
        humidity.innerText = `Humidity: ${weatherData.main.humidity}%`;
        wind.innerText = `Wind: ${Math.round(weatherData.wind.speed)} m/s`;

        console.log(weatherData);
    } else {
        h1.innerText = "";
        temp.innerText = "";
        description.innerText = "";
        weatherIcon.src = "";
        weatherIcon.alt = "";
        tempMax.innerText = "";
        tempMin.innerText = "";
        humidity.innerText = "";
        wind.innerText = "";
        errorMessage.innerText = "City not found";
    }
}

button.addEventListener("click", () => {
    if (q.value.trim() !== "") {
        getWeather(q.value);
    }
});