    import React, { useState, useEffect } from 'react';
    import axios from 'axios';

    const WeatherMap2 = ({ cityName }) => {
      // State variables
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState('');
      const [mapData, setMapData] = useState(null);

      // Effect hook for fetching weather map data
      useEffect(() => {
        const fetchMapData = async () => {
          try {
            const apiKey = '92ee9ea15a56c09a21bc255b83232606';
            const apiUrl = `http://maps.openweathermap.org/maps/2.0/weather/TA2/${encodeURIComponent(cityName)}/{z}/{x}/{y}?date=1552861800&opacity=0.9&fill_bound=true&appid=${apiKey}`;
            const response = await axios.get(apiUrl);
            
            // Set map data with the response
            setMapData(response.data);
          } catch (error) {
            console.error('Error fetching weather map data:', error);
            setError('');
          } finally {
            setLoading(false);
          }
        };

        if (cityName) {
          fetchMapData();
        }
      }, [cityName]);

      return (
        <div>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          
          {mapData && (
            <div>
              {/* Display weather map image */}
              <img src={mapData.url} alt="Weather Map" />
            </div>
          )}
        </div>
      );
    };

    export default WeatherMap2;
