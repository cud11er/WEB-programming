const loadButton = document.getElementById("loadButton");
const wrapper = document.querySelector(".wrapper");

loadButton.onclick = async () => {
  function success(position) {
    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  }

  function error(err) {
    console.error("Невозможно получить ваше местоположение", err);
    throw err;
  }

  try {
    const position = await new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation не поддерживается вашим браузером"));
      } else {
        console.log("Определение местоположения…");
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    });

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const apiKey = 'fe38869ec54abcbd9d198d6d17b34eab'; // Ваш API ключ от OpenWeather
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=ru`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    console.log(data);

    // Формируем HTML для отображения информации о погоде
    const weatherHTML = `
      <div id="weatherInfo" class="weather-item">
        <h2>Текущая погода в ${data.name}:</h2>
        <p>Температура: ${data.main.temp} °C</p>
        <p>Ощущается как: ${data.main.feels_like} °C</p>
        <p>Влажность: ${data.main.humidity} %</p>
        <p>Облачность: ${data.clouds.all} %</p>
        <p>Давление: ${data.main.pressure} hPa</p>
        <p>Ветер: ${data.wind.speed} м/с, ${data.wind.deg}°</p>
        <p>Условия: ${data.weather[0].description}</p>
      </div>
    `;

    // Вставляем сформированный HTML в контейнер на странице
    wrapper.innerHTML = weatherHTML;

  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }

  // Скрыть кнопку после загрузки данных
  loadButton.style.display = "none";
};
