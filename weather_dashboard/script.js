const apiKey = '4cd4af965f1f4dc2b1944517240509';

function getWeather() {
    const city = document.getElementById('city-input').value;
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            displayForecastWeather(data);
            generateForecastChart(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Could not retrieve weather data. Please try again.');
        });
}

function displayCurrentWeather(data) {
    const currentWeather = document.getElementById('current-weather');
    const location = `${data.location.name}, ${data.location.country}`;
    const temperature = `${data.current.temp_c}°C`;
    const condition = data.current.condition.text;
    const icon = data.current.condition.icon;
    
    currentWeather.innerHTML = `
        <div>
            <h2>${location}</h2>
            <p>${temperature}</p>
            <p>${condition}</p>
        </div>
        <img src="https:${icon}" alt="${condition}">
    `;
}

function displayForecastWeather(data) {
    const forecastWeather = document.getElementById('forecast-weather');
    forecastWeather.innerHTML = '';

    data.forecast.forecastday.forEach(day => {
        const date = new Date(day.date).toLocaleDateString();
        const icon = day.day.condition.icon;
        const condition = day.day.condition.text;
        const maxTemp = `${day.day.maxtemp_c}°C`;
        const minTemp = `${day.day.mintemp_c}°C`;

        forecastWeather.innerHTML += `
            <div class="forecast-day">
                <p>${date}</p>
                <img src="https:${icon}" alt="${condition}">
                <p>${maxTemp} / ${minTemp}</p>
                <p>${condition}</p>
            </div>
        `;
    });
}

function generateForecastChart(data) {
    const labels = data.forecast.forecastday.map(day => new Date(day.date).toLocaleDateString());
    const temps = data.forecast.forecastday.map(day => day.day.avgtemp_c);

    const ctx = document.getElementById('forecastChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Avg Temperature (°C)',
                data: temps,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}
