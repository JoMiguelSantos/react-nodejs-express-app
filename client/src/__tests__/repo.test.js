import Repo from "../components/Repo/Repo";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import { StateMock } from "@react-mock/state";
import reducer, { initialState } from "../store/reducers/bookmarks";
import { FetchMock } from "@react-mock/fetch";

// this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState for the entire store that the ui is rendered with
function renderWithReduxFetchState(
  ui,
  {
    initialState,
    isBookmarked,
    store = createStore(reducer, initialState)
  } = {}
) {
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
          <StateMock state={{ isBookmarked }}>{ui}</StateMock>
        </Provider>
      </FetchMock>
    ),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  };
}

// test onClick fires on clicking button
it('calls "onClick" prop on button click', () => {
  // Render new instance in every test to prevent leaking state
  const onClick = jest.fn();
  const { getByText } = renderWithReduxFetchState(
    <Repo onClick={onClick} isBookmarked={false} />
  );

  fireEvent.click(getByText("Bookmark"));
  expect(onClick).toHaveBeenCalledTimes(1);
});

it("renders initial state with Bookmark text visible", async () => {
  // Render new instance in every test to prevent leaking state
  const { getByText } = renderWithReduxFetchState(
    <Repo isBookmarked={false} />
  );

  await waitForElement(() => getByText("Bookmark"));
});

it("renders initial state with Unbookmark text visible", async () => {
  // Render new instance in every test to prevent leaking state
  const { getByText } = renderWithReduxFetchState(<Repo isBookmarked={true} />);

  await waitForElement(() => getByText("Unbookmark"));
});

it("toggles button to Unbookmark visible when clicked", async () => {
  // Render new instance in every test to prevent leaking state
  const { getByText } = renderWithReduxFetchState(
    <Repo isBookmarked={false} />
  );

  fireEvent.click(getByText("Bookmark"));
  await waitForElement(() => getByText("Unbookmark"));
});

it("toggles button back to Bookmark visible when clicked", async () => {
  // Render new instance in every test to prevent leaking state
  const { getByText } = renderWithReduxFetchState(<Repo isBookmarked={true} />);

  fireEvent.click(getByText("Unbookmark"));
  await waitForElement(() => getByText("Bookmark"));
});

// test renders correct Repo item given data example
const repoDescriptorsExample = {
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

it("renders repo name", async () => {
  // Render new instance in every test to prevent leaking state
  const { getByText } = renderWithReduxFetchState(
    <Repo {...repoDescriptorsExample} isBookmarked={false} Example />
  );

  await waitForElement(() => getByText("node-express-app"));
});
