const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/weather');
const Weather = mongoose.model('Weather', {
  city: String,
  lat: Number,
  lon: Number,
  date: String,
  temp: String,
  feels_like: String,
  wind_speed: Number,
  wind_dir: String,
  humidity: String,
  sunrise: String,
  sunset: String,
  condition: String,
});

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


    const weatherNew = new Weather({
      city: weather.info.tzinfo.name,
      lat: weather.info.lat,
      lon: weather.info.lon,
      date: weather.forecasts[0].date,
      temp: weather.fact.temp + '°C',
      feels_like: weather.fact.feels_like + '°C',
      wind_speed: weather.fact.wind_speed,
      wind_dir: weather.fact.wind_dir,
      humidity: weather.fact.humidity + '%',
      sunrise: weather.forecasts[0].sunrise,
      sunset: weather.forecasts[0].sunset,
      condition: weather.fact.condition })

    await weatherNew.save();

    res.json(weatherNew);

  } 
  
  catch (error) {
    console.error('Error fetching weather:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.get('/api/log', async (req, res) => {
  try {
    let log = await Weather.find();
    res.json(log);
  } catch (error) {
    console.error('Error fetching log:', error);
    res.status(500).json({ error: 'Failed to fetch log data' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
