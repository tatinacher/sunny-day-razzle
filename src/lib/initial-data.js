import { units } from "./constants";

export const urlWeather = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.RAZZLE_WEATHER_API_KEY}&units=${units.metric.name}`;

export const urlForecast = (city) =>
  `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.RAZZLE_WEATHER_API_KEY}&units=${units.metric.name}`;

export const urls = [
  {
    key: "/city/:id",
    value: urlWeather,
    store: "cityWeather",
  },
  {
    key: "/city/:id/forecast",
    value: urlForecast,
    store: "cityForecast",
  },
];

export const cities = [
  { id: 1, name: "new york", content: "NY" },
  { id: 2, name: "Monaco", content: "Monaco" },
  { id: 2, name: "rome,it", content: "rome,it" },
  { id: 2, name: "Venezia", content: "Venezia" },
  { id: 2, name: "saint petersburg", content: "saint petersburg" },
];
