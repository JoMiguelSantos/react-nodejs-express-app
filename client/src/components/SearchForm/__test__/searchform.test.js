import SearchForm from "../SearchForm";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import reducer, { initialState } from "../../../store/reducers/repos";
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
          <SearchForm />
        </Provider>
      </Router>
    ),
    store,
    history
  };
}

describe("<SearchForm/> unit tests", () => {
  // test snapshot which should not change often
  it("matches the snapshot", () => {
    const { container } = withRouterRedux();
    expect(container).toMatchSnapshot();
  });

  it("shows validation text when search is clicked without input data", () => {
    const { getByText } = withRouterRedux();
    fireEvent.click(getByText(/search/i));
    expect(
      getByText("Please fill in at least one of the fields")
    ).toBeVisible();
  });
});
