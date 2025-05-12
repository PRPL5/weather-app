const city = document.getElementById("city");
const address = document.getElementById("address");
const time = document.getElementById("time");
const date = document.getElementById("date");
const tempVal = document.getElementById("temp-value");
const tempMet = document.getElementById("temp-metrics");
const icon = document.getElementById('weather-icon');
const weathericon = document.getElementById("weather-icon");
const search = document.getElementById("search");
const submit = document.getElementById("submit");
const desc = document.getElementById("desc");
const descTemp = document.getElementById("desc-temp");
const descTempM = document.getElementById("desc-temp-metrics");
let days = document.getElementById('days');
let sunrise = document.getElementById('sunrise');
let sunset = document.getElementById('sunset');
let length = document.getElementById('length');
let address1 = document.getElementById('address-1');
let address2= document.getElementById('address-2');
let temp1= document.getElementById('temperature1');
let temp2= document.getElementById('temperature2');
let temperatureM= document.getElementById('temperature-m');
let temperatureM2= document.getElementById('temperature-m2');
let icon1 = document.getElementById("icon-1");
let icon2 = document.getElementById("icon-2");








let index = 0;


async function getWeatherData(p) {
  const get = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${p}?key=H58WMZYCZ9FEBWX3VQWZY9GQR`,
      {
        mode: "cors",
      }
  );
  getAdress1();
  getAdress2();
  const result = await get.json();
  p = result.address;
  const icon = result.currentConditions.icon;

  const todayDate = result.days[0].datetime;
  const weekday = new Date(todayDate).toLocaleDateString("en-US", { weekday: "long" });
  days.innerHTML = " ";

for(let i = 1;i< 8;i++){

    let date = result.days[i].datetime;
    let thisDay = new Date(date).toLocaleDateString("en-US", { weekday: "short" });

    let tempInCelsius = toCelcius(result.days[i].temp).toFixed(0);
    let tempInFahrenheit = toFa(result.days[i].temp).toFixed(0);
    let dayTemp = index % 2 == 0 ? tempInCelsius : tempInFahrenheit;
    let dayTempDesc = index % 2 == 0 ? "C" : "F";
    let dayIcon = result.days[i].icon;
    console.log(dayIcon);
    
    let dayIconSrc = "";

 
    switch(true){
      case dayIcon.includes('clear'):
       dayIconSrc ='img/Weather Icons/Sunny.png';
        break;
    case dayIcon.includes('partly-cloudy'):
      dayIconSrc= 'img/Weather Icons/partiallyCloudy.png';
      break;
    case dayIcon.includes('cloudy'):
      dayIconSrc ='img/Weather Icons/cloudy.png';
      break;
      case dayIcon.includes('overcast'):
        dayIconSrc ='img/Weather Icons/overcast.png';
        break;
        case dayIcon.includes('snow'):
          dayIconSrc='img/Weather Icons/snowy.png';
          break;
          case dayIcon.includes('rain'):
            dayIconSrc= 'img/Weather Icons/partiallyCloudy.png';
            break;
      default:
    
      dayIconSrc= 'img/Weather Icons/partiallyCloudy.png';
      break;
        }
    
    let day = document.createElement("div");
    day.innerHTML = `
        <div id="day${i}" class="day">
            <p id="day${i}" class="weekday">${thisDay}</p>
            <img src="${dayIconSrc}" alt="" id="day${i}-icon" class="day-img"/>
            <p id="day${i}-temp" class="weekday">${dayTemp}°${dayTempDesc}</p>
        </div>
    `;

    days.appendChild(day);
}

const sunriseTime = result.days[0].sunrise;
const sunsetTime = result.days[0].sunset;        // Split time strings into components
const [sunriseHours, sunriseMinutes, sunriseSeconds] = sunriseTime.split(":").map(Number);
const [sunsetHours, sunsetMinutes, sunsetSeconds] = sunsetTime.split(":").map(Number);


const sunriseTotalMinutes = sunriseHours * 60 + sunriseMinutes + sunriseSeconds / 60;
const sunsetTotalMinutes = sunsetHours * 60 + sunsetMinutes + sunsetSeconds / 60;


const dayLengthMinutes = sunsetTotalMinutes - sunriseTotalMinutes;
const hours = Math.floor(dayLengthMinutes / 60);
const minutes = Math.floor(dayLengthMinutes % 60);

length.textContent =`${hours}h ${minutes}m`;

sunrise.textContent = `${sunriseTime} AM`;
sunset.textContent = `${sunsetTime} PM`;



search.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        getWeatherData(search.value);
        index = 0;
    }
});


 
switch(true){
  case icon.includes('clear'):
    weathericon.setAttribute('src','img/Weather Icons/Sunny.png')
    break;
case icon.includes('partly-cloudy'):
  weathericon.setAttribute('src','img/Weather Icons/partiallyCloudy.png')
  break;
case icon.includes('cloudy'):
  weathericon.setAttribute('src','img/Weather Icons/cloudy.png')
  break;
  case icon.includes('overcast'):
    weathericon.setAttribute('src','img/Weather Icons/overcast.png')
    break;
    case icon.includes('snow'):
      weathericon.setAttribute('src','img/Weather Icons/snowy.png')
      break;
      case icon.includes('rain'):
        weathericon.setAttribute('src','img/Weather Icons/rainy.png')
        break;
  default:

        weathericon.setAttribute('src','img/Weather Icons/partiallyCloudy.png')
  break;
    }

  tempVal.textContent = `${toCelcius(result.currentConditions.temp).toFixed(
    0
  )}`;
  tempMet.textContent = "C";

  address.innerHTML = p.toUpperCase();
  date.textContent = `${weekday}`;
  time.textContent = result.currentConditions.datetime;
  desc.textContent = result.currentConditions.conditions;
  descTemp.textContent = toCelcius(result.currentConditions.feelslike).toFixed(
    0);
    descTempM.textContent = "C";

  console.log(result);




}


window.addEventListener('load', ()=>{
    getWeatherData("London");
})

submit.onclick = (e) => {
  getWeatherData(search.value);
  index =0;


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
    temp1.textContent = toCelcius(temp1.textContent).toFixed(0);
    temp2.textContent = toCelcius(temp2.textContent).toFixed(0);
    temperatureM.textContent = "°C";
    temperatureM2.textContent = "°C";




    tempVal.textContent = toCelcius(tempVal.textContent).toFixed(0);
    tempMet.textContent = "C";
  } else {
    btn.textContent = "Fahrenheit";
    btn.style.color = "white";
    btn.style.backgroundColor = "black";
    descTemp.textContent = toFa(descTemp.textContent).toFixed(0);
    descTempM.textContent = "F";
    temp1.textContent = toFa(temp1.textContent).toFixed(0);
    temp2.textContent = toFa(temp2.textContent).toFixed(0);
    temperatureM.textContent = "°F";
    temperatureM2.textContent = "°F";


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




async function getAdress1() {
  const get = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/New York?key=H58WMZYCZ9FEBWX3VQWZY9GQR`,
      {
        mode: "cors",
      }
  );
  const result = await get.json();
  console.log(result);
  
  address1.textContent = "New York";
    temp1.textContent = `${toCelcius(result.currentConditions.temp).toFixed(
    0
  )}`;
  temperatureM.textContent = "°C";
  tempChange()


  
  const icon = result.currentConditions.icon;

  
 
switch(true){
  case icon.includes('clear'):
    icon1.setAttribute('src','img/Weather Icons/Sunny.png')
    break;
case icon.includes('partly-cloudy'):
  icon1.setAttribute('src','img/Weather Icons/partiallyCloudy.png')
  break;
case icon.includes('cloudy'):
  icon1.setAttribute('src','img/Weather Icons/cloudy.png')
  break;
  case icon.includes('overcast'):
    icon1.setAttribute('src','img/Weather Icons/overcast.png')
    break;
    case icon.includes('snow'):
      icon1.setAttribute('src','img/Weather Icons/snowy.png')
      break;
      case icon.includes('rain'):
        icon1.setAttribute('src','img/Weather Icons/rainy.png')
        break;
  default:

        icon1.setAttribute('src','img/Weather Icons/partiallyCloudy.png')
  break;
    }
}


async function getAdress2() {
  const get = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Hong Kong?key=H58WMZYCZ9FEBWX3VQWZY9GQR`,
      {
        mode: "cors",
      }
  );
  const result = await get.json();
  console.log(result);

  address2.textContent = "Hong Kong";
      temp2.textContent = `${toCelcius(result.currentConditions.temp).toFixed(
    0
  )}`;
  temperatureM2.textContent = "°C";

  tempChange()

  const icon = result.currentConditions.icon;

  
 
switch(true){
  case icon.includes('clear'):
    icon2.setAttribute('src','img/Weather Icons/Sunny.png')
    break;
case icon.includes('partly-cloudy'):
  icon2.setAttribute('src','img/Weather Icons/partiallyCloudy.png')
  break;
case icon.includes('cloudy'):
  icon2.setAttribute('src','img/Weather Icons/cloudy.png')
  break;
  case icon.includes('overcast'):
    icon2.setAttribute('src','img/Weather Icons/overcast.png')
    break;
    case icon.includes('snow'):
      icon2.setAttribute('src','img/Weather Icons/snowy.png')
      break;
      case icon.includes('rain'):
        icon2.setAttribute('src','img/Weather Icons/rainy.png')
        break;
  default:

        icon2.setAttribute('src','img/Weather Icons/partiallyCloudy.png')
  break;
    }

}