const searchBar = document.querySelector("input");
const searchButton = document.querySelector("button");
const apiKey = "b5affc24bb38a3163835098966203f4e";

const fetchWeather =  async function (cityName) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`)
    const data = await res.json()
    const jsonObj = await getUsefulData(data)
    displayWeatherInfo(jsonObj);
};

const getUsefulData = function (jsonData) {
  const { name } = jsonData;
  const { icon, description } = jsonData.weather[0];
  const { temp, humidity } = jsonData.main;
  const { speed } = jsonData.wind;

  return {name, icon, description, temp, humidity, speed};
};

const displayWeatherInfo = function (jsonData) {
  updateClass(".cityName", `Weather in ${jsonData.name}`);
  updateClass(".degree", jsonData.temp + "°C");
  updateClass(".clouds", jsonData.description);
  updateImage(jsonData.icon);
  updateClass(".humidity", `Humidity is ${jsonData.humidity}`);
  updateClass(".wind", `Wind is ${jsonData.speed}`);
};

const updateClass = function (className, content) {
  classTag = document.querySelector(className).innerHTML = content;
};

const updateImage = function (icon) {
  console.log(icon);
  document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
}


fetchWeather("Kiev");
searchButton.addEventListener("click", () => {
  fetchWeather(searchBar.value);
});
