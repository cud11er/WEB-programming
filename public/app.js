const loadWeather = document.getElementById('loadWeather');
const container = document.querySelector('.container');
const title = document.getElementById('title');

loadWeather.onclick = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
};

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    console.log('Latitude:', lat); // Отладка
    console.log('Longitude:', lon); // Отладка


    fetch(`/api/weather?lat=${lat}&lon=${lon}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Weather data:', data); // Отладка
            displayWeather(data);
            container.classList.add('bg-image'); // Добавляем класс с фоном
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
    if (!weatherResult) {
        console.error('weatherResult element not found');
        return;
    }

    weatherResult.innerHTML = `
        <p>Город: ${data.Город}</p>
        <p>Дата: ${data.Дата}</p>
        <p>Температура: ${data.Температура}</p>
        <p>Чувствуется как: ${data['Чувствуется как']}</p>
        <p>Направление ветра: ${data['Направление ветра']}</p>
        <p>Влажность: ${data.Влажность}</p>
        <p>Восход: ${data.Восход}</p>
        <p>Закат: ${data.Закат}</p>
        <p>Облачность: ${data.Облачность}</p>
    `;
    weatherResult.classList.add('show');
    weatherResult.style.display = 'flex';
    loadWeather.style.display = 'none';
    title.style.display = 'flex';
}
