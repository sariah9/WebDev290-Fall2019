var apiKey = "0e57c807a628d5e136b3138b7ad24c27";
document.addEventListener('DOMContentLoaded', weatherGet);
function weatherGet(){
  document.getElementById('weatherSubmit').addEventListener('click', function(event){      
    let zipC = {zipcode:null};
    zipC.zipcode = document.getElementById('zipcode').value;  
    let cityN = {cityName:null};
    cityN.cityName = document.getElementById('cityName').value;
    let source;
    var req = new XMLHttpRequest();
    if (zipC.zipcode != ""){
      source = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipC.zipcode + ",us&appid=" + apiKey;
    } else {
      source = "http://api.openweathermap.org/data/2.5/weather?q=" + cityN.cityName + ",us&appid=" + apiKey;
    }
    req.open("GET", source, true);
    req.addEventListener('load', function(){
      let reply = JSON.parse(req.responseText);
      if (req.status > 200 && req.status < 400){
        document.getElementById('city').textContent = reply.city.name;
        document.getElementById('weather').textContent = reply.weather[0].main;
        document.getElementById('foreC').textContent = reply.weather.description;
        document.getElementById('humidity').textContent = reply.main.humidity;
        document.getElementById('wind').textContent = reply.wind.speed;
        document.getElementById('temp').textContent = reply.main.temp;  
        console.log(reply);             
      } else {
        console.log("error" + req.statusText);
        console.log(reply); 
      }
    });
    req.send(null);
    event.preventDefault();
  })
}
