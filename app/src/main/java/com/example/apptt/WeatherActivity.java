package com.example.apptt;

import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;



public class WeatherActivity extends AppCompatActivity {
    private TextView temperatureTextView;
    private TextView weatherDescriptionTextView;
    private TextView locationTextView;
    private TextView humidityTextView;
    private TextView windSpeedTextView;

    private TextView feelsLikeTextView;
    private TextView pressureTextView;

    private TextView minMaxTempTextView;
    private TextView seaLevelTextView;

    private TextView groundLevelTextView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_weather);

        // Initialize views
        temperatureTextView = findViewById(R.id.temperatureTextView);
        weatherDescriptionTextView = findViewById(R.id.weatherDescriptionTextView);
        locationTextView = findViewById(R.id.locationTextView);
        humidityTextView = findViewById(R.id.humidityTextView);
        windSpeedTextView = findViewById(R.id.windSpeedTextView);
        feelsLikeTextView = findViewById(R.id.feelsLikeTextView);
        minMaxTempTextView = findViewById(R.id.minMaxTempTextView);
        pressureTextView = findViewById(R.id.pressureTextView);

        // Provide fixed coordinates for a location
        double latitude = 37.7749; // San Francisco latitude
        double longitude = -122.4194; // San Francisco longitude

        // Call fetchWeatherData with fixed latitude and longitude
        fetchWeatherData(latitude, longitude);
    }

    private void fetchWeatherData(double latitude, double longitude) {
        // Call OpenWeatherMap API to get weather data
        Retrofit weatherRetrofit = new Retrofit.Builder()
                .baseUrl("https://api.openweathermap.org/data/2.5/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        WeatherApiService weatherService = weatherRetrofit.create(WeatherApiService.class);
        Call<WeatherData> weatherCall = weatherService.getWeatherByLocation(latitude, longitude, "ff6089b9ef7b0dc5b781b9501c1ff175");

        weatherCall.enqueue(new Callback<WeatherData>() {
            @Override
            public void onResponse(Call<WeatherData> call, Response<WeatherData> response) {
                if (response.isSuccessful() && response.body() != null) {
                    WeatherData weatherData = response.body();
                    WeatherData.Main main = weatherData.getMain();

                    if (main != null) {
                        double temperature = main.getTemp();
                        int humidity = main.getHumidity();

                        WeatherData.Weather[] weatherArray = weatherData.getWeather();
                        if (weatherArray != null && weatherArray.length > 0) {
                            String description = weatherArray[0].getDescription();

                            // Update UI components with weather data
                            temperatureTextView.setText("Temperature: " + temperature + " K"); // Display temperature in Kelvin
                            weatherDescriptionTextView.setText("Weather description: " + description);
                            humidityTextView.setText("Humidity: " + humidity + "%");
                            // Assuming feelsLike is retrieved from the WeatherData object
                            // Assuming feelsLike is retrieved from the WeatherData object
                            // Assuming feelsLike, minTemp, maxTemp, pressure, seaLevel, and groundLevel are retrieved from the WeatherData object
                            double feelsLike = weatherData.getMain().getFeels_like();
                            double minTemp = weatherData.getMain().getTemp_min();
                            double maxTemp = weatherData.getMain().getTemp_max();
                            int pressure = weatherData.getMain().getPressure();
                            int seaLevel = weatherData.getMain().getSea_level();
                            int groundLevel = weatherData.getMain().getGrnd_level();
                            locationTextView.setText(weatherData.getName());
// Set the text for feelsLikeTextView
                            feelsLikeTextView.setText("Feels Like: " + feelsLike + " K");

// Set the text for minMaxTempTextView
                            minMaxTempTextView.setText("Min Temp: " + minTemp + " K / Max Temp: " + maxTemp + " K");

// Set the text for pressureTextView
                            pressureTextView.setText("Pressure: " + pressure + " hPa");


                            windSpeedTextView.setText("Wind Speed: " + weatherData.getWind().getSpeed() + " m/s");

                        } else {
                            showErrorMessage("No weather data available for the location");
                        }
                    }
                } else {
                    // Handle unsuccessful response
                    showErrorMessage("Failed to fetch weather data");
                }
            }

            @Override
            public void onFailure(Call<WeatherData> call, Throwable t) {
                // Handle failure
                showErrorMessage("Failed to fetch weather data: " + t.getMessage());
            }
        });
    }

    private void showErrorMessage(String message) {
        Toast.makeText(WeatherActivity.this, message, Toast.LENGTH_SHORT).show();
    }
}
