const city = document.getElementById("city");
const btn = document.getElementById("btn");
const h1 = document.querySelector("h1");
const h3 = document.querySelector("h3");
const h2 = document.querySelector("h2");
const img =  document.querySelector("img");
const search = document.getElementById("search");

async function getWeatherData(){
    const get = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city.value}?key=H58WMZYCZ9FEBWX3VQWZY9GQR`, 
    {
        mode :'cors'
    }
    );
    const result = await get.json();
    let celc = (result.currentConditions.temp -32)*5/9
    h1.textContent = `${celc.toFixed(0)}°C`;
    h3.textContent = `${result.currentConditions.conditions}`;
    h2.textContent = `${result.days[0].datetime}`;
    
    console.log(result);



}

search.addEventListener('submit' ,(e)=>{
        e.preventDefault();
        getWeatherData();
})

