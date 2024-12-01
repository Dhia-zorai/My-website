function weather(){
    const apikey="06466cf3ae521e5ad8f9a60124e19fc5";
    const city=document.getElementById('city').value.trim();
    
    if(!city){
        alert('Pleaser enter a city');
        return;
    }

    const currentWeather=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const forecast=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;

    fetch(currentWeather)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);

        })
        
        .catch(error => {
            console.error('Error fetching current weather data:',error);
            alert('Error fetching current weather data. Please try agin later.');
        
        });

    fetch(forecast)
        .then(response => response.json())
        .then(data => {
            displayhforecast(data.list);

        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:',error);
            alert('Error fetching current hourly forecast data. Please try agin later.');
        
        });
    
        
}

function displayWeather(data){
    const temp=document.getElementById('temp');
    const info=document.getElementById('info');
    const icon=document.getElementById('icon');
    const hforecast=document.getElementById('hforecast');

    //To Clear previous content
    info.innerHTML = '';
    hforecast.innerHTML = '';
    temp.innerHTML = '';

    if(data.cod == '404'){
        info.innerHTML = `<p>${data.message}</p>`;

    }
    else{
        const cityName=data.name;
        
        const temperature=Math.round(data.main.temp - 273.15);
        
        const description=data.weather[0].description;
        
        const iconCode = data.weather[0].icon;
        
        const iconUrl = getIconUrl(iconCode);
        temp.innerHTML= `<p>${temperature}°C</p>`;
    
        info.innerHTML= `<p>${cityName}</p>
        <p>${description}</p>`;
    
     
    icon.src=iconUrl;
    icon.alt = description;

    showImage();
 
    }
}

function displayhforecast(hourlyData){
    const hforecast = document.getElementById('hforecast');
    const next24Hours = hourlyData.slice(0, 8);
    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000)
        
        const hour = dateTime.getHours();
        
        const temperature = Math.round(item.main.temp - 273.15);
        
        const iconCode = item.weather[0].icon;
        
        const iconUrl=getIconUrl(iconCode);
        
        const hourlyItemHtml=`
        <div class="hitem">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Hourly Weather Icon">
            <span>${temperature}°C</span>
        </div>`;

        hforecast.innerHTML += hourlyItemHtml;
})
}

function getIconUrl(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
}

function showImage(){
    const weatherIcon = document.getElementById('icon');
    weatherIcon.style.display = 'block';
}

