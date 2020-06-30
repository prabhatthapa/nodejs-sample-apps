const request = require("request");

const url =
  "https://api.openweathermap.org/data/2.5/onecall?lat=51.509865&lon=-0.118092&units=metric&exclude=hourly,daily&appid=48110bc154c9b7db8fd3cf76ac71ff3a";

request(url, { json: true }, (error, response) => {
  const data = response.body;
  const currentWeather = data.current;

  console.log(
    `${currentWeather.weather[0].description}. It is currently ${currentWeather.temp} degrees out. And it feels like ${currentWeather.feels_like} degrees out.`
  );
});
