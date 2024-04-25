// models/weather.js
const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  cityName: String,
  temperature: String,
  humidity: String,
  // Thêm các trường dữ liệu khác nếu cần
});

const WeatherModel = mongoose.model('Weather', weatherSchema);

module.exports = WeatherModel;
