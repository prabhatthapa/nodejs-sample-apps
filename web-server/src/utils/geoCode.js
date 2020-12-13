const request = require("request");

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
