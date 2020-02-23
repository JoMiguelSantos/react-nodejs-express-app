import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Layout from "./layout/Layout";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import bookmarksReducer from "./store/reducers/bookmarks";
import reposReducer from "./store/reducers/repos";
import { createStore, combineReducers } from "redux";

const store = createStore(
  combineReducers({
    repos: reposReducer,
    bookmarks: bookmarksReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <App />
      </Layout>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
