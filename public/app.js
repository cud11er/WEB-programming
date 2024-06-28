const loadWeather = document.getElementById('loadWeather');
const loadData = document.getElementById('loadData'); // Новая кнопка
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

loadData.onclick = () => { // Обработчик для новой кнопки
  fetch('/api/log')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Log data:', data);
      displayLog(data); // Функция для отображения таблицы
    })
    .catch(error => {
      console.error('Error fetching log data:', error);
      alert('Failed to fetch log data.');
    });
};

function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  fetch(`/api/weather?lat=${lat}&lon=${lon}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Weather data:', data);
      displayWeather(data);
      container.classList.add('bg-image');
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

function displayLog(data) { // Новая функция для отображения таблицы
  const logResult = document.getElementById('logResult');
  if (!logResult) {
    console.error('logResult element not found');
    return;
  }

  let table = `<table border="1">
    <tr>
      <th>Город</th>
      <th>Ширина</th>
      <th>Долгота</th>
      <th>Дата</th>
      <th>Температура</th>
      <th>Чувствуется как</th>
      <th>Скорость ветра</th>
      <th>Направление ветра</th>
      <th>Влажность</th>
      <th>Восход</th>
      <th>Закат</th>
      <th>Облачность</th>
    </tr>`;

  data.forEach(log => {
    table += `
      <tr>
        <td>${log.city}</td>
        <td>${log.lat}</td>
        <td>${log.lon}</td>
        <td>${log.date}</td>
        <td>${log.temp}</td>
        <td>${log.feels_like}</td>
        <td>${log.wind_speed}</td>
        <td>${log.wind_dir}</td>
        <td>${log.humidity}</td>
        <td>${log.sunrise}</td>
        <td>${log.sunset}</td>
        <td>${log.condition}</td>
      </tr>`;
  });

  table += `</table>`;
  logResult.innerHTML = table;
  logResult.classList.add('show');
  logResult.style.display = 'block';
}
