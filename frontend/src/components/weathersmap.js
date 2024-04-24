import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherMaps = ({ cityName }) => {
  // State variables
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mapData, setMapData] = useState(null);

  // Effect hook for fetching weather map data
  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const apiKey = 'fc53a6536f8800b75b7c2399c1eb2f71';
        // Fetch latitude and longitude coordinates using Geocoding API
        const geocodingApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
        const geocodingResponse = await axios.get(geocodingApiUrl);
        const { lat, lon } = geocodingResponse.data[0];

        // Construct weather map URL with the operation type and tile coordinates
        const weatherMapUrl = `https://maps.openweathermap.org/maps/2.0/weather//{z}/{x}/{y}?appid=${apiKey}`;

        // Fetch weather map data
        const response = await axios.get(weatherMapUrl, {
          params: {
            z: 10, // Adjust zoom level as needed
            x: 0,  // Adjust tile coordinates as needed
            y: 0   // Adjust tile coordinates as needed
          }
        });
        setMapData(response.data);
      } catch (error) {
        console.error('Error fetching weather map data:', error);
        setError('Failed to fetch weather map data');
      }
    };

    fetchMapData();
  }, [cityName]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      
      {mapData && mapData.url && (
        <div>
          <img src={mapData.url} alt="Weather Map" />
        </div>
      )}
    </div>
  );
};

export default WeatherMaps;
