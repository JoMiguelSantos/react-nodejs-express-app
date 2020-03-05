import Repos from "../Repos";
import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import reposReducer from "../../../store/reducers/repos";
import bookmarksReducer from "../../../store/reducers/bookmarks";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import thunkMiddleware from "redux-thunk";

function withRouterRedux({
  store = createStore(
    combineReducers({ repos: reposReducer, bookmarks: bookmarksReducer }),
    applyMiddleware(thunkMiddleware)
  )
} = {}) {
  const history = createMemoryHistory();
  return {
    ...render(
      <Router history={history}>
        <Provider store={store}>
          <Repos />
        </Provider>
      </Router>
    ),
    store,
    history
  };
}

describe("<Repos/> unit tests", () => {
  it("shows empty text", () => {
    const { getByText } = withRouterRedux();
    expect(
      getByText("There are currently no repositories saved")
    ).toBeVisible();
  });
});
