let apiKey = "cebcd482eda57fa9a6714c1c2ba91885";
const baseAPI = "https://api.openweathermap.org/data/2.5/weather?q=";
const city = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const description = document.querySelector(".description");
const icon = document.querySelector(".icon");
const humidity = document.querySelector(".humidity");
const temperatureMaxInMIN = document.querySelector(".max-min");
const form = document.querySelector(".form-action");

const showOnScreen = (dados) => {
  const dadosCod = dados.cod === "404";
  const message = "Cidade não encontrada.";
  city.innerHTML = `${dadosCod ? message : dados.name}`;
  temperature.innerHTML = `${Math.floor(dados.main.temp)}°`;
  description.innerHTML = `${dados.weather[0].description}`;
  icon.src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
  humidity.innerHTML = `Umidade ${dados.main.humidity}%`;

  temperatureMaxInMIN.innerHTML = `Max: ${Math.floor(
    dados.main.temp_max
  )}° | Min: ${Math.floor(dados.main.temp_min)}°`;
};

const showLocalStorage = () => {
  const city = localStorage.getItem("city");
  if (city) {
    searchCity(city);
  }
};

const searchCity = async (cityName) => {
  const apiFetch = await fetch(
    `${baseAPI}${cityName}&appid=${apiKey}&lang=pt_br&units=metric`
  ).then((response) => response.json());
  showOnScreen(apiFetch);
};

const clickedButton = () => {
  const inputValue = document.querySelector('[data-js="input-city"]').value;
  searchCity(inputValue);
  localStorage.setItem("city", inputValue);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = document.querySelector('[data-js="input-city"]').value;
  searchCity(inputValue);
  localStorage.setItem("city", inputValue);
  form.reset();
});

showLocalStorage();
