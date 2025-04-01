const city = document.getElementById("city");
const address = document.getElementById("address");
const time = document.getElementById("time");
const date = document.getElementById("date");
const tempVal = document.getElementById("temp-value");
const tempMet = document.getElementById("temp-metrics");

const img = document.querySelector("img");
const search = document.getElementById("search");
const submit = document.getElementById("submit");
const desc = document.getElementById("desc");
const descTemp = document.getElementById("desc-temp");
const descTempM = document.getElementById("desc-temp-metrics");
let index = 0;

async function getWeatherData(p) {
  p = search.value;
  const get = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${p}?key=H58WMZYCZ9FEBWX3VQWZY9GQR`,
    {
      mode: "cors",
    }
  );
  const result = await get.json();

  tempVal.textContent = `${toCelcius(result.currentConditions.temp).toFixed(
    0
  )}`;
  tempMet.textContent = "C";

  address.innerHTML = result.address;
  date.textContent = `${result.days[0].datetime}`;
  time.textContent = result.currentConditions.datetime;
  desc.textContent = result.currentConditions.conditions;
  descTemp.textContent = toCelcius(result.currentConditions.feelslike).toFixed(
    0);
    descTempM.textContent = "C";
  console.log(result);
}

submit.onclick = (e) => {
  e.preventDefault();
  getWeatherData();
};

function tempChange() {
  const btn = document.getElementById("temp-metric");
  index++;

  if (index % 2 == 0 && index > 0) {
    btn.textContent = "Celcius";
    btn.style.color = "black";
    btn.style.backgroundColor = "white";
    descTemp.textContent = toCelcius(descTemp.textContent).toFixed(0);
    descTempM.textContent = "C";

    tempVal.textContent = toCelcius(tempVal.textContent).toFixed(0);
    tempMet.textContent = "C";
  } else {
    btn.textContent = "Fahrenheit";
    btn.style.color = "white";
    btn.style.backgroundColor = "black";
    descTemp.textContent = toFa(descTemp.textContent).toFixed(0);
    descTempM.textContent = "F";

    tempVal.textContent = toFa(tempVal.textContent).toFixed(0);
    tempMet.textContent = "F";
  }
}

function toCelcius(f) {
  return ((f - 32) * 5) / 9;
}

function toFa(c) {
  return (c * 9) / 5 + 32;
}
