package com.example.apptt;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

public interface GeocodingApiService {
    @GET("search")
    Call<GeocodingResponse> getCoordinates(@Query("q") String cityName, @Query("api_key") String apiKey);
}
