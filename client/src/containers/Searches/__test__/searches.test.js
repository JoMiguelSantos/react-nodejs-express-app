import Searches from "../Searches";
import React from "react";
import { Provider } from "react-redux";
import {
  render,
  fireEvent,
  waitForElement,
  screen
} from "@testing-library/react";
import reducer, { initialState } from "../../../store/reducers/repos";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

function withRouterRedux({
  initialState,
  store = createStore(reducer, initialState, bindMiddleware([thunkMiddleware]))
} = {}) {
  const history = createMemoryHistory();
  return {
    ...render(
      <Router history={history}>
        <Provider store={store}>
          <Searches />
        </Provider>
      </Router>
    ),
    store,
    history
  };
}

describe("<Searches /> unit tests", () => {
  it("shows form the first time it renders", () => {
    const { getByText } = withRouterRedux();
    expect(getByText("Search")).toBeVisible();
  });
});
