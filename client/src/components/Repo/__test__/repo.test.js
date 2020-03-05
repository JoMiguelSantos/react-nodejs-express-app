import Repo from "../Repo";
import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import reducer, { initialState } from "../../../store/reducers/bookmarks";
import { FetchMock } from "@react-mock/fetch";

// need to add composeReducers if want to test reducers/actions
function renderWithReduxFetch({
  initialState,
  store = createStore(combineReducers({ bookmarks: reducer }), initialState)
} = {}) {
  return {
    ...render(
      <FetchMock
        mocks={[
          {
            matcher: "http://localhost:4000/api/v1/bookmarks",
            method: "DELETE",
            response: 204
          },
          {
            matcher: "http://localhost:4000/api/v1/bookmarks",
            method: "POST",
            response: 201
          }
        ]}
      >
        <Provider store={store}>
          <Repo />
        </Provider>
      </FetchMock>
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
    const { container } = renderWithReduxFetch();
    expect(container).toMatchSnapshot();
  });

  it("renders initial state with Bookmark text visible", async () => {
    const { getByText } = renderWithReduxFetch();
    await waitForElement(() => getByText("Bookmark"));
  });

  it("toggles un/bookmark", async () => {
    const { getByText } = renderWithReduxFetch();
    await waitForElement(() => getByText("Bookmark"));

    fireEvent.click(getByText("Bookmark"));
    await waitForElement(() => getByText("Unbookmark"));

    fireEvent.click(getByText("Unbookmark"));
    await waitForElement(() => getByText("Bookmark"));
  });
});
