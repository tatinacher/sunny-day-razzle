import { configureStore } from "@reduxjs/toolkit";
import { cityReducer } from "../features/city";

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

export const store = configureStore({
  reducer: {
    city: cityReducer,
  },
  preloadedState,
});
