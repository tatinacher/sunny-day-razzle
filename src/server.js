import React from "react";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import express from "express";
import { configureStore } from "@reduxjs/toolkit";
import { renderToString } from "react-dom/server";
import { matchRoutes } from "react-router-config";
import { ServerStyleSheet } from "styled-components";

import { cityWeatherReducer, cityForecastReducer } from "./features/city";
import { App } from "./App";
import { urls } from "./lib/initial-data";
import { routes } from "./lib/render-routes";

const fetch = require("node-fetch");

require("dotenv").config();

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const cssLinksFromAssets = (assets, entrypoint) => {
  return assets[entrypoint]
    ? assets[entrypoint].css
      ? assets[entrypoint].css
          .map((asset) => `<link rel="stylesheet" href="${asset}">`)
          .join("")
      : ""
    : "";
};

const jsScriptTagsFromAssets = (assets, entrypoint, extra = "") => {
  return assets[entrypoint]
    ? assets[entrypoint].js
      ? assets[entrypoint].js
          .map((asset) => `<script src="${asset}"${extra}></script>`)
          .join("")
      : ""
    : "";
};

const createStoreWithState = (preloadedState) =>
  configureStore({
    reducer: {
      cityWeather: cityWeatherReducer,
      cityForecast: cityForecastReducer,
    },
    preloadedState,
  });

const server = express();
server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get("/*", (req, res) => {
    const branch = matchRoutes(routes, req.url);
    const resUrls = [];

    branch.map(({ route, match }) => {
      urls.map(({ key, value, store }) => {
        if (key === route.path) {
          resUrls.push({ url: value(match.params.id), store });
        }
      });
    });

    const promises = [];

    resUrls.map(({ store, url }) => {
      const promise = fetch(url)
        .then((res) => res.json())
        .then((data) => ({ [store]: data }));
      promises.push(promise);
    });

    Promise.all(promises)
      .then((states) => createStoreWithState(...states))
      .then((store) => createPage(req, store))
      .then((render) => res.send(render));
  });

const createPage = (req, store) => {
  const sheet = new ServerStyleSheet();

  const markup = renderToString(
    sheet.collectStyles(
      <Provider store={store}>
        <StaticRouter location={req.path}>
          <App />
        </StaticRouter>
      </Provider>
    )
  );

  const styleTags = sheet.getStyleTags();
  const preloadedState = store.getState();

  return `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${cssLinksFromAssets(assets, "client")}
        ${styleTags}
    </head>
    <body style="margin: 0">
        <div id="root">${markup}</div>
        ${jsScriptTagsFromAssets(assets, "client", " defer crossorigin")}
        <script> window.__PRELOADED_STATE__ = ${JSON.stringify(
          preloadedState
        ).replace(/</g, "\\u003c")}</script>
    </body>
</html>`;
};

export default server;
