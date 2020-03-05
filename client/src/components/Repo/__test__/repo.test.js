import Repo from "../Repo";
import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import reducer, { initialState } from "../../../store/reducers/bookmarks";
import thunkMiddleware from "redux-thunk";

// need to add composeReducers if want to test reducers/actions
function renderWithRedux({
  initialState,
  store = createStore(
    combineReducers({ bookmarks: reducer }),
    initialState,
    applyMiddleware(thunkMiddleware)
  )
} = {}) {
  return {
    ...render(
      <Provider store={store}>
        <Repo />
      </Provider>
    ),
    store
  };
}

// test renders correct Repo item given data example
const mockRepo = {
  id: 183743694,
  name: "node-express-app",
  html_url: "https://github.com/node-express-app",
  description: "This a repo made for an interview challenge",
  created_at: "2020-02-25T12:23:12",
  updated_at: "2020-02-25T16:23:12",
  stargazers_count: 14554,
  watchers_count: 3563,
  language: "javascript",
  open_issues_count: 124,
  forks_count: 1355
};

describe("<Repo /> unit tests", () => {
  // SNAPSHOT
  it("matches the previous snapshot", () => {
    const { container } = renderWithRedux();
    expect(container).toMatchSnapshot();
  });

  it("renders initial state with Bookmark text visible", async () => {
    const { getByText } = renderWithRedux();
    await waitForElement(() => getByText("Bookmark"));
  });

  it("toggles un/bookmark", async () => {
    const { getByText } = renderWithRedux();
    await waitForElement(() => getByText("Bookmark"));

    fireEvent.click(getByText("Bookmark"));
    await waitForElement(() => getByText("Unbookmark"));

    fireEvent.click(getByText("Unbookmark"));
    await waitForElement(() => getByText("Bookmark"));
  });
});
