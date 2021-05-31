import { MainPage, CityForecastPage, CityWeatherPage } from "../pages";

export const routes = [
  { path: "/", component: MainPage, exact: true },
  {
    path: "/city/:id",
    component: CityWeatherPage,
    routes: [
      {
        path: "/city/:id/forecast",
        component: CityForecastPage,
      },
    ],
  },
];
