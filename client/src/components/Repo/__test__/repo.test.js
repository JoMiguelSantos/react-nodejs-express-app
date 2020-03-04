import Repo from "../Repo";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import { shallow, mount } from "enzyme";
import reducer, { initialState } from "../../../store/reducers/bookmarks";
import { FetchMock } from "@react-mock/fetch";

// need to add composeReducers if want to test reducers/actions
function renderWithReduxFetchState({
  initialState,
  isRepoBookmarked,
  store = createStore(reducer, initialState)
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
          <Repo isRepoBookmarked={isRepoBookmarked} />
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
  forks: 1355
};

describe("<Repo /> unit tests", () => {
  // SNAPSHOT
  it("matches the previous snapshot", () => {
    const { container } = renderWithReduxFetchState();
    expect(container).toMatchSnapshot();
  });

  it("renders initial state with Bookmark text visible", async () => {
    // Render new instance in every test to prevent leaking state
    const { getByText } = renderWithReduxFetchState({
      isRepoBookmarked: false
    });
    await waitForElement(() => getByText("Bookmark"));
  });

  it("renders bookmarked state with Unbookmark text visible", async () => {
    // Render new instance in every test to prevent leaking state
    const { getByText } = renderWithReduxFetchState({ isRepoBookmarked: true });
    await waitForElement(() => getByText("Unbookmark"));
  });

  it("toggles Bookmark button to Unbookmark visible when clicked", async () => {
    const { getByText } = renderWithReduxFetchState({
      isRepoBookmarked: false
    });
    fireEvent.click(getByText("Bookmark"));
    await waitForElement(() => getByText("Unbookmark"));
  });

  it("toggles Unbookmark button back to Bookmark visible when clicked", async () => {
    // Render new instance in every test to prevent leaking state
    const { getByText } = renderWithReduxFetchState({ isRepoBookmarked: true });
    fireEvent.click(getByText("Unbookmark"));
    await waitForElement(() => getByText("Bookmark"));
  });
});
