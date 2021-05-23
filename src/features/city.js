import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url } from "../lib/initial-data";

export const fetchCity = createAsyncThunk("city/fetchCity", async (city) => {
  const response = await fetch(url(city));
  const result = await response.json();
  return result;
});

export const city = createSlice({
  name: "city",
  initialState: {},
  reducers: {
    cityLoaded: (_, action) => action.payload,
  },
  extraReducers: {
    [fetchCity.fulfilled]: (_, action) => action.payload,
  },
});

export const { cityLoaded } = city.actions;

export const cityReducer = city.reducer;
