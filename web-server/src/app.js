const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const getForecast = require("./utils/getForecast");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Prabhat Thapa",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Prabhat Thapa",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    helpText: "Some help message",
    name: "Prabhat Thapa",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found!",
    name: "Prabhat Thapa",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geoCode(req.query.address, (error, { place, lat, long }) => {
    if (error) {
      res.send({ error });
    }

    getForecast(lat, long, (error, forecast) => {
      if (error) {
        res.send({ error });
      }

      return res.send({
        forecast,
        location: place,
        address: req.query.address,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found!",
    name: "Prabhat Thapa",
  });
});

app.listen(3000, () => {
  console.log("Express server is up and running!");
});
