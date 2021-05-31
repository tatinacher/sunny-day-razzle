import { configureStore } from "@reduxjs/toolkit";
import { cityWeatherReducer, cityForecastReducer } from "../features/city";

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

export const store = configureStore({
  reducer: {
    cityWeather: cityWeatherReducer,
    cityForecast: cityForecastReducer,
  },
  preloadedState,
});
