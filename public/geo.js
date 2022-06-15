
    /*   const button = document.getElementById('submit');
      button.addEventListener('click', async event => {
        const vegetable = document.getElementById('vegetable').value;
        const data = { lat, lon, vegetable };
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };
        const response = await fetch('/api', options);
        const json = await response.json();
        console.log(json);
      }); */

let lat, lon;
if ('geolocation' in navigator) {
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition(async position => {
  try{
    lat = position.coords.latitude.toFixed(2);
    lon = position.coords.longitude.toFixed(2);
    document.getElementById('latitude').textContent = lat
    document.getElementById('longitude').textContent = lon
    const api_url = `/weather/${lat},${lon}`
    const response = await fetch(api_url)
    const json = await response.json()
    //Data from Server response(openweather)
    const weather = json.weather.weather[0].description;
    const temperature = json.weather.main.temp;
    //Data from Server response(air quality)
    const air_quality = json.air_quality.results[0].parameters[4]
    const air = air_quality.lastValue +" " + air_quality.lastUpdated
    //Weather HTML
    document.getElementById('summary').textContent = weather; 
    document.getElementById('temperature').textContent = (temperature - 273.15).toFixed()
    //Air Quality HTML
    document.getElementById('air-quality').textContent = air_quality.lastValue;
    document.getElementById('aq-date').textContent = air_quality.lastUpdated
    //POST TO DB
    const data = { lat, lon, weather, air};
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    const db_response = await fetch('/api', options);
    const db_json = await db_response.json();

    console.log(db_json);
}     
  catch(err){
      console.log("something went wrong");
  }});
} 
else {
  console.log('geolocation not available');
}