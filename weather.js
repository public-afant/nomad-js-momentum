const COORDS = "coords";
const API_KEY = `65740603b73f859498d905a4e2d62f3d`;
const weatherNode = document.querySelector(".js-weather");

const getWeather = ({ latitude, longitude }) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  )
    .then((res) => res.json())
    .then((data) => {
      const {
        main,
        main: { temp: temperature },
        name: place,
      } = data;

      weatherNode.innerText = `${temperature}°C / ${place}`;
    });
};

const saveCoords = (obj) => {
  localStorage.setItem(COORDS, JSON.stringify(obj));
};

const handleGeoSuccess = (position) => {
  const coordsObj = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
  saveCoords(coordsObj);
  getWeather(coordsObj);
};

const handleGeoError = () => {
  console.log("GEO ERROR!");
};
const askForCoords = () => {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
};

const loadWeather = () => {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const coordsObj = JSON.parse(loadedCoords);
    getWeather(coordsObj);
  }
};

var init = () => {
  loadWeather();
};

init();
