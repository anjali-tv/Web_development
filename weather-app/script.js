let currentSlide = 0;
let hourlyData = [];

// DOM Elements
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

// API URLs
let api_key = "3fd3478b2c664442b64101945242809";
let api_url = `http://api.weatherapi.com/v1/current.json?aqi=yes&q=`;
let forecast_api_url =
  "http://api.weatherapi.com/v1/forecast.json?days=1&aqi=no&alerts=no&q=";

// Fetch current weather and forecast
const fetchResults = async (city) => {
  try {
    // Log the city to ensure it’s changing
    console.log("Fetching data for city:", city);

    // Fetch current weather data
    const response = await fetch(api_url + city + `&key=${api_key}`);

    if (response.status == 404 ||response.status == 400 ) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      const data = await response.json();

      // Update current weather in the DOM
      document.querySelector(".temp").innerHTML = data.current.temp_c + "°C";
      document.querySelector(".condition").innerHTML =
        data.current.condition.text;
      document.querySelector(".city").innerHTML = data.location.name;
      document.querySelector(".humidity").innerHTML =
        data.current.humidity + "%";
      document.querySelector(".wind-speed").innerHTML =
        data.current.wind_kph + " km/h";
      document.querySelector(".visibility").innerHTML =
        data.current.vis_miles + " mi";
      document.querySelector(".pressure").innerHTML =
        data.current.pressure_mb + " hPa";
      document.querySelector(".feeling-temp").innerHTML =
        data.current.feelslike_c + "°C";
      document.querySelector(".uv").innerHTML = data.current.uv;

      // Format and display the date based on the city's local time
      const cityLocalTime = data.location.localtime; // This is the key difference
      const localDate = new Date(cityLocalTime);
      const options = {
        weekday: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      const formattedDate = localDate.toLocaleDateString("en-US", options);
      const [dayName, day] = formattedDate.split(", ");
      document.querySelector(".date").innerHTML = `${dayName}, ${day}`;

      // Fetch forecast data
      const res = await fetch(forecast_api_url + city + `&key=${api_key}`);
      const forecastData = await res.json();

      // Log the forecast data to verify it's correct
      console.log("Forecast data for city:", city, forecastData);

      // Display sunrise and sunset
      document.querySelector(".sunrise").innerHTML =
        forecastData.forecast.forecastday[0].astro.sunrise;
      document.querySelector(".sunset").innerHTML =
        forecastData.forecast.forecastday[0].astro.sunset;

      // Use the city's local time for comparison, not the local machine time
      const cityCurrentTime = new Date(cityLocalTime); // This is the key change
      currentSlide = 0; // Reset the current slide
      hourlyData = forecastData.forecast.forecastday[0].hour.filter((hour) => {
        const hourTime = new Date(hour.time); // Convert the hour's time to a Date object
        return hourTime >= cityCurrentTime; // Include only current and future hours
      });

      console.log("Filtered hourly data:", hourlyData); // Check if hourly data is correctly filtered
      displayHourlyForecast(hourlyData); // Update the display
      updateSlider(); // Re-bind the slider controls after new data is loaded

      document.querySelector(".weather").style.display = "block";
    }
  } catch (error) {
    console.error("Error fetching weather or forecast data:", error);
  }
};

// Function to display the hourly forecast
function displayHourlyForecast(hourlyData) {
  const hourlyForecastContainer = document.getElementById("hourly-forecast");
  hourlyForecastContainer.innerHTML = ""; // Clear existing content

  if (hourlyData.length >= 4) {
    hourlyForecastContainer.style.width = `${hourlyData.length * 20}%`; // Make sure 4 items show at a time
  } else {
    hourlyForecastContainer.style.width = "100%"; // If fewer than 4, use full width
  }

  hourlyData.forEach((hour) => {
    const hourBlock = document.createElement("div");
    hourBlock.classList.add("hour-block");
    const time = hour.time.split(" ")[1];
    const temp = hour.temp_c;
    const time12 = convertTo12HourFormat(time);

    hourBlock.innerHTML = `
            <p class="forecast-time">${time12}</p>
            <p class="forecast-temperature">${temp}°C</p>
        `;
    hourlyForecastContainer.appendChild(hourBlock);
  });
}

// Function to convert 24-hour format to 12-hour format
function convertTo12HourFormat(time24) {
  const [hours, minutes] = time24.split(":");
  let hours12 = parseInt(hours, 10);
  const amPm = hours12 >= 12 ? "PM" : "AM";

  if (hours12 > 12) hours12 -= 12;
  if (hours12 === 0) hours12 = 12;

  return `${hours12}:${minutes} ${amPm}`;
}

// Handle sliding functionality for hourly forecast
function updateSlider() {
  const prevArrow = document.getElementById("prevArrow");
  const nextArrow = document.getElementById("nextArrow");
  const hourlyForecastContainer = document.getElementById("hourly-forecast");

  prevArrow.addEventListener("click", () => {
    if (currentSlide > 0) {
      currentSlide--;
      moveSlider(hourlyForecastContainer, currentSlide);
    }
  });

  nextArrow.addEventListener("click", () => {
    if (currentSlide < hourlyData.length - 4) {
      currentSlide++;
      moveSlider(hourlyForecastContainer, currentSlide);
    }
  });
}

// Move the slider to show 4 hours at a time
function moveSlider(container, slideIndex) {
  const translateX = -(slideIndex * 20); // Shift by 20% for each slide
  container.style.transform = `translateX(${translateX}%)`;
}

// Event listener for search button click
searchBtn.addEventListener("click", () => {
  const city = searchBox.value;
  fetchResults(city);
});

// Initial data load (default city)
fetchResults('Kozhikode'); // Set a default city for the initial load
