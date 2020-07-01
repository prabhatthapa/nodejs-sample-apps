const request = require("request");
// https://home.openweathermap.org/ APIs
// const url =
//   "https://api.openweathermap.org/data/2.5/onecall?lat=51.509865&lon=-0.118092&units=metric&exclude=hourly,daily&appid=48110bc154c9b7db8fd3cf76ac71ff3a";
// request(url, { json: true }, (error, response) => {
//   const data = response.body;
//   const currentWeather = data.current;
//   console.log(
//     `${currentWeather.weather[0].description}. It is currently ${currentWeather.temp} degrees out. And it feels like ${currentWeather.feels_like} degrees out.`
//   );
// });
// https://docs.mapbox.com/
// const searchUrl =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoicHJhYmhhdDRldmVyIiwiYSI6ImNrYzF2NnQwbzB2b2QycXBtM2lzaXZrb2MifQ.UOfnorJ2Aq3dVzwZVERPAQ";
// request({ url: searchUrl, json: true }, (error, response) => {
//   const data = response.body;
//   console.log(data.features[0]);
//   const geoData = data.features[0];
//   console.log(
//     `Place - ${geoData.place_name}, Lat ${geoData.center[1]}, Long ${geoData.center[0]}`
//   );
// });
const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicHJhYmhhdDRldmVyIiwiYSI6ImNrYzF2NnQwbzB2b2QycXBtM2lzaXZrb2MifQ.UOfnorJ2Aq3dVzwZVERPAQ`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to network.", null);
    } else if (response.body.features.length === 0) {
      callback("Unable to find the location.", null);
    } else {
      const data = response.body;
      const geoData = data.features[0];
      callback(null, {
        place: geoData.place_name,
        lat: geoData.center[1],
        long: geoData.center[0],
      });
    }
  });
};

module.exports = geoCode;
