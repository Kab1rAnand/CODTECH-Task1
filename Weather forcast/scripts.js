const apiKey = "f03aa6da187c1c575ab8f5f6d92c140f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDiv = document.querySelector(".weather");
const errorDiv = document.querySelector(".error");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("Invalid City Name");
        }

        const data = await response.json();

        document.querySelector(".city").textContent = data.name;
        document.querySelector(".temp").textContent = `${Math.round(data.main.temp)}°c`;
        document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
        document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;

        const weatherCondition = data.weather[0].main.toLowerCase();
        const iconMap = {
            clouds: "images/clouds.png",
            clear: "images/clear.png",
            rain: "images/rain.png",
            drizzle: "images/drizzle.png",
            mist: "images/mist.png"
        };

        weatherIcon.src = iconMap[weatherCondition] || "images/default.png";
        
        weatherDiv.style.display = "block";
        errorDiv.style.display = "none";
    } catch (error) {
        errorDiv.style.display = "block";
        weatherDiv.style.display = "none";
    }
}

searchButton.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    }
});
