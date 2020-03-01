import SearchForm from "../SearchForm";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import reducer, { initialState } from "../../../store/reducers/repos";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { shallow, mount } from "enzyme";
import mockAPIRes from "../../../../githubResExample";
import { FetchMock } from "@react-mock/fetch";

// beforeEach(() => {
//   const scope = nock("http://localhost:4000")
//     .get("/api/v1/repos?")
//     .reply(
//       200,
//       {
//         status: "success",
//         data: {
//           data: mockAPIRes
//         }
//       },
//       {
//         "Access-Control-Allow-Origin": "*",
//         "Content-type": "application/json"
//       }
//     );
// });

const expectedFetchPath =
  "http://localhost:4000/api/v1/repos?name=react&description=this is a description&readme=this is a readme&language=javascript&topic=testing";

// function withRouterRedux({
//   initialState,
//   store = createStore(reducer, initialState)
// } = {}) {
//   const history = createMemoryHistory();
//   return {
//     ...render(
//       <Router history={history}>
//         <FetchMock
//           mocks={[
//             {
//               matcher: expectedFetchPath,
//               method: "GET",
//               response: {
//                 status: "success",
//                 data: {
//                   data: mockAPIRes
//                 }
//               }
//             },
//             {
//               matcher: "http://localhost:4000/api/v1/repos?",
//               method: "GET",
//               response: { status: 200 }
//             }
//           ]}
//         >
//           <Provider store={store}>
//             <SearchForm />
//           </Provider>
//         </FetchMock>
//       </Router>
//     ),
//     store,
//     history
//   };
// }

function withRouterRedux({
  initialState,
  store = createStore(reducer, initialState)
} = {}) {
  const history = createMemoryHistory();
  return {
    ...render(
      <Router history={history}>
        <FetchMock
          mocks={[
            {
              matcher: expectedFetchPath,
              method: "GET",
              response: {
                status: "success",
                data: {
                  data: mockAPIRes
                }
              }
            },
            {
              matcher: "http://localhost:4000/api/v1/repos?",
              method: "GET",
              response: {}
            }
          ]}
        >
          <Provider store={store}>
            <SearchForm />
          </Provider>
        </FetchMock>
      </Router>
    ),
    store,
    history
  };
}

function mountWithRouterRedux({
  initialState,
  store = createStore(reducer, initialState)
} = {}) {
  const history = createMemoryHistory();
  return (
    <Router history={history}>
      <FetchMock
        mocks={[
          {
            matcher: expectedFetchPath,
            method: "GET",
            response: {
              status: "success",
              data: {
                data: mockAPIRes
              }
            }
          },
          {
            matcher: "http://localhost:4000/api/v1/repos?",
            method: "GET",
            response: {}
          }
        ]}
      >
        <Provider store={store}>
          <SearchForm />
        </Provider>
      </FetchMock>
    </Router>
  );
}

describe("<SearchForm/> unit tests", () => {
  // test snapshot which should not change often
  it("matches the snapshot", () => {
    const { container } = withRouterRedux();
    expect(container).toMatchSnapshot();
  });

  it("shows empty if isEmpty is true", async () => {
    const { getByText } = withRouterRedux();
    fireEvent.click(getByText(/search/i));
    await waitForElement(() => getByText("No Repos were found"));
  });

  it("pushes router to /repos after Search is clicked", async () => {
    // const { getByText, history } = withRouterRedux();
    // fireEvent.click(getByText(/search/i));

    const container = mount(mountWithRouterRedux());
    expect(container.find(".btn-search").text()).toEqual("Search");
    container.find(".btn-search").simulate("click");
    console.log(window.location.pathname);
    // console.log(window.history.location.pathname);
    console.log(container.props(), container.instance(), container.html());
    // expect(container.prop("history").location.pathname).toBe("/repos");
  });

  it("sends request to backend if it's clicked ", () => {
    // const mockSuccessResponse = {};
    // const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    // const mockFetchPromise = Promise.resolve({
    //   json: () => mockJsonPromise
    // });
    const container = mount(mountWithRouterRedux());
    // const fetchSpy = jest.spyOn(global, "fetch");
    // jest.spyOn(global, "fetch").mockImplementationOnce(() => mockFetchPromise);
    expect(container.find("button").text()).toEqual("Search");
    container.find("button").simulate("click");
    expect(fetchSpy).toBeCalled();
    // expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  // it("sends submitted data to fetch in the expected format", () => {
  //   const mockFormData = {
  //     target: {
  //       elements: [
  //         { name: "name", value: "react" },
  //         { name: "description", value: "this is a description" },
  //         { name: "readme", value: "this is a readme" },
  //         { name: "language", value: "javascript" },
  //         { name: "topic", value: "testing" }
  //       ]
  //     }
  //   };
  //   // const mockSuccessResponse = JSON.stringify({
  //   //   status: "success",
  //   //   data: {
  //   //     data: mockAPIRes
  //   //   }
  //   // });
  //   // const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
  //   // const mockFetchPromise = Promise.resolve({
  //   //   json: () => mockJsonPromise
  //   // });
  //   const container = withRouterRedux();
  //   const [, { body }] = fetchMock.lastCall(expectedFetchPath, "GET");
  //   expect(JSON.parse(body)).toEqual({
  //     status: "success",
  //     data: {
  //       data: mockAPIRes
  //     }
  //   });
  //   // global.fetch = jest.fn().mockImplementationOnce(() => mockFetchPromise);
  //   // jest.spyOn(global, "fetch").mockImplementationOnce(() => mockFetchPromise);
  //   // const expectedFetchPath =
  //   //   "http://localhost:4000/api/v1/repos?name=react&description=this is a description&readme=this is a readme&language=javascript&topic=testing";
  //   container.find("form").simulate("submit", mockFormData);
  //   // expect(global.fetch).toHaveBeenCalledTimes(1);
  //   // // check if pathname matches expectedFetchPath
  //   // expect(global.fetch).toHaveBeenCalledWith(expectedFetchPath);
  // });
});
