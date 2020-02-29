import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { Main } from "./app/main";
import { store } from "./app/redux/store";
import DateFnsUtils from "@date-io/date-fns";

import * as serviceWorker from "./serviceWorker";
import "./index.scss";

ReactDOM.render(
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Provider store={store}>
      <BrowserRouter>
        <CssBaseline />
        <Main />
      </BrowserRouter>
    </Provider>
  </MuiPickersUtilsProvider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// test
serviceWorker.unregister();
