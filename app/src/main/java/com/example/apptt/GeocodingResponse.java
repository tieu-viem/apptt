package com.example.apptt;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class GeocodingResponse {
    @SerializedName("results")
    private List<Result> results;

    public void setResults(List<Result> results) {
        this.results = results;
    }

    public List<Result> getResults() {
        return results;
    }

    public static class Result {
        @SerializedName("geometry")
        private Geometry geometry;

        public void setGeometry(Geometry geometry) {
            this.geometry = geometry;
        }

        public Geometry getGeometry() {
            return geometry;
        }
    }


    public class Location {
        @SerializedName("latitude")
        private double latitude;

        @SerializedName("longitude")
        private double longitude;

        public void setLatitude(double latitude) {
            this.latitude = latitude;
        }

        public void setLongitude(double longitude) {
            this.longitude = longitude;
        }

        public double getLatitude() {
            return latitude;
        }

        public double getLongitude() {
            return longitude;
        }
    }

    public static class Geometry {
        @SerializedName("location")
        private Location location;

        public void setLocation(Location location) {
            this.location = location;
        }

        public Location getLocation() {
            return location;
        }
    }
}
