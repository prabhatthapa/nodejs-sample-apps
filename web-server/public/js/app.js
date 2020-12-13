const weatherForm = document.querySelector("form");
const addressField = document.querySelector("input");

const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const address = addressField.value;
  console.log(address);
  fetchWeather(address);
});

function fetchWeather(address) {
  messageOne.textContent = "Fetching forecast ...";
  messageTwo.textContent = "";

  fetch("http://localhost:3000/weather?address=" + address).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        console.log(data);
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
}
