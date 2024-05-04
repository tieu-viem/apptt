package com.example.apptt;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

public interface WeatherApiService {

    // Phương thức GET để lấy dữ liệu thời tiết theo tên thành phố
    @GET("weather")
    Call<WeatherData> getWeatherByCityName(
            @Query("q") String cityName, // Tham số truy vấn: tên thành phố

            @Query("appid") String apiKey // Tham số truy vấn: khóa API
    );

    // Phương thức GET để lấy dữ liệu thời tiết theo tọa độ vĩ độ và kinh độ
    @GET("weather")
    Call<WeatherData> getWeatherByLocation(
            @Query("lat") double latitude, // Tham số truy vấn: vĩ độ
            @Query("lon") double longitude, // Tham số truy vấn: kinh độ

            @Query("appid") String apiKey // Tham số truy vấn: khóa API
    );
}
