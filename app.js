const api = {
  key: "fb699ace6a538dfe0c127ff5d24ad696",
  baseurl: "https://api.openweathermap.org/data/2.5/"
};
const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);
function setQuery(e) {
  if (e.keyCode == 13) {
    getResults(searchBox.value);
    console.log(searchBox.value);
  }
}
function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}
function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".city");
  city.innerHTML = `${weather.name},${weather.sys.country}`;
  let now = new Date();
  let date = document.querySelector(".date");
  date.innerHTML = dateBuilder(now);
  let temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
  let weatherEl = document.querySelector(".weather");
  weatherEl.innerHTML = `${weather.weather[0].main}`;
  let hiLow = document.querySelector(".hi-low");
  hiLow.innerHTML = `${Math.round(weather.main.temp_min)}°C / 
  ${Math.round(weather.main.temp_max)} °C`;
  if (weather.weather[0].main == "Clouds") {
    document.body.style.backgroundImage = "url(./img/clouds.jpg)";
  } else if (
    weather.weather[0].main == "Misty" ||
    weather.weather[0].main == "Haze"
  ) {
    document.body.style.backgroundImage = "url(./img/misty.jpg)";
  } else if (weather.weather[0].main == "Snow") {
    document.body.style.backgroundImage = "url(./img/snow.jpg)";
  } else if (weather.weather[0].main == "Clear") {
    document.body.style.backgroundImage = "url(./img/sunny.jpg)";
  } else if (weather.weather[0].main == "Rain") {
    document.body.style.backgroundImage = "url(./img/rain.jpg)";
  } else {
    document.body.style.backgroundImage = "url(./img/bg.jpg)";
  }
}
function dateBuilder(j) {
  let months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentyabr",
    "Oktyabr",
    "Noyabr",
    "Dekabr"
  ];
  let days = [
    "Yakshanba",
    "Dushanba",
    "Seshanba",
    "Chorshanba",
    "Payshanba",
    "Juma",
    "Shanba"
  ];
  let day = days[j.getDay()];
  let date = j.getDate();
  let month = months[j.getMonth()];
  let year = j.getFullYear();
  return `${day} ${date} ${month} ${year}`;
}
