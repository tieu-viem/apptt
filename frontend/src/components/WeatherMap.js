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
        const apiKey = '92ee9ea15a56c09a21bc255b83232606';
        const apiUrl = `http://maps.openweathermap.org/maps/2.0/weather/${encodeURIComponent(cityName)}/{z}/{x}/{y}?date=1552861800&appid=${apiKey}`;
        const response = await axios.get(apiUrl);
        setMapData(response.data);
      } catch (error) {
        console.error('Error fetching weather map data:', error);
        setError('Failed to fetch weather map data');
      } finally {
        setLoading(false);
      }
    };

    fetchMapData();
  }, [cityName]);

  const divStyle = {
    display: 'flex',
    flexWrap: 'wrap'
  };

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
