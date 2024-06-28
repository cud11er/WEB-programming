const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use('/', express.static('public'));

app.get('/api/weather', async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res
      .status(400)
      .json({ error: 'Latitude and longitude are required' });
  }

  const apiKey = process.env.YANDEX_API_KEY || '1ab343c2-4661-4ddf-b45e-00ba141ac433';
  const url = `https://api.weather.yandex.ru/v2/forecast?lat=${lat}&lon=${lon}&lang=ru_RU`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Yandex-API-Key': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const weather = await response.json();

    res.json({
        'Город': weather.info.tzinfo.name,
        'Ширина': weather.info.lat,
        'Долгота': weather.info.lon,
        'Дата': weather.forecasts[0].date,
        'Температура': weather.fact.temp + '°C',
        'Чувствуется как': weather.fact.feels_like + '°C',
        'Направление ветра': weather.fact.wind_dir,
        'Влажность': weather.fact.humidity + '%',
        'Восход': weather.forecasts[0].sunrise,
        'Закат': weather.forecasts[0].sunset,
        'Облачность': weather.fact.condition,
    });

  } catch (error) {
    console.error('Error fetching weather:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
