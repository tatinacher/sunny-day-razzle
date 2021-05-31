import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { urlWeather, urlForecast } from "../lib/initial-data";

export const fetchWeather = (path) => async (city) => {
  const response = await fetch(path(city));
  const result = await response.json();
  return result;
};

export const fetchCityWeather = createAsyncThunk(
  "cityWeather/fetchCityWeather",
  fetchWeather(urlWeather)
);

export const fetchCityForecast = createAsyncThunk(
  "cityWeather/fetchCityForecast",
  fetchWeather(urlForecast)
);

export const cityWeather = createSlice({
  name: "cityWeather",
  initialState: {},
  reducers: {
    cityLoaded: (_, action) => action.payload,
  },
  extraReducers: {
    [fetchCityWeather.fulfilled]: (_, action) => action.payload,
  },
});

export const cityForecast = createSlice({
  name: "cityForecast",
  initialState: {},
  reducers: {
    cityLoaded: (_, action) => action.payload,
  },
  extraReducers: {
    [fetchCityForecast.fulfilled]: (_, action) => action.payload,
  },
});

export const { cityWeatherLoaded } = cityWeather.actions;
export const { cityForecastLoaded } = cityForecast.actions;

export const cityWeatherReducer = cityWeather.reducer;
export const cityForecastReducer = cityForecast.reducer;
