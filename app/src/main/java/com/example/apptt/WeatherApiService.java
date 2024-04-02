package com.example.apptt;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

public interface WeatherApiService {
    @GET("weather")
    Call<WeatherData> getWeatherByLocation(
            @Query("lat") double latitude,
            @Query("lon") double longitude,
            @Query("apiKey") String apiKey
    );
}
