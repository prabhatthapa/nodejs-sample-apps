const request = require("request");

const getForecast = (lat, long, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&exclude=hourly,daily&appid=48110bc154c9b7db8fd3cf76ac71ff3a`;

  request(url, { json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to network.", null);
    } else if (!body.current) {
      callback(body.message, null);
    } else {
      const data = body;
      const currentWeather = data.current;
      callback(
        null,
        `${currentWeather.weather[0].description}. It is currently ${currentWeather.temp} degrees out. And it feels like ${currentWeather.feels_like} degrees out.`
      );
    }
  });
};

module.exports = getForecast;
