import React, { useState, useEffect } from 'react';
  
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import axios from 'axios';
import WeatherMap2 from './components/WeatherMap'; // Import the AddData component
import WeatherCurrent from './components/weatherCurrent';
import DailyForecast from './components/DailyForecast';
import WeatherMaps from './components/weathersmap';

const WeatherComponent = () => {
  // State variables
  const [weatherData, setWeatherData] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cityName, setCityName] = useState('');
  const [error, setError] = useState('');

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!cityName) {
      setError('Please enter a city name');
      return;
    }
    setLoading(true);
    setError('');
    const apiKey = 'fc53a6536f8800b75b7c2399c1eb2f71';
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;

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

  // Handler for adding weather data
  const handleAddWeather = async () => {
    try {
      if (!cityName) {
        alert('Please enter a city name.');
        return;
      }

      const response = await axios.post(`http://localhost:3002/api/weather?city=${cityName}`);
      if (response.data && response.data.message) {
        alert(response.data.message);
      } else {
        console.error('Error adding weather data: Unknown error');
        alert('Failed to add weather data. Please try again.');
      }
    } catch (error) {
      console.error('Error adding weather data:', error);
      alert('Failed to add weather data. Please try again.');
    }
  }

  // Handler for input change
  const handleChange = (event) => {
    setCityName(event.target.value);
  };

  const divStyle = {
    display: 'flex',
    flexWrap: 'wrap'
  };

  return (
    <div style={divStyle}>
      <h1>Weather Information</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <h3>Enter City Name:</h3>
          <input type="text" value={cityName} onChange={handleChange} />
        </label>
        <button type="submit">Search</button>
        <button onClick={handleAddWeather}>Add Weather Data</button>
      </form>
      {cityName && <WeatherMaps cityName={cityName} />}
      {cityName && <WeatherMap2 cityName={cityName} />}
      {cityName && <WeatherCurrent cityName={cityName} />}
      {cityName && <DailyForecast cityName={cityName} />} {/* Render DailyForecast component */}
      
      {error && <p>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : weatherData ? (
        <div>
          {weatherData.map((city) => (
            <div key={city.name}>
              <h2>{city.name}</h2>
              <ul>
                {city.local_names ? Object.entries(city.local_names).map(([language, localName]) => (
                  <li key={language}>{language}: {localName}</li>
                )) : null}
                <li>Latitude: {city.lat}</li>
                <li>Longitude: {city.lon}</li>
                <li>Country: {city.country}</li>
                <li>State: {city.state}</li>
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
};

export default WeatherComponent;
