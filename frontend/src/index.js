import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import store from "./store";
import App from "./App";

import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import history from "./lib/history";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";


ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
  {/* <BrowserRouter> */}
  <HistoryRouter history={history}>
  <App />
  </HistoryRouter>
  {/* </BrowserRouter> */}
  </Provider></React.StrictMode>,
  document.getElementById("root")
);


reportWebVitals();

