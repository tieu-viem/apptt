import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DailyForecast = ({ cityName }) => {
  // State variables
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Effect hook for fetching data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');

      try {
        const apiKey = 'fc53a6536f8800b75b7c2399c1eb2f71';
        const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;
        const response = await axios.get(apiUrl);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching daily forecast:', error);
        setError('');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cityName]);
  
  // Render weather icon function
  const renderWeatherIcon = (icon) => {
    return <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="Weather Icon" />;
  };

  const divStyle = {
    display: 'flex',
    flexWrap: 'wrap'
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div style={divStyle}>
          <h2>Daily Forecast for {cityName}</h2>
          {weatherData.list.map((data, index) => (
            <div key={index}>
               <h3>Date: {new Date(data.dt_txt).toLocaleString()}</h3>
              <p>Temperature:</p>
              <ul>
                <li>Day: {data.main.temp} °C</li>
                <li>Min: {data.main.temp_min} °C</li>
                <li>Max: {data.main.temp_max} °C</li>
                {/* Add more weather information here */}
              </ul>
              <p>Weather Description: {data.weather[0].description}</p>
              <p>Wind Speed: {data.wind.speed} m/s</p>
              {renderWeatherIcon(data.weather[0].icon)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DailyForecast;
