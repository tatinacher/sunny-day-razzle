import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { MainPage, CityPage, CityWeatherPage } from "../pages";

const routes = [
  { path: "/", render: <MainPage />, exact: true },
  { path: "/city/forecast/:id", render: <CityPage />, exact: true },
  { path: "/city/weather/:id", render: <CityWeatherPage />, exact: true },
];

export const Routes = () => (
  <Switch>
    {routes.map(({ path, exact, render }) => (
      <Route key={path} exact={exact} path={path} render={() => render} />
    ))}
    <Redirect to="/" />
  </Switch>
);
