import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherMaps = ({ cityName }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mapData, setMapData] = useState(null);
  const [mapVisible, setMapVisible] = useState(false);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const apiKey = '6603ba18c4af6128928077imf01ab5d';
        const geocodingApiUrl = `https://geocode.maps.co/search?q=${cityName}&api_key=${apiKey}`;
        const geocodingResponse = await axios.get(geocodingApiUrl);
        const { lat, lon } = geocodingResponse.data[0];

        // Set map data with the lat and lon
        setMapData({ lat, lon });
      } catch (error) {
        console.error('Error fetching map data:', error);
        setError('');
      } finally {
        setLoading(false);
      }
    };

    if (cityName) {
      fetchMapData();
    }
  }, [cityName]);

  const toggleMapVisibility = () => {
    setMapVisible(!mapVisible);
  };

  return (
    <div>
      <button onClick={toggleMapVisibility}>{mapVisible ? 'Hide Map' : 'Show Map'}</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      
      {mapVisible && mapData && (
        <div>
          {/* Display map based on lat and lon */}
          <iframe
            width="1190px"
            height="450px"
            frameBorder="0" style={{ border: 0 }}
            src={`https://maps.google.com/maps?q=${mapData.lat},${mapData.lon}&z=15&output=embed`}
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default WeatherMaps;
