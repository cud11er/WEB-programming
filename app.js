document.getElementById('getWeatherBtn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(`http://localhost:3000/weather?lat=${lat}&lon=${lon}`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Failed to fetch weather data.');
        });
}

function error() {
    alert('Unable to retrieve your location.');
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = `
        <p>Город: ${data.Город}</p>
        <p>Ширина: ${data.Ширина}</p>
        <p>Долгота: ${data.долгота}</p>
        <p>Дата: ${data.Дата}</p>
        <p>Температура: ${data.Температура}</p>
        <p>Чувствуется как: ${data['Чувствуется как']}</p>
        <p>Направление ветра: ${data['Направление ветра']}</p>
        <p>Влажность: ${data.Влажность}</p>
        <p>Восход: ${data.Восход}</p>
        <p>Закат: ${data.Закат}</p>
        <p>Облачность: ${data.Облачность}</p>
    `;
}
