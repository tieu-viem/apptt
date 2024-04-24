import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherCurrent = ({ cityName }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError('');
      const apiKey = 'fc53a6536f8800b75b7c2399c1eb2f71';
      const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

      try {
        const response = await axios.get(apiUrl);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [cityName]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : weatherData ? (
        <div>
          <h2>Current Weather in {cityName}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Feels Like: {weatherData.main.feels_like} °C</p>
          <p>Min Temperature: {weatherData.main.temp_min} °C</p>
          <p>Max Temperature: {weatherData.main.temp_max} °C</p>
          <p>Pressure: {weatherData.main.pressure} hPa</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Weather Description: {weatherData.weather[0].description}</p>
          {weatherData.weather[0].icon && (
            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="Weather Icon" />
          )}
        </div>
      ) : (
        <p>{error || 'No weather data available'}</p>
      )}
    </div>
  );
};

export default WeatherCurrent;
