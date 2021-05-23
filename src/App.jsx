import * as React from "react";
import { Routes } from "./lib/render-routes";
import { Navbar } from "./features/navbar";
import { Global } from "./global";

export const App = () => (
  <Global>
    <div style={{ display: "flex" }}>
      <Navbar />
      <Routes />
    </div>
  </Global>
);
