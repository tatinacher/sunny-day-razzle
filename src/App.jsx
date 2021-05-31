import * as React from "react";
import { renderRoutes } from "react-router-config";

import { Navbar } from "./features/navbar";
import { Global } from "./global";
import { routes } from "./lib/render-routes";

export const App = () => (
  <Global>
    <div style={{ display: "flex" }}>
      <Navbar />
      {renderRoutes(routes)}
    </div>
  </Global>
);
