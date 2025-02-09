// api details and success function

const successfulLookup = (position) => {
  console.log("hi");
  console.log(position);

  console.log(checker);
  // extraction of latitude and longitude form data
  var locate;

  if (!checker) {
    var { latitude, longitude } = position.coords;
    locate = `${latitude},${longitude}`;
    console.log(locate);
  } else {
    locate = position;
  }

  // the api key
  const key = `dcced4f5a3cb4e43a71160725220204`;

  // formation of url
  const fullUrl = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${locate}&aqi=yes`;

  // function call to get data
  fetchData(fullUrl);
};

// error function
const errorFun = (err) => {
  navigator.permissions
    .query({
      name: "geolocation",
    })
    .then((result) => {
      console.log(result);
      if (result.state == "denied") {
        console.log("ohh no");
      } else {
        console.log("ohh granted");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// fetch the data from api
async function fetchData(url) {
  fetch(`${url}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.location);
      showlocation(data.location);
      console.log(data.current);
      showWeather(data.current);
    });
}

var checker = false;

// if (condition) {
// } else {
// }

//* auto location btn
const autoLocateBtn = document.querySelector("#autoLocateBtn");
autoLocateBtn.addEventListener("click", autoLocate);

function autoLocate() {
  checker = false;
  navigator.geolocation.getCurrentPosition(successfulLookup, errorFun);
}

// * input the value of location

const locateInp = document.querySelector(`#locate`);
locateInp.addEventListener("change", () => {
  checker = true;
  successfulLookup(locateInp.value);
});

const locateBtn = document.querySelector(`#searchBtn`);
locateBtn.addEventListener("click", () => {
  checker = true;
  successfulLookup(locateInp.value);
});

var showWeather = (data) => {
  // icon
  var imgSrc = data.condition.icon;
  const imgIcon = document.querySelector("#iconImg");

  imgIcon.style.display = "block";

  imgIcon.src = `${imgSrc}`;

  // temperature
  const temp = document.querySelector(`#temperature`);
  temp.innerHTML = ` ${data.temp_c}&#176;c`;

  // fahrenheitBtn
  const fahrenheitBtn = document.querySelector(`#fahrenheitBtn`);
  fahrenheitBtn.addEventListener("click", () => {
    temp.innerHTML = `${data.temp_f}&#176;f`;
  });

  // celsiusBtn
  const celsiusBtn = document.querySelector(`#celsiusBtn`);
  celsiusBtn.addEventListener("click", () => {
    temp.innerHTML = `${data.temp_c}&#176;c`;
  });

  // windSpeed
  const wind = document.querySelector(`#windSpeed`);
  wind.innerHTML = `${data.wind_kph}`;

  // humidity
  const humidity = document.querySelector(`#humidity`);
  humidity.innerHTML = `${data.humidity}`;

  // weatherText
  const weatherText = document.querySelector(`#weatherText`);
  weatherText.innerHTML = `${data.condition.text}`;

  // cloud
  const cloud = document.querySelector(`#cloud`);
  cloud.innerHTML = `${data.cloud}`;
};

const showlocation = (data) => {
  // locationName
  const locationName = document.querySelector(`#locationName`);
  if (data.name != data.region) {
    locationName.innerHTML = `${data.name},${data.region}`;
  } else {
    locationName.innerHTML = `${data.region}`;
  }

  // weekday
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // day and date
  const dateDisplay = document.querySelector(`#date`);
  const d = new Date();
  dateDisplay.innerHTML = `${
    weekday[d.getDay()]
  }, ${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
};
