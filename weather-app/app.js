const geoCode = require("./geoCode");
const getForecast = require("./getForecast");

const address = process.argv[2];
if (!address) {
  console.log("Please provide a address.");
} else {
  geoCode(address, (error, { lat, long, place }) => {
    if (error) {
      return console.log(error);
    }

    getForecast(lat, long, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }

      console.log("Location - ", place);
      console.log("Forecast - ", forecastData);
    });
  });
}
