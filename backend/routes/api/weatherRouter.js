// weatherRouter.js
const express = require('express');
const router = express.Router();
const WeatherModel = require('./models/weather');

router.post('/weather', async (req, res) => {
  try {
    const { cityName, temperature, humidity, ...otherData } = req.body;
    const newWeather = new WeatherModel({
      cityName,
      temperature,
      humidity,
      ...otherData,
    });
    await newWeather.save();
    res.status(201).json({ message: 'Weather data saved successfully' });
  } catch (error) {
    console.error('Error saving weather data:', error);
    res.status(500).json({ error: 'Failed to save weather data' });
  }
});

module.exports = router;
  