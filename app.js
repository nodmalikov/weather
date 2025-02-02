window.addEventListener('DOMContentLoaded', () => {
    const api = {
        key: 'd609eff9e74a0cfa37de45d2d940f5e9',
        baseurl: 'https://api.openweathermap.org/data/2.5/',
    }
    
    const searchBox = document.querySelector('.search-box'); 
    searchBox.addEventListener('keypress', setQuery);
    
    function setQuery(e) {
        if (e.keyCode == 13) {
            getResults(searchBox.value);
        }
    }
    
    function getResults(query) {
        fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((weather) => {
            return weather.json();
        })
        
        .then(displayResults);
    }
    
    function displayResults(weather) {
        console.log(weather);
        let city =document.querySelector('.location .city')
        city.innerHTML = `${weather.name}, ${weather.sys.country}`
        
        let now = new  Date();
        let date = document.querySelector('.location .date');
        date.innerHTML = dateBuilder(now);
        
        let temp = document.querySelector('.temp');
        temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
        
        let elWeather = document.querySelector('.weather');
        elWeather.innerHTML = weather.weather[0].main;
        
        let hilow = document.querySelector('.hi-low');
        hilow.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
        
        let weatherIcon = document.querySelector('.weather-img');
        const iconCode = weather.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = weather.weather[0].main;
    }
    
    function dateBuilder(n) {
        let months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        
        let days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Fridey',
            'Saturday'
        ];
        
        let day = days[n.getDay()];
        let date = n.getDate();
        let month = months[n.getMonth()];
        let year = n.getFullYear();
        
        return `${day} ${date} ${month} ${year}`;
    }
});