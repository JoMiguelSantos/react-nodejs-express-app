import Bookmarks from "../Bookmarks";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import reducer, { initialState } from "../../../store/reducers/bookmarks";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

function withRouterRedux({
  initialState,
  store = createStore(reducer, initialState)
} = {}) {
  const history = createMemoryHistory();
  return {
    ...render(
      <Router history={history}>
        <Provider store={store}>
          <Bookmarks />
        </Provider>
      </Router>
    ),
    store,
    history
  };
}

describe("<Bookmarks/> unit tests", () => {
  it("shows empty text", () => {
    const { getByText } = withRouterRedux();
    expect(getByText("There are currently no bookmarks saved")).toBeVisible();
  });
});
