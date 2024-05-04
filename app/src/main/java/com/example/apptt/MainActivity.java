package com.example.apptt;

import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;

import com.google.android.material.navigation.NavigationView;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;

public class MainActivity extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener {

    private DrawerLayout drawerLayout;
    private TextView temperatureTextView;
    private TextView weatherDescriptionTextView;
    private TextView locationTextView;
    private TextView humidityTextView;
    private TextView windSpeedTextView;

    private TextView feelsLikeTextView;
    private TextView pressureTextView;

    private TextView minMaxTempTextView;
    private TextView dtIsoTextView;
    private EditText cityEditText;
    private Button searchButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.menu);

        cityEditText = findViewById(R.id.cityEditText);
        searchButton = findViewById(R.id.searchButton);
        temperatureTextView = findViewById(R.id.temperatureTextView);
        weatherDescriptionTextView = findViewById(R.id.weatherDescriptionTextView);
        locationTextView = findViewById(R.id.locationTextView);
        humidityTextView = findViewById(R.id.humidityTextView);
        windSpeedTextView = findViewById(R.id.windSpeedTextView);
        feelsLikeTextView = findViewById(R.id.feelsLikeTextView);
        minMaxTempTextView = findViewById(R.id.minMaxTempTextView);
        pressureTextView = findViewById(R.id.pressureTextView);
        dtIsoTextView = findViewById(R.id.dtIsoTextView);

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        drawerLayout = findViewById(R.id.drawer_layout);
        NavigationView navigationView = findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);

        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(this, drawerLayout, toolbar, R.string.open_nav,
                R.string.close_nav);
        drawerLayout.addDrawerListener(toggle);
        toggle.syncState();

        searchButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String cityName = cityEditText.getText().toString().trim();
                if (!cityName.isEmpty()) {
                    fetchWeatherData(cityName);
                } else {
                    Toast.makeText(MainActivity.this, "Please enter a city name", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }


    private void fetchWeatherData(String cityName) {
        // Get Retrofit instance using RetrofitClient
        Retrofit retrofit = RetrofitClient.getClient("https://api.openweathermap.org/data/2.5/");

        // Create WeatherApiService interface instance
        WeatherApiService weatherApiService = retrofit.create(WeatherApiService.class);

        // Call the API to get weather data
        Call<WeatherData> call = weatherApiService.getWeatherByCityName(cityName, "c3960d4008cc75075b2ebce011fd8184");
        call.enqueue(new Callback<WeatherData>() {
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
                            String a = String.format("%.1f", (temperature - 273.15));
                            String dt_iso = weatherData.getDt_iso();
                            temperatureTextView.setText("Temperature: " + a + " °C");
                            weatherDescriptionTextView.setText("Weather description: " + description);
                            humidityTextView.setText("Humidity: " + humidity + "%");
                            locationTextView.setText(weatherData.getName());
                            dtIsoTextView.setText("dt_iso: " + dt_iso);
                            double feelsLike = main.getFeels_like();
                            double minTemp = main.getTemp_min();
                            double maxTemp = main.getTemp_max();
                            int pressure = main.getPressure();
                            String b = String.format("%.1f", (feelsLike - 273.15));
                            String c = String.format("%.1f", (minTemp - 273.15));
                            String d = String.format("%.1f", (maxTemp - 273.15));
                            feelsLikeTextView.setText("Feels Like: " + b + " °C");
                            minMaxTempTextView.setText("Min: " + c + " °C / Max: " + d + " °C");
                            pressureTextView.setText("Pressure: " + pressure + " hPa");
                            WeatherData.Wind wind = weatherData.getWind();
                            windSpeedTextView.setText("Wind Speed: " + wind.getSpeed() + " m/s");
                        } else {
                            showErrorMessage("No weather data available for the location");
                        }
                    }
                } else {
                    showErrorMessage("Failed to fetch weather data");
                }
            }

            @Override
            public void onFailure(Call<WeatherData> call, Throwable t) {
                Log.e("WeatherApp", "Failed to fetch weather data: " + t.getMessage());
                showErrorMessage("Failed to fetch weather data: " + t.getMessage());
            }

        });
    }


    private void showErrorMessage(String message) {
        Toast.makeText(MainActivity.this, message, Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onBackPressed() {
        if (drawerLayout.isDrawerOpen(GravityCompat.START)) {
            drawerLayout.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        return true;
    }
}
