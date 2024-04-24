import React, { useState } from 'react';
import axios from 'axios';

function AddWeatherData() {
    const [cityName, setCityName] = useState('');

    const handleAddWeather = async () => {
        try {
            const response = await axios.post(`http://localhost:3002/api/weather?city=${cityName}`);
            alert(response.data.message);
        } catch (error) {
            console.error('Error adding weather data:', error.response.data.error);
            alert('Failed to add weather data. Please try again.');
        }
    };

    return (
        <div>
            <h1>Add Weather Data</h1>
            <label htmlFor="cityInput">City Name:</label>
            <input 
                type="text" 
                id="cityInput" 
                value={cityName} 
                onChange={(e) => setCityName(e.target.value)} 
            />
            <button onClick={handleAddWeather}>Add Weather Data</button>
        </div>
    );
}

export default AddWeatherData;
