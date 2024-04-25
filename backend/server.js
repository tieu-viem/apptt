const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');

const app = express(); // Declare app once

// Enable CORS for all routes
app.use(cors());

const PORT = process.env.PORT || 3002;

// Kết nối đến MongoDB
mongoose.connect('mongodb://localhost:27017/weatherApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Đã kết nối thành công đến MongoDB');
}).catch((error) => {
  console.error('Lỗi khi kết nối đến MongoDB:', error);
});

// Định nghĩa schema cho dữ liệu thời tiết
const weatherSchema = new mongoose.Schema({
  city: String,
  temperature: String,
  humidity: String,
  tempmin: String,
  tempmax: String,
  pressure: String,
  humidity: String,
  description: String
});

// Tạo model từ schema
const Weather = mongoose.model('Weather', weatherSchema);

// API endpoint để lưu dữ liệu thời tiết vào MongoDB
app.post('/api/weather', async (req, res) => {
  const cityName = req.query.city; // Sử dụng req.query.city thay vì req.query.cityName
  const apiKey = 'fc53a6536f8800b75b7c2399c1eb2f71'; // Thay YOUR_API_KEY bằng API key của bạn
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  try {
    // Gửi yêu cầu API OpenWeatherMap để lấy dữ liệu thời tiết dựa trên tên thành phố
    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    // Kiểm tra nếu thiếu thông tin cần thiết
    if (!weatherData.name || !weatherData.main || !weatherData.main.temp || !weatherData.main.humidity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Lưu trữ dữ liệu vào MongoDB
    const newWeather = new Weather({
      city: weatherData.name,
      temperature: weatherData.main.temp.toString(), // Chuyển đổi thành chuỗi
      humidity: weatherData.main.humidity.toString(),
      tempmax: weatherData.main.temp_max.toString(),
      tempmin: weatherData.main.temp_min.toString(),
      pressure: weatherData.main.pressure.toString(),
      humidity: weatherData.main.humidity.toString(),
      description: weatherData.weather[0].description.toString()
      //  

       // Chuyển đổi thành chuỗi
    });
    await newWeather.save();

    res.status(201).json({ message: 'Weather data saved to MongoDB successfully' });
  } catch (error) {
    console.error('Lỗi khi lưu dữ liệu thời tiết vào MongoDB:', error);
    res.status(500).json({ error: 'Failed to save weather data to MongoDB' });
  }
});

// Khởi động máy chủ
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
