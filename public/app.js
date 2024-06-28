const loadWeather = document.getElementById('loadWeather');
const container = document.querySelector('.container');
const title = document.getElementById('title');

loadWeather.onclick = () => {
  console.log('click');
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
    <p>Город: ${data.city}</p>
    <p>Ширина: ${data.lat}</p>
    <p>Долгота: ${data.lon}</p>
    <p>Дата: ${data.date}</p>
    <p>Температура: ${data.temp}</p>
    <p>Чувствуется как: ${data.feels_like}</p>
    <p>Направление ветра: ${data.wind_dir}</p>
    <p>Скорость ветра: ${data.wind_speed} м/с</p>
    <p>Влажность: ${data.humidity}</p>
    <p>Восход: ${data.sunrise}</p>
    <p>Закат: ${data.sunset}</p>
    <p>Облачность: ${data.condition}</p>
  `;
  weatherResult.classList.add('show');
  weatherResult.style.display = 'flex';
  loadWeather.style.display = 'none';
  title.style.display = 'flex';
}
