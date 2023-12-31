let apiKey = "93c24d11670cf187f1dcc1946b7d911c";
let queryUrl = "https://api.openweathermap.org/data/2.5/forecast?";
let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

function getApi() {
  const newName = document.getElementById("cityInput");
  const cityName = document.getElementById("cityName");
  cityName.innerHTML = "" + newName.value + "";

  const citySearchUrl = `q=${newName.value}&appid=${apiKey}`;

  fetch(queryUrl + citySearchUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < 5; i++) {
        let forecastData = data.list[i * 8];
        let dayContainer = document.getElementById("day" + (i + 1));

        let tempElement = document.createElement("p");
        tempElement.innerHTML =
          "Temp: " + (((forecastData.main.temp - 273.15) * 9) / 5 + 32).toFixed(1) + "°F";
        dayContainer.appendChild(tempElement);

        let humidityElement = document.createElement("p");
        humidityElement.innerHTML =
          "Humidity: " + Number(forecastData.main.humidity).toFixed(1) + "%";
        dayContainer.appendChild(humidityElement);

        let windElement = document.createElement("p");
        windElement.innerHTML =
          "Wind: " + Number(forecastData.wind.speed).toFixed(1) + "MPH";
        dayContainer.appendChild(windElement);
      }
      if (!searchHistory.includes(newName.value)) {
        searchHistory.push(newName.value);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
      }
    })
    .catch(function (error) {
      console.log("Error:", error);
    });
}

const d = new Date();
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function checkDay(day) {
  if (day + d.getDay() > 6) {
    return day + d.getDay() - 7;
  } else {
    return day + d.getDay();
  }
}
for (var i = 0; i < 5; i++) {
  let dayContainer = document.getElementById("day" + (i + 1));
  let dayNameElement = document.createElement("h2");
  dayNameElement.innerHTML = weekday[checkDay(i)];
  dayContainer.appendChild(dayNameElement);
}

document.getElementById("searchButton").addEventListener("click", getApi);

function cityHistory() {
  let searchDiv = document.getElementById("searchHistory");

  searchHistory.forEach(function (city) {
    let searchedCity = document.createElement("p");
    searchedCity.textContent = city;

    searchDiv.appendChild(searchedCity);
  });
}
